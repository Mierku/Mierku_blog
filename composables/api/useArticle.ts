import { url } from 'inspector'
import { API } from '~~/utils/useRequest'
import { getArticle } from '../api/useArticleList'

interface articleRequest {
  url?: string
  query?: {
    aid: number
  }
  body?: {
    aid: number
    type: number
  }
  params?: {
    aid: number
    type: number
  }
}
// export const useArticle = (data: articleRequest) => {
//   const { query } = data
//   return useAsyncData<API<getArticle>>(`article_${query.aid}`, () =>
//     useBlogFetch('x/mierku/article', {
//       query,
//       method: 'GET',
//     })
//   )
// }

export const useArticle = (id: string) => {
  return useRequest<API<getArticle>>({
    url: `x/mierku/article/?aid=${id}`,
    method: 'GET',
  })
}

export const useArticleView = (data: articleRequest) => {
  const { body } = data
  return useRequest<API<getArticle>>({
    url: `x/mierku/article/type`,
    method: 'POST',
    body,
  })
}
