import React, { useEffect, useState } from 'react';
import * as api from '../../services'
import EchartsExtGmap from './EchartsExtGmap'
import { UsageByLclgv, Data, ConvertData, ApiResponse, ApiResponseBody, GeoCoord} from '../../types'
import _, { map } from 'lodash'


function EneryUsageMonitoring() {
  const [avgGasUsage, setAvgGasUsage] = useState<UsageByLclgv[]>([]);
  const [data, setData] = useState<Data[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [convertData, setConvertData] = useState<ConvertData[]>([]);
  const [pm10Data, setPm10] = useState<any[]>([]);

  useEffect(() => {
    getGas();
    getWtspl();
    getElec();

    getCtprvnRltmMesureDnsty()
  }, [])


  // pm10Value를 숫자로 변환하는 함수 (숫자가 아닌 값은 제외)
  const parsePm10Value = (value: string) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
  };

  const getCtprvnRltmMesureDnsty = async () => {
    try {
      const res = await api.getCtprvnRltmMesureDnsty()
      const cityDists = await api.fetchCityDists()
      const lclgvCoords  = await api.fetchLclgvCoords();

      if(res) {
        const origin = [...res.data.response.body.items]

        const groupedBySido = _(origin)
        .map(o => {
          const adr =  `${o.sidoName} ${o.stationName}` 
          return { ...o, cityDists: cityDists[adr] }
        })
        .groupBy(o => `${o.sidoName} ${o.cityDists}`)
        .value() // 

        const avg = _.map(groupedBySido, (items, key) => {
          // 유효한 pm10Value 값들만 추출
          const validPm10Values = items
            .map(item => parsePm10Value(item.pm10Value))
            .filter(value => value !== null);

          // 평균값 계산
          const avgPm10Value = _.mean(validPm10Values);

          return {
            lclgvNm: key,
            avgPm10Value: avgPm10Value || 0 // 평균값이 없으면 0으로 처리
          };
        });
        console.log(avg)

        const pm10Data = _(avg)
          .filter(o => lclgvCoords[o.lclgvNm] !== undefined)
          .map(o => {
            const coord = lclgvCoords[o.lclgvNm]
            return [...coord, o.avgPm10Value]
          })
          .value()
        
        setPm10(pm10Data)
      }

    } catch(e) {
      console.error(e)
    }
  }

  const getGas = async () => {
    try {
      const { body: { items } }: ApiResponse<ApiResponseBody> = await api.getGas()
      const lclgvCoords  = await api.fetchLclgvCoords();

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
      setData(formattedData)
      setConvertData(convertedData)
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)

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
        : <EchartsExtGmap data={convertData} pm10Data={pm10Data} />}
    </div>
  );
}

export default EneryUsageMonitoring;