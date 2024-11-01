import * as React from 'react';
import { Container, Typography, Toolbar, AppBar, Avatar, Grid, IconButton, } from '@mui/material';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import ProfileImage from '../assets/img/profile.jpg'; 

function Header() {
  return (
    <AppBar position="static" color="primary">
      <Container sx={{ maxWidth: 'none !important', }}>
        <Toolbar disableGutters variant="dense" >
          <Grid container justifyContent='space-between' flexWrap='wrap'>
            <Grid item container alignItems='center' flexWrap='nowrap' sx={{  width: 'fit-content' }}>
              <IconButton href='/' >
                <TroubleshootIcon fontSize='large' sx={{ mr: 1 }} />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Gas Usage and Air Quality
              </Typography>
            </Grid>
            <Grid item container justifyContent="center" alignItems="center" gap={2} sx={{  width: 'fit-content' }}>
              <Avatar alt="Haein Kang" src={ProfileImage} />
              <div className='my-name'>Haein Kang</div>
            </Grid>
          </Grid>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;