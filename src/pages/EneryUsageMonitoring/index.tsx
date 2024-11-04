import React, { useCallback, useEffect, useRef } from 'react';
import EchartsExtGmap from './EchartsExtGmap'
import Gmap from './Gmap'
import LeftPanel from '../LeftPanel'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { getAirQualData } from '../../state/airQualSlice';
import { getCoordJson } from '../../state/coordSlice';
import { getGasUsage } from '../../state/gasUsageSlice';

function EneryUsageMonitoring() {
  const dispatch = useDispatch<AppDispatch>();
  const gasError = useSelector((state: RootState) => state.gasUsage.error);
  const airError = useSelector((state: RootState) => state.airQual.error);

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
    initData();
  }, []);

  useEffect(() => {
    if(gasError || airError) {
      alert(`서버에 문제가 발생했습니다. 다시 시도해주세요.${
        gasError ? `\n가스 사용량 조회 오류: ${gasError}` : ''
      }${airError ? `\n대기질 조회 오류: ${airError}` : ''
      }`);

      if(gasError) dispatch(getGasUsage());
      if(airError) dispatch(getAirQualData());
    }
  }, [gasError, airError])

  const initData = useCallback(async () => {
    dispatch(getCoordJson());
    dispatch(getGasUsage());
    dispatch(getAirQualData());
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Gmap />
      {/* <EchartsExtGmap /> */}
    </div>
  );
}

export default EneryUsageMonitoring;