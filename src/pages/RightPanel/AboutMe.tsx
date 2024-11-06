import React from 'react';
import { Grid, Link, Typography } from '@mui/material';
import styled from 'styled-components';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import profileImage from '../../assets/img/profile.jpg'; 

const AboutMe = () => {
  return (
      <Grid 
        container 
        flexDirection='column' 
        justifyContent='flex-start' 
        alignItems='flex-start'
        gap={4}
      >
        
        <ProfileContainer>
          <Profile>
            <img src={profileImage} alt="Haein Kang" />
          </Profile >
          <Grid item container alignItems='flex-end' justifyContent='center' gap={1}>
            <Typography variant='h5' fontWeight={700}>Haein Kang</Typography>
            <Typography variant='subtitle1'>강해인</Typography>
          </Grid>
        </ProfileContainer>

        <Grid item container flexDirection='column' gap={1} mt={2}>
          <Typography variant="h6" fontWeight={700}>
            Career
          </Typography>

          <Grid item container flexDirection="column" gap={1}>
            <Typography variant='body1' fontWeight={700}>
              Xiilab (경력 4년, 2019.11 - 2023.11) 
            </Typography>
            <Typography variant="body1" gutterBottom>
              저는 AI 머신러닝을 위한 GPU 관리 솔루션을 제공하는
              AI 기업에서 프론트엔드 개발자로 근무하며,
              GPU 예약 시스템 최적화와 리소스 모니터링 UI 개선을
              통해 사용자 경험과 성능을 크게 향상시켰습니다.
              특히 중복 예약 문제를 해결해 프로세스 효율성을 개선했으며, 
              컴포넌트 재사용과 UI 최적화를 통해 개발 생산성을 높였습니다.
            </Typography>
          </Grid>
        </Grid>
        <Grid item container flexDirection='column' gap={1}>
          <Typography variant="h6" fontWeight={700}>
            Skills
          </Typography>
          <Grid container gap={1.5}>
            <Tag>React</Tag>
            <Tag>TypeScript</Tag>
            <Tag>JavaScript</Tag>
            <Tag>ES6+</Tag>
            <Tag>CSS</Tag>
          </Grid>
        </Grid>

        <Grid item  container flexDirection='column' gap={1}>
          <Typography variant="h6" fontWeight={700}>
            Repository
          </Typography>

          <Grid item container flexWrap='nowrap' alignItems="center" gap={1}>
            <Grid item>
              <GitHubIcon fontSize='small' />
            </Grid>
            <Grid 
              item 
              flexGrow={1} 
              sx={{ 
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap', 
              }}
            >
              <Link 
                href="https://github.com/haeinkang/enegy-usage-monitoring" 
                color="inherit" 
                underline="hover"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {'github.com/haeinkang/enegy-usage-monitoring'}
              </Link>
            </Grid>
          </Grid>
        </Grid>


        <Grid item  container flexDirection='column' gap={2}>
          <Typography variant="h6" fontWeight={700}>
            Contact me
          </Typography>
          <Grid item container alignItems="center" gap={1}>
            <EmailIcon fontSize='small' />
            haein.kang7@gmail.com
          </Grid>
        </Grid>
      </Grid>
  );
};

export default AboutMe;


const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* height가 600px 이하일 때 숨김 처리 */
  @media (max-height: 600px) {
    display: none;
  }
`;

const Profile = styled.div`
  width: 180px;
  height: 180px;
  margin-bottom: 20px;
  border-radius: 100px;
  overflow: hidden;
  boder: solid 1px var(--joy-palette-neutral-500);
  img { 
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지를 빈틈없이 꽉 채우도록 설정 */
  }
`;

const Tag = styled.div`
  width: fit-content;
  padding: 1px 5px;
  border-radius: 3px;
  background: #fff;
  color: #000;
  font-size: .9rem;
`