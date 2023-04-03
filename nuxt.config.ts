// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Mierku's Blog",
      meta: [
        {
          name: 'description',
          content: '兴趣使然的弥尔君',
        },
        { name: 'keywords', content: '博客,blog,技术,生活' },
      ],
    },
  },
  runtimeConfig: {
    isServer: true,
    public: {
      baseURL: '',
    },
  },

  modules: ['@element-plus/nuxt', '@vueuse/nuxt', '@pinia/nuxt'],
  css: ['@/assets/style/base.scss'],
})
