import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema de Citas Médicas
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Ver Citas
        </Button>
        <Button color="inherit" component={Link} to="/create">
          Nueva Cita
        </Button>
      </Toolbar>
    </AppBar>
  );
}