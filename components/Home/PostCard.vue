<script setup lang="ts">
	import { getArticleItem } from '~~/composables/useArticleList'

	const props = defineProps({
		data: {} as PropType<getArticleItem>,
	})
	const article = props.data
	const maskDown = ref(false)
</script>
<template>
	<div class="postcard">
		<NuxtLink :to="`/blog/${article.aid}`">
			<figure
				class="cover-wrapper"
				@mouseover="maskDown = true"
				@mouseout="maskDown = false"
			>
				<img
					class="cover"
					rel="noreferrer"
					:src="
						article?.cover
							? article.cover
							: 'https://s2.loli.net/2023/02/25/j2PJipdX5DUeSsB.webp'
					"
					alt="哈哈"
				/>
				<div :class="['mask', maskDown ? 'down' : '']"></div>
			</figure>
			<div class="info-wrapper">
				<div class="info-one">
					<span class="title">{{ article.title }}</span>
					<span class="author">
						<svg
							class="author-icon"
							width="17"
							height="17"
							viewBox="0 0 17 17"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2.27143 15.5964C2.17782 15.5964 2.08805 15.5592 2.02186 15.493C1.95567 15.4268 1.91848 15.337 1.91848 15.2434C1.91452 13.8294 2.36995 12.4524 3.21623 11.3196C4.04093 10.2102 5.19332 9.3879 6.51064 8.96884C6.59989 8.9406 6.6967 8.94896 6.77978 8.9921C6.86287 9.03524 6.92541 9.10961 6.95365 9.19886C6.9819 9.28811 6.97353 9.38492 6.9304 9.468C6.88726 9.55108 6.81289 9.61363 6.72364 9.64187C4.27159 10.4192 2.62405 12.6703 2.62405 15.2436C2.62401 15.3371 2.58685 15.4268 2.52073 15.4929C2.45462 15.5591 2.36495 15.5963 2.27143 15.5964ZM14.7302 15.5964C14.6839 15.5964 14.6379 15.5873 14.5951 15.5696C14.5522 15.5519 14.5133 15.5259 14.4805 15.4931C14.4476 15.4603 14.4216 15.4214 14.4039 15.3785C14.3861 15.3357 14.377 15.2898 14.377 15.2434C14.377 12.6702 12.7296 10.419 10.2775 9.6417C10.1891 9.61278 10.1156 9.5501 10.0732 9.4673C10.0307 9.38449 10.0227 9.28827 10.0508 9.19957C10.0789 9.11086 10.1409 9.03685 10.2233 8.99364C10.3058 8.95043 10.4019 8.94152 10.4909 8.96884C11.8232 9.39178 12.9864 10.2278 13.812 11.3559C14.6376 12.484 15.0827 13.8455 15.0829 15.2434C15.0829 15.337 15.0457 15.4267 14.9796 15.4929C14.9135 15.559 14.8238 15.5963 14.7302 15.5964Z"
								fill="#EEEEEE"
							/>
							<path
								d="M8.48706 10.1006C7.4887 10.1006 6.52119 9.75453 5.74941 9.12122C4.97763 8.4879 4.44932 7.60657 4.2545 6.62739C4.05968 5.64822 4.21042 4.63178 4.68101 3.75128C5.15161 2.87078 5.91295 2.1807 6.83531 1.79862C7.75767 1.41653 8.78398 1.36609 9.73937 1.65588C10.6947 1.94568 11.5201 2.55778 12.0748 3.38788C12.6294 4.21799 12.8791 5.21475 12.7813 6.20831C12.6834 7.20187 12.2441 8.13076 11.5381 8.8367C11.1384 9.23863 10.6629 9.55728 10.1392 9.77422C9.61546 9.99117 9.05393 10.1021 8.48706 10.1006ZM8.48706 2.17599C6.49687 2.17599 4.87772 3.79514 4.87772 5.78534C4.87772 7.77553 6.49687 9.39468 8.48706 9.39468C10.4773 9.39468 12.0964 7.77553 12.0964 5.78534C12.0964 3.79514 10.4773 2.17599 8.48706 2.17599Z"
								fill="#EEEEEE"
							/>
						</svg>
						<span class="author-text">{{
							article?.author?.name || '无名氏'
						}}</span>
					</span>
				</div>
				<div class="desc">
					{{ article.desc || 'QAQ' }}
				</div>
				<div class="tags">
					<div class="tags-item">前端</div>
				</div>
			</div>
		</NuxtLink>
	</div>
</template>
<style lang="scss" scoped>
	// 卡片
	.postcard {
		background: rgba(236, 236, 236, 0.3);
		backdrop-filter: blur(12px);
		height: 380px;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.3);
		transition: all 0.2s ease-out;
		&:hover {
			transform: translateY(-12px);
		}
	}
	// 封面
	.cover-wrapper {
		position: relative;
		transition: all 0.2s ease-out;
		width: 100%;
		height: 250px;
		.cover {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.mask {
			position: absolute;
			top: 0;
			z-index: 999;
			height: 100%;
			width: 100%;

			&.down {
				background: rgba(35, 35, 35, 0.3);
				animation: mask-down 0.4s 1;
			}
		}
	}

	// 简介
	.info-wrapper {
		display: flex;
		flex-direction: column;
		margin-top: 12px;
		padding: 0 20px;
		.info-one {
			margin-bottom: 6px;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			.title {
				font-size: 18px;
				font-weight: 600;
				font-family: Inter;
			}
			.author {
				display: flex;
				font-size: 14px;
				align-items: flex-end;
				.author-icon {
					margin-right: 6px;
				}
				.author-text {
					transform: translateY(2px);
				}
			}
		}

		.desc {
			height: 40px;
			line-height: 20px;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-line-clamp: 2;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			margin-bottom: 12px;
		}
	}
	@keyframes mask-down {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0);
		}
	}
</style>
