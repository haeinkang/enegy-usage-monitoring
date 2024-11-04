import React, { useCallback, useEffect, useRef } from 'react';
import EchartsExtGmap from './EchartsExtGmap'
import Gmap from './Gmap'
import LeftPanel from '../LeftPanel'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { getAirQualData } from '../../state/airQualSlice';
import { getCoordJson } from '../../state/coordSlice';
import { getGasUsage } from '../../state/gasUsageSlice';

function EneryUsageMonitoring() {
  const dispatch = useDispatch<AppDispatch>();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
    initData();
  }, []);

  const initData = useCallback(async () => {
    dispatch(getCoordJson());
    dispatch(getAirQualData());
    dispatch(getGasUsage());
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Gmap />
    </div>
  );
}

export default EneryUsageMonitoring;