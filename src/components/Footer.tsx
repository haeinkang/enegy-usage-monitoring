import React from 'react';
import Grid from '@mui/material/Grid2';
import { Avatar, Link } from '@mui/material';
import styled from 'styled-components';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import ProfileImage from '../assets/img/profile.jpg'; 

const Footer = () => {
  return (
    <Wrapper>
      
      <Grid container alignItems="center">
        <Grid size={6}>
          <Grid display="flex" justifyContent="center" alignItems="center" size="grow" gap={1}> 
            <Avatar src={ProfileImage} sx={{ width: 56, height: 56 }} />
            <div className='my-name'>Haein Kang</div>
          </Grid>
        </Grid>
        
        <Grid container flexDirection='column' size={6}  gap={2}>
          <Grid display="flex" alignItems="center" size="grow" gap={1}>
            <GitHubIcon fontSize='small' />
            <Link href="https://github.com/haeinkang/carbon-usage-monitoring" color="inherit" underline="hover">
              {'github.com/haeinkang'}
            </Link>
          </Grid>

          <Grid display="flex" alignItems="center" size="grow" gap={1}>
            <EmailIcon fontSize='small' />
            haein.kang7@gmail.com
          </Grid>

          <Grid display="flex" alignItems="center" size="grow" gap={1}>
            <PhoneAndroidIcon fontSize='small'/>
            010-9282-0794
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Footer;


const Wrapper = styled.div`
  width: 100%;
  padding: 30px;
  background-color: var(--light-gray);
  font-family: "Comfortaa", sans-serif;
  font-size: small;

  .my-name {
    font-size: large;
    font-weight: bolder;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  a {
    margin: 0 15px;
    text-decoration: none;
    color: inherit;
    &:hover {
      color: #1976d2;  /* 링크 hover 시 색상 변경 */
    }
  }
`;
