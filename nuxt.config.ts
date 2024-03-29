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
  css: ['@/assets/style/base.scss'],
})
