<template>
  <div class="h-full overflow-auto">
    <Selected v-selected />
    <div v-if="students.length > 0" v-for="(student, idx) in students" :key="idx">
    {{ student.firstName }} {{ student.lastName }}
    </div>
    <div v-else="students.length === 0">Loading...</div>
  </div>
</template>
<script setup lang="ts">
import { iDataApiOptions, iStudent } from '../types';
import { vSelected } from '../helpers/directives';

const students = ref<iStudent[]>([])

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