<template>
  <div :class="studentsComponent">
    <div class="mb-2 sm:h-full w-full sm:w-1/2 landscape:h-full landscape:w-1/2 portrait:w-full sm:portrait:h-1/2">
      <div class="pb-2 flex justify-between items-center sticky z-10">
        <div class="text-xxs uppercase text-rcnblue-500 my-2 font-bold opacity-50 w-1/4 overflow-hidden whitespace-nowrap text-ellipsis">
          {{ status }}
        </div>
        <ComboBox v-if="students.length > 0" :students="students" @persons="handlePersons" />
      </div>
      <div :class="cardListClass">
        <Student v-for="(student, idx) in rendered" :key="idx" :student="student" @click="selectStudent(student)" />
      </div>
    </div>
    <Selected v-selected :student="student" :media="media" class="sm:w-1/2 landscape:w-1/2 portrait:w-full" />
  </div>
</template>
<script setup lang="ts">
import { iDataApiOptions, iStudent, iMedia, iPerson } from '../types';
import { vSelected } from '../helpers/directives';

const pageName = ref(useRoute().name)
const students = ref<iStudent[]>([])
const rendered = ref<iStudent[]>([])
const student = ref<iStudent>({})
const media = ref<iMedia[]>([])
const { studentsComponent, cardList } = useUi()

const options: iDataApiOptions = {
  table: "students",
  column: "",
  value: "",
  update: ""
}

const { data, refresh } = await useLazyFetch(() => constants.dataApiUrl, { params: { ...options } })

const status = computed(() => students.value.length === 0 ? 'Loading...' : `${students.value.length} ${pageName.value as string}`)
const cardListClass = computed(() => students.value.length === rendered.value.length ? `${cardList} h-reversestudents landscape:h-full` : cardList)

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
  rendered.value = data.value as iStudent[]
})

const handlePerson = (person: iPerson) => {
  console.log("emitted person is", person)
  students.value = [person]
}

const handlePersons = (persons:iPerson[]) => {
  rendered.value = persons
}

onMounted(async () => await refresh())

</script>
<style lang="">
  
</style>