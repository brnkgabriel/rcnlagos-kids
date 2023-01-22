<template>
  <div
    class="max-w-full mx-auto h-full w-screen flex flex-col justify-between items-center font-body relative bg-rcngray-500">
    <TopNav :avatar="imgSrc(avatar)" :user-name="'user'" class="h-[56px] w-full p-2" />
    <div class="px-2 h-middle w-full my-2 text-sm">
      <!-- <Register v-if="false" /> -->
      <slot v-if="true"></slot>
    </div>
    <BottomNav class="h-[56px] w-full" />
  </div>
</template>
<script setup lang="ts">import { iDataApiOptions, iDynamicObject, iTeacher } from '../types';

 

const { globalState, setUserData } = useGlobals()
const user = useSupabaseUser()

const avatar = computed(() => globalState.value.user.data.imageUrl ?? '')

const getUserData = async () => {
  const options: iDataApiOptions = {
    table: "teachers",
    column: "email",
    value: user.value?.email as string,
    update: "",
    foreignkey: ""
  }
  const { data } = await useFetch(constants.dataApiUrl, { params: { ...options } })
  const obj = data.value as iDynamicObject
  let teacher:iTeacher = {}
  
  if (obj[0]) {
    teacher = obj[0] as iTeacher
  }

  if (!obj[0]) {
    teacher = {
      email: user.value?.email,
      type: "Parent"
    }
  }

  setUserData(teacher)
}

await getUserData()

</script> 