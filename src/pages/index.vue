<template>
  <div class="w-full h-full">
    <div aria-label="slides" class="relative w-full h-40% overflow-hidden">
      <div aria-label="slide" class="h-full w-full flex items-center justify-center" :style="coverStyle"></div>
    </div>
    <div aria-label="bottom content" class="flex flex-col gap-y-6 h-60% justify-center items-center">
      <div aria-label="note" class="text-center">
        <div aria-label="welcome" :class="mainline">Welcome to</div>
        <div aria-label="rcnlagos" :class="mainline">Remnant Christian Network Lagos</div>
        <div aria-label="footnote" :class="subline_small">Towards the rebirth of Apostolic Christianity</div>
      </div>

      <div aria-label="title" class="flex flex-col text-center text-white font-extrabold">
        <div aria-label="top" class="uppercase font-body text-shadow text-3xl">children</div>
        <div aria-label="bottom" class="uppercase font-body text-shadow text-3xl">department</div>
      </div>

      <div aria-label="navigation" class="flex flex-col justify-center items-center gap-y-2">
        <NuxtLink href="/teachers" :class="homeNavLink">Teachers</NuxtLink>
        <NuxtLink href="/students" :class="homeNavLink">Students</NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const { homeNavLink, subline_small, mainline } = useUi()
const coverStyle = ref(`background:url('/images/kids_678x452.png') no-repeat;background-position:center;background-size:cover`)

definePageMeta({
  layout: "home"
})
</script>