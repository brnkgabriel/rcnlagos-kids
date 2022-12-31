<template>
  <div class="shadow-custom bg-white flex justify-between items-center relative">
    <NuxtLink href="/" class="">
      <img class="h-[32px]" src="/images/rcn-logo.png" alt="rcn logo"/>
    </NuxtLink>
    <div aria-label="site name" :class="sitename">
      <div>children</div>
      <div>department</div>
    </div>
    <div aria-label="notification" class="rounded-full border-2 border-bglight-700 p-[2px] h-[40px] w-[40px] cursor-pointer" @click="toggleDropdown">
      <img class="rounded-full" :src="imgSrc(props.avatar as string)" alt="avatar"/>
    </div>
    <Dropdown :user-name="userName" />
  </div>
</template>
<script setup lang="ts">

const { mainline, center, flex_center } = useUi()

const show = ref(false)
const sitename = ref(`${center} ${flex_center} ${mainline} uppercase font-bold font-title`)

const toggleDropdown = () => {
  console.log("toggling dropdown") 
  show.value = !show.value
}

provide("show", { show })

const props = defineProps<{
  avatar?: string
  userName?: string
}>()
</script>