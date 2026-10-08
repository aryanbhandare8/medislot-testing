# MediSlot - Book Your Time, Skip the Line

MediSlot is a centralized healthcare appointment and queue-management platform. It helps patients track their live queue position, estimated consultation time, and receive delay notifications.

## Project Architecture
User -> React Frontend -> REST API -> Express Backend -> MySQL Database

## Features
- Role-based Authentication (Patient, Doctor, Admin)
- Responsive Modern UI
- Find Doctors & Book Appointments
- Live Queue Tracking
- Doctor Dashboard & Queue Management

## Tech Stack
- Frontend: React (Vite), TypeScript, Tailwind CSS, React Router, Axios
- Backend: Node.js, Express.js, JWT, bcrypt
- Database: MySQL (mysql2/promise)

## Setup Instructions

### 1. Database Setup
- Install MySQL and create a database named \`medislot\`.
- Import the schema and seed data:
  \`\`\`bash
  mysql -u root -p medislot < database/schema.sql
  mysql -u root -p medislot < database/seed.sql
  \`\`\`

### 2. Backend Setup
- Navigate to the \`backend\` folder.
- Copy \`.env.example\` to \`.env\` and configure your MySQL credentials.
- Install dependencies and start the server:
  \`\`\`bash
  cd backend
  npm install
  npm run dev # OR node server.js
  \`\`\`
- The server will run on http://localhost:5000

### 3. Frontend Setup
- Navigate to the \`frontend\` folder.
- Install dependencies and start the development server:
  \`\`\`bash
  cd frontend
  npm install
  npm run dev
  \`\`\`
- Open the provided localhost link in your browser.

## Demo Accounts
- Patient: \`patient@medislot.com\` / \`password123\`
- Doctor: \`doctor@medislot.com\` / \`password123\`
