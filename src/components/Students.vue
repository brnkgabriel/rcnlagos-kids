<template>
  <div class="h-full">
    <div v-if="globalState.students.length > 0" aria-label="original studentswrap" :class="studentswrap">
      <div aria-label="studentslist" :class="studentslist">
        <div aria-label="studentslistfilternstatus" :class="studentslistfilternstatus">
          <ComboBox :students="globalState.students" @persons="handlePersons" @person="handlePerson" />
          <div :class="studentsliststatus">
            {{ status }}
          </div>
        </div>
        <div aria-label="studentslistcards" :class="studentslistcardsclass" v-infinite-scroll>
          <Student
            v-for="(student, idx) in globalState.renderedStudents"
            :key="idx"
            :student="student"
            :class="position(idx, globalState.renderedStudents)"
            @click="selectedStudent = student" />
        </div>
      </div>
      <Selected :student="selectedStudent" :class="studentslistselection" />
    </div>
    <div v-else aria-label="skeleton studentswrap" :class="studentswrap">
      <div aria-label="studentslist" :class="studentslist">
        <div aria-label="studentslistfilternstatus" :class="studentslistfilternstatus">
          <div aria-label="combobox"></div>
          <div :class="studentsliststatus">
            Loading...
          </div>
        </div>
        <div aria-label="studentslistcards" :class="studentslistcardsclass">
          <Student
            v-for="(student, idx) in skeletonStudents"
            :key="idx"
            :student="student"
            :class="position(idx, skeletonStudents)"
            @click="selectedStudent = student" />
        </div>
      </div>
      <Selected :student="skeletonSelectedStudent" :class="studentslistselection" />
    </div>
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

const { globalState, setStudents, setRenderedStudents, setSearchedStudents } = useGlobals()

const pageName = ref(useRoute().name)

const skeletonStudents = ref<iStudent[]>(placeholderStudents)
const skeletonSelectedStudent = ref<iStudent>(placeholderStudents[0])

const selectedStudent = ref<iStudent>({})

const options: iDataApiOptions = {
  table: "students",
  column: "",
  value: "",
  update: "",
  foreignkey: "media(*)"
}

const { data, refresh } = await useLazyFetch(() => constants.dataApiUrl, { params: { ...options } })

const status = computed(() => globalState.value.searchedStudents.length === 0 ? 'Loading...' : `${globalState.value.searchedStudents.length} ${pageName.value as string}`)
const studentslistcardsclass = computed(
  () => globalState.value.students.length === globalState.value.renderedStudents.length
  ? `${studentslistcards} h-reversestudents`
  : studentslistcards
)

watch(data, async () => {
  setStudents(data.value as iStudent[])
  setSearchedStudents(data.value as iStudent[])
  // setRenderedAndSelected(globalState.value.searchedStudents)
  setRenderedStudents(globalState.value.searchedStudents.slice(0, constants.maxItemsToLoad))
  selectedStudent.value = globalState.value.renderedStudents[0]
})

const setRenderedAndSelected = (fullList: iStudent[]) => {
  setRenderedStudents(fullList.slice(0, constants.maxItemsToLoad))
  selectedStudent.value = globalState.value.renderedStudents[0]
}


const handlePerson = async (person: iPerson) => selectedStudent.value = person
const handlePersons = (persons:iPerson[]) => {
  setSearchedStudents(persons)
  // setRenderedAndSelected(persons)
  setRenderedStudents(globalState.value.searchedStudents.slice(0, constants.maxItemsToLoad))
  selectedStudent.value = globalState.value.renderedStudents[0]
}

onMounted(async () => {
  await refresh()
  window.addEventListener("resize", () => {
    console.log("what device landscape is this", whatDeviceLandscapeIsThis())
  })
})
</script>