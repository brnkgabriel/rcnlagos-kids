<template>
  <div class="h-full overflow-hidden flex flex-col md:flex-row md:gap-x-2 landscape:flex-row landscape:gap-x-2">
    <Selected v-selected :student="student" class="md:w-1/2 landscape:w-1/2" />
    <div class="md:h-full w-full md:w-1/2 landscape:h-full landscape:w-1/2">
      <div class="h-[24px] text-xxs uppercase text-rcnblue-500 my-2 font-bold opacity-50">
        {{ students.length }} {{ pageName }}
      </div>
      <div class="flex flex-wrap gap-2 h-[100px] sm:h-[150px] md:h-students landscape:h-students overflow-y-auto overflow-x-hidden">
        <Student v-for="(student, idx) in students" :key="idx" :student="student" @click="selectStudent(student)" />
      </div>
    </div>
    <div v-if="students.length === 0">Loading...</div>
  </div>
</template>
<script setup lang="ts">
import { iDataApiOptions, iStudent } from '../types';
import { vSelected } from '../helpers/directives';

const pageName = ref(useRoute().name)
const students = ref<iStudent[]>([])
const student = ref<iStudent>({})
const { subline } = useUi()

const options: iDataApiOptions = {
  table: "students",
  column: "",
  value: "",
  update: ""
}
const { data, refresh } = await useLazyFetch(() => constants.dataApiUrl, {
  params: { ...options }
})

const selectStudent = (selection: iStudent) => {
  console.log("selected student is", selection)
  student.value = { ...student.value, ...selection }
}

watch(data, () => {
  console.log("watching data", data.value)
  students.value = data.value as iStudent[]
})


onMounted(async () => {
  await refresh()
  console.log("on mounted data is", data)
})

</script>
<style lang="">
  
</style>