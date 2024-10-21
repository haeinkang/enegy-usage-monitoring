import React, { useEffect } from 'react';
import { getGas } from '../services'

function EneryUsageMonitoring(props: {}) {

  useEffect(() => {
    getGasUsage()
  }, [])

  const getGasUsage = async () => {
    try {
      const res = await getGas({
        pageNo: 1, // 페이지번호
        numOfRows: 10, // 한 페이지 결과 수
        returnType: 'json' // 데이터 타입        
      })
  
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
      EneryUsageMonitoring
    </div>
  );
}

export default EneryUsageMonitoring;