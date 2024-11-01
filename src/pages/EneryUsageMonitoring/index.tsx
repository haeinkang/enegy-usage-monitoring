import React, { useEffect, useState } from 'react';
import EchartsExtGmap from './EchartsExtGmap'
import LeftPanel from '../LeftPanel'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { getAirQualData } from '../../state/airQualSlice';
import { getCoordJson } from '../../state/coordSlice';
import { getGasUsage } from '../../state/gasUsageSlice';

function EneryUsageMonitoring() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true)
  
  useEffect(() => {
    initData();
  }, [])

  const initData = async () => {
    dispatch(getCoordJson());
    dispatch(getAirQualData());
    dispatch(getGasUsage());
    setLoading(false)
  }

  return (
    <div style={{ width: '100%', height: '100%'}}>
      {loading 
        ? <div>loading ... </div>
        : <EchartsExtGmap />}
    </div>
  );
}

export default EneryUsageMonitoring;