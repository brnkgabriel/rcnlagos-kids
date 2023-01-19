<template>
  <div class="text-sm flex flex-col gap-y-4">
    <SwitchComp left="parent" right="admin" name="authType" :value="value" />
    <div>
      <div aria-label="pin" class="text-center">
        <div class="capitalize">enter passcode</div>
        <div aria-label="circles" class="flex gap-x-2 justify-center items-center">
          <div aria-label="circle" class="border border-gray-500 rounded-full w-2 h-2"></div>
          <div aria-label="circle" class="border border-gray-500 rounded-full w-2 h-2"></div>
          <div aria-label="circle" class="border border-gray-500 rounded-full w-2 h-2"></div>
          <div aria-label="circle" class="border border-gray-500 rounded-full w-2 h-2"></div>
        </div>
      </div>
      <div aria-label="phonenumber" class="text-center">
        <div class="capitalize">enter phone number</div>
        <div aria-label="squares" class="grid grid-cols-12 gap-2 justify-items-center items-center">
          <div aria-label="circle" class="border-b-2 border-gray-500"></div>
          <div aria-label="circle" class="border-b-2 border-gray-500"></div>
          <div aria-label="circle" class="border-b-2 border-gray-500"></div>
          <div aria-label="circle" class="border-b-2 border-gray-500"></div>
          <div aria-label="circle" class="w-6 h-6"></div>
          <div aria-label="circle" class="border-b-2 border-gray-500"></div>
          <div aria-label="circle" class="border-b-2 border-gray-500"></div>
          <div aria-label="circle" class="border-b-2 border-gray-500"></div>
          <div aria-label="circle" class="w-6 h-6"></div>
          <div aria-label="circle" class="border-b-2 border-gray-500"></div>
          <div aria-label="circle" class="border-b-2 border-gray-500"></div>
          <div aria-label="circle" class="border-b-2 border-gray-500"></div>
          <div aria-label="circle" class="border-b-2 border-gray-500"></div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 grid-rows-4 gap-2 items-center justify-items-center w-[152px] mx-auto">
      <div v-for="(num, idx) in 10" @click="handleClick" :key="idx" :class="cellClass(idx)">{{ (num).toString().slice(-1) }}
      </div>
      <Icon @click="handleClick" :type="constants.left" :active="true" :class="iconClass('col-start-1 col-end-1 row-start-4 row-end-4 p-2')" />
      <Icon @click="handleClick" :type="constants.right" :active="true" :class="iconClass('col-start-3 col-end-3 row-start-4 row-end-4 p-2')" />
    </div>

  </div>
</template>
<script setup lang="ts">

const { numpad } = useUi()
const switchRef = ref("parent")

const value = (selected: string) => switchRef.value = selected
watch(switchRef, () => console.log("switch ref value is", switchRef.value))

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