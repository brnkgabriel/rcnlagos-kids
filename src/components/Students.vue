<template>
  <div aria-label="studentswrap" :class="studentswrap">
    <div aria-label="studentslist" :class="studentslist">
      <div aria-label="studentslistfilternstatus" :class="studentslistfilternstatus">
        <ComboBox v-if="globalState.students.length > 0" :students="globalState.students" @persons="handlePersons" @person="handlePerson" />
        <div v-else></div>
        <div :class="studentsliststatus">
          {{ status }}
        </div>
      </div>
      <div aria-label="studentslistcards" :class="studentslistcardsclass">
        <Student v-for="(student, idx) in rendered" :key="idx" :student="student" @click="selectedStudent = student" />
      </div>
    </div>
    <Selected :student="selectedStudent" :class="studentslistselection" />
  </div>
</template>
<script setup lang="ts">
import { iDataApiOptions, iStudent, iPerson } from '../types';

const {
  studentswrap,
  studentslist,
  studentslistfilternstatus,
  studentsliststatus,
  studentslistcards,
  studentslistselection
} = useUi()

const { globalState, setStudents } = useGlobals()

const pageName = ref(useRoute().name)
const rendered = ref<iStudent[]>(placeholderStudents)
const selectedStudent = ref<iStudent>(placeholderStudents[0])

const options: iDataApiOptions = {
  table: "students",
  column: "",
  value: "",
  update: "",
  foreignkey: "media(*)"
}

const { data, refresh } = await useLazyFetch(() => constants.dataApiUrl, { params: { ...options } })

const status = computed(() => globalState.value.students.length === 0 ? 'Loading...' : `${globalState.value.students.length} ${pageName.value as string}`)
const studentslistcardsclass = computed(
  () => globalState.value.students.length === rendered.value.length
  ? `${studentslistcards} h-reversestudents landscape:h-full`
  : studentslistcards
)

watch(data, async () => {
  setStudents(data.value as iStudent[])
  rendered.value = globalState.value.students
  selectedStudent.value = rendered.value[0]
})

const handlePerson = async (person: iPerson) => selectedStudent.value = person
const handlePersons = (persons:iPerson[]) => rendered.value = persons

onMounted(async () => {
  await refresh()
  window.addEventListener("resize", () => {
    console.log("what device landscape is this", whatDeviceLandscapeIsThis())
  })
})
</script>