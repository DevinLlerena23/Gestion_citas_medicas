import { Request, Response } from 'express';
import { db } from '../database/db';
import { Appointment } from '../models/appointment.model';

export const getAppointments = (_req: Request, res: Response) => {
  const appointments = db.prepare('SELECT * FROM appointments').all();
  res.json(appointments);
};

export const createAppointment = (req: Request, res: Response) => {
  const { patientName, doctorName, appointmentDate, reason, status } = req.body;
  const createdAt = new Date().toISOString();

  const stmt = db.prepare(`INSERT INTO appointments 
    (patientName, doctorName, appointmentDate, reason, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?)`);
  const result = stmt.run(patientName, doctorName, appointmentDate, reason, status, createdAt);

  const newAppointment: Appointment = { id: result.lastInsertRowid as number, patientName, doctorName, appointmentDate, reason, status, createdAt };
  res.status(201).json(newAppointment);
};

export const updateAppointment = (req: Request, res: Response) => {
  const { id } = req.params;
  const { patientName, doctorName, appointmentDate, reason, status } = req.body;
  const stmt = db.prepare(`UPDATE appointments SET patientName=?, doctorName=?, appointmentDate=?, reason=?, status=? WHERE id=?`);
  stmt.run(patientName, doctorName, appointmentDate, reason, status, id);
  res.json({ message: 'Cita actualizada correctamente' });
};

export const deleteAppointment = (req: Request, res: Response) => {
  const { id } = req.params;
  db.prepare('DELETE FROM appointments WHERE id=?').run(id);
  res.json({ message: 'Cita eliminada' });
};

export const updateStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  db.prepare('UPDATE appointments SET status=? WHERE id=?').run(status, id);
  res.json({ message: 'Estado actualizado' });
};


export const getAppointment = (req: Request, res: Response) => {
  const { id } = req.params;
  
  const stmt = db.prepare('SELECT * FROM appointments WHERE id = ?');
  const appointment = stmt.get(id);

  if (!appointment) {
    return res.status(404).json({ message: 'Cita no encontrada' });
  }


  res.json(appointment);
};