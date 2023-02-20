<template>
	<div>
		<CommonHeader></CommonHeader>
		<main>
			<slot />
		</main>
		<footer>Crafted by Mierku</footer>
	</div>
</template>

<style>
	.link {
		margin-right: 1rem;
	}
	main {
		color: white;
	}
	footer {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 80px;
		background: rgba(0, 0, 0, 0.2);
	}
</style>
