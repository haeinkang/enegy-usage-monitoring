import React, { useEffect, useState } from 'react';
import * as api from '../../services'
import EchartsExtGmap from './EchartsExtGmap'
import Top5DualChart from './Top5DualChart'
import LeftPanel from '../../components/LeftPanel'
import { AirQualByRegMerics, LclgvCoords, EnergyUsageByLclgv, AirQualByLclgvNumeric} from '../../types'
import _, { map, find, includes, meanBy } from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { getAirQualData } from '../../state/airQualSlice';
import { getCoordJson } from '../../state/coordSlice';

function EneryUsageMonitoring() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true)
  const [energyUsage, setEnergyUsage] = useState<EnergyUsageByLclgv[]>([]);
  
  useEffect(() => {
    initData();

  }, [])

  const initData = async () => {
    dispatch(getCoordJson());
    dispatch(getAirQualData());
    // await getEnergyUsageByLclgv();
    setLoading(false)
  }
  
  const getEnergyUsageByLclgv = async () => {
    try {
      const [gasRes, wtRes, elecRes] = await Promise.all([getGas(), getWtspl(), getElec()]);
      const sidoCoords  = await api.fetchSidoCoords();

      const gasData = _(gasRes)
        .groupBy(item => item.lclgvNm.split(' ')[0])
        .map((items, city) => ({
          lclgvNm: city,
          gas: Math.round(meanBy(items, 'avgUseQnt') * 10) / 10
        }))
        .value()

      const elecData = _(elecRes)
        .groupBy(item => item.lclgvNm.split(' ')[0])
        .map((items, city) => ({
          lclgvNm: city,
          elec: Math.round(meanBy(items, 'avgUseQnt') * 10) / 10
        }))
        .value()
        

      const res =_([...gasData, ...elecData])
        .groupBy(item => item.lclgvNm)
        .map((items) => items.reduce(
          (acc, item) => ({ 
            ...acc, 
            ...item, 
            coord: sidoCoords[item.lclgvNm] 
          }), {})
        ) 
        .value() as EnergyUsageByLclgv[]

      console.log(res)

      setEnergyUsage(res)

    } catch(e) {

    }
  }

  const getGas = async () => {
    try {
      const res = await api.getGas();
      return res.body.items;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const getWtspl = async () => {
    try {
      const res = await api.getWtspl()
      return res.body.items;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  const getElec = async () => {
    try {
      const res = await api.getElec()
      return res.body.items;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '90vh'}}>
      <LeftPanel energyUsage={energyUsage} />
      {loading 
        ? <div>loading ... </div>
        : <EchartsExtGmap energyUsage={energyUsage} />}
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
// const convertedData: ConvertData[] =  _(items) 
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
//   }), {} as Partial<EnergyUsageByLclgv>)
// ) 
// .orderBy(item => item.gas && item.elec && item.gas + item.elec || 0, 'desc')
// .slice(0, 100)
// .filter((item) => 
//   item.gas !== undefined 
//   && item.water !== undefined 
//   && item.elec !== undefined
// ) 
// .value() as EnergyUsageByLclgv[]