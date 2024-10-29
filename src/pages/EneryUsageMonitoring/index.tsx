import React, { useEffect, useState } from 'react';
import EchartsExtGmap from './EchartsExtGmap'
import LeftPanel from './LeftPanel'
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
    <div style={{ position: 'relative', width: '100%', height: '90vh'}}>
      <LeftPanel />
      {loading 
        ? <div>loading ... </div>
        : <EchartsExtGmap />}
    </div>
  );
}

      // <Card sx={{ position: 'absolute', zIndex: 1, minWidth: 340, top: 130, left: 20}}>
      //   <CardContent>
      //     <Typography variant="h6" component="div" gutterBottom>
      //       Top5
      //     </Typography>
      //     {/* <Top5DualChart energyUsage={energyUsage} airQualData={avgAirQualBylclgv}/> */}
      //   </CardContent>
      // </Card>
export default EneryUsageMonitoring;


//       const lclgvCoords: LclgvCoords = await api.fetchLclgvCoords();
// const convertedData: EchartMapData[] =  _(items) 
//         .filter(o => typeof lclgvCoords[o.lclgvNm] === 'object')
//         .orderBy('avgUseQnt', 'desc')
//         .map(o => {
//           const coord = lclgvCoords[o.lclgvNm];
//           return { 
//             name: o.lclgvNm,
//             value: [...coord, o.avgUseQnt] as [...GeoCoord, number]
//           } 
//         })
//         .value()


// 세 배열을 합치고 `lclgvNm`과 `rlvtYr` 기준으로 그룹화
// const res =_([...gasData, ...wtData, ...elecData])
// // .filter(item => 
// //   includes(item.lclgvNm, '경기')
// //   || includes(item.lclgvNm, '인천')
// // )
// .groupBy(item => `${item.lclgvNm}-${item.rlvtYr}`)
// .map((items) => items.reduce(
//   (acc, item) => ({ 
//     ...acc, 
//     ...item, 
//     coord: lclgvCoords[item.lclgvNm] 
//   }), {} as Partial<GasUsageByLclgv>)
// ) 
// .orderBy(item => item.gas && item.elec && item.gas + item.elec || 0, 'desc')
// .slice(0, 100)
// .filter((item) => 
//   item.gas !== undefined 
//   && item.water !== undefined 
//   && item.elec !== undefined
// ) 
// .value() as GasUsageByLclgv[]