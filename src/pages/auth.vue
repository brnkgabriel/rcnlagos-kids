<template lang="">
  <div aria-label="homelayoutbottomcontentwrap" :class="homelayoutbottomcontentwrap">
    <Numpad v-if="hasSignedInWithEmail" />
    <div v-if="!hasSignedInWithEmail" aria-label="loginnavlink" :class="loginnavlink()" @click="signIn">
      <img src="/icons/google.svg" :class="loginnavicon" alt="google drive"/>
      <div>Google</div>
    </div>
  </div>
</template>
<script setup lang="ts">

const { homelayoutbottomcontentwrap, btn, loginnavicon } = useUi()
const loginnavlink = () => `${btn.replace("w-fit", "")} relative cursor-pointer gap-x-4 flex items-center justify-center w-[150px]`

const { globalState, setEmail } = useGlobals()
const client = useSupabaseClient()
const user = useSupabaseUser()

const email = user.value?.email ? user.value?.email : ""

setEmail(email)

const hasSignedInWithEmail = computed(() => globalState.value.user.email.length > 0)


const signIn = async() => {
  await client.auth.signInWithOAuth({ provider: "google" })
}

definePageMeta({
  layout: "home"
})
</script>