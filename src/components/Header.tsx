import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';

function Header() {
  return (
    <AppBar position="static" color="primary">
      <Container sx={{ maxWidth: 'none !important' }}>
        <Toolbar disableGutters variant="dense">
          <TroubleshootIcon fontSize='large' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Gas Usage and Air Quality Tracking
          </Typography>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;