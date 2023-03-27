import { url } from 'inspector'
import { API } from '~~/utils/useRequest'
import { getArticle } from '../api/useArticleList'
export interface LinksCardItemType {
  mmid: number
  icon: string
  title: string
  desc: string
  url: string
  tag: string
}
export interface LinksCardType {
  mid: number
  title: string
  icon: string
  items: Array<LinksCardItemType>
}
export interface LinksPageDetailType {
  pid: number
  title: string
  ranme: string
  banner: string
  desc: string
  keywords: string
  lcards: Array<LinksCardType>
}

// export const getLinksPageDetail = (rname: string) => {
//   return useAsyncData<API<LinksPageDetailType>>(rname, () =>
//     useBlogFetch(`x/mierku/links/detail/${rname}`, {
//       method: 'GET',
//     })
//   )
// }
export const getLinksPageDetail = (rname: string) => {
  return useRequest<API<LinksPageDetailType>>({
    url: `x/mierku/links/detail/${rname}`,
    method: 'GET',
  })
}
