<script lang="ts" setup>
	// const activities = [
	// 	{
	// 		content: 'Event start',
	// 		date: '2018-05',
	// 		timestamp: '2018-05-15',
	// 	},
	// 	{
	// 		content: 'Approved',
	// 		date: '2018-05',
	// 		timestamp: '2018-05-13',
	// 	},
	// 	{
	// 		content: 'Success',
	// 		date: '2018-05',
	// 		timestamp: '2018-05-13',
	// 	},
	// 	{
	// 		content: 'Event start',
	// 		date: '2018-04',
	// 		timestamp: '2018-04-15',
	// 	},
	// 	{
	// 		content: 'Approved',
	// 		date: '2018-04',
	// 		timestamp: '2018-04-13',
	// 	},
	// 	{
	// 		content: 'Success',
	// 		date: '2018-04',
	// 		timestamp: '2018-04-11',
	// 	},
	// ]

	const activities = [
		{
			date: '2018-05',
			children: [
				{
					content: 'Event start',
					timestamp: '2018-05-15',
				},
				{
					content: 'Approved',
					timestamp: '2018-05-13',
				},
				{
					content: 'Success',
					timestamp: '2018-05-13',
				},
			],
		},
		{
			date: '2018-04',
			children: [
				{
					content: 'Event start',
					timestamp: '2018-04-15',
				},
				{
					content: 'Approved',
					timestamp: '2018-04-13',
				},
				{
					content: 'Success',
					timestamp: '2018-04-13',
				},
			],
		},
	]
</script>

<template>
	<NuxtLayout>
		<div class="timeline-content">
			<el-timeline class="timeline">
				<!-- 循环判断索引的奇偶区分开左右 -->
				<el-timeline-item
					v-for="(activity, index) in activities"
					:key="index"
					:class="index % 2 === 0 ? 'timeline-left' : 'timeline-right'"
					:timestamp="activity.date"
					placement="top"
				>
					<el-card
						v-for="(item, index) in activity.children"
						:key="index"
					>
						<h4>{{ item.timestamp }}</h4>
						<p>{{ item.content }}</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
		</div>
	</NuxtLayout>
</template>

<style scoped>
	/* `el-timeline`的容器`padding` */
	.timeline-content {
		padding: 80px;
	}
	.timeline {
		padding: 50px;
	}
	/* 右侧`el-timeline-item`的样式，将原始时间轴组件整体移动到右半侧 */
	.timeline-right {
		left: 50%;
		width: 50%;
	}
	/* 左侧`el-timeline-item`的样式，同上，仅是为了方便下面的CSS样式修改 */
	.timeline-left {
		left: 50%;
		width: 50%;
	}
	/* 针对左侧内容修改样式，注意这里使用的scss */
	.timeline-left :deep(.el-timeline-item__wrapper) {
		right: 100%;
		padding: 0 19px 0 0;
		text-align: right;
	}
	.el-card {
		margin-bottom: 24px;
	}
	:deep(.el-card__body) {
		background-color: #272727;
	}
	:deep(.el-card) {
		--el-border-color-light: rgba(36, 36, 36, 0.4);
		--el-card-bg-color: #272727;
		--el-text-color-primary: white;
	}
</style>
