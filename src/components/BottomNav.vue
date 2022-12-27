<template>
  <div class="flex justify-center items-center gap-x-8 bg-white">
    <NuxtLink
      href="/students"
      :class="bottomNavLink">
      <div :class="bottomNavLinkIcon">
        <Icon :type="constants.students" class="w-[24px] h-[24px]" :active="route.name === constants.students" />
      </div>
      <div class="capitalize" :class="subline_small + ' ' + color(constants.students)">students</div>
    </NuxtLink>
    <NuxtLink
      href="/teachers"
      :class="bottomNavLink">
      <div :class="bottomNavLinkIcon">
        <Icon :type="constants.teachers" class="w-[24px] h-[24px]" :active="route.name === constants.teachers" />
      </div>
      <div class="capitalize" :class="subline_small + ' ' + color(constants.teachers)">teachers</div>
    </NuxtLink>
    <div
      @click="signOut"
      :class="bottomNavLink">
      <div :class="bottomNavLinkIcon">
        <Icon :type="constants.signout" class="w-[24px] h-[24px]" />
      </div>
      <div class="capitalize" :class="subline_small + ' ' + color(constants.signout)">signout</div>
    </div> 
  </div>
</template>
<script setup lang="ts">

// data / var
const { subline_small, bottomNavLink, bottomNavLinkIcon } = useUi()
const route = useRoute()
const supabase = useSupabaseAuthClient()

// functions
const color = (type: string) => route.name === type ? `text-rcnblue-500` : `text-rcngray-900`
const signOut = async () => {
  await supabase.auth.signOut()
  navigateTo("/")
}
</script>
<style lang="">
    
</style>