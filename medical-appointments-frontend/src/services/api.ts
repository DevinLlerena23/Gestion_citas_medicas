import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getAppointments = () => api.get('/appointments');
export const createAppointment = (data: any) => api.post('/appointments', data);
export const updateStatus = (id: number, status: string) => 
  api.patch(`/appointments/${id}/status`, { status });
export const deleteAppointment = (id: number) => api.delete(`/appointments/${id}`);
export const getAppointment = async (id: number): Promise<Appointment> => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  };