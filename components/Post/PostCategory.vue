<script lang="ts" setup>
	import { marked } from 'marked'
	import { getArticle } from '@/composables/useArticleList'
	const toc = ref('')
	const props = defineProps({
		data: {} as PropType<getArticle>,
	})
	const article = props.data

	function slugify(text) {
		console.log(text)
		return (
			text
				.toString()
				.toLowerCase()
				.replace(/\s+/g, '-') // Replace spaces with -
				// .replace(/[^\w\-]+/g, '') // Remove all non-word chars
				.replace(/\-\-+/g, '-') // Replace multiple - with single -
				.trim()
		)
	}

	function generateTOC(items) {
		let html = ''
		let lastLevel = 0

		items.forEach((item) => {
			if (item.level > lastLevel) {
				html += '<ul>'
			} else if (item.level < lastLevel) {
				html += '</li></ul>'.repeat(lastLevel - item.level)
			} else {
				html += '</li>'
			}

			html += `<li><a href="#${item.anchor}">${item.text}</a>`

			lastLevel = item.level
		})

		if (lastLevel > 0) {
			html += '</li></ul>'.repeat(lastLevel)
		}

		return html
	}
	onMounted(() => {
		const renderer = new marked.Renderer()
		let tocItems = []
		// Override the `heading` method to add TOC entries
		renderer.heading = (text, level, raw) => {
			console.log(raw)
			const anchor = slugify(raw)
			console.log(anchor)
			tocItems.push({ anchor, level, text })
			return `<h${level} id="${anchor}">${text}</h${level}>`
		}
		const tokens = marked.lexer(article.articleDoc.content)
		const html = marked.parser(tokens, { renderer })
		toc.value = generateTOC(tocItems)
		console.log(toc.value)
	})
</script>
<template>
	<div class="category">
		<div class="title-wrapper">
			<span class="title">目录</span>
		</div>
		<div
			class="toc"
			v-html="toc"
		></div>
	</div>
</template>
<style lang="scss" scoped>
	.category {
		padding: 6px 12px;
		width: 300px;
		height: fit-content;
		border-radius: 12px;
		background: rgba(25, 25, 25, 0.4);
		.title-wrapper {
			height: 36px;
			line-height: 36px;
			border-bottom: 1px solid rgba(147, 147, 147, 0.2);
			margin-bottom: 8px;
			.title {
				color: aliceblue;
				font-size: 18px;
				font-weight: 600;
			}
		}
	}
</style>
