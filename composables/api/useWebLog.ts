import { API } from '~~/utils/useRequest'

interface WebRecord {
  pv: number
  uv: number
}
export const recordPV = () => {
  // return useAsyncData('pv', () => $fetch('http://127.0.0.1:4400/web/x', { credentials: 'include' }))
  return useFetchReq({ url: '/web/x', method: 'GET' })
}
export const recordUV = () => {
  return useFetchReq({ url: '/web/z', method: 'GET' })
}
export const getWebRecord = () => {
  return useRequest<API<WebRecord>>({ url: '/web/pv_uv', method: 'GET' })
}
