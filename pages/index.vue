<script setup lang="ts">
// definePageMeta({
// 	documentDriven: false,

import { recordPV, recordUV } from '~~/composables/api/useWebLog'

// })
async function test() {
  await recordPV()
  await recordUV()
}
</script>
<template>
  <button @click="test()">发送请i去</button>
  <!-- <NuxtLayout></NuxtLayout> -->
</template>
