import { API } from '~~/utils/useRequest'
import { getArticle } from './useArticleList'

interface articleRequest {
	url?: string
	query: {
		aid: number
	}
}
export const useArticle = (params: articleRequest) => {
	const { query } = params
	return useRequest<API<getArticle>>({
		url: '/blog',
		query,
		method: 'GET',
	})
}
