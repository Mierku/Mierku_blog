<script lang="ts" setup>
	//引入marked解析模块 与 代码高亮插件 以及对应的样式文件
	import { marked } from 'marked'
	import hljs from 'highlight.js'
	export interface getArticle {
		data: {
			articleDoc: {
				ArticleDoc_id: number
				doc: string
			}
		}
	}
	const content = ref('')
	const { data } = await useAsyncData<getArticle>('15', () =>
		$fetch('http://127.0.0.1:4400/article/15')
	)
	const getArticle = data.value.data
	content.value = getArticle.articleDoc.doc
	//基本配置与代码高亮配置
	marked.setOptions({
		renderer: new marked.Renderer(),
		gfm: true,
		breaks: false,
		pedantic: false,
		sanitize: false,
		smartLists: true,
		smartypants: false,
		highlight: function (content) {
			return hljs.highlightAuto(content).value
		},
	})

	const markdownToHtml = shallowRef('')
	markdownToHtml.value = marked(content.value)
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
				<div
					v-html="markdownToHtml"
					class="markdown-body"
				></div>
			</div>
			<!-- <div class="cur-category">
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
			</div> -->
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
