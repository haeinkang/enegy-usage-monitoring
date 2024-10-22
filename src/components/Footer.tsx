import React from 'react';
import Grid from '@mui/material/Grid2';
import { Avatar, Link, Typography } from '@mui/material';
import styled from 'styled-components';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import ProfileImage from '../assets/img/profile.jpg'; 

const Footer = () => {
  return (
    <Wrapper>
      <Grid container justifyContent="center" alignItems='flex-start' spacing={30}>
        <Grid gap={10}>
          <Grid display="flex"  justifyContent="center" alignItems="flex-start" size="grow" gap={2}> 
            <Avatar src={ProfileImage} sx={{ width: 70, height: 70 }} />

            <Grid container flexDirection="column" gap={2}>
              <div className='my-name'>
                Haein Kang
              </div>
              <Typography className='job' variant="caption" gutterBottom>
                {/* Front Developer */}
                저는 '월급루팡'이라는 단어를 가장 싫어하는,<br />
                주도적으로 일하는 프론트엔드 개발자입니다.<br />
                단순히 주어진 업무에만 그치지 않고,<br />
                프로젝트의 가치를 극대화할 수 있는 방법을<br />
                지속적으로 고민하며, 능동적으로 개선해 나갑니다.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        
        <Grid container flexDirection='column' gap={2}>
          <Typography variant="subtitle1" gutterBottom>
            Skills
          </Typography>
          <Grid display="flex" alignItems="center" size="grow" gap={1}>
            React
          </Grid>
          <Grid display="flex" alignItems="center" size="grow" gap={1}>
            TypeScript
          </Grid>
          <Grid display="flex" alignItems="center" size="grow" gap={1}>
            JavaScript
          </Grid><Grid display="flex" alignItems="center" size="grow" gap={1}>
            ES6+
          </Grid>
          <Grid display="flex" alignItems="center" size="grow" gap={1}>
            CSS
          </Grid>
        </Grid>

        <Grid container flexDirection='column' gap={2}>
          <Typography variant="subtitle1" gutterBottom>
            Contact me
          </Typography>

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
  .job {
    color: var(--subtext-color);
  }
`;
