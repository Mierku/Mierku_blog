<script setup lang="ts">
	import { ParsedContent } from '@nuxt/content/dist/runtime/types'

	interface BlogParsedContent extends ParsedContent {
		title: string
		author: string
		description: string
	}
	const route = useRoute()
	const { data } = await useAsyncData(`content-${route.path}`, () => {
		return queryContent<Pick<BlogParsedContent, string>>()
			.where({ _path: route.path })
			.findOne()
	})
	console.log(data)
	const toc = computed(() => {
		if (!data.value) return []
		return data.value.body.toc
	})

	// const { toc } = useContent()
</script>
<template>
	<NuxtLayout>
		<div class="site-banner">
			<img
				src="http://localhost:3000/image/01.jpg"
				alt=""
			/>
		</div>
		<main class="site-content">
			<div class="cur-content">
				<div class="cur-info">
					<h1 class="title">{{ data.title }}</h1>
					<div class="author-info">
						<el-avatar />
						<div class="author-text">
							<span class="author-name"> {{ data.author }}</span>
							<span class="pulishtime">2023-01-23</span>
						</div>
					</div>
				</div>
				<ContentRenderer :value="data">
					<ContentRendererMarkdown :value="data" />
				</ContentRenderer>
			</div>
			<div class="cur-category">
				<span class="title">目录</span>
				<ul
					class="category-wrapper"
					v-if="toc && toc.links"
				>
					<li
						v-for="link in toc.links"
						:key="link.text"
					>
						<a :href="`#${link.id}`">
							{{ link.text }}
						</a>
					</li>
				</ul>
			</div>
		</main>
	</NuxtLayout>
</template>

<style lang="scss" scoped>
	.site-banner {
		width: 100%;
		height: 200px;
		position: relative;
		h1 {
			position: absolute;
			bottom: 10px;
		}
	}
	img {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}
	.site-content {
		margin-top: 24px;
		display: flex;

		justify-content: center;
		.cur-content {
			padding: 32px;
			width: 1100px;
		}
		.cur-category {
			background: #18181b;
			width: 260px;
			border-radius: 12px;
			right: 120px;
			padding: 16px;
			height: fit-content;
			color: white;
			.title {
				display: flex;
				font-size: 18px;
				font-weight: 600;
				padding-bottom: 12px;
				border-bottom: 2px solid rgba($color: #000000, $alpha: 0.3);
			}
			.category-wrapper {
				margin-top: 12px;
				li {
					height: 24px;
					line-height: 24px;
				}
			}
		}
		.cur-info {
			margin-bottom: 20px;
			.title {
				margin-bottom: 16px;
			}
			.author-info {
				display: flex;
				.author-text {
					margin-left: 10px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					font-size: 14px;
				}
			}
		}
	}
</style>
<style lang="scss" scoped>
	.cur-content {
		:deep(p) {
			color: #b8bfc6;
		}
		:deep(h1) {
			color: #dedede;
		}
		:deep(h2) {
			color: #dedede;
		}
		:deep(pre) {
			background: #18181b;
			box-sizing: border-box;
			border-radius: 24px;
			padding: 24px;
			width: 100%;
		}
	}
</style>
