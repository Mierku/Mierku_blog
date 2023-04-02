import { API } from '~~/utils/useRequest'

export interface zhanzInfo {
  name: string
  sgn: string
  avatar: string
}
export const getZhanZ = () => {
  return useRequest<API<zhanzInfo>>({
    url: 'user/zhanz',
    method: 'GET',
  })
}
