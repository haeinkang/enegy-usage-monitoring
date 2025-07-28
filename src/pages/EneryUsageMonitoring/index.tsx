import React, { useCallback, useEffect, useRef } from 'react';
import MapChart from './MapChart'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { getEnergyAirData } from '../../state/gasUsageSlice';

function EneryUsageMonitoring() {
  const dispatch = useDispatch<AppDispatch>();
  const apiError = useSelector((state: RootState) => state.gasUsage.apiError);

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
    initData();
  }, []);

  useEffect(() => {
    if(apiError) {
      alert('서버에 문제가 발생했습니다. 다시 시도해주세요.');
      dispatch(getEnergyAirData());
    }
  }, [apiError])

  const initData = useCallback(async () => {
    dispatch(getEnergyAirData())
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MapChart />
    </div>
  );
}

export default EneryUsageMonitoring;