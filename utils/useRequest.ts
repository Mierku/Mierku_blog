import { UseFetchOptions } from '@vueuse/core'
import { AsyncData } from 'nuxt/dist/app/composables'
export interface API<T> {
	data: T
	message: string
	code: number
}
export interface RequestOptions {
	url: string
	method?: 'GET' | 'POST'
	params?: Record<string, any>
	query?: Record<string, any>
	body?: Record<string, any>
}
interface FetchOptions extends Omit<RequestOptions, 'url'> {
	headers?: Record<string, any>
	key?: string
	baseURL?: string
	transfrom?: any
}
function transfrom(res: any) {
	const { errCode, message, data } = res
	return errCode === 0 ? data : new Error(message)
}

export async function useRequest<T>(
	options: RequestOptions
): Promise<{ data: Ref<T>; error: Ref<Error | null> }> {
	const runtimeconfig = useRuntimeConfig()
	const { url, method = 'GET', params, query, body } = options
	const baseURL = runtimeconfig.public.baseURL
	const fetchOptions: FetchOptions = {
		baseURL,
		params,
		query,
		method,
		body,
		transfrom,
	}
	if (method === 'POST') {
		fetchOptions.headers = { 'content-type': 'Application/json' }
	}

	const { data, error } = useFetch(url, fetchOptions)
	return { data, error }
}
