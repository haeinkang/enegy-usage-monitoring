import React, { useEffect, useState } from 'react';
import * as api from '../../services'
import EchartsExtGmap from './EchartsExtGmap'
import { AirQualByRegMerics, AirQualByRegion, LclgvCoords, UsageByLclgv, ConvertData, GeoCoord, EnerygyUsageApiRes, AirQualByLclgvNumeric} from '../../types'
import _, { map } from 'lodash'
import { stringToFloat } from '../../utils'

function EneryUsageMonitoring() {
  const [loading, setLoading] = useState<boolean>(false)

  const [avgGasUsage, setAvgGasUsage] = useState<UsageByLclgv[]>([]);
  const [convertData, setConvertData] = useState<ConvertData[]>([]);


  const [avgAirQualBylclgv, setAvgAirQualBylclgv] = useState<AirQualByLclgvNumeric[]>([]);
  useEffect(() => {
    getGas();
    getWtspl();
    getElec();

    getCtprvnRltmMesureDnsty()
  }, [])
  

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

          const coord = lclgvCoords[lclgvNm];
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

  const getGas = async () => {
    try {
      const { body: { items } }: EnerygyUsageApiRes = await api.getGas()
      const lclgvCoords: LclgvCoords = await api.fetchLclgvCoords();

      const formattedData = map(items, o => ({
        name: o.lclgvNm, 
        value: o.avgUseQnt
      }))

      const convertedData: ConvertData[] =  _(items) 
        .filter(o => typeof lclgvCoords[o.lclgvNm] === 'object')
        .orderBy('avgUseQnt', 'desc')
        .map(o => {
          const coord = lclgvCoords[o.lclgvNm];
          return { 
            name: o.lclgvNm,
            value: [...coord, o.avgUseQnt] as [...GeoCoord, number]
          } 
        })
        .value()
      
      setAvgGasUsage(items)
      setConvertData(convertedData)
    } catch (error) {
      console.error(error);
    }
  }

  const getWtspl = async () => {
    try {
      const res = await api.getWtspl()
  
    } catch (error) {
      console.error(error);
    }
  }
  const getElec = async () => {
    try {
      const res = await api.getElec()
  
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ width: '100%', height: '80vh'}}>
      {loading 
        ? <div>loading ... </div>
        : <EchartsExtGmap data={convertData} airQualData={avgAirQualBylclgv} />}
    </div>
  );
}

export default EneryUsageMonitoring;