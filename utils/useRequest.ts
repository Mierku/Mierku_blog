import { UseFetchOptions } from '@vueuse/core'
import { AsyncData } from 'nuxt/dist/app/composables'
import { Base } from '~~/.nuxt/components'
export interface API<T> {
  data: T
  message: string
  code: number
}
export interface RequestOptions {
  url: string
  method?: 'GET' | 'get' | Ref<'GET' | 'get'> | 'POST' | 'post'
  params?: Record<string, any>
  query?: Record<string, any>
  body?: Record<string, any>
  key?: string
  lazy?: boolean
  server?: boolean
}
interface FetchOptions extends Omit<RequestOptions, 'url'> {
  headers?: Record<string, any>
  key?: string
  baseURL?: string
  transfrom?: any
  lazy?: boolean
  server?: boolean
}

// export const useBlogFetch = $fetch.create({ baseURL: 'http://127.0.0.1:4400' })
export async function useRequest<T>(options: RequestOptions): Promise<{ data: Ref<T>; error: Ref<Error | null> }> {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.public.baseURL
  const { url, method = 'GET', params, query, body, key, lazy, server } = options
  const fetchOptions: FetchOptions = { method, params, query, body, baseURL, key, lazy, server }
  if (method === 'POST') {
    fetchOptions.headers = { 'content-type': 'Application/json' }
  }

  const { data, error } = await useFetch<T>(url, fetchOptions)

  return { data, error }
}
