<script lang="ts" setup>
import { getArticle } from '~~/composables/api/useArticleList'
import { useElementBounding } from '@vueuse/core'
const toc = ref('')
const target = ref(null)
const isVisible = ref(false)
const UList = ref<HTMLUListElement>()
const UItem = ref<HTMLLIElement>()
useIntersectionObserver(target, ([{ isIntersecting }]) => {
  isVisible.value = isIntersecting
})

const article: getArticle = inject('article')

let headIndex = 0
function slugify() {
  headIndex++
  return `heading-${headIndex}`
  // return (
  //   text
  //     .toString()
  //     .toLowerCase()
  //     .replace(/\s+/g, '-') // Replace spaces with -
  //     // .replace(/[^\w\-]+/g, '') // Remove all non-word chars
  //     .replace(/\-\-+/g, '-') // Replace multiple - with single -
  //     .trim()
  // )
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

onMounted(() => {
  const tocItems: Ref<{ anchor: string; level: number; text: string }> = inject('toc')
  toc.value = generateTOC(tocItems.value)
})
</script>
<template>
  <div ref="target" class="category-box">
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
  position: absolute;
  top: 0%;
  right: 0;
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
