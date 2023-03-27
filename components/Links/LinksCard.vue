<script setup lang="ts">
import { LinksCardItemType } from '~~/composables/api/useLinks'

const props = defineProps<{ carditem: LinksCardItemType }>()
const item = toRef(props, 'carditem')
</script>
<template>
  <div class="links-card">
    <a class="links-to" :href="item.url">
      <el-avatar size="large" :src="item.icon"></el-avatar>
      <div class="desc">
        <h2>{{ item.title }}</h2>
        <p>{{ item.desc }}</p>
      </div>
    </a>
  </div>
</template>
<style lang="scss">
.links-card {
  height: 90px;
  max-width: 400px;
  min-width: 240px;
  background: rgba(46, 46, 46, 0.6);

  transition: all 0.3s ease-in;
  &:hover {
    transform: translateY(-8px);
  }
  .el-avatar {
    flex: 0 0 auto;
    margin-right: 12px;
  }

  .desc {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    max-width: 240px;
    min-width: 100px;

    height: 60px;
    h2 {
      flex: 1;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgba(236, 236, 236, 0.9);
    }
    p {
      flex: 1;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgba(226, 226, 226, 0.6);
    }
  }
}
.links-to {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
</style>
