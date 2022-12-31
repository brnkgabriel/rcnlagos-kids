<template>
  <div class="h-full overflow-auto">
    <Selected v-selected />
    <div class="h-[24px] text-xxs uppercase text-rcnblue-500 my-2 font-bold opacity-50">
      {{ students.length }} {{ pageName }}
    </div>
    <div v-if="students.length > 0" class="overflow-y-hidden overflow-x-auto w-full whitespace-nowrap">
      <Student v-for="(student, idx) in students" :key="idx" :student="student"/>
    </div>
    <div v-else="students.length === 0">Loading...</div>
  </div>
</template>
<script setup lang="ts">
import { iDataApiOptions, iStudent } from '../types';
import { vSelected } from '../helpers/directives';

const pageName = ref(useRoute().name)
const students = ref<iStudent[]>([])
const { subline } = useUi()

const options: iDataApiOptions = {
  table: "students",
  column: "",
  value: "",
  update: ""
}
const { data, error } = await useLazyFetch(() => constants.dataApiUrl, {
  params: { ...options }
})

watch(data, () => {
  students.value = data.value as iStudent[]
})

console.log("expecting error to be", error.value)
</script>
<style lang="">
  
</style>