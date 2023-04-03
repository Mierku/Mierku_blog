<script lang="ts" setup>
import { timeLineChild } from '@/composables/api/useArticleList'
const isShow = ref(false)
const deShow = refDebounced(isShow, 180)
const { article } = defineProps<{ article: timeLineChild }>()
</script>
<template>
  <div :class="['line-card-wrapper', isShow ? 'unfold' : '']">
    <NuxtLink :to="`blog/${article.aid}`">
      <div class="line-card-box">
        <div class="line-card">
          <span>{{ article.title }}</span>
          <span> {{ useDateFormat(article.cdate) }}</span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss">
.line-card-wrapper {
  margin: 8px 0;
  color: azure;
  cursor: pointer;
  &:hover {
    color: aqua;
  }
}
.line-card-box {
  transform-origin: top;
  animation: slide-down 0.3s ease-in 1;
  // background: #272727;
  border-radius: 4px;
}
.line-card {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@keyframes slide-down {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(100%);
  }
}
</style>
