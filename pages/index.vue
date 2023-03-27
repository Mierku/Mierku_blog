<script setup lang="ts">
	// definePageMeta({
	// 	documentDriven: false,

	import { recordIP, recordPV, recordUV } from '~~/composables/api/useWebLog'

	// })
	async function test() {
		const { data } = await recordPV()
		await recordIP()
		await recordUV()
		console.log(data.value)
	}
</script>
<template>
	<button @click="test()">发送请i去</button>
	<NuxtLayout></NuxtLayout>
</template>
