import Database from 'better-sqlite3';
import path from 'path';

export const db = new Database(path.resolve(__dirname, '../../appointments.db'));

export const connectDB = () => {
  db.prepare(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patientName TEXT NOT NULL,
    doctorName TEXT NOT NULL,
    appointmentDate TEXT NOT NULL,
    reason TEXT NOT NULL,
    status TEXT NOT NULL,
    createdAt TEXT NOT NULL
  )`).run();
};
