<template>
  <div class="text-sm flex flex-col gap-y-4">
    <SwitchComp left="parent" right="admin" name="authType" :value="value" />
    <input type="text" :placeholder="(placeholderRef as string)" :class="input" class="pointer-events-none" />
    <div class="grid grid-cols-3 grid-rows-4 gap-2 items-center justify-items-center w-[152px] mx-auto">
      <div v-for="(num, idx) in 10" @click="handleClick" :key="idx" :class="cellClass(idx)" :data-num="(num).toString().slice(-1)">{{ (num).toString().slice(-1) }}
      </div>
      <Icon @click="handleClick" :type="constants.left" :active="true" :class="iconClass('col-start-1 col-end-1 row-start-4 row-end-4 p-2')" />
      <Icon @click="handleClick" :type="constants.right" :active="true" :class="iconClass('col-start-3 col-end-3 row-start-4 row-end-4 p-2')" />
    </div>

  </div>
</template>
<script setup lang="ts">

import { iDynamicObject } from "~~/src/types/index"
 
const { numpad, input } = useUi()
const switchRef = ref(constants.parents)
const map: iDynamicObject = {
  parent: "Enter phone number",
  admin: "Enter pin"
}

const value = (selected: string) => switchRef.value = selected
const placeholderRef = computed(() => map[switchRef.value])

const cellClass = (idx: number) => `${numpad} ${(idx === 9) && 'col-start-2 col-end-2'}`
const iconClass = (pos: string) => `${numpad} ${pos}`

const handleClick = (evt: Event) => {
  const target = evt.target as HTMLElement
  target.classList.add("pop")
  setTimeout(() => target.classList.remove("pop"), 150);
}
</script>
<style lang="">
  
</style>