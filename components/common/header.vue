<script lang="ts" setup>
	const navList = reactive([
		{ id: 1, title: '首页', to: 'http://localhost:3000/home' },
		{ id: 2, title: '归档', to: '/' },
		{ id: 3, title: '文章', to: '/home' },
	])
</script>
<template>
	<header class="site-header">
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
				class="header-nav-item"
				v-for="item in navList"
				:key="item.id"
			>
				<NuxtLink :to="item.to">
					{{ item.title }}
				</NuxtLink>
			</li>
		</ul>
	</header>
	<!-- <div
		class="header-block"
		style="height: 60px"
	></div> -->
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
				padding: 0 12px;
			}
		}
	}
</style>
