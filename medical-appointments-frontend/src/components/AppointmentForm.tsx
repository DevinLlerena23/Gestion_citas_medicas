import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Stack, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  Select,
  Typography,
  Paper
} from '@mui/material';
import { createAppointment } from '../services/api';

export default function AppointmentForm() {
  const [form, setForm] = useState({
    patientName: '',
    doctorName: '',
    appointmentDate: '',
    reason: '',
    status: 'pendiente'
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAppointment(form);
      navigate('/'); 
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Nueva Cita Médica
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Nombre del Paciente"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            required
          />
          
          <TextField
            label="Nombre del Médico"
            name="doctorName"
            value={form.doctorName}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            required
          />
          
          <TextField
            label="Fecha de Cita (dd/mm/aaaa)"
            name="appointmentDate"
            value={form.appointmentDate}
            onChange={handleChange}
            placeholder="dd/mm/aaaa"
            fullWidth
            variant="outlined"
            size="small"
            required
          />
          
          <TextField
            label="Motivo de Consulta"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            size="small"
            required
          />
          
          <FormControl fullWidth size="small">
            <InputLabel>Estado</InputLabel>
            <Select
              name="status"
              value={form.status}
              label="Estado"
              onChange={(e) => setForm({...form, status: e.target.value as string})}
            >
              <MenuItem value="pendiente">Pendiente</MenuItem>
              <MenuItem value="confirmada">Confirmada</MenuItem>
              
            </Select>
          </FormControl>
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            Guardar Cita
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}