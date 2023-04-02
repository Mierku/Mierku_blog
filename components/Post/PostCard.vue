<script setup lang="ts">
import { getArticleItem } from '~~/composables/api/useArticleList'
import { useNumFormat, useTimeFormat } from '~~/composables/useFormat'

const props = defineProps({
  data: {} as PropType<getArticleItem>,
})

const article = props.data
const timeFormat = article.cdate ? useTimeFormat(article.cdate) : '时间'
const viewFormat = article?.stat?.view ? useNumFormat(article.stat.view) : '浏览量'
const likeFormat = article?.stat?.like ? useNumFormat(article.stat.like) : '点赞'
const maskDown = ref(false)
</script>
<template>
  <NuxtLink :to="`/blog/${article.aid}`" class="post-box">
    <figure class="post-cover">
      <img :src="article.cover" alt="" />
      <div class="post-mask">
        <h3>{{ article.title }}</h3>
        <div class="stat-wrapper">
          <div class="stat-item">
            <div class="stat-like"></div>
            <span>{{ useNumFormat(article.stat.like) }}</span>
          </div>
          <div class="stat-item">
            <div class="stat-view"></div>
            <span>{{ useNumFormat(article.stat.view) }}</span>
          </div>
          <div class="stat-item">
            <div class="stat-share"></div>
            <span>{{ useNumFormat(article.stat.share) }}</span>
          </div>
        </div>
      </div>
    </figure>
  </NuxtLink>
</template>
<style lang="scss" scoped>
// 图片
.post-cover {
  max-width: 320px;
  height: 187px;
  background-color: aqua;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.post-mask {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 20px;
  opacity: 0;
  cursor: pointer;
  background: linear-gradient(0deg, rgba(31, 31, 31, 0.8) 0%, rgba(217, 217, 217, 0) 40%);
  &:hover {
    opacity: 1;
  }
  h3 {
    font-weight: 500;
    margin-bottom: 6px;
  }
}

// 标签
.stat-wrapper {
  display: flex;
}

.stat-item {
  display: flex;
  margin-right: 8px;
  margin-bottom: 12px;
  & > div {
    width: 14px;
    height: 14px;
    background: url('/sprites/sprites.png');
    background-size: 300% 100%;
    margin-right: 3px;
  }
  .stat-like {
    background-position: 0, 0;
  }
  .stat-view {
    background-position: 28px, 0;
  }
  .stat-share {
    background-position: 56px, 0;
  }
  & > span {
    font-size: 10px;
  }
}
</style>
