import { Container } from '@mui/material';
import AppointmentList from '../components/AppointmentList';

export default function ListPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <AppointmentList />
    </Container>
  );
}