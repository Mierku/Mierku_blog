import { url } from 'inspector'
import { API } from '~~/utils/useRequest'
import { getArticle } from '../api/useArticleList'

export interface LolRequest {
  limit: number
  wts: number
}
export interface getLolList {
  rows: Array<getLolItem>
  total: number
}
export interface getLolItem {
  pour: {
    id: number
    isTop: boolean
    content: string
    cdate: string
  }
  author: {
    ufid: string
    name: string
    avatar: string
  }
}
// export const useLollist = (body: LolRequest) => {
//   return useRequest<API<getLolList>>({
//     url: 'x/mierku/lol/list',
//     body,
//     method: 'POST',
//   })
// }
export const useLollist = (body: LolRequest) => {
  const baseURL = useRuntimeConfig().public.baseURL
  return $fetch<API<getLolList>>('x/mierku/lol/list', {
    body,
    baseURL,
    method: 'POST',
  })
}
