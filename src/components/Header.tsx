import * as React from 'react';
import { Container, Typography, Toolbar, AppBar, Avatar, Grid, IconButton, } from '@mui/material';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import ProfileImage from '../assets/img/profile.jpg'; 
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { clickCollapseBtn } from '../state/rightPanelSlice';
import packageJson from '../../package.json'; // 위치에 따라 경로를 조정하세요

function Header() {
  const dispatch = useDispatch<AppDispatch>();

  const onClickProfile = () => {
    dispatch(clickCollapseBtn())
  }

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
                  mr: 1,
                }}
              >
                Gas Usage and Air Quality
              </Typography>

              <Typography variant="body2">
                {`v${packageJson.version}`}
              </Typography>
            </Grid>
            <Grid item container justifyContent="center" alignItems="center" gap={.5} sx={{  width: 'fit-content' }}>
              <IconButton onClick={onClickProfile}>
                <Avatar alt="Haein Kang" src={ProfileImage} />
              </IconButton>
              <Typography 
                onClick={onClickProfile} 
                sx={{ 
                  cursor: 'pointer', 
                  ':hover': { textShadow: '-2px 0 4px rgba(255, 255, 255, 0.3), 2px 0 4px rgba(255, 255, 255, 0.3), 0 -2px 4px rgba(255, 255, 255, 0.3), 0 2px 4px rgba(255, 255, 255, 0.3)' }
                }}
              >
                Haein Kang
              </Typography>
            </Grid>
          </Grid>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;