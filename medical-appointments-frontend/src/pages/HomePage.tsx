import { Container, Typography, Grid, Paper } from '@mui/material';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentList from '../components/AppointmentList';

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        fontWeight: 'bold',
        color: 'primary.main',
        mb: 4
      }}>
        Gestión de Citas Médicas
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom sx={{
              fontWeight: 'medium',
              color: 'text.secondary'
            }}>
              Nueva Cita
            </Typography>
            <AppointmentForm />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" gutterBottom sx={{
              fontWeight: 'medium',
              color: 'text.secondary'
            }}>
              Lista de Citas
            </Typography>
            <AppointmentList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}