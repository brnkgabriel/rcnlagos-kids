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
      <div aria-label="studentslistcards" :class="studentslistcardsclass" v-infinite-scroll>
        <Student
          v-for="(student, idx) in globalState.rndStudents"
          :key="idx"
          :student="student"
          :class="position(idx, globalState.rndStudents)"
          @click="selectedStudent = student" />
      </div>
    </div>
    <Selected :student="selectedStudent" :class="studentslistselection" />
  </div>
</template>
<script setup lang="ts">
import { iDataApiOptions, iStudent, iPerson } from '../types';
import { vInfiniteScroll } from "~~/src/helpers/directives"

const {
  studentswrap,
  studentslist,
  studentslistfilternstatus,
  studentsliststatus,
  studentslistcards,
  studentslistselection
} = useUi()

const { globalState, setStudents, setRenderedStudents } = useGlobals()

const pageName = ref(useRoute().name)
const rendered = ref<iStudent[]>(placeholderStudents)
const selectedStudent = ref<iStudent>(placeholderStudents[0])

setRenderedStudents(placeholderStudents)

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
  () => globalState.value.students.length === globalState.value.rndStudents.length
  ? `${studentslistcards} h-reversestudents`
  : studentslistcards
)

watch(data, async () => {
  setStudents(data.value as iStudent[])
  setRenderedStudents(globalState.value.students.slice(0, constants.maxItemsToLoad))
  selectedStudent.value = globalState.value.rndStudents[0]
})

const handlePerson = async (person: iPerson) => selectedStudent.value = person
const handlePersons = (persons:iPerson[]) => setRenderedStudents(persons)

onMounted(async () => {
  await refresh()
  window.addEventListener("resize", () => {
    console.log("what device landscape is this", whatDeviceLandscapeIsThis())
  })
})
</script>