<template>
  <div class="h-full w-screen flex flex-col sm:flex-row justify-center items-center font-body relative">
    <NuxtLink href="/" :class="logo">
      <img src="/icons/logo-colored.svg" alt="logo"/>
    </NuxtLink>
    <div aria-label="slides" class="relative w-full h-40% overflow-hidden sm:h-full sm:w-40%">
      <div aria-label="slide" class="h-full w-full flex items-center justify-center" :style="coverStyle"></div>
    </div>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">

const { logo } = useUi()

const coverObj = {
  "background-image": "url('/images/kids_678x452.png')",
  "background-repeat": "no-repeat",
  "background-position": "center",
  "background-size": "cover"
}
const coverStyle = ref(obj2Str(coverObj))
</script> 