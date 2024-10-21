import React, { useEffect } from 'react';
import * as api from '../../services'

function EneryUsageMonitoring() {

  useEffect(() => {
    getGas();
    getWtspl();
    getElec();
  }, [])

  const getGas = async () => {
    try {
      const res = await api.getGas({
        pageNo: 1, // 페이지번호
        numOfRows: 191, // 한 페이지 결과 수     
      })
  
    } catch (error) {
      console.error(error);
    }
  }

  const getWtspl = async () => {
    try {
      const res = await api.getWtspl({
        pageNo: 1, // 페이지번호
        numOfRows: 205, // 한 페이지 결과 수     
      })
  
    } catch (error) {
      console.error(error);
    }
  }
  const getElec = async () => {
    try {
      const res = await api.getElec({
        pageNo: 1, // 페이지번호
        numOfRows: 208, // 한 페이지 결과 수     
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