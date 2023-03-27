import { API } from '~~/utils/useRequest'

interface WebRecord {
  pv: number
  uv: number
}
export const recordPV = () => {
  // return useAsyncData('pv', () => $fetch('http://127.0.0.1:4400/web/x', { credentials: 'include' }))
  return useRequest({ url: '/web/x', method: 'GET' })
}
export const recordIP = () => {
  return useRequest({ url: '/web/y', method: 'GET' })
}
export const recordUV = () => {
  return useRequest({ url: '/web/z', method: 'GET' })
}
export const getWebRecord = () => {
  return useRequest<API<WebRecord>>({ url: '/web/pv_uv', method: 'GET' })
}
