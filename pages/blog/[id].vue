<script lang="ts" setup>
import hljs from 'highlight.js'
import { marked } from 'marked'
import { useArticle, useArticleView } from '~~/composables/api/useArticle'

import { API } from '~~/utils/useRequest'
//引入marked解析模块 与 代码高亮插件 以及对应的样式文件
let headers
const tocIndex = ref<number>()
const array = ref<Array<number>>([])
const { params } = useRoute()
const Router = useRouter()
const options = {
  query: { aid: +params.id },
  body: { aid: +params.id, type: 0 },
}
// const { data } = await useArticle(options)
// articleData = data.value.data

// if (!data.value) {
// 	throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
// }
// // const { data } = await useArticle(options)
// 文章数据获取
// const { data } = await useAsyncData<API<getArticle>>(`article/${params.id}`, () =>
//   $fetch(`http://127.0.0.1:4400/x/mierku/article/?aid=${params.id}`)
// )
// 改动
const { data } = await useArticle(params.id.toString())

if (!data.value) {
  console.log('跳转')
  Router.replace('/')
}
// 文章右侧高亮
const throttledFn = useThrottleFn(() => {
  nextTick(() => {
    // do something, it will be called at most 1 time per second
    const nodeList: Array<Element> = Array.from(headers)
    array.value = Array.from({ length: nodeList.length }) // 开辟空间
    for (let i = 0; i < array.value.length; i++) {
      const top = nodeList[i].getBoundingClientRect().top
      array.value[i] = Math.abs(top)
    }
    const { index } = useMin(array.value)
    tocIndex.value = index.value
    nextTick(() => {
      const UItem = document.querySelectorAll('.toc li')
      UItem.forEach((item, index) => {
        item.classList.remove('active')
        if (tocIndex.value === index) {
          item.classList.add('active')
        }
      })
    })
  })
}, 100)
// 页面浏览量
await useArticleView(options)
  .then((res) => {
    console.log('文章浏览量加一')
  })
  .catch((err) => {
    console.log('文章浏览量加一失败')
  })
const article = data.value.data

onMounted(() => {
  nextTick(() => {
    headers = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4 ')
    window.addEventListener('scroll', throttledFn)
    // 观看超过5s 记录一次pv
  })
})
provide('article', article)
provide('toc', tocIndex)
</script>

<template>
  <NuxtLayout>
    <main>
      <div class="site-banner">
        <img src="http://localhost:3000/image/70827348_p0.jpg" alt="" />
      </div>
      <div class="site-content">
        <div class></div>
        <div class="post-content">
          <PostContent></PostContent>
          <PostCategory></PostCategory>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
main {
  overflow-x: hidden;
  width: 100%;
  color: white;
  min-height: 100vh;
}
.site-banner {
  width: 100%;
  height: 400px;
  position: relative;
  h1 {
    position: absolute;
    bottom: 10px;
  }
}
img {
  width: 100%;
  height: inherit;
  object-fit: cover;
}
.site-content {
  display: flex;
  justify-content: center;
  .post-content {
    width: 1440px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
