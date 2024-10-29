import React, { useEffect, useState } from 'react';
import * as api from '../../services'
import EchartsExtGmap from './EchartsExtGmap'
import Top5DualChart from './Top5DualChart'
import LeftPanel from '../../components/LeftPanel'
import { AirQualByRegMerics, LclgvCoords, EnergyUsageByLclgv, AirQualByLclgvNumeric} from '../../types'
import _, { map, find, includes, meanBy } from 'lodash'
import { Card, CardContent, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { getAirQualData } from '../../state/airQualSlice';

function EneryUsageMonitoring() {
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState<boolean>(true)
  const [energyUsage, setEnergyUsage] = useState<EnergyUsageByLclgv[]>([]);
  const [avgAirQualBylclgv, setAvgAirQualBylclgv] = useState<AirQualByLclgvNumeric[]>([]);
  
  useEffect(() => {
    initData();
    dispatch(getAirQualData());
  }, [])

  const initData = async () => {
    await getEnergyUsageByLclgv();
    // await getCtprvnRltmMesureDnsty()
    setLoading(false)
  }
  

  const getCtprvnRltmMesureDnsty = async () => {
    try {
      const { response: { body: { items } }} = await api.getCtprvnRltmMesureDnsty()
      const cityDists = await api.fetchCityDists()
      const lclgvCoords  = await api.fetchLclgvCoords();

      const avgAirQualBylclgv: AirQualByLclgvNumeric[] = _(items)
        // 지자체명으로 groupBy 
        // ex) 서울 학동로 -> 서울 강남구
        .groupBy(o => {
          const adr =  `${o.sidoName} ${o.stationName}` 
          const districts = cityDists[adr] // 지자체명 맵핑
          return `${o.sidoName} ${districts}`
        })
        // 각 지자체의 대기질 지표별 평균값 계산
        .map((items, lclgvNm) => {      
          /** 평균을 구하고자 하는 대기질 측정 지표 리스트 */
          const metrics: AirQualByRegMerics = _(items[0])
            .keys() 
            .filter((metric) => 
              metric !== 'sidoName' 
              && metric !== 'stationName'
              && metric !== 'mangName'
              && metric !== 'dataTime'
            )
            .value() as AirQualByRegMerics;

          /** 각 지자체별 평균값을 가진 새로운 객체 생성 */
          const averageValues = _.reduce(metrics, (acc, key) => {
            return { 
              ...acc, 
              [key]: _.meanBy(items, o => parseFloat(o[key]) || 0)
            }
          }, {});  

          return {
            lclgvNm,
            coord: lclgvCoords[lclgvNm],
            ...averageValues
          } as AirQualByLclgvNumeric

        })
        .value()
      
        setAvgAirQualBylclgv(avgAirQualBylclgv)
      
    } catch(e) {
      console.error(e)
    }
  }

  const getEnergyUsageByLclgv = async () => {
    try {
      const [gasRes, wtRes, elecRes] = await Promise.all([getGas(), getWtspl(), getElec()]);
      const lclgvCoords: LclgvCoords = await api.fetchLclgvCoords();
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