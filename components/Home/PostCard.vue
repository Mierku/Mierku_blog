<script setup lang="ts">
import { getArticleItem } from '~~/composables/api/useArticleList'
import { useNumFormat, useTimeFormat } from '~~/composables/useFormat'
import { useIntersectionObserver } from '@vueuse/core'
const props = defineProps({
  data: {} as PropType<getArticleItem>,
})

const article = props.data
const timeFormat = article.cdate ? useTimeFormat(article.cdate) : '时间'
const viewFormat = article?.stat?.view ? useNumFormat(article.stat.view) : '浏览量'
const likeFormat = article?.stat?.like ? useNumFormat(article.stat.like) : '点赞'

console.log(article?.stat)
const maskDown = ref(false)
</script>
<template>
  <div class="postcard">
    <NuxtLink :to="`/blog/${article.aid}`">
      <figure class="cover-wrapper" @mouseover="maskDown = true" @mouseout="maskDown = false">
        <el-image
          class="cover"
          loading="lazy"
          fit="cover"
          :src="article.cover ? article.cover : 'https://s2.loli.net/2023/02/25/j2PJipdX5DUeSsB.webp'"
        >
          <template #error>
            <img class="image-slot" src="https://s2.loli.net/2023/03/23/Kdk63vmBhbzNjAW.webp" />
          </template>
        </el-image>
      </figure>
      <div class="info-wrapper">
        <div class="info-one">
          <span class="title">{{ article.title }}</span>
          <span class="cdate">
            <svg
              class="timer-icon"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 0.875C3.175 0.875 0.875 3.175 0.875 6C0.875 8.825 3.175 11.125 6 11.125C8.825 11.125 11.125 8.825 11.125 6C11.125 3.175 8.825 0.875 6 0.875ZM6 10.375C3.6 10.375 1.625 8.4 1.625 6C1.625 3.6 3.6 1.625 6 1.625C8.4 1.625 10.375 3.6 10.375 6C10.375 8.4 8.4 10.375 6 10.375Z"
                fill="#F4F4F4"
              />
              <path
                d="M8.15 6.65L6.375 5.825V3.25C6.375 3.05 6.2 2.875 6 2.875C5.8 2.875 5.625 3.05 5.625 3.25V6.05C5.625 6.2 5.7 6.325 5.85 6.4L7.85 7.35C7.9 7.375 7.95 7.375 8 7.375C8.15 7.375 8.275 7.3 8.35 7.15C8.425 6.975 8.35 6.75 8.15 6.65Z"
                fill="#F4F4F4"
              />
            </svg>
            <span class="cdate_text">{{ timeFormat }}</span>
          </span>
        </div>
        <div class="desc">
          {{ article.desc || 'QAQ' }}
        </div>
        <div class="label-wrapper">
          <div class="label-item">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.94118 3.44119C9.94118 3.20005 10.0266 2.99409 10.1974 2.82331C10.3681 2.65252 10.5741 2.56713 10.8152 2.56713C11.0564 2.56713 11.2623 2.65252 11.4331 2.82331C11.6039 2.99409 11.6893 3.20005 11.6893 3.44119C11.6893 3.68233 11.6039 3.88829 11.4331 4.05907C11.2623 4.22986 11.0564 4.31525 10.8152 4.31525C10.5741 4.31525 10.3681 4.22986 10.1974 4.05907C10.0266 3.88829 9.94118 3.68233 9.94118 3.44119ZM2.65582 7.37407C2.65582 7.61521 2.74007 7.82002 2.90856 7.98851L6.26103 11.3479C6.43844 11.5164 6.64555 11.6006 6.88235 11.6006C7.12349 11.6006 7.3283 11.5164 7.49679 11.3479L12.3787 6.4591C12.5518 6.29061 12.6986 6.06069 12.8191 5.76934C12.9397 5.47798 13 5.21174 13 4.9706V2.1301C13 1.8933 12.9135 1.68848 12.7404 1.51566C12.5673 1.34284 12.3625 1.2563 12.1259 1.25604H9.28544C9.0443 1.25604 8.77806 1.31633 8.48671 1.4369C8.19535 1.55746 7.96327 1.70429 7.79044 1.87737L2.90856 6.75237C2.74007 6.92978 2.65582 7.13689 2.65582 7.37369V7.37407ZM0.0340305 7.37407C0.0340305 7.61521 0.118275 7.82002 0.286765 7.98851L3.63924 11.3479C3.81665 11.5164 4.02376 11.6006 4.26056 11.6006C4.42446 11.6006 4.55879 11.5687 4.66356 11.505C4.76832 11.4413 4.88889 11.3388 5.02527 11.1976L1.81618 7.98851C1.64769 7.82002 1.56344 7.61521 1.56344 7.37407C1.56344 7.13727 1.64769 6.93016 1.81618 6.75275L6.69806 1.87775C6.87114 1.70467 7.10323 1.55785 7.39432 1.43728C7.68542 1.31671 7.95167 1.25642 8.19306 1.25642H6.66365C6.42251 1.25642 6.15627 1.31671 5.86491 1.43728C5.57356 1.55785 5.34147 1.70467 5.16865 1.87775L0.286765 6.75275C0.118275 6.93016 0.0340305 7.13727 0.0340305 7.37407Z"
                fill="#F5F5F5"
              />
            </svg>
            <div class="label-item_text">
              {{ article.tags[0].name || '__' }}
            </div>
          </div>
          <div class="label-item">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.49976 2.89959C8.94709 2.89959 11.0536 4.37313 12.0394 6.49969H13C11.9589 3.86217 9.4429 2 6.49976 2C3.55704 2 1.04108 3.86225 0 6.49969H0.960638C1.94642 4.37313 4.05292 2.89959 6.49976 2.89959ZM6.49976 10.0999C4.05292 10.0999 1.94641 8.62643 0.960638 6.49969H0C1.04108 9.13776 3.55704 11 6.49976 11C9.44289 11 11.9588 9.13776 13 6.49969H12.0394C11.0536 8.62643 8.94709 10.0999 6.49976 10.0999ZM4.16195 6.5C4.16195 7.82551 5.20859 8.89995 6.49998 8.89995C7.79126 8.89995 8.83797 7.82551 8.83797 6.5C8.83797 5.17442 7.79126 4.09997 6.49998 4.09997C5.20859 4.09997 4.16195 5.17442 4.16195 6.5ZM7.96154 6.5C7.96154 7.32837 7.30701 8.00022 6.49998 8.00022C5.69292 8.00022 5.0389 7.32837 5.0389 6.5C5.0389 5.67158 5.69292 4.9997 6.49998 4.9997C7.30701 4.9997 7.96154 5.67158 7.96154 6.5Z"
                fill="#F5F5F5"
              />
            </svg>
            <div class="label-item_text">{{ viewFormat }}</div>
          </div>
          <div class="label-item">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.61119 5.84682H1.16675C1.14481 5.84682 1.12309 5.85103 1.10282 5.85921C1.08256 5.86739 1.06415 5.87939 1.04865 5.8945C1.03316 5.90962 1.02088 5.92756 1.01251 5.9473C1.00415 5.96704 0.999869 5.98819 0.999917 6.00955V11.8623C0.999917 11.9519 1.07467 12.0247 1.16675 12.0247H2.61119V5.84682ZM3.61147 5.79691V12.0247H10.5C10.5442 12.0246 10.5866 12.0074 10.6178 11.977C10.649 11.9465 10.6665 11.9053 10.6665 11.8623V11.7983L11.999 6.92549C11.9833 6.54854 11.8186 6.19208 11.5392 5.93051C11.2599 5.66894 10.8876 5.52248 10.5 5.5217H7.70936L7.82564 4.94107C7.90508 4.5418 8.00006 4.26202 8.00006 3.71794V3.05225C8.00006 2.24562 7.32731 1.97569 6.5 1.97569C5.67306 1.97569 4.99994 2.24562 4.99994 3.05225V3.71865C4.99994 4.48134 4.56192 4.9488 3.69814 5.71958L3.61147 5.79691ZM10.5 13H1.16639C0.856841 12.9993 0.560226 12.8791 0.341579 12.6658C0.122932 12.4525 9.46527e-05 12.1636 0 11.8623V6.00955C-9.44912e-07 5.7082 0.122794 5.41915 0.341451 5.2058C0.560109 4.99245 0.856778 4.87222 1.16639 4.87148H3.16189C3.57175 4.47959 4.00003 4.25218 4.00003 3.71829V3.0519C4.00003 1.70752 5.12128 1 6.5 1C7.87872 1 8.99997 1.70716 8.99997 3.0519V3.71829C8.99997 4.10386 8.95953 4.19349 8.90789 4.54637H10.5C11.8788 4.54637 13 5.64015 13 6.98489V7.04885L11.6643 11.9343C11.6453 12.2226 11.5145 12.493 11.2983 12.6909C11.0821 12.8888 10.7968 12.9993 10.5 13Z"
                fill="#F5F5F5"
              />
            </svg>
            <div class="label-item_text">{{ likeFormat }}</div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
<style lang="scss" scoped>
// 卡片
.postcard {
  background: rgba(236, 236, 236, 0.21);
  backdrop-filter: blur(12px);
  height: 360px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    .cover {
      transform: scale(1.2);
    }
  }
}
// 封面
.cover-wrapper {
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease-out;
  width: 100%;
  height: 250px;
  .cover {
    transition: all 0.2s ease-out;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.image-slot {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
// 简介
.info-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  padding: 0 20px;
  .info-one {
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .title {
      width: 70%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 20px;
      font-weight: 600;
      font-family: Inter;
    }
    .cdate {
      display: flex;
      font-size: 14px;
      align-items: center;
    }
    .author {
      display: flex;
      font-size: 14px;
      align-items: flex-end;
      .author-icon {
        margin-right: 6px;
      }
      .author-text {
        transform: translateY(2px);
      }
    }
  }
  // 简单介绍
  .desc {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin-bottom: 12px;
  }
}
// 下标数据
.label-wrapper {
  display: flex;
  .label-item {
    display: flex;
    margin-right: 12px;
    align-items: center;
    svg {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
  }
}

// icon
.timer-icon {
  width: 18px;
  height: 18px;
  margin-right: 6px;
  fill: white;
}
@keyframes mask-down {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
