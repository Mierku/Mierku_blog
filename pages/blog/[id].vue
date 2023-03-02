<script setup lang="ts">
	import { getArticle } from '~~/composables/useArticleList'
	import { API } from '~~/utils/useRequest'

	//引入marked解析模块 与 代码高亮插件 以及对应的样式文件
	const { params } = useRoute()
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
	const articleData = data.value.data
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
			<PostContent :data="articleData"></PostContent>
			<PostCategory :data="articleData"></PostCategory>
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
		margin-top: 24px;
		display: flex;
		justify-content: center;
	}
</style>
