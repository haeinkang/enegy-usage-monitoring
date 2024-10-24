import React, { useEffect, useState } from 'react';
import * as api from '../../services'
import EchartsExtGmap from './EchartsExtGmap'
import { UsageByLclgv, Data, ConvertData, ApiResponse, ApiResponseBody, GeoCoord} from '../../types'
import _, { map } from 'lodash'
// import SidoCoords from '../../../public/json/sido-coords.json'
const sidoCoords: { [key: string]: [number, number] } = {
  "충남": [126.832020, 36.518376],
  "세종": [127.289261, 36.480351],
  "강원": [128.213223, 37.830307],
  "충북": [127.491352, 36.635860],
  "전북": [127.108759, 35.820466],
  "경북": [128.729671, 36.576032],
  "인천": [126.705206, 37.456256],
  "경기": [127.009217, 37.274869],
  "경남": [128.256732, 35.238324],
  "울산": [129.311430, 35.538377],
  "광주": [126.851338, 35.160032],
  "전남": [126.705974, 34.816073],
  "제주": [126.498302, 33.488962],
  "대구": [128.601445, 35.871409],
  "대전": [127.385002, 36.350439],
  "서울": [126.978388, 37.566610],
  "부산": [129.075641, 35.179554]
} 


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
      console.log(res)
      if(res) {
        const origin = [...res.data.response.body.items]

        const groupedBySido = _.groupBy(origin, 'sidoName'); // sidoName으로 그룹화

        const avg = _.map(groupedBySido, (items, sidoName) => {
          // 유효한 pm10Value 값들만 추출
          const validPm10Values = items
            .map(item => parsePm10Value(item.pm10Value))
            .filter(value => value !== null);

          // 평균값 계산
          const avgPm10Value = _.mean(validPm10Values);

          return {
            sidoName,
            avgPm10Value: avgPm10Value || 0 // 평균값이 없으면 0으로 처리
          };
        });
        console.log(avg)

        const pm10Data = _(avg)
          .map(o => {
            const coord = sidoCoords[o.sidoName]
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