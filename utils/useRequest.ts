import { UseFetchOptions } from '@vueuse/core'
import { url } from 'inspector'
import { AsyncData } from 'nuxt/dist/app/composables'
import { Base } from '~~/.nuxt/components'
export interface API<T> {
  data: T
  message: string
  code: number
}
export interface RequestOptions1 {
  url: string
  method?: 'GET' | 'get' | Ref<'GET' | 'get'> | 'POST' | 'post'
  params?: Record<string, any>
  query?: Record<string, any>
  body?: Record<string, any>
  key?: string
  lazy?: boolean
  server?: boolean
}

export interface RequestOptions2 {
  url: string
  method?:
    | 'GET'
    | 'get'
    | 'POST'
    | 'post'
    | 'HEAD'
    | 'PATCH'
    | 'PUT'
    | 'DELETE'
    | 'CONNECT'
    | 'OPTIONS'
    | 'TRACE'
    | 'head'
    | 'patch'
    | 'put'
    | 'delete'
    | 'connect'
    | 'options'
    | 'trace'
  params?: Record<string, any>
  query?: Record<string, any>
  body?: Record<string, any>
  credentials?: 'include' | 'omit' | 'same-origin'
}
interface FetchOptions extends Omit<RequestOptions1, 'url'> {
  headers?: Record<string, any>
  key?: string
  baseURL?: string
  transfrom?: any
  lazy?: boolean
  server?: boolean
}

// export const useBlogFetch = $fetch.create({ baseURL: 'http://127.0.0.1:4400' })
export async function useRequest<T>(options: RequestOptions1): Promise<{ data: Ref<T>; error: Ref<Error | null> }> {
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

interface CSROptions {
  body: Record<string, any>
  baseURL: string
  method: 'GET' | 'get' | Ref<'GET' | 'get'> | 'POST' | 'post'
}
export async function useFetchReq<T>(options: RequestOptions2): Promise<T> {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.public.baseURL
  const { url, ...others } = options
  return $fetch(url, { ...others, baseURL })
}
