import { API } from '~~/utils/useRequest'

interface WebRecord {
  pv: number
  uv: number
}
export const recordPV = () => {
  return useFetchReq({ url: '/web/x', method: 'GET' })
}
export const recordUV = () => {
  return useFetchReq({ url: '/web/z', method: 'GET', credentials: 'include' })
}
export const getWebRecord = () => {
  return useRequest<API<WebRecord>>({ url: '/web/pv_uv', method: 'GET' })
}
