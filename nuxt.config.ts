// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	runtimeConfig: {
		isServer: true,
		// // The private keys which are only available server-side
		// apiSecret: '',
		// Keys within public are also exposed client-side
		public: {
			baseURL: '',
		},
	},
	modules: ['@element-plus/nuxt', '@vueuse/nuxt'],
	// content: {
	// 	highlight: {
	// 		// Theme used in all color schemes.
	// 		theme: 'github-dark',
	// 		// OR
	// 		// theme: {
	// 		// 	// Default theme (same as single string)
	// 		// 	default: 'github-light',
	// 		// 	// Theme used if `html.dark`
	// 		// 	dark: 'github-dark',
	// 		// 	// Theme used if `html.sepia`
	// 		// 	sepia: 'monokai',
	// 		// },
	// 	},
	// },
	css: ['@/assets/style/base.scss'],
})
