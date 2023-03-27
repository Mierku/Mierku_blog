<script lang="ts" setup>
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
const route = useRoute()
const curIndex = ref('')
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

const navList: Array<NavItem> = reactive([
  { id: 1, title: '首页', to: '/home' },
  { id: 2, title: '归档', to: '/timeline' },
  {
    id: 3,
    title: '导航',
    to: '/Links',
    children: [
      { id: 1, title: '友链', to: '/Links/friends' },
      { id: 2, title: '工具' },
    ],
  },
  { id: 4, title: '留言板', to: '/' },
  { id: 5, title: '碎碎念', to: '/lol' },
])
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
    <ul class="header-nav">
      <li
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
      </li>
      <div class="slider"></div>
    </ul>
  </header>
</template>

<style lang="scss">
.site-header {
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  position: fixed;
  z-index: 6;
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
