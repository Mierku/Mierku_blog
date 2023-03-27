import { createInjectionState } from '@vueuse/shared'
import { getArticle } from './api/useArticleList'

const [useProvideArticleStore, useArticleStore] = createInjectionState((initArticle: getArticle) => {
  // state
  const article = ref(initArticle)

  // getters
  const getArticle = computed(() => article.value)

  // actions
  function increment(data: getArticle) {
    Object.assign(article.value, data)
  }
  return { article, getArticle, increment }
})
export { useProvideArticleStore }
// If you want to hide `useCounterStore` and wrap it in default value logic or throw error logic, please don't export `useCounterStore`
export { useArticleStore }
