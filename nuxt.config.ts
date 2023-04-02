// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-cmn-Hans',
      },
    },
  },
  runtimeConfig: {
    isServer: true,
    // // The private keys which are only available server-side
    // apiSecret: '',
    // Keys within public are also exposed client-side
    public: {
      baseURL: '',
    },
  },

  modules: ['@element-plus/nuxt', '@vueuse/nuxt', '@pinia/nuxt'],
  css: ['@/assets/style/base.scss'],
})
