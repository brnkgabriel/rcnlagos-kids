<template>
  <div :class="studentsComponent">
    <Selected v-selected :student="student" :media="media" class="md:w-1/2 landscape:w-1/2 portrait:w-full" />
    <div class="h-40% md:h-full w-full md:w-1/2 landscape:h-full landscape:w-1/2 portrait:w-full md:portrait:h-1/2">
      <div class="py-2 flex justify-between items-center sticky z-10">
        <div class="text-xxs uppercase text-rcnblue-500 my-2 font-bold opacity-50">
          {{ status }}
        </div>
        <ComboBox v-if="students.length > 0" :students="students" @people="handlePeople" />
      </div>
      <div class="flex flex-wrap gap-2 h-students landscape:h-students overflow-y-auto overflow-x-hidden pb-4">
        <Student v-for="(student, idx) in students" :key="idx" :student="student" @click="selectStudent(student)" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { iDataApiOptions, iStudent, iMedia, iPerson } from '../types';
import { vSelected } from '../helpers/directives';

const pageName = ref(useRoute().name)
const students = ref<iStudent[]>([])
const student = ref<iStudent>({})
const media = ref<iMedia[]>([])
const { studentsComponent } = useUi()

const options: iDataApiOptions = {
  table: "students",
  column: "",
  value: "",
  update: ""
}
const status = computed(() => students.value.length === 0 ? 'Loading...' : `${students.value.length} ${pageName.value as string}`)
const { data, refresh } = await useLazyFetch(() => constants.dataApiUrl, { params: { ...options } })

const selectStudent = async (selection: iStudent) => {
  student.value = { ...student.value, ...selection }
  
  const email = selection.email ?? ""
  const options: iDataApiOptions = {
    table: "media",
    column: "email",
    value: email,
    update: ""
  }
  const { data, error } = await useFetch(() => constants.dataApiUrl, { params: { ...options } })
  if (data.value) {
    media.value = data.value as iMedia[]
  }
  if (error.value) {
    media.value = []
  }
}

watch(data, () => {
  students.value = data.value as iStudent[]
})

const handlePeople = (people: iPerson[]) => {
  console.log("emitted people are", people)
}

onMounted(async () => await refresh())

</script>
<style lang="">
  
</style>