<script setup lang="ts">
	import { useFps } from '@vueuse/core'
	let fps = useFps()
</script>
<template>
	<div>
		<div class="fps">Fps: {{ fps }}</div>
		<CommonHeader></CommonHeader>
		<main>
			<slot />
		</main>
		<footer>Crafted by Mierku</footer>
	</div>
</template>

<style scoped>
	.link {
		margin-right: 1rem;
	}
	main {
		color: white;
		min-height: 100vh;
	}
	.fps {
		position: fixed;
		z-index: 999;
		bottom: 0;
		left: 50px;
		width: 100px;
		height: 60px;
		line-height: 60px;
		color: aquamarine;
		text-align: center;
	}
	footer {
		color: aliceblue;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 80px;
		background: rgba(0, 0, 0, 0.2);
	}
</style>
