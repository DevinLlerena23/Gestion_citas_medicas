import { Container, Typography, Paper } from '@mui/material';
import AppointmentForm from '../components/AppointmentForm';

export default function CreatePage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Crear  Cita
        </Typography>
        <AppointmentForm />
      </Paper>
    </Container>
  );
}