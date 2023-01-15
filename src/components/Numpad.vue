<template>
  <div class="grid grid-cols-3 grid-rows-4 gap-2">
    <div
      :class="numpad"
      v-for="(num, idx) in 10"
      @click="handleClick"
      :key="idx">{{ (num).toString().slice(-1) }}</div>
  </div>
</template>
<script setup lang="ts">

const { numpad } = useUi()

const handleClick = (evt: Event) => {
  const target = evt.target as HTMLElement
  target.classList.add("pop")
  setTimeout(() => {
    target.classList.remove("pop")
  }, 150);
}
</script>
<style lang="">
  
</style>