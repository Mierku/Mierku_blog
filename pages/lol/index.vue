<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getLolList, LolRequest, useLollist } from '@/composables/api/useLol'
const myLol = reactive<getLolList>({ rows: [], total: 0 })
let preloadLol: LolRequest = {
  wts: 0,
  limit: 8,
}
interface ListItem {
  imgUrl: string
  name: string
}
const loading = ref(false)
const isNull = ref(false)
onMounted(async () => {
  loading.value = true
  await useLollist(preloadLol)
    .then((res) => {
      loading.value = false
      myLol.rows.push(...res.data.rows)
      myLol.total = res.data.total
    })
    .catch((err) => {
      isNull.value = true
    })
})

// 无限加载
let total: number
const load = async () => {
  loading.value = true
  const mark = myLol.rows[myLol.rows.length - 1]
  const timestamp = new Date(myLol.rows[myLol.rows.length - 1].pour.cdate).getTime()
  preloadLol.wts = +((mark.pour.isTop ? '1.' : '0.') + new Date(mark.pour.cdate).getTime())
  const { data } = await useLollist(preloadLol)
  myLol.rows.push(...data.rows)
  console.log(data)
  loading.value = false
}

const noMore = computed(() => myLol.rows.length >= myLol.total)
const disabled = computed(() => loading.value || noMore.value)
const lists = ref<ListItem[]>([])
const currentDate = new Date().toDateString()
</script>
<template>
  <NuxtLayout>
    <figure class="site-banner">
      <img src="/image/70827348_p0.jpg" draggable="false" alt="" />
      <h1>秘密基地</h1>
    </figure>
    <main class="site-lol">
      <ClientOnly>
        <div class="lol-wrapper">
          <el-empty description="description" v-if="isNull" />
          <!-- <el-skeleton style="width: 100%; padding: 20px 40px; background: rgba(78, 78, 78, 0.2)" animated>
            <template #template>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  margin-bottom: 8px;
                  padding-bottom: 8px;
                  border-bottom: 2px solid rgba(107, 107, 107, 0.2);
                "
              >
                <div style="display: flex; align-items: flex-end">
                  <el-skeleton-item variant="circle" style="width: 46px; height: 46px; margin-right: 2px" />
                  <el-skeleton-item variant="text" style="width: 36px; margin-bottom: 4px" />
                </div>
                <el-skeleton-item variant="text" style="width: 180px" />
              </div>
              <div style="padding: 20px 0; display: flex; flex-direction: column">
                <el-skeleton-item variant="p" style="width: 80%; margin-bottom: 8px" />
                <el-skeleton-item variant="p" style="width: 60%; margin-bottom: 8px" />
                <el-skeleton-item variant="p" style="width: 30%; margin-bottom: 8px" />
              </div>
            </template>
          </el-skeleton> -->
          <div v-else class="lol-content">
            <el-skeleton
              :throttle="500"
              :loading="loading"
              animated
              style="width: 100%; padding: 20px 40px; background: rgba(78, 78, 78, 0.2)"
            >
              <template #template>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 8px;
                    padding-bottom: 8px;
                    border-bottom: 2px solid rgba(107, 107, 107, 0.2);
                  "
                >
                  <div style="display: flex; align-items: flex-end">
                    <el-skeleton-item variant="circle" style="width: 46px; height: 46px; margin-right: 2px" />
                    <el-skeleton-item variant="text" style="width: 36px; margin-bottom: 4px" />
                  </div>
                  <el-skeleton-item variant="text" style="width: 180px" />
                </div>
                <div style="padding: 20px 0; display: flex; flex-direction: column">
                  <el-skeleton-item variant="p" style="width: 80%; margin-bottom: 8px" />
                  <el-skeleton-item variant="p" style="width: 60%; margin-bottom: 8px" />
                  <el-skeleton-item variant="p" style="width: 30%; margin-bottom: 8px" />
                </div>
              </template>
            </el-skeleton>
            <article class="lol-display" v-for="item in myLol.rows" :key="item.pour.id">
              <span class="Top" v-if="item.pour.isTop">顶</span>
              <section class="art-top">
                <div class="lol_author-info">
                  <div class="avatar"><img :src="item.author.avatar" alt="头像" /></div>
                  <span class="author">{{ item.author.name }}</span>
                  <div class="split"></div>
                  <span class="cdate">{{ useDateFormat(item.pour.cdate.toString()) }}</span>
                </div>
              </section>
              <p class="content">{{ item.pour.content }}</p>
            </article>
            <div class="load-wrapper">
              <div @click="load" class="loadMore" v-if="!noMore">加载更多...</div>
            </div>
          </div>
        </div>
      </ClientOnly>
    </main>
  </NuxtLayout>
</template>
<style lang="scss" scoped>
.site-lol {
  width: 100%;
  color: white;
  // max-width: 1440px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}
.site-banner {
  width: 100%;
  height: 400px;
  position: relative;
  color: white;
  h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
    font-size: 36px;
    font-weight: 400;
  }
}
img {
  width: 100%;
  height: inherit;
  object-fit: cover;
}
.lol-wrapper {
  padding: 60px 60px 60px 60px;
  width: 1440px;
  margin: 60px 20px;
  border-radius: 6px;
  border: 1px solid white;
}
.lol-display {
  width: 100%;
  padding: 20px 24px;
  margin: 34px 0;
  border-radius: 4px;
  position: relative;
  background: rgba($color: #4e4e4e81, $alpha: 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  .Top {
    position: absolute;
    left: 0;
    top: 0;
    width: 30px;
    height: 26px;
    background: linear-gradient(90deg, #00ffc2 -11.76%, #2c68dc 120.59%);
    text-align: center;
    line-height: 26px;
    border-radius: 4px 0 6px 0;
    box-shadow: 1px 1px 3px rgba(19, 19, 19, 0.6);
    font-size: 14px;
    letter-spacing: 2px;
    color: rgb(231, 231, 231);
  }
  .art-top {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    color: rgb(204, 204, 204);
    border-bottom: 2px solid rgba(107, 107, 107, 0.2);
  }
  .lol_author-info {
    display: flex;
    margin-bottom: 8px;
    align-items: flex-end;
    .split {
      margin: 0px 12px;
      height: 18px;
      width: 2px;
      background-color: rgb(75, 75, 75);
    }

    .avatar {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 6px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .content {
    display: flex;
    padding: 20px 0px;
    line-height: 26px;
  }
}
.load-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  .loadMore {
    width: 120px;
    height: 46px;
    border-radius: 24px;
    background: #00ffc2;
    text-align: center;
    line-height: 46px;
    cursor: pointer;
  }
}
@media screen and (max-width: 860px) {
  .site-banner {
    height: 240px;
  }
  .lol-wrapper {
    padding: 0px 12px;
    min-width: 300px;
    max-width: 1440px;
    margin: 60px auto;
    border: none;
  }
}
</style>
