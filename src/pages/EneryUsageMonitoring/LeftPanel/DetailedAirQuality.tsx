import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

function DetailedAirQuality() {
  const lclgvNm = useSelector((state: RootState) => state.airQual.selected);

  return (
    <div>
      {lclgvNm}
    </div>
  );
}

export default DetailedAirQuality;