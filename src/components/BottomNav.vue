<template>
  <div aria-label="btm-nav-wrap" :class="btmnavwrap">
    <NuxtLink
      href="/students"
      :class="bottomNavLink">
      <div :class="bottomNavLinkIcon">
        <Icon :type="constants.students" class="w-[24px] h-[24px]" :active="route.name === constants.students" />
      </div>
      <div :class="navClass(constants.students)">students</div>
    </NuxtLink>
    <NuxtLink
      href="/teachers"
      :class="bottomNavLink">
      <div :class="bottomNavLinkIcon">
        <Icon :type="constants.teachers" class="w-[24px] h-[24px]" :active="route.name === constants.teachers" />
      </div>
      <div :class="navClass(constants.teachers)">teachers</div>
    </NuxtLink>
    <div
      @click="signOut"
      :class="bottomNavLink">
      <div :class="bottomNavLinkIcon">
        <Icon :type="constants.signout" class="w-[24px] h-[24px]" />
      </div>
      <div :class="navClass(constants.signout)">signout</div>
    </div> 
  </div>
</template>
<script setup lang="ts">

// data / var
const { btmnavwrap, subline_small, bottomNavLink, bottomNavLinkIcon } = useUi()
const route = useRoute()
const supabase = useSupabaseAuthClient()

// functions
const navClass = (type: string) => route.name === type 
  ? `capitalize ${subline_small} text-rcnblue-500`
  : `capitalize ${subline_small} text-rcngray-900`
  
const signOut = async () => {
  await supabase.auth.signOut()
  navigateTo("/")
}
</script>
<style lang="">
    
</style>