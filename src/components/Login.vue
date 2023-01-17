<template>
  <div :class="loginwrap">
    <div aria-label="logintopslides" :class="logintopslides">
      <div aria-label="logintopslide" :class="logintopslide" :style="slideStyle"></div>
    </div>
    <div aria-label="loginbottomcontent" :class="loginbottomcontent">

      <div aria-label="logintitle" :class="logintitle">
        <div aria-label="loginmainline" :class="mainline">Sign in to your account</div>
      </div>

      <div aria-label="loginnavigation" :class="loginnavigation">
        <div aria-label="loginnavlink" :class="loginnavlink()" @click="signIn">
          <img src="/icons/google.svg" :class="loginnavicon" alt="google drive"/>
          <div>Google</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { iDynamicObject } from "~~/src/types/index"

const client = useSupabaseClient()
const slideObject: iDynamicObject = {
  "background-image": "url('/images/kids_678x452.png')",
  "background-repeat": "no-repeat",
  "background-position": "center",
  "background-size": "cover"
}

const slideStyle = ref(obj2Str(slideObject))

const {
  mainline,
  btn,
  loginwrap,
  logintopslides,
  logintopslide,
  loginbottomcontent,
  logintitle,
  loginnavigation,
  loginnavicon
} = useUi()

const loginnavlink = () => `${btn} relative cursor-pointer`

const signIn = async() => {
  await client.auth.signInWithOAuth({ provider: "google" })
}
</script>