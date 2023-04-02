import { url } from 'inspector'
import { API } from '~~/utils/useRequest'
import { getArticle } from '../api/useArticleList'

export interface getTabList {
  id: number
  weight: number
  title: string
  to?: string
  children?: Array<{
    id: number
    weight: number
    title: string
    to: string
  }>
}

export const useTabList = () => {
  return useRequest<API<Array<getTabList>>>({
    url: 'x/mierku/tab',
    method: 'GET',
  })
}
