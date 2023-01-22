<template>
  <div class="h-full">
    <div v-if="globalState.students.length > 0" aria-label="original personswrap" :class="personswrap">
      <div ref="personsListRef" aria-label="personslist" :class="personslist">
        <div aria-label="personslistfilternstatus" :class="personslistfilternstatus">
          <ComboBox :persons="globalState.students" @persons="handlePersons" @person="handlePerson" />
          <div :class="personsliststatus">
            {{ status }}
          </div>
        </div>
        <div ref="thumbnailListRef" aria-label="studentslistcards" :class="personslistcards" :style="thumbnailsStyle" v-infinite-scroll>
          <Thumbnail
            v-for="(student, idx) in globalState.renderedStudents"
            :key="idx"
            :person="student"
            :class="position(idx, globalState.renderedStudents)"
            @click="handleClick(student)" />
        </div>
      </div>
      <Selected :person="selectedStudent" :class="personslistselection" />
    </div>
    <div v-else aria-label="skeleton personswrap" :class="personswrap">
      <div aria-label="personslist" :class="personslist">
        <div aria-label="personslistfilternstatus" :class="personslistfilternstatus">
          <div aria-label="combobox"></div>
          <div :class="personsliststatus">
            Loading...
          </div>
        </div>
        <div aria-label="studentslistcards" :class="personslistcards">
          <Thumbnail
            v-for="(student, idx) in skeletonStudents"
            :key="idx"
            :person="student"
            :class="position(idx, skeletonStudents)"
            @click="selectedStudent = student" />
        </div>
      </div>
      <Selected :person="skeletonSelectedStudent" :class="personslistselection" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { iDataApiOptions, iStudent, iPerson, iAuthType, iDynamicObject } from '../types';
import { vInfiniteScroll } from "~~/src/helpers/directives"
import { Ref } from 'vue';

const {
  personswrap,
  personslist,
  personslistfilternstatus,
  personsliststatus,
  personslistcards,
  personslistselection
} = useUi()

const { globalState, setStudents, setRenderedStudents, setSearchedStudents, setSelectedStudent } = useGlobals()
const pageName = ref(useRoute().name)
const skeletonStudents = ref<iStudent[]>(placeholderPersons)
const skeletonSelectedStudent = ref<iStudent>(placeholderPersons[0])
const selectedStudent = ref<iStudent>({})
const thumbnailListRef = ref<HTMLDivElement>()
const personsListRef = ref<HTMLDivElement>()

// todo: considering removing authType from globalState
// const column = globalState.value.authType.key === constants.parent ? "parentsContact" : ""
// const value = globalState.value.authType.key === constants.parent ? globalState.value.authType.value : ""

const userCookie = useCookie("user")
const pieces = userCookie.value?.split("|")
const obj = pieces?.reduce((acc: iDynamicObject, cur: string) => {
  const props = cur.split("=")
  acc[props[0]] = props[1]
  return acc
}, {})

const authType = obj as unknown as iAuthType

const column = authType.key === constants.parent ? "parentsContact" : ""
const value = authType.key === constants.parent ? authType.value : ""

// const column = globalState.value.authType.key === constants.parent ? "parentsContact" : ""
// const value = globalState.value.authType.key === constants.parent ? globalState.value.authType.value : ""

const options: iDataApiOptions = {
  table: "students",
  column,
  value,
  update: "",
  foreignkey: "media(*)"
} 

const { data, refresh } = await useLazyFetch(() => constants.dataApiUrl, { params: { ...options } })

const status = computed(() => globalState.value.searchedStudents.length === 0 ? 'Loading...' : `${globalState.value.searchedStudents.length} ${pageName.value as string}`)
const width = ref(Math.round(thumbnailListRef.value?.getBoundingClientRect().width as number))
const thumbnailsStyle = computed(() => {
  const thumbnailLen = globalState.value.renderedStudents.length
  let gridTemplateColumns = `repeat(${thumbnailLen}, 1fr)`
  if (width.value >= 640 && width.value < 768)
    gridTemplateColumns = `repeat(3, 1fr)`
  if (width.value >= 768 && width.value < 1024)
    gridTemplateColumns = `repeat(4, 1fr)`
  if (width.value >= 1024)
    gridTemplateColumns = `repeat(6, 1fr)`

  // return obj2Str({
  //   "grid-template-columns": width.value < 640 ? `repeat(${thumbnailLen}, 1fr)` : `repeat(3, 1fr)`
  // })
  return ""
})

watch(data, async () => {
  setStudents(data.value as iStudent[])
  setSearchedStudents(data.value as iStudent[])
  setRenderedStudents(globalState.value.searchedStudents.slice(0, constants.maxItemsToLoad))
  selectedStudent.value = globalState.value.renderedStudents[0]
  setSelectedStudent(globalState.value.renderedStudents[0])
})

const handleClick = (student: iStudent) => {
  selectedStudent.value = student
  setSelectedStudent(student)
}

const handlePerson = async (person: iPerson) => {
  selectedStudent.value = person
  setSelectedStudent(person)
}

const handlePersons = (persons:iPerson[]) => {
  setSearchedStudents(persons)
  setRenderedStudents(globalState.value.searchedStudents.slice(0, constants.maxItemsToLoad))
  selectedStudent.value = globalState.value.renderedStudents[0]
  updateThumbnailListHeight(thumbnailListRef as Ref<HTMLDivElement>, personsListRef as Ref<HTMLDivElement>)
}

onMounted(async () => {
  await refresh()
  window.addEventListener("resize", () => {
    width.value = Math.round(thumbnailListRef.value?.getBoundingClientRect().width as number)
  })
})
</script>