<template>
	<NuxtLayout>
		<main class="site-account">
			<div class="account-wrapper">
				<div class="account-input-wrapper">
					<div class="account-uname account-input-item">
						<span>用户名</span>
						<input type="text" />
					</div>
					<div class="account-pass account-input-item">
						<span>密码</span>
						<input type="password" />
					</div>
				</div>
			</div>
		</main>
	</NuxtLayout>
</template>
<style lang="scss">
	.site-account {
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.account-wrapper {
		width: 500px;
		height: 300px;
		border-radius: 12px;
		background: rgba(36, 36, 36, 0.2);
		backdrop-filter: blur(12px);
		.account-input-wrapper {
			display: flex;
			flex-direction: column;
			.account-input-item {
				display: flex;
				span {
					width: 50px;
				}
			}
		}
	}
</style>
