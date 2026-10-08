const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');

async function setup() {
    const dbPath = path.join(__dirname, '../database/medislot.db');
    if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath); // Delete old DB for fresh start
    }
    
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    const schema = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'Patient',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS hospitals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        phone TEXT NOT NULL,
        emergency_contact TEXT,
        opening_hours TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS departments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hospital_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        date_of_birth DATE NOT NULL,
        gender TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS family_members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        relationship TEXT NOT NULL,
        date_of_birth DATE NOT NULL,
        gender TEXT NOT NULL,
        FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS doctors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        hospital_id INTEGER NOT NULL,
        specialty TEXT NOT NULL,
        experience INTEGER NOT NULL,
        availability TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id INTEGER NOT NULL,
        doctor_id INTEGER NOT NULL,
        hospital_id INTEGER NOT NULL,
        family_member_id INTEGER DEFAULT NULL,
        appointment_date DATE NOT NULL,
        appointment_time TEXT NOT NULL,
        token_number TEXT NOT NULL,
        queue_position INTEGER DEFAULT 0,
        estimated_time TEXT,
        status TEXT DEFAULT 'Scheduled',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
        FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
        FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE,
        FOREIGN KEY (family_member_id) REFERENCES family_members(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        appointment_id INTEGER NOT NULL,
        doctor_id INTEGER NOT NULL,
        token_number TEXT NOT NULL,
        position INTEGER NOT NULL,
        status TEXT DEFAULT 'Waiting',
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
        FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS prescriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        appointment_id INTEGER NOT NULL,
        patient_id INTEGER NOT NULL,
        doctor_id INTEGER NOT NULL,
        diagnosis TEXT NOT NULL,
        instructions TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
        FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
        FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS prescription_medicines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        prescription_id INTEGER NOT NULL,
        medicine_name TEXT NOT NULL,
        dosage TEXT NOT NULL,
        frequency TEXT NOT NULL,
        duration TEXT NOT NULL,
        FOREIGN KEY (prescription_id) REFERENCES prescriptions(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        type TEXT,
        is_read BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `;

    await db.exec(schema);

    // Seed Data
    await db.exec(`
        INSERT INTO hospitals (name, address, phone, emergency_contact, opening_hours) VALUES
        ('City General Hospital', '123 Main St, Cityville', '555-0100', '555-0199', '24/7'),
        ('Sunrise Medical Center', '456 Sunrise Ave, Cityville', '555-0200', '555-0299', '8AM - 8PM'),
        ('Apollo Healthcare', '789 Park Blvd, Metrotown', '555-0300', '555-0399', '24/7'),
        ('Mercy Care Hospital', '101 Pine St, Downtown', '555-0400', '555-0499', '9AM - 10PM'),
        ('Oceanview Medical', '234 Coast Highway, Seaside', '555-0500', '555-0599', '24/7'),
        ('Childrens Specialist Center', '567 Kidz Way, Suburbia', '555-0600', '555-0699', '8AM - 6PM'),
        ('Veterans Regional Clinic', '890 Freedom Road, Northside', '555-0700', '555-0799', '7AM - 7PM'),
        ('Heartland Institute', '321 Pulse Ave, Center City', '555-0800', '555-0899', '24/7');

        INSERT INTO users (name, email, phone, password_hash, role) VALUES
        ('Demo Patient', 'patient@medislot.com', '1234567890', '$2b$10$yv1dHE5mNNmtQrSSMjoaS.W/saE802j42Y2NOF4jieJ8EFq7gg7VC', 'Patient'),
        ('Dr. Smith', 'doctor@medislot.com', '0987654321', '$2b$10$yv1dHE5mNNmtQrSSMjoaS.W/saE802j42Y2NOF4jieJ8EFq7gg7VC', 'Doctor'),
        ('System Admin', 'admin@medislot.com', '1111111111', '$2b$10$yv1dHE5mNNmtQrSSMjoaS.W/saE802j42Y2NOF4jieJ8EFq7gg7VC', 'Admin'),
        ('Dr. Adams', 'doctor2@medislot.com', '2222222222', '$2b$10$yv1dHE5mNNmtQrSSMjoaS.W/saE802j42Y2NOF4jieJ8EFq7gg7VC', 'Doctor'),
        ('Dr. Lee', 'doctor3@medislot.com', '3333333333', '$2b$10$yv1dHE5mNNmtQrSSMjoaS.W/saE802j42Y2NOF4jieJ8EFq7gg7VC', 'Doctor'),
        ('Dr. Patel', 'doctor4@medislot.com', '4444444444', '$2b$10$yv1dHE5mNNmtQrSSMjoaS.W/saE802j42Y2NOF4jieJ8EFq7gg7VC', 'Doctor'),
        ('Dr. Garcia', 'doctor5@medislot.com', '5555555555', '$2b$10$yv1dHE5mNNmtQrSSMjoaS.W/saE802j42Y2NOF4jieJ8EFq7gg7VC', 'Doctor'),
        ('Dr. Kim', 'doctor6@medislot.com', '6666666666', '$2b$10$yv1dHE5mNNmtQrSSMjoaS.W/saE802j42Y2NOF4jieJ8EFq7gg7VC', 'Doctor');

        INSERT INTO patients (user_id, date_of_birth, gender) VALUES
        (1, '1990-05-15', 'Male');

        INSERT INTO doctors (user_id, hospital_id, specialty, experience) VALUES
        (2, 1, 'Cardiology', 10),
        (4, 2, 'Neurology', 15),
        (5, 3, 'Pediatrics', 8),
        (6, 4, 'Orthopedics', 12),
        (7, 1, 'Dermatology', 5),
        (8, 2, 'General Practice', 20);
    `);

    console.log("SQLite database initialized successfully.");
}

setup().catch(console.error);
