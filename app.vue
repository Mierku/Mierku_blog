<script lang="ts" setup>
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { recordIP, recordPV } from './composables/api/useWebLog'

onMounted(async () => {
  // const y = await recordIP()
  // const x = await recordPV()
  // console.log('y', y, 'x', x)

  // Initialize an agent at application startup.
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
  <div>
    <NuxtPage />
  </div>
</template>
