<template lang="">
  <div
    aria-label="dropdown" 
    :class="dropdown + ' ' + hidden"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="menu-button"
    tabindex="-1">
    <div role="none">
      <div :class="dropdownLogout" @click="signOut">logout</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const supabase = useSupabaseAuthClient()
const props = defineProps<{
  userName: any;
}>();

const { dropdown, dropdownLogout } = useUi()

const signOut = async () => {
  await supabase.auth.signOut()
  const userCookie = useCookie("user")
  userCookie.value = null
  navigateTo("/")
}
// @ts-ignore
const { show } = inject("show")

const hidden = computed(() => show.value ? "" : "hidden")

watch(show, () => console.log("hide is", show.value))

</script>
<style lang=""></style>
