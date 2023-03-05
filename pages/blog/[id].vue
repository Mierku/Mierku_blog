<script setup lang="ts">
	import hljs from 'highlight.js'
	import { marked } from 'marked'
	import { getArticle } from '~~/composables/useArticleList'
	import { API } from '~~/utils/useRequest'
	//引入marked解析模块 与 代码高亮插件 以及对应的样式文件
	const { params } = useRoute()
	let headers
	const tocIndex = ref<number>()
	const array = ref<Array<number>>([])
	const options = {
		query: { aid: +params.id },
	}
	// const { data } = await useArticle(options)
	// articleData = data.value.data

	// if (!data.value) {
	// 	throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
	// }

	// // const { data } = await useArticle(options)
	console.log(useRuntimeConfig().public.baseURL)
	const { data } = await useAsyncData<API<getArticle>>(`${params.id}`, () =>
		$fetch(`http://127.0.0.1:4400/x/mierku/blog/?aid=${params.id}`)
	)
	const throttledFn = useThrottleFn(() => {
		nextTick(() => {
			// do something, it will be called at most 1 time per second
			const nodeList: Array<Element> = Array.from(headers)
			array.value = Array.from({ length: nodeList.length }) // 开辟空间
			console.log(Array.from(headers))
			for (let i = 0; i < array.value.length; i++) {
				const top = nodeList[i].getBoundingClientRect().top
				array.value[i] = Math.abs(top)
			}
			const { index } = useMin(array.value)
			console.log(array.value)
			tocIndex.value = index.value
			nextTick(() => {
				const UItem = document.querySelectorAll('.toc li')
				UItem.forEach((item, index) => {
					item.classList.remove('active')
					if (tocIndex.value === index) {
						item.classList.add('active')
					}
				})
			})
		})
	}, 100)
	const article = data.value.data

	onMounted(() => {
		nextTick(() => {
			headers = document.querySelectorAll(
				'.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4 '
			)
			window.addEventListener('scroll', throttledFn)
		})
	})

	provide('article', article)
	provide('toc', tocIndex)
</script>

<template>
	<NuxtLayout>
		<div class="site-banner">
			<img
				src="http://localhost:3000/image/01.jpg"
				alt=""
			/>
		</div>
		<div class="site-content">
			<div class="post-content">
				<PostContent></PostContent>
				<PostCategory></PostCategory>
			</div>
		</div>
	</NuxtLayout>
</template>

<style lang="scss" scoped>
	.site-banner {
		width: 100%;
		height: 400px;
		position: relative;
		h1 {
			position: absolute;
			bottom: 10px;
		}
	}
	img {
		width: 100%;
		height: inherit;
		object-fit: cover;
	}
	.site-content {
		display: flex;
		justify-content: center;
		.post-content {
			width: 1440px;
			display: flex;
			justify-content: space-between;
		}
	}
</style>
