<template>
  <div aria-label="studentswrap" :class="studentswrap">
    <div aria-label="studentslist" :class="studentslist">
      <div aria-label="studentslistfilternstatus" :class="studentslistfilternstatus">
        <ComboBox v-if="students.length > 0" :students="students" @persons="handlePersons" @person="handlePerson" />
        <div v-else></div>
        <div :class="studentsliststatus">
          {{ status }}
        </div>
      </div>
      <div aria-label="studentslistcards" :class="studentslistcardsclass">
        <Student v-for="(student, idx) in rendered" :key="idx" :student="student" @click="selectStudent(student)" />
      </div>
    </div>
    <Selected v-selected :student="student" :media="media" :class="studentslistselection" />
  </div>
</template>
<script setup lang="ts">
import { iDataApiOptions, iStudent, iMedia, iPerson } from '../types';
import { vSelected } from '../helpers/directives';

const pageName = ref(useRoute().name)
const students = ref<iStudent[]>([])
const rendered = ref<iStudent[]>(placeholderStudents)
const student = ref<iStudent>(placeholderStudents[0])
const media = ref<iMedia[]>([])
const {
  studentswrap,
  studentslist,
  studentslistfilternstatus,
  studentsliststatus,
  studentslistcards,
  studentslistselection
} = useUi()

const options: iDataApiOptions = {
  table: "students",
  column: "",
  value: "",
  update: ""
}

const { data, refresh } = await useLazyFetch(() => constants.dataApiUrl, { params: { ...options } })

const status = computed(() => students.value.length === 0 ? 'Loading...' : `${students.value.length} ${pageName.value as string}`)
const studentslistcardsclass = computed(
  () => students.value.length === rendered.value.length
  ? `${studentslistcards} h-reversestudents landscape:h-full`
  : studentslistcards
)

const selectStudent = async (selection: iStudent) => {
  student.value = selection
  
  const email = selection.email ?? ""
  const options: iDataApiOptions = {
    table: "media",
    column: "email",
    value: email,
    update: ""
  }
  const { data, error } = await useFetch(() => constants.dataApiUrl, { params: { ...options } })
  if (data.value) { media.value = data.value as iMedia[] }
  if (error.value) { media.value = [] }
}

watch(data, async () => {
  students.value = data.value as iStudent[]
  rendered.value = data.value as iStudent[]
  await selectStudent(rendered.value[0])
})

const handlePerson = async (person: iPerson) => await selectStudent(person)
const handlePersons = (persons:iPerson[]) => rendered.value = persons

onMounted(async () => await refresh())

</script>
<style lang="">
  
</style>