import { API } from '~~/utils/useRequest'

interface pagination {
  page: number
  limit: number
  wts: number
  type: number
}
export interface Author {
  ufid: number
  name: string
  avatar: string
}
export interface getArticle {
  aid: number
  title: string
  cover: string
  author: Author
  tags: Array<{
    name: string
  }>
  stat?: {
    view: number
    like: number
    replay: number
    share: number
    collect: number
  }
  udate: string
  cdate: string
  desc: string
  content: string
}
export interface getArticleItem extends Omit<getArticle, 'articleDoc'> {}
interface getArticleList {
  count: number
  rows: Array<getArticleItem>
}
// export const useArticleList = (params: pagination) => {
// 	const { page, limit } = params
// 	return useRequest<API<getArticleList>>({
// 		url: '/x/mierku/blog/list',
// 		query: {
// 			page,
// 			limit,
// 		},
// 		method: 'GET',
// 	})
// }
// export const useArticleList = (params: pagination) => {
//   const { page, limit } = params
//   const wts = Date.now()
//   return useAsyncData<API<getArticleList>>('homeArticleList', () =>
//     useBlogFetch('x/mierku/article/list', {
//       query: {
//         page,
//         limit,
//         wts,
//       },
//       method: 'GET',
//     })
//   )
// }
// export const useArticleList = (params: pagination) => {
//   const { page, limit } = params
//   const wts = Date.now()
//   return useFetch<API<getArticleList>>(
//     useBlogFetch('x/mierku/article/list', {
//       query: {
//         page,
//         limit,
//         wts,
//       },
//       method: 'GET',
//     })
//   )
// }
export interface timeLineChild {
  aid: number
  cdate: string
  title: string
}
interface MonthMap {
  month: number
  children: Array<timeLineChild>
}
export interface TimeLineItem {
  year: number
  rows: Array<MonthMap>
}
export const useArticleList = (params: pagination) => {
  const { page, limit, wts, type } = params
  return useRequest<API<getArticleList>>({
    url: 'x/mierku/article/list',
    query: {
      type,
      page,
      limit,
      wts,
    },
    method: 'GET',
  })
}
export const useTimeLine = () => {
  return useRequest<API<Array<TimeLineItem>>>({
    url: '/x/mierku/article/timeline',
    method: 'GET',
  })
}
