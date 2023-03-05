<script lang="ts" setup>
	const navbar = ref<HTMLElement | null>()
	let windowRef
	if (process.client) {
		windowRef = ref<Window>(window)
	}
	const route = useRoute()
	console.log(route)
	const curIndex = ref('')
	curIndex.value = route.fullPath.replace(/^\/([^\/]*).*$/, '$1')

	const smooth = ref(true)
	let hidden = false
	const behavior = computed(() => (smooth.value ? 'smooth' : 'auto'))
	const { x, y, isScrolling, directions } = useScroll(windowRef, { behavior })
	const {
		left: toLeft,
		right: toRight,
		top: toTop,
		bottom: toBottom,
	} = toRefs(directions)
	const navitem = ref<HTMLLIElement>()
	//
	// 导航栏隐藏机制
	const isHidden = computed(() => {
		if (y.value > 700) {
			if (toBottom.value) {
				hidden = true // 不显示
			} else if (toTop.value) {
				hidden = false // 显示
			}
		} else hidden = false

		return hidden
	})
	const navList = reactive([
		{ id: 1, title: '首页', to: '/home' },
		{ id: 2, title: '归档', to: '/timeline' },
		{ id: 3, title: '文章', to: '/blog' },
		{ id: 4, title: '友链', to: '/' },
		{ id: 5, title: '留言板', to: '/' },
	])
</script>
<template>
	<header
		ref="navbar"
		:class="['site-header', isHidden ? 'hidden' : '']"
	>
		<div class="header-logo">
			<span class="logo-icon"></span>
			<ruby class="logo-text">
				<span>永不落幕</span> <rp>(</rp><rt>Mierku's</rt><rp>)</rp>
				<span>De</span>
				<span>前奏诗</span><rp>(</rp><rt>Blog</rt><rp>)</rp>
			</ruby>
		</div>
		<ul class="header-nav">
			<li
				ref="navitem"
				:class="[
					'header-nav-item',
					`/${curIndex}` === item.to ? 'current' : '',
				]"
				v-for="(item, index) in navList"
				:key="item.id"
			>
				<NuxtLink :to="item.to">
					{{ item.title }}
				</NuxtLink>
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
		background: rgba(37, 37, 37, 0.25);
		border-bottom: 1px solid rgba(50, 50, 50, 0.25);
		backdrop-filter: blur(4px);
		position: fixed;
		z-index: 6;
		height: 60px;
		width: 100%;
		color: white;
		transition: all 0.3s linear;
		&.hidden {
			transform: translateY(-60px);
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
			display: flex;
			align-items: center;

			.header-nav-item {
				display: flex;
				align-items: center;
				height: inherit;
				padding: 0 12px;
				font-weight: 400;
				&:hover {
					animation: move-up-down 0.4s ease-in-out 1;
				}
				a {
					height: 100%;
					width: 100%;
					line-height: 60px;
				}
			}
		}
		.router-link-active {
			color: aquamarine;
		}
	}
	@keyframes move-up-down {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-12px);
		}
		100% {
			transform: translateY(0px);
		}
	}
</style>
