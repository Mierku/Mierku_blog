<script lang="ts" setup>
import { TimeLineItem, useTimeLine } from '~~/composables/api/useArticleList'
import TimeLineCard from '~~/components/timeline/Card.vue'
const activeName = ref('1')
const { data } = await useTimeLine()
let articleList = reactive<Array<TimeLineItem>>([])
console.log(data)
if (data.value) {
  console.log(data)
  articleList = data.value.data
}
</script>
<template>
  <NuxtLayout>
    <main class="site-timeline">
      <div class="tl-header">文章</div>
      <div class="tl-wrapper">
        <!-- <div class="tl-post-mod_year" v-for="yearMap in articleList">
          {{ yearMap.year }}
          <div class="tl-post-mod_month"></div>
        </div> -->
        <div v-if="articleList.length === 0" class="tl-empty">无文章发布</div>
        <el-collapse v-else v-model="activeName" accordion>
          <el-collapse-item v-for="yearMap in articleList" :title="yearMap.year.toString()" :name="yearMap.year">
            <div v-for="monthMap in yearMap.rows" :key="monthMap.month">
              <h2 class="month-text">{{ monthMap.month }}月</h2>
              <TimeLineCard v-for="item in monthMap.children" :key="item.aid" :aid="item.aid" :article="item">
              </TimeLineCard>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </main>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.site-timeline {
  padding: 60px;
  margin-top: 46px;
  width: 1440px;
  min-height: 100vh;
  margin: auto;
  color: azure;
}
.tl-header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 24px;
  border-bottom: 1px solid rgba(119, 119, 119, 0.4);
}
.tl-wrapper {
  padding: 24px;
  height: 80vh;
}
.tl-empty {
  color: white;
}
.el-collapse {
  margin-top: 30px;
  padding: 24px;
  height: 100%;
  width: 100%;
  border-radius: 6px;
  border: none;
  border-left: 1px solid white;
  border-right: 1px solid white;
}
.month-text {
  color: white;
}
:deep(.el-collapse-item__wrap) {
  background: transparent;
}
:deep(.el-collapse-item__header) {
  background: transparent;
  color: white;
}
</style>
