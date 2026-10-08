USE medislot;

-- Create demo hospitals
INSERT INTO hospitals (name, address, phone, emergency_contact, opening_hours) VALUES
('City General Hospital', '123 Main St, Cityville', '555-0100', '555-0199', '24/7'),
('Sunrise Medical Center', '456 Sunrise Ave, Cityville', '555-0200', '555-0299', '8AM - 8PM');

-- Insert Doctors (Passwords: password123 hashed with bcrypt. Gen salt 10 -> $2b$10$....)
-- We will just insert them through the API later, or create users first.
-- Let's create users for Demo Patient and Demo Doctor
-- Hash for 'password' is $2b$10$vO/qF/hF2jR1.y1gK9k2aOWy0C2P0qC2oUqG8I7C/U.H1d4K0w4e2
INSERT INTO users (name, email, phone, password_hash, role) VALUES
('Demo Patient', 'patient@medislot.com', '1234567890', '$2b$10$yv1dHE5mNNmtQrSSMjoaS.W/saE802j42Y2NOF4jieJ8EFq7gg7VC', 'Patient'),
('Dr. Smith', 'doctor@medislot.com', '0987654321', '$2b$10$yv1dHE5mNNmtQrSSMjoaS.W/saE802j42Y2NOF4jieJ8EFq7gg7VC', 'Doctor');

INSERT INTO patients (user_id, date_of_birth, gender) VALUES
(1, '1990-05-15', 'Male');

INSERT INTO doctors (user_id, hospital_id, specialty, experience) VALUES
(2, 1, 'Cardiology', 10);
