<script setup lang="ts">
import PostCard from '@/components/Home/PostCard.vue'
import Me from '@/components/Home/Me.vue'
import ArtLabel from '@/components/Home/Label.vue'
import TodoList from '@/components/Home/TodoList.vue'
import ToPlay from '@/components/Home/ToPlay.vue'
import { getArticleItem, useArticleList } from '~~/composables/api/useArticleList'

const title = ref("Mierku's Blog")
// 首屏大小
const params = reactive({
  page: 1,
  limit: 5,
  wts: 0,
  type: 1,
})
const useInfo = useGlobalInfo()
let storeArticleList: getArticleItem[] = []
let articleList: getArticleItem[]
let total: number
const filter = ref(['最新', '热门'])

const { data: getArticleList, error } = await useArticleList(params)
if (!getArticleList.value) {
  total = 0
  articleList = []
} else {
  total = getArticleList.value.data.count
  articleList = getArticleList.value.data.rows
}

// 下一个
async function next() {
  const length = articleList.length
  storeArticleList = [...storeArticleList, ...articleList]
  const newTime = new Date(Date.parse(articleList[length - 1].cdate))
  params.wts = newTime.getTime()
  // 请求获取值
  const { data: getArticleList } = await useArticleList(params)
  articleList = getArticleList.value.data.rows
}
function pre() {}
// const RandomPic = getRandomPic.value.data
</script>
<template>
  <NuxtLayout>
    <main>
      <KeepAlive>
        <figure class="home-paint" ref="firstPaint">
          <div class="figure-info">
            <div class="glass"></div>
            <span class="main-title">{{ title }}</span>
            <div class="main-info-wrapper">
              <p class="main-say">{{ useInfo.zhanz.sgn }}</p>
            </div>
          </div>
          <ContactSvg></ContactSvg>
          <div class="mask-bottom"></div>
        </figure>
      </KeepAlive>

      <div class="site-content">
        <div class="content-left">
          <div class="article-wrapper right">
            <div class="article-main">
              <div class="main-title">
                <span class="text">Article</span>
              </div>
              <ClientOnly>
                <div v-if="total === 0" class="article-empty">暂无文章发布</div>
                <div v-else class="article-box">
                  <PostCard
                    v-for="(item, index) in articleList"
                    :key="item.aid"
                    :data="item"
                    :class="[index >= 4 ? 'cd-big' : '']"
                  ></PostCard>
                </div>
              </ClientOnly>
            </div>
            <aside>
              <div class="aside-card">
                <img class="right" src="https://s2.loli.net/2023/03/27/Ee76wafvlWMd4ZR.png" alt="" />
              </div>
            </aside>
          </div>
          <PokerSvg></PokerSvg>
          <div class="article-wrapper left">
            <div class="article-main">
              <div class="main-title">
                <span class="text">AGURU</span>
              </div>
              <ClientOnly>
                <div class="personal-box">
                  <TodoList></TodoList>
                  <Me></Me>
                  <ArtLabel></ArtLabel>
                  <ToPlay></ToPlay>
                </div>
              </ClientOnly>
            </div>
            <aside>
              <div class="aside-card">
                <img class="left" src="https://s2.loli.net/2023/03/27/tiExMpbk2rWOwL5.png" alt="" />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
main {
  overflow-x: hidden;
  width: 100%;
  color: white;
  min-height: 100vh;
  overflow: hidden;
}
.home-paint {
  background: url('/image/79300529_p0.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .figure-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: 0.4s ease-out first-turnup 1;
    .main-title {
      font-size: 42px;
      margin-bottom: 20px;
    }
    .main-info-wrapper {
      width: 500px;
      height: 60px;
      border-radius: 16px;
      background: rgba(36, 36, 36, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .main-say {
      font-size: 15px;
    }
  }
  .mask-bottom {
    position: absolute;
    background: linear-gradient(0deg, #141414, rgba($color: #141414, $alpha: 0));
    bottom: 0;
    width: 100%;
    height: 120px;
  }
}
.site-content {
  position: relative;
  display: flex;
  padding: 36px 36px;
  width: 100%;
  justify-content: space-between;
}
.content-left {
  // background: rgba(36, 36, 36, 0.4);
  width: 100%;
}
.banner {
  border-radius: 12px;
  display: flex;
  min-width: 100%;
  max-width: 1440px;
  height: 460px;
  position: relative;
  background: url('image/c8c0c7c143354043b9709719331bef40.jpg');
  background-position: center;
  background-size: cover;
  object-fit: cover;
  .banner-inner {
    position: absolute;
    width: 90%;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid white;
    border-radius: 12px;
  }
}
// 边
.aside-card {
  width: 18vw;
  height: 100%;

  img {
    object-fit: cover;
    filter: drop-shadow(5px -6px 10px rgba(0, 0, 0, 0.349));
  }
  .right {
    position: absolute;
    bottom: -20px;
    right: -80px;
  }
  .left {
    position: absolute;

    bottom: -20px;
    left: -80px;
  }
}

// 主标题
.main-title {
  position: relative;
  margin-bottom: 42px;
  .text {
    display: flex;
    margin-bottom: 16px;
    font-size: 32px;
    background: linear-gradient(98.16deg, #272727 6.27%, rgba(69, 69, 69, 0) 59.62%); /* 标准的语法（必须放在最后） */
    box-shadow: -1px 1px 2px rgba(21, 21, 21, 0.6);
    height: 90px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }
}

// 专区
.article-wrapper {
  position: relative;
  margin-bottom: 80px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 12px;
  &.left {
    flex-direction: row-reverse;
  }
}
.article-main {
  width: 100%;
}
.article-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
.article-box {
  width: 80vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 36px;
}
.art-ctr-box {
  width: 100%;
  height: 360px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
  justify-content: space-around;
  .art-filter {
    position: absolute;
    height: 40px;
    width: 80px;
    line-height: 40px;
    top: 0;
    right: 0;
    text-align: center;
    background: #f83660;
    border-radius: 0 12px;
    color: #dbdbdb;
    font-weight: 400;
  }
  .button-box {
    display: flex;
    width: inherit;
    justify-content: space-around;
  }
  .art-info {
    display: flex;
  }
}
.pre-much,
.next-much {
  height: 40px;
  width: 120px;
  background: transparent;
  border: 2px solid rgb(92, 92, 92);
}
// personal
.personal-box {
  display: grid;
  width: 80vw;
  grid-template-columns: repeat(13, 1fr);
  grid-template-rows: repeat(14, 1fr);
  grid-gap: 0;
  height: 560px;
}
:deep(.me) {
  grid-area: 1/7/4/14;
}
:deep(.playList) {
  grid-area: 5/9/15/14;
}
:deep(.todoList) {
  grid-area: 6/1/15/8;
}
:deep(.art-label) {
  grid-area: 1/1/5/6;
}
// 联系icon
:deep(.contact-icon) {
  position: absolute;
  right: 40px;
}
:deep(.cur-content) {
  flex: 1;
}
@media screen and (max-width: 1700px) {
  .article-box {
    grid-column-gap: 30px;
  }
}
@media screen and (max-width: 1540px) {
  .recommend-item:nth-child(4) {
    display: none;
  }
  .aside-card {
    width: 200px;
  }
  .article-box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1vw;
    grid-row-gap: 30px;
  }
  .content-right {
    max-width: 500px;
  }
}
@media screen and (max-width: 860px) {
  .site-content {
    padding: 36px 0;
  }
  .main-info-wrapper {
    display: none !important;
  }
  :deep(.contact-icon) {
    display: none !important;
  }
  .article-wrapper {
    justify-content: center;
  }
  aside {
    display: none;
  }
  .article-wrapper {
    border: none;
  }
  .cd-big {
    display: none;
  }
  .article-box {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 36px;
  }
}
@media screen and (max-width: 540px) {
  .article-box {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 36px;
  }
  .cd-big {
    display: block;
  }
}
@keyframes first-turnup {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
