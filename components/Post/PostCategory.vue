<script lang="ts" setup>
import { marked } from 'marked'
import { getArticle } from '~~/composables/api/useArticleList'
import { UseScrollReturn } from '@vueuse/core'
import { vScroll } from '@vueuse/components'
import { vIntersectionObserver } from '@vueuse/components'
interface tocItem {
  anchor: string
  level: number
  text: string
}
const toc = ref('')
const target = ref(null)
const isVisible = ref(false)
const UList = ref<HTMLUListElement>()
const UItem = ref<HTMLLIElement>()
const tocItems = ref<Array<tocItem>>([])
useIntersectionObserver(target, ([{ isIntersecting }]) => {
  isVisible.value = isIntersecting
})
const article: getArticle = inject('article')
const tocIndex: Ref<number> = inject('toc')
function slugify(text) {
  console.log(text)
  return (
    text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      // .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .trim()
  )
}

function generateTOC(items) {
  let html = ''
  let lastLevel = 0

  items.forEach((item) => {
    if (item.level > lastLevel) {
      html += '<ul >'
    } else if (item.level < lastLevel) {
      html += '</li></ul>'.repeat(lastLevel - item.level)
    } else {
      html += '</li>'
    }

    html += `<li><a href="#${item.anchor}">${item.text}</a>`

    lastLevel = item.level
  })

  if (lastLevel > 0) {
    html += '</li></ul>'.repeat(lastLevel)
  }

  return html
}
function getLiDom() {}
onMounted(() => {
  const renderer = new marked.Renderer()

  // Override the `heading` method to add TOC entries
  renderer.heading = (text, level, raw) => {
    console.log(raw)
    const anchor = slugify(raw)
    console.log(anchor)
    tocItems.value.push({ anchor, level, text })
    console.log(tocItems)
    return `<h${level} id="${anchor}">${text}</h${level}>`
  }
  const tokens = marked.lexer(article.content)
  const html = marked.parser(tokens, { renderer })
  toc.value = generateTOC(tocItems.value)
})
</script>
<template>
  <div class="category-box" ref="target">
    <div :class="['category', isVisible ? '' : 'fixed']">
      <div class="title-wrapper">
        <span class="title">目录</span>
      </div>
      <div class="toc" v-html="toc"></div>
    </div>
  </div>
</template>
<style lang="scss">
.category-box {
  padding-top: 64px;
  width: 300px;
  height: fit-content;
  position: relative;
  flex: content;
}
.category {
  padding: 6px 12px;
  width: 300px;
  height: fit-content;
  border-radius: 12px;
  background: rgba(25, 25, 25, 0.4);
  &.fixed {
    animation: fade-in ease-in 0.4s 1;
    position: fixed;
    top: 64px;
  }
  .title-wrapper {
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid rgba(147, 147, 147, 0.2);
    margin-bottom: 8px;
    .title {
      color: aliceblue;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
.toc {
  height: fit-content;
  ul {
    height: auto;
    a {
      height: 40px;
      line-height: 40px;
    }
  }
  li {
    li {
      font-size: 15px;
      text-indent: 1em;
    }
    &.active > a {
      color: rgb(28, 235, 200, 1);
    }
  }
}

.anchor {
  position: absolute;
  /*控制距离顶部 100px*/
  top: -100px;
  visibility: hidden;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
