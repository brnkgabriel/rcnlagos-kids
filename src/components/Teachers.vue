<template>
  <div class="h-full overflow-auto">
    <div v-if="teachers.length > 0" v-for="(student, idx) in teachers" :key="idx">
    {{ student.firstName }} {{ student.lastName }}
    </div>
    <div v-else="students.length === 0">Loading...</div>
  </div>
</template>
<script setup lang="ts">
import { iDataApiOptions, iTeacher } from '../types';

const teachers = ref<iTeacher[]>([])

const options: iDataApiOptions = {
  table: "teachers",
  column: "",
  value: "",
  update: ""
}
const { data, error } = await useLazyFetch(() => constants.dataApiUrl, {
  params: { ...options }
})

watch(data, () => {
  teachers.value = data.value as iTeacher[]
})

console.log("expecting error to be", error.value)
</script>
<style lang="">
  
</style>