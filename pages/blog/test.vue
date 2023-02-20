<script lang="ts" setup>
	//引入marked解析模块 与 代码高亮插件 以及对应的样式文件
	import { marked } from 'marked'
	import hljs from 'highlight.js'

	//基本配置与代码高亮配置
	marked.setOptions({
		renderer: new marked.Renderer(),
		gfm: true,
		breaks: false,
		pedantic: false,
		sanitize: false,
		smartLists: true,
		smartypants: false,
		highlight: function (code) {
			return hljs.highlightAuto(code).value
		},
	})
	const { data } = await useAsyncData('15', () =>
		$fetch('http://127.0.0.1:4400/article/15')
	)
	console.log(data)
	const value = ref('**Hello,World**')
	const markdownToHtml = shallowRef('')
	markdownToHtml.value = marked(value.value)
</script>

<template>
	<div
		v-html="markdownToHtml"
		class="markdown-body"
	></div>
</template>
