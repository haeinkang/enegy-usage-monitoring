import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

function App() {

  const getGas = async () => {
    try {
      const response = await axios.get(
        `/getGas`, 
        {
          params: {
            serviceKey: 'voTG9o2PZYGCXMPiqf8ntRz+Qwh4i6WrBpmnRy73Aw+hVwSsoOuUHvt7DUvcVpNMpbCJtbi4O1EukuIDLGfGqA==', 
            pageNo: 1, // 페이지번호
            numOfRows: 10, // 한 페이지 결과 수
            // rlvtYr: '', // 해당 년 
            // lclgvNm: '', // 지자체명
            returnType: 'json' // 데이터 타입
          }
        }
      );

      // const response = await axios.get('https://apis.data.go.kr/B552584/kecoapi/cpointEnrgUsqntStatsService/getGas?serviceKey=voTG9o2PZYGCXMPiqf8ntRz%2BQwh4i6WrBpmnRy73Aw%2BhVwSsoOuUHvt7DUvcVpNMpbCJtbi4O1EukuIDLGfGqA%3D%3D&pageNo=1&numOfRows=3&returnType=json')
      console.log('222')
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }


  getGas()


  return (
    <div className="App">
      탄소 사용량 모니터링
    </div>
  );
}

export default App;