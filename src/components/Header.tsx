import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Co2Icon from '@mui/icons-material/Co2';

function Header() {

  return (
    <AppBar position="static" color="primary">
      <Container sx={{ maxWidth: 'none !important' }}>
        <Toolbar disableGutters variant="dense">
          <Co2Icon fontSize='large' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Comfortaa, sans-serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Enery Usage Monitoring
          </Typography>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;