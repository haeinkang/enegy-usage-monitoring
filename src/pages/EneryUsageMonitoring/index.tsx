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

  useEffect(() => {
    getGas();
    getWtspl();
    getElec();
  }, [])

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
        : <EchartsExtGmap data={convertData} />}
    </div>
  );
}

export default EneryUsageMonitoring;