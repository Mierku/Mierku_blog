<script lang="ts" setup>
import { useTabList } from '~~/composables/api/useTab'
import { getTabList } from '~~/composables/api/useTab'
let navList: Array<getTabList>
interface NavItem {
  id: number
  title: string
  to?: string
  children?: Array<NavItem>
}

const navbar = ref<HTMLElement | null>()
let windowRef
if (process.client) {
  windowRef = ref<Window>(window)
}
const { data, error } = await useTabList()
const unData = unref(data)

navList = unData ? unData.data : undefined

const route = useRoute()
const curIndex = ref('')
const isShowSub = ref(false)
const isShowAside = ref(false)
const useInfo = useGlobalInfo()
curIndex.value = route.fullPath.replace(/^\/([^\/]*).*$/, '$1')

const smooth = ref(true)
let hidden = false
// const behavior = computed(() => (smooth.value ? 'smooth' : 'auto'))
const { x, y, isScrolling, directions } = useScroll(windowRef)
const { left: toLeft, right: toRight, top: toTop, bottom: toBottom } = toRefs(directions)
const navitem = ref<HTMLLIElement>()
// 导航栏隐藏机制
const isHidden = computed(() => {
  if (y.value > 600) {
    if (toBottom.value) {
      hidden = true // 不显示
    } else if (toTop.value) {
      hidden = false // 显示
    }
  } else hidden = false

  return hidden
})
const isFixed = computed(() => {
  if (y.value > 100) return true
  else return false
})
</script>
<template>
  <header ref="navbar" :class="['site-header', { hidden: isHidden }, { fixed: isFixed }]">
    <div class="header-logo">
      <span class="logo-icon"></span>
      <ruby class="logo-text">
        <span>朽木弥尔</span> <rp>(</rp><rt>Mierku's</rt><rp>)</rp>
        <span>De</span>
        <span>自宅屋</span><rp>(</rp><rt>Blog</rt><rp>)</rp>
      </ruby>
    </div>

    <nav class="header-nav" v-if="navList">
      <div
        ref="navitem"
        :class="['menu-item', `/${curIndex}` === item.to ? 'current' : '']"
        v-for="(item, index) in navList"
        :key="item.id"
      >
        <NuxtLink class="menu-item_to" :to="item.to">
          {{ item.title }}
        </NuxtLink>
        <ul v-if="item.children" class="submenu">
          <li class="submenu-item" v-for="subItem in item?.children" :key="subItem.id">
            <NuxtLink class="submenu-item_to" :to="subItem.to">
              {{ subItem.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="slider"></div>
    </nav>
  </header>

  <svg
    class="menu-control"
    @click="isShowAside = !isShowAside"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      v-if="!isShowAside"
      d="M10 10H6.66669V13.3333H10V10ZM33.3334 10H13.3334V13.3333H33.3334V10ZM6.66669 18.3333H10V21.6667H6.66669V18.3333ZM33.3334 18.3333H13.3334V21.6667H33.3334V18.3333ZM6.66669 26.6667H10V30H6.66669V26.6667ZM33.3334 26.6667H13.3334V30H33.3334V26.6667Z"
      fill="#CCCCCC"
    />
    <path
      v-else
      d="M22.423 21.0004L30.6485 12.7745C30.8748 12.5481 30.9996 12.246 31 11.9239C31 11.6016 30.8752 11.2991 30.6485 11.073L29.9277 10.3524C29.7011 10.1254 29.399 10.0011 29.0765 10.0011C28.7546 10.0011 28.4525 10.1254 28.2259 10.3524L20.0004 18.5777L11.7745 10.3524C11.5482 10.1254 11.246 10.0011 10.9237 10.0011C10.6017 10.0011 10.2994 10.1254 10.0732 10.3524L9.352 11.073C8.88267 11.5424 8.88267 12.3057 9.352 12.7745L17.5777 21.0004L9.352 29.2259C9.12556 29.4527 9.00089 29.7548 9.00089 30.0769C9.00089 30.399 9.12556 30.7011 9.352 30.9277L10.073 31.6484C10.2993 31.8752 10.6017 31.9997 10.9235 31.9997C11.2458 31.9997 11.5481 31.8752 11.7743 31.6484L20.0002 23.4229L28.2257 31.6484C28.4523 31.8752 28.7544 31.9997 29.0763 31.9997H29.0767C29.3988 31.9997 29.7009 31.8752 29.9275 31.6484L30.6484 30.9277C30.8746 30.7013 30.9995 30.399 30.9995 30.0769C30.9995 29.7548 30.8746 29.4527 30.6484 29.2261L22.423 21.0004Z"
      fill="#CCCCCC"
    />
  </svg>

  <div @click.stop="isShowAside = !isShowAside" :class="[isShowAside ? 'showAside' : 'noAside', 'aside-wrapper']">
    <aside @click.stop class="site-aside">
      <div class="aside-logo">
        <el-avatar class="header-avatar" :src="useInfo.zhanz.avatar"></el-avatar>
        <span>朽木弥尔的自宅地</span>
        <ContactSvg></ContactSvg>
      </div>
      <nav class="aside-nav" v-if="navList">
        <div
          ref="navitem"
          :class="['menu-item', `/${curIndex}` === item.to ? 'current' : '']"
          v-for="(item, index) in navList"
          :key="item.id"
        >
          <NuxtLink v-if="item.children.length === 0" class="menu-item_to" :to="item.to">
            {{ item.title }}
          </NuxtLink>
          <div v-else :class="[{ showSub: isShowSub }, 'submenu']">
            <div class="submenu-title">
              <NuxtLink :to="item.to">
                {{ item.title }}
              </NuxtLink>
              <svg
                @click="isShowSub = !isShowSub"
                t="1680362611388"
                class="list-icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4467"
                width="200"
                height="200"
              >
                <path
                  d="M511.8592 602.282667l196.906667-196.296534a36.872533 36.872533 0 0 1 50.973866-1.041066 33.8048 33.8048 0 0 1 1.024 48.810666l-218.4832 218.2144c-16.6656 16.6528-43.677867 16.64-60.330666-0.0256L263.125333 452.996267a33.493333 33.493333 0 0 1 1.041067-48.3456 36.5312 36.5312 0 0 1 50.491733 1.041066l197.205334 196.586667z"
                  fill="#8a8a8a"
                  p-id="4468"
                ></path>
              </svg>
            </div>

            <ul class="submenu-box">
              <li class="submenu-item" v-for="subItem in item?.children" :key="subItem.id">
                <NuxtLink class="submenu-item_to" :to="subItem.to">
                  {{ subItem.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="slider"></div>
      </nav>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
.site-header {
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  position: fixed;
  z-index: 999;
  height: 60px;
  width: 100%;
  color: white;

  transition: all 0.3s linear;

  &.hidden {
    transform: translateY(-60px);
  }
  &.fixed {
    // border-bottom: 1px solid rgb(39, 39, 39);
    background: rgba(37, 37, 37, 0.4);
    box-shadow: 0 4px 6px rgba(36, 36, 36, 0.5);
  }
  .header-logo {
    height: inherit;
    display: flex;
    align-items: center;
    .logo-text {
      span {
        font-size: 24px;
      }
    }
  }
  .header-nav {
    height: inherit;
    position: relative;
    display: flex;
    align-items: center;
    .menu-item {
      display: flex;
      align-items: center;
      height: inherit;
      padding: 0 12px;
      font-weight: 400;
      &:hover {
        a {
          animation: move-up-down 0.4s ease-in-out 1;
        }
        // hover 动画
        .submenu {
          display: flex;
          animation: menu-down 0.3s 0.3s 1 both;
        }
      }
      .menu-item_to {
        height: 100%;
        width: 100%;
        line-height: 60px;
      }
    }
  }
  // 二级菜单
  .submenu {
    position: absolute;
    top: 60px;
    transform: translateX(-25%);
    display: none;
    opacity: 0;
    flex-direction: column;
    background: rgba(37, 37, 37, 0.5);
    .submenu-item {
      width: 64px;
      height: 42px;
    }

    .submenu-item_to {
      width: inherit;
      height: inherit;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background: rgba(255, 156, 8, 0.25);
      }
    }
  }
  .router-link-active {
    color: aquamarine;
  }
}
.aside-wrapper {
  display: none;
}
.menu-control {
  display: none;
}

@media screen and (max-width: 860px) {
  .site-header {
    display: none;
  }

  .aside-wrapper {
    display: flex;
    position: fixed;
    z-index: 998;
    left: 0;
    top: 0;
    &.showAside {
      &::after {
        opacity: 0.4;
      }
      .site-aside {
        transform: translateX(0px);
      }
    }
    &.noAside {
      &::after {
        pointer-events: none;
      }
      .site-aside {
        transform: translateX(-240px);
      }
    }
    &::after {
      background-color: #191919;
      bottom: -1px;
      content: '';
      width: 100vw;
      height: 100vh;
      left: 0;
      opacity: 0;
      position: absolute;
      right: 0;
      top: 0;
      transition: opacity 0.25s linear;
    }
  }
  .menu-control {
    display: block;
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 1000;
  }
  .site-aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    width: 240px;
    height: 100vh;
    position: absolute;
    z-index: 3;
    left: 0;
    top: 0;
    transition: all 0.4s ease-in-out;
    transform: translateX(-240px);
    background: rgba(43, 43, 43, 1);
    color: white;
    .aside-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-bottom: 24px;
      .header-avatar {
        width: 64px;
        height: 64px;
        margin-bottom: 24px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
      }
      span {
        font-size: 16px;
        letter-spacing: 1px;
        font-weight: 400;
        color: rgb(216, 216, 216);
        margin-bottom: 6px;
      }
    }
    .aside-nav {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .menu-item {
      width: inherit;
      padding: 0 12px;
      font-weight: 400;
      &.current {
        .router-link-active {
          color: aquamarine;
        }
      }
      .menu-item_to {
        display: flex;
        align-items: center;
        justify-content: center;
        width: inherit;
        height: 54px;
      }
      .submenu {
        &.showSub {
          .submenu-box {
            display: flex;
            animation: menu-to-down 0.4s ease-in-out 1 both;
          }
          .list-icon {
            transform: translateY(-50%) rotateZ(0deg);
          }
        }
      }
    }

    .submenu-title {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: 54px;
      .list-icon {
        width: 18px;
        height: 18px;
        position: absolute;
        top: 50%;
        left: 0;
        transition: all 0.2s ease-in-out;
        transform: translateY(-50%) rotateZ(-90deg);
      }
    }

    .submenu-box {
      display: none;
      opacity: 0;
      height: 0;
      flex-direction: column;
      align-items: center;
      .submenu-item {
        font-size: 14px;
        margin-bottom: 12px;
      }
    }
  }
  :deep(.contact-icon) {
    width: 80%;
    flex-direction: row;
    justify-content: space-around;
    svg {
      width: 18px;
      margin-bottom: 20px;
    }
  }
}

@keyframes menu-to-down {
  0% {
    opacity: 0;
    height: 0;
    transform: translateY(-50%);
  }
  100% {
    opacity: 1;
    height: 56px;
    transform: translateY(0);
  }
}
@keyframes menu-down {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes move-up-down {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
