import { API } from '~~/utils/useRequest'

interface RandomPic {
	pid: number
	p: number
	uid: number
	title: string
	author: string
	r18: false
	width: number
	height: number
	tags: []
	ext: string // 格式
	aiType: number // 是否是AI
	uploadDate: number // 上传时间戳
	urls: {
		small: string
	}
}
export const useHomeRandomPic = () => {
	return useAsyncData<API<Array<RandomPic>>>('RandomPic', () =>
		$fetch('https://api.lolicon.app/setu/v2', {
			query: {
				r18: false,
				uid: ['10710834', '6342480', '24594'],
				size: 'small',
				num: 4,
			},
			method: 'GET',
		})
	)
}
