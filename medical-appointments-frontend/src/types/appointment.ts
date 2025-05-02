export type AppointmentStatus = 'pendiente' | 'confirmada' | 'cancelada';

export interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  appointmentDate: string;
  reason: string;
  status: AppointmentStatus;
  createdAt?: string;
}

export interface CreateAppointmentDto {
  patientName: string;
  doctorName: string;
  appointmentDate: string;
  reason: string;
  status: AppointmentStatus;
}