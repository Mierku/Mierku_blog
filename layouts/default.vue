<script setup lang="ts">
import { useFps } from '@vueuse/core'
import { getWebRecord } from '~~/composables/api/useWebLog'
let fps = useFps()
const { data } = await getWebRecord()
const { pv, uv } = data.value.data
const isWebInfoHidden = ref(false)
</script>
<template>
  <div :class="[{ isShow: isWebInfoHidden }, 'web-tool']" @click="isWebInfoHidden = !isWebInfoHidden">
    <!-- <div class="fps">FPS: {{ fps }}</div> -->
    <div class="web-info">
      <span>FPS: {{ fps }}</span>
      <span>访客量:{{ uv }}</span>
      <span>浏览量:{{ pv }}</span>
    </div>
  </div>
  <CommonHeader></CommonHeader>

  <slot />

  <footer>
    <h4 class="site-maker">Crafted by Mierku</h4>
    <p>@ 朽木弥尔的自宅地 <a href="https://beian.miit.gov.cn/" target="_blank">渝ICP备2023002592号</a></p>
  </footer>
</template>

<style lang="scss">
.link {
  margin-right: 1rem;
}

.web-tool {
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0px;
  width: 160px;
  padding: 40px;
  cursor: pointer;
  transition: all 0.4s ease-in;
  &:hover {
    background: rgba(44, 44, 44, 0.8);
  }
  &.isShow {
    transform: translate(-90%, 0);
  }
  .web-info {
    display: flex;
    flex-direction: column;
    color: aliceblue;
    span {
      display: flex;
      margin-bottom: 4px;
      font-size: 14px;
      color: inherit;
    }
  }
}
.fps {
  width: 100px;
  height: 60px;
  line-height: 60px;
  color: aquamarine;
  text-align: center;
}
footer {
  color: aliceblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 120px;
  background: rgba(0, 0, 0, 0.2);
  p {
    font-size: 14px;

    a {
      &:hover {
        color: antiquewhite;
      }
    }
  }
}
.site-maker {
  margin-bottom: 12px;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 300;
}
</style>
