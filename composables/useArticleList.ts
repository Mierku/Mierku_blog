import { API } from '~~/utils/useRequest'

interface pagination {
	page: number
	limit: number
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
	udate: Date
	cdate: Date
	desc: string
	articleDoc: {
		ArticleDoc_id: number
		content: string
	}
}
export interface getArticleItem extends Omit<getArticle, 'articleDoc'> {}
interface getArticleList {
	total: number
	rows: Array<getArticleItem>
}
export const useArticleList = (params: pagination) => {
	const { page, limit } = params
	return useRequest<API<getArticleList>>({
		url: '/blog/list',
		query: {
			page,
			limit,
		},
		method: 'GET',
	})
}
