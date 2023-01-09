<template>
  <div :class="topnavwrap">
    <NuxtLink href="/" class="">
      <img :class="topnavlogo" src="/images/rcn-logo.png" alt="rcn logo"/>
    </NuxtLink>
    <div aria-label="topnavsitename" :class="topnavsitename">
      <div>children</div>
      <div>department</div>
    </div>
    <div aria-label="topnavnotification" :class="topnavnotification" @click="toggleDropdown">
      <img :class="topnavavatar" :src="imgSrc(props.avatar as string)" alt="avatar"/>
    </div>
    <Dropdown :user-name="userName" />
  </div>
</template>
<script setup lang="ts">

const {
  topnavwrap,
  topnavnotification,
  topnavavatar,
  topnavlogo,
  topnavsitename
} = useUi()

const show = ref(false)

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