import { defineStore } from 'pinia'
import { zhanzInfo } from './api/useZhanZ'

export const useGlobalInfo = defineStore('GlobalInfo', {
  state: () => ({
    zhanz: {
      name: '',
      sgn: '',
      avatar: '',
    },
  }),
  actions: {
    storeZhanZ(info: zhanzInfo) {
      Object.assign(this.zhanz, info)
    },
  },
})
