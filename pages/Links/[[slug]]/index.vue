<script setup lang="ts">
import { ref } from 'vue'
import { getLinksPageDetail, LinksCardType, LinksPageDetailType } from '~~/composables/api/useLinks'
import simpleParallax from 'simple-parallax-js'
let banner: Ref<HTMLImageElement>
const route = useRoute()
const rname = route.params.slug
let detail: LinksPageDetailType
const lcards = reactive<Array<LinksCardType>>([])
let scrollview
const { data } = await getLinksPageDetail(rname.toString())
console.log(data)
detail = data.value.data
console.log(rname, detail)
if (detail.lcards) {
  lcards.push(...detail.lcards)
}
console.log('lacards', lcards)
</script>
<template>
  <NuxtLayout>
    <figure class="others-banner">
      <client-only>
        <img class="banner" ref="banner" :src="detail.banner" alt="banner" draggable="false" />
        <span class="links-title">{{ detail.title }}</span>
      </client-only>
    </figure>

    <main class="links-content-wrapper">
      <div class="links-content" v-if="lcards.length > 0">
        <div class="links-wrapper" v-for="(lcard, index) in lcards" :key="lcard.mid">
          <div class="links-box_title">
            <span>{{ lcard.title }}</span>
          </div>
          <div class="links-box">
            <LinksCard v-for="item in lcard.items" :key="item.mmid" :carditem="item"></LinksCard>
          </div>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
<style lang="scss" scoped>
.others-banner {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.links-content-wrapper {
  margin: 80px auto;
  padding: 0 40px;
  max-width: 1680px;
  min-width: 240px;
}
.links-title {
  color: rgba($color: #c4fff5, $alpha: 0.9);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 36px;
  letter-spacing: 2px;
  font-weight: 600;
}
// Card主体
.links-wrapper {
  margin-top: 60px;
  margin-bottom: 36px;
}
.links-box {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}
.links-box_title {
  line-height: 40px;
  height: 40px;
  margin-bottom: 20px;
  span {
    font-size: 24px;
    color: azure;
  }
  input {
    font-size: 24px;
    color: azure;
    background: transparent;
    outline: none;
  }
}

@media screen and (max-width: 1200px) {
  .others-banner {
    height: 400px;
  }
  .links-box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
}
@media screen and (max-width: 1000px) {
  .links-content {
    padding: 0 20px;
  }
}
// 变化字体
@media screen and (max-width: 800px) {
  .others-banner {
    height: 340px;
  }

  .links-content-wrapper {
    padding: 0;
  }
  .links-box {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 520px) {
  .links-box {
    grid-template-columns: 1fr;
  }
}
</style>
