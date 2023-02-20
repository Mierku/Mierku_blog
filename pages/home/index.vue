<script setup lang="ts">
	const title = ref('朽木弥尔')
</script>
<template>
	<NuxtLayout>
		<figure>
			<div class="figure-info">
				<div class="glass"></div>
				<span class="main-title">{{ title }}</span>
				<div class="main-info-wrapper">
					<p class="main-say">与离别之时,献上约定之花</p>
					<span class="main-icon"></span>
				</div>
			</div>
		</figure>
		<div class="site-content">
			<div class="content">
				<div class="swiper">
					<el-carousel
						:interval="4000"
						type="card"
						height="600px"
					>
						<el-carousel-item
							v-for="item in 6"
							:key="item"
						>
							<h3
								text="2xl"
								justify="center"
							>
								{{ item }}
							</h3>
						</el-carousel-item>
					</el-carousel>
				</div>
				<div class="recommend-wrapper">
					<div class="recommend-title">
						<span>推荐专栏</span>
					</div>
					<div class="recommend">
						<div
							class="card"
							v-for="item in 8"
							:key="item"
						></div>
					</div>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>

<style lang="scss">
	figure {
		background: url('image/home.webp');
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: cover;
		position: relative;
		height: 100vh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		// .glass {
		// 	position: absolute;
		// 	background: linear-gradient(
		// 		to right,
		// 		rgba(36, 36, 36, 0.4),
		// 		rgba(0, 0, 0, 0)
		// 	);
		// 	height: 100%;
		// 	width: 40%;
		// 	left: 0%;
		// 	backdrop-filter: blur(20px);
		// 	z-index: 0;
		// }
		.figure-info {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.main-title {
				font-size: 42px;
				margin-bottom: 20px;
			}
			.main-info-wrapper {
				width: 500px;
				height: 60px;
				border-radius: 16px;
				background: rgba(36, 36, 36, 0.4);
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.main-say {
				font-size: 15px;
			}
		}
	}
	.site-content {
		height: 300vh;
		.content {
			margin: auto;
			width: 1440px;
			height: 400px;
			background: rgba(36, 36, 36, 0.4);

			.swiper {
				grid-column: 1 / 5;
				grid-row: 1 / 2;
			}
		}
		.recommend-wrapper {
			.recommend-title {
				font-size: 24px;
				margin-top: 36px;
			}
		}
		.recommend {
			display: grid;
			grid-gap: 20px;
			grid-template-columns: repeat(4, 1fr);
			margin-top: 24px;
			.card {
				background: white;
				height: 340px;
				border-radius: 16px;
			}
		}
	}

	.el-carousel__item h3 {
		color: #475669;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
		text-align: center;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n + 1) {
		background-color: #d3dce6;
	}
</style>
