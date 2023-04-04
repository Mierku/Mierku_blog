<script lang="ts" setup>
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/scss/tokyo-night-dark.scss' // 引入高亮样式 这里我用的是sublime样式
import { getArticle, getArticleItem, useArticleList } from '~~/composables/api/useArticleList'
import PostCard from '@/components/Post/PostCard.vue'
import dayjs from 'dayjs'
const params = reactive({
  page: 1,
  limit: 3,
  wts: 0,
  type: 1,
})
const markdownToHtml = ref('')
const article: getArticle = inject('article')
//基本配置与代码高亮配置
const content: string = inject('articleDoc')

// const markdownToHtml =
const cdate = dayjs(article.cdate).format('YYYY-MM-DD HH:mm:ss')
const { data: getArticleList } = await useArticleList(params)
const articleList: getArticleItem[] = getArticleList.value.data.rows
// })

onMounted(() => {
  markdownToHtml.value = content
})
</script>
<template>
  <div class="cur-content">
    <div class="title-box">
      <h1 class="title">{{ article.title }}</h1>
    </div>

    <article v-html="markdownToHtml" class="markdown-body"></article>

    <div class="cur-info-box">
      <div class="author-info">
        <div class="author-avatar">
          <img :src="article.author.avatar" alt="" />
        </div>
        <div class="author-text">
          <span class="author-name"> {{ article.author.name }}</span>
          <div class="article-stat">
            <div class="stat-item">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M23.0844 10.7023H18.0444C17.6711 10.6401 17.5466 10.2667 17.4844 10.0801V5.53785C17.4844 4.29341 16.4889 3.29785 15.2444 3.29785C14.1244 3.29785 13.1911 4.16896 13.0044 5.22674C12.32 9.52007 9.70665 10.9512 8.02665 11.3867C8.08887 11.5734 8.08887 11.6979 8.08887 11.8223V23.8934C8.08887 24.1423 8.02665 24.3912 7.9022 24.6401H20.0978C21.28 24.3912 22.0889 23.9556 22.6489 22.7734L25.2 13.8134C25.6978 12.1956 24.8889 10.6401 23.0844 10.7023ZM7.03109 23.9556V11.8223C7.03109 11.449 6.53331 11.1379 5.97331 11.1379H4.29331C3.4222 11.1379 2.67554 11.8845 2.67554 12.7556V22.9601C2.67554 23.8934 3.35998 24.6401 4.29331 24.6401H5.97331C6.53331 24.6401 7.03109 24.329 7.03109 23.9556Z"
                  fill="#DEDEDE"
                />
              </svg>

              <span>{{ useNumFormat(article.stat.like) }} </span>
            </div>
            <div class="stat-item">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.280029 14.0001C1.5697 11.4703 3.53369 9.34636 5.95496 7.86296C8.37623 6.37956 11.1605 5.59448 14 5.59448C16.8396 5.59448 19.6238 6.37956 22.0451 7.86296C24.4664 9.34636 26.4304 11.4703 27.72 14.0001C26.4304 16.5299 24.4664 18.6538 22.0451 20.1372C19.6238 21.6206 16.8396 22.4057 14 22.4057C11.1605 22.4057 8.37623 21.6206 5.95496 20.1372C3.53369 18.6538 1.5697 16.5299 0.280029 14.0001ZM14 19.6001C15.4852 19.6001 16.9096 19.0101 17.9598 17.9599C19.01 16.9097 19.6 15.4853 19.6 14.0001C19.6 12.5149 19.01 11.0905 17.9598 10.0403C16.9096 8.99008 15.4852 8.40008 14 8.40008C12.5148 8.40008 11.0904 8.99008 10.0402 10.0403C8.99003 11.0905 8.40003 12.5149 8.40003 14.0001C8.40003 15.4853 8.99003 16.9097 10.0402 17.9599C11.0904 19.0101 12.5148 19.6001 14 19.6001ZM14 16.8001C13.2574 16.8001 12.5452 16.5051 12.0201 15.98C11.495 15.4549 11.2 14.7427 11.2 14.0001C11.2 13.2575 11.495 12.5453 12.0201 12.0202C12.5452 11.4951 13.2574 11.2001 14 11.2001C14.7426 11.2001 15.4548 11.4951 15.9799 12.0202C16.505 12.5453 16.8 13.2575 16.8 14.0001C16.8 14.7427 16.505 15.4549 15.9799 15.98C15.4548 16.5051 14.7426 16.8001 14 16.8001Z"
                  fill="#DEDEDE"
                />
              </svg>
              <span>{{ useNumFormat(article.stat.view) }}</span>
            </div>
            <div class="stat-item">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.6058 10.3326V5.44359C12.6058 4.64632 13.2718 4 14.0934 4C14.4423 4 14.78 4.11895 15.0476 4.33606L25.3847 12.7221C26.112 13.3121 26.2087 14.3626 25.6007 15.0684C25.5352 15.1443 25.463 15.2144 25.3847 15.2779L15.0476 23.6639C14.4173 24.1753 13.4791 24.094 12.9521 23.4823C12.7283 23.2226 12.6058 22.8949 12.6058 22.5564V18.053C7.59502 18.053 5.37116 19.9116 2.57197 23.5251C2.47607 23.6489 2.00031 23.7769 2.00031 23.2122C2.00031 16.2165 3.90102 10.3326 12.6058 10.3326Z"
                  fill="#DEDEDE"
                />
              </svg>
              <span> {{ useNumFormat(article.stat.share) }} </span>
            </div>
          </div>
        </div>
        <span class="pulishtime">发布日期: {{ cdate }}</span>
      </div>
      <div class="author-relate-box">
        <div class="post-relate-content">
          <PostCard
            v-for="(item, index) in articleList"
            :key="item.aid"
            :data="item"
            :class="[index >= 1 ? 'cd-ssm' : '', index >= 2 ? 'cd-big' : '']"
          ></PostCard>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.cur-content {
  padding: 32px;
  width: 100%;
}
.cur-category {
  background: #18181b;
  width: 260px;
  border-radius: 12px;
  right: 120px;
  padding: 16px;
  height: fit-content;
  color: white;

  .title {
    display: flex;
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 12px;
    border-bottom: 2px solid rgba($color: #000000, $alpha: 0.3);
  }
  .category-wrapper {
    margin-top: 12px;
    li {
      height: 24px;
      line-height: 24px;
    }
  }
}
.title-box {
  margin-bottom: 36px;

  .title {
    display: flex;
    margin-bottom: 16px;
    background: linear-gradient(98.16deg, #272727 6.27%, rgba(69, 69, 69, 0) 59.62%); /* 标准的语法（必须放在最后） */
    box-shadow: -1px 1px 2px rgba(21, 21, 21, 0.6);
    height: 90px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }
}
// 目前信息
.cur-info-box {
  margin-top: 40px;
}
.author-info {
  width: 100%;
  height: 240px;
  display: flex;
  align-items: center;
  background: #000000;
  flex-direction: column;
  justify-content: center;
  .author-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 6px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .article-stat {
    margin-top: 8px;
    display: flex;
    height: 16px;

    .stat-item {
      display: flex;
      align-items: flex-end;
      margin-right: 12px;
      span {
        font-size: 10px;
      }
    }
    svg {
      width: 16px;
      height: 16px;
      margin-right: 2px;
    }
  }
  .author-text {
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    & > span {
      margin-top: 8px;
    }
  }

  .author-name {
    font-size: 28px;
    font-weight: 600;
  }
  .pulishtime {
    font-size: 8px;
  }
}
.author-relate-box {
  padding: 8px;
  width: 100%;
  height: 360px;
  background: #272727;

  .post-relate-content {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin-top: 36px;
  }
}
.markdown-body {
  width: 1100px;
}
@media screen and (max-width: 1475px) {
}
@media screen and (max-width: 860px) {
  .author-relate-box .post-relate-content {
    grid-template-columns: repeat(2, 1fr);
  }
  .cd-big {
    display: none;
  }
}
@media screen and (max-width: 480px) {
  .author-relate-box .post-relate-content {
    grid-template-columns: repeat(1, 1fr);
  }
  .cd-ssm {
    display: none;
  }
}
</style>
<style lang="scss">
@import '@/assets/style/night.scss';

.markdown-body {
  width: 100%;
}
// .markdown-body {
//   p,
//   li {
//     margin: 16px 0;
//   }
//   h1,
//   h2,
//   h3,
//   h4,
//   h5 {
//     margin: 34px 0;
//   }
//   p {
//     color: #cecfd1;
//     letter-spacing: 1px;
//     line-height: 24px;
//   }
//   h1 {
//     color: #dedede;
//   }
//   h2 {
//     color: #dedede;
//   }
//   pre {
//     background: #18181b;
//     box-sizing: border-box;
//     border-radius: 8px;
//     padding: 24px;
//     width: 100%;
//     word-wrap: normal;
//   }
//   code {
//     //撒大苏打
//     font-family: 'Source Code Pro', monospace, Helvetica, Tahoma, Arial, STXihei, 'STHeiti Light', 'Microsoft YaHei',
//       sans-serif;
//     font-size: 16px;
//     width: 100%;
//     white-space: normal;
//     word-wrap: normal;
//     white-space: pre-wrap;
//     &::selection {
//       background-color: rgba(179, 179, 179, 0.2);
//     }
//     span {
//       &::selection {
//         background-color: rgba(179, 179, 179, 0.2);
//       }
//     }
//     & > span {
//       line-height: 28px;
//     }
//   }
//   ul {
//     margin-left: 20px;
//     text-indent: 10px;
//     li {
//       &::marker {
//         content: '■';
//         display: block;
//         width: 5px;
//         height: 5px;
//       }
//     }
//   }
//   ol {
//     margin-left: 20px;
//     text-indent: 10px;
//     li {
//       &::marker {
//         content: counter(list-item) '.';
//         display: block;
//         width: 5px;
//         height: 5px;
//       }
//     }
//   }
//   blockquote {
//     background: #18181b;
//     border-left: 10px solid #272727;
//     margin: 1.5em 10px;
//     padding: 0.5em 10px;
//     quotes: '\201C''\201D''\2018''\2019';
//     &:before {
//       color: #fde7ed;
//       content: open-quote;
//       font-size: 4em;
//       line-height: 0.1em;
//       margin-right: 0.25em;
//       vertical-align: -0.4em;
//     }
//     p {
//       display: inline;
//     }
//   }
// }
</style>
