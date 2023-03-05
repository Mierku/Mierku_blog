<script lang="ts" setup>
	import { marked } from 'marked'
	import hljs from 'highlight.js'
	import 'highlight.js/scss/tokyo-night-dark.scss' // 引入高亮样式 这里我用的是sublime样式
	import { getArticle } from '~~/composables/useArticleList'
	// const props = defineProps({
	// 	data: {} as PropType<getArticle>,
	// })
	// const article = props.data
	const article: getArticle = inject('article')
	const markdownToHtml = shallowRef()
	const cdate = useDateFormat(article.cdate, 'YYYY-MM-DD HH:mm:ss')
	marked.setOptions({
		renderer: new marked.Renderer(),
		pedantic: false,
		gfm: true,
		sanitize: false,
		smartLists: true,
		smartypants: false,
		xhtml: false,
		highlight: function (code) {
			return hljs.highlightAuto(code).value
		},
	})
	//基本配置与代码高亮配置
	onMounted(() => {
		markdownToHtml.value = marked(article.articleDoc.content, {
			breaks: true,
		})
	})

	console.log(markdownToHtml.value)
</script>
<template>
	<div class="cur-content">
		<div class="cur-info">
			<h1 class="title">{{ article.title }}</h1>
			<div class="author-info">
				<el-avatar :src="article.author.avatar" />
				<div class="author-text">
					<span class="author-name"> {{ article.author.name }}</span>
					<span class="pulishtime">{{ article.cdate }}</span>
				</div>
			</div>
		</div>
		<div
			v-html="markdownToHtml"
			class="markdown-body"
		></div>
	</div>
</template>
<style lang="scss">
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
</style>
<style lang="scss">
	.cur-content {
		p,
		li {
			margin: 16px 0;
		}
		h1,
		h2,
		h3,
		h4,
		h5 {
			margin: 34px 0;
		}
		p {
			color: #cecfd1;
			letter-spacing: 2px;
			line-height: 24px;
		}
		h1 {
			color: #dedede;
		}
		h2 {
			color: #dedede;
		}
		pre {
			background: #18181b;
			box-sizing: border-box;
			border-radius: 8px;
			padding: 24px;
			width: 100%;
			word-wrap: normal;
		}
		code {
			//撒大苏打
			font-family: Consolas, 'Courier New', monospace;
			font-size: 16px;
			width: 100%;
			white-space: normal;
			word-wrap: normal;
			white-space: pre-wrap;
		}
		ul {
			margin-left: 20px;
			text-indent: 10px;
			li {
				&::marker {
					content: '■';
					display: block;
					width: 5px;
					height: 5px;
				}
			}
		}
		ol {
			margin-left: 20px;
			text-indent: 10px;
			li {
				&::marker {
					content: counter(list-item) '.';
					display: block;
					width: 5px;
					height: 5px;
				}
			}
		}
		blockquote {
			background: #18181b;
			border-left: 10px solid #272727;
			margin: 1.5em 10px;
			padding: 0.5em 10px;
			quotes: '\201C''\201D''\2018''\2019';
			&:before {
				color: #fde7ed;
				content: open-quote;
				font-size: 4em;
				line-height: 0.1em;
				margin-right: 0.25em;
				vertical-align: -0.4em;
			}
			p {
				display: inline;
			}
		}
	}
</style>
