# 지자체별 가스 사용량 및 대기질 모니터링
'지자체별 가스 사용량 및 대기질 모니터링' 프로젝트는 대한민국 지자체별 가스 사용량을 지도 상에 동그라미 마커로 표시하여, 시각적으로 각 지역의 가스 사용 현황을 한눈에 확인할 수 있게 합니다. 사용자는 특정 지자체를 클릭하여 해당 지역의 통합대기환경 정보와 주요 대기오염 수치를 상세하게 조회할 수 있으며, 이를 통해 가스 사용량과 대기오염 사이의 상관관계를 직관적으로 파악할 수 있습니다.

https://github.com/user-attachments/assets/9b62000a-4228-4f86-94e4-795eac20b560


## 주요 기능
- **가스 사용량 표시**: 대한민국 지자체별 가스 사용량을 동그라미 마커로 시각화하여 지도 상에 표시합니다. 마커의 크기는 사용량에 비례하여 조절됩니다.
- **대기환경 정보 출력**:
  특정 지자체를 클릭 시 해당 지역의 대기환경 관련 정보를 팝업으로 제공합니다.
  - 통합대기환경 지수
  - 통합대기환경 수치
  - 미세먼지(PM10)
  - 초미세먼지(PM2.5)
  - 일산화탄소(CO)
  - 이산화질소(NO₂)
  - 아황산가스(SO₂)
  - 오존지수(O₃)
    
# 사용 기술
- **Frontend**: React, TypeScript, ES6+, HTML, CSS
- **Library**:
  - mui-material (v5.16.7)
  - reduxjs/toolkit (v2.3.0)
  - axios (v1.7.7)
  - lodash (v4.17.21)
  - react-router-dom (v6.27.0)
  - styled-components (v6.1.13)
- **Data Visualization**:
  - echarts (v5.5.1)
    데이터 시각화 라이브러리로, 그래프와 차트를 사용하여 대기오염 데이터를 시각적으로 표현
  - react-google-maps (v1.3.0)
    Google Maps API와 React를 통합하여 지도 기반 UI 제공
  - echarts-extension-gmap (v1.7.0)
    	Google Maps 위에 Echarts 데이터를 시각화하여 지자체별 가스 사용량 정보 표시
- **API**:
  - [공공 데이터 포털](https://www.data.go.kr/index.do)
