import React from 'react';
import { Grid, Avatar, Link, Typography } from '@mui/material';
import styled from 'styled-components';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import ProfileImage from '../assets/img/profile.jpg'; 

const Footer = () => {
  return (
    <Wrapper>
      <Grid container justifyContent="center" alignItems='flex-start'>

        <Grid item xs={4} container justifyContent="center" alignItems="center" gap={2}>
          <Avatar src={ProfileImage} sx={{ width: 70, height: 70 }} />
          <div className='my-name'>Haein Kang</div>
        </Grid>

        <Grid item xs={3} container flexDirection='column' gap={2}>
          <Typography variant="subtitle1" gutterBottom>
            Career
          </Typography>

          <Grid item container flexDirection="column" gap={1}>
            <div>Xiilab (2019.11 - 2023.11) </div>
            <Typography className='job' variant="caption" gutterBottom>
              저는 AI 머신러닝을 위한 GPU 관리 솔루션을 제공하는 <br />
              (주) 씨이랩에서 프론트엔드 개발자로 근무하며, <br />
              GPU 예약 시스템 최적화와 리소스 모니터링 UI 개선을 <br />
              통해 사용자 경험과 성능을 크게 향상시켰습니다. <br />
              특히 중복 예약 문제를 해결해 프로세스 효율성을 <br />
              41.66% 개선했으며, 컴포넌트 재사용과 UI 최적화를 <br />
              통해 개발 생산성을 높였습니다.
            </Typography>
          </Grid>
        </Grid>
        
        <Grid item xs={2} container flexDirection='column' gap={2}>
          <Typography variant="subtitle1" gutterBottom>
            Skills
          </Typography>
          <div>React</div>
          <div>TypeScript</div>
          <div>JavaScript</div>
          <div>ES6+</div>
          <div>CSS</div>
        </Grid>

        <Grid item xs={3} container flexDirection='column' gap={2}>
          <Typography variant="subtitle1" gutterBottom>
            Contact me
          </Typography>

          <Grid item container alignItems="center" gap={1}>
            <GitHubIcon fontSize='small' />
            <Link href="https://github.com/haeinkang/carbon-usage-monitoring" color="inherit" underline="hover">
              {'github.com/haeinkang'}
            </Link>
          </Grid>

          <Grid item container alignItems="center" gap={1}>
            <EmailIcon fontSize='small' />
            haein.kang7@gmail.com
          </Grid>

          <Grid item container alignItems="center" gap={1}>
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
  padding: 30px 0;
  background-color: var(--bg-black);
  font-size: small;
  color: #fff;

  .my-name {
    font-size: large;
    font-weight: bolder;
  }
  .job {
    color: var(--subtext-color);
  }
`;


{/* <Grid gap={10}>
          <Grid container  justifyContent="center" alignItems="flex-start" gap={2}> 
            <Avatar src={ProfileImage} sx={{ width: 70, height: 70 }} />

            <Grid container flexDirection="column" gap={2}>
              <div className='my-name'>
                Haein Kang
              </div>
              <Typography className='job' variant="caption" gutterBottom>
                저는 '월급루팡'이라는 단어를 가장 싫어하는,<br />
                주도적으로 일하는 프론트엔드 개발자입니다.<br />
                단순히 주어진 업무에만 그치지 않고,<br />
                프로젝트의 가치를 극대화할 수 있는 방법을<br />
                지속적으로 고민하며, 능동적으로 개선해 나갑니다.
              </Typography>
            </Grid>
          </Grid>
        </Grid> */}