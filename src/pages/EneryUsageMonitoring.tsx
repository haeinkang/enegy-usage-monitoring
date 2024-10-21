import React from 'react';
import { getGas } from '../services'

function EneryUsageMonitoring(props: {}) {

  const getGasUsage = async () => {
    try {
      const res = await getGas({
        serviceKey: 'voTG9o2PZYGCXMPiqf8ntRz+Qwh4i6WrBpmnRy73Aw+hVwSsoOuUHvt7DUvcVpNMpbCJtbi4O1EukuIDLGfGqA==', 
        pageNo: 1, // 페이지번호
        numOfRows: 10, // 한 페이지 결과 수
        // rlvtYr: '', // 해당 년 
        // lclgvNm: '', // 지자체명
        returnType: 'json' // 데이터 타입        
      })
  
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }


  getGasUsage()

  return (
    <div>
      EneryUsageMonitoring
    </div>
  );
}

export default EneryUsageMonitoring;