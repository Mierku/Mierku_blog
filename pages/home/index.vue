<script setup lang="ts">
	import PostCard from '@/components/Home/PostCard.vue'
	import { getArticleItem } from '~~/composables/useArticleList'
	let articleList: getArticleItem[]
	const title = ref('朽木弥尔')
	// 首屏大小
	const firstPaint = ref<HTMLDivElement>()
	const IsVisible = useElementVisibility(firstPaint)
	const params = reactive({
		page: 1,
		limit: 6,
	})
	useArticleList(params).then((res) => {
		articleList = res.data.value.data.rows
	})
</script>
<template>
	<NuxtLayout>
		<figure ref="firstPaint">
			<div class="figure-info">
				<div class="glass"></div>
				<span class="main-title">{{ title }}</span>
				<div class="main-info-wrapper">
					<p class="main-say">与离别之时,献上约定之花</p>
					<span class="main-icon"></span>
				</div>
			</div>
			<ContactSvg></ContactSvg>
		</figure>
		<div class="site-content">
			<div class="content-left">
				<div class="banner">
					<ul class="banner-dot"></ul>
					<div clas="banner-inner"></div>
				</div>
				<div class="recommend-wrapper">
					<div class="main-title">
						<span class="bg">Perfermance</span>
						<span class="txt">个人精选</span>
					</div>
					<div class="recommend-box">
						<div
							class="recommend-item"
							v-for="item in 4"
						></div>
					</div>
				</div>
				<div class="article-wrapper">
					<div class="main-title">
						<span class="bg">Article</span>
						<span class="txt">专区</span>
					</div>
					<div class="article-box">
						<client-only>
							<PostCard
								v-for="item in articleList"
								:key="item.aid"
								:data="item"
							></PostCard>
						</client-only>
					</div>
				</div>
			</div>
			<div class="content-right"></div>
		</div>
	</NuxtLayout>
</template>

<style lang="scss" scoped>
	figure {
		background: url('image/79300529_p0.jpg');
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: cover;
		position: relative;
		height: 100vh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 -100px 100px #1e1e1e inset;
		.figure-info {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
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
	}
	.site-content {
		display: flex;
		box-shadow: 0 -70px 80px #1e1e1e inset;
		padding: 36px 36px;
		width: 100%;
		height: 300vh;
		justify-content: space-between;
	}
	.content-left {
		background: rgba(36, 36, 36, 0.4);
		width: 100%;
		margin-right: 60px;
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
	.content-right {
		width: 500px;
		height: 100vh;
		background: white;
		border-radius: 12px;
	}
	// 主标题
	.main-title {
		position: relative;
		font-size: 24px;
		height: 40px;
		margin-bottom: 12px;
		.bg {
			font-size: 46px;
			position: absolute;
			z-index: -1;
			bottom: 0;
			background: linear-gradient(180deg, #c10454 0%, rgba(13, 11, 11, 0) 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
		}
	}
	// 个人精选
	.recommend-wrapper {
		margin-top: 24px;
	}
	.recommend-box {
		display: flex;
		.recommend-item {
			background: white;
			margin: 0 12px;
			height: 240px;
			flex: 1;
		}
	}
	// 专区
	.article-wrapper {
		margin-top: 24px;
	}
	.article-box {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-column-gap: 80px;
		grid-row-gap: 36px;
	}
	// 联系icon
	:deep(.contact-icon) {
		position: absolute;
		right: 40px;
	}
</style>
