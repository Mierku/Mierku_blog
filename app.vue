<script lang="ts" setup>
import FingerprintJS from '@fingerprintjs/fingerprintjs'
// import { recordUV, recordPV } from './composables/api/useWebLog'
import { getZhanZ } from './composables/api/useZhanZ'
const { data } = await getZhanZ()
const info = useGlobalInfo()

if (data.value) {
  info.storeZhanZ(data.value.data)
}
onMounted(async () => {
  const nowDate = new Date().getFullYear()
  const fpPromise = FingerprintJS.load()
  const fingerprint3 = useCookie('fingerprint3', {
    expires: new Date(new Date().setFullYear(nowDate + 1)),
  })
  ;(async () => {
    // Get the visitor identifier when you need it.
    const fp = await fpPromise
    const result = await fp.get()
    fingerprint3.value = result.visitorId
  })()
})
</script>
<template>
  <NuxtPage />
</template>
