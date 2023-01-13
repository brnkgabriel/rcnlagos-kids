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
        <div ref="thumbnailListRef" aria-label="studentslistcards" :class="personslistcards" v-infinite-scroll>
          <Thumbnail
            v-for="(student, idx) in globalState.renderedStudents"
            :key="idx"
            :person="student"
            :class="position(idx, globalState.renderedStudents)"
            @click="selectedStudent = student" />
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
import { iDataApiOptions, iStudent, iPerson } from '../types';
import { vInfiniteScroll } from "~~/src/helpers/directives"

const {
  personswrap,
  personslist,
  personslistfilternstatus,
  personsliststatus,
  personslistcards,
  personslistselection
} = useUi()

const { globalState, setStudents, setRenderedStudents, setSearchedStudents } = useGlobals()
const pageName = ref(useRoute().name)
const skeletonStudents = ref<iStudent[]>(placeholderPersons)
const skeletonSelectedStudent = ref<iStudent>(placeholderPersons[0])
const selectedStudent = ref<iStudent>({})
const thumbnailListRef = ref<HTMLDivElement>()
const personsListRef = ref<HTMLDivElement>()

const options: iDataApiOptions = {
  table: "students",
  column: "",
  value: "",
  update: "",
  foreignkey: "media(*)"
}

const { data, refresh } = await useLazyFetch(() => constants.dataApiUrl, { params: { ...options } })

const status = computed(() => globalState.value.searchedStudents.length === 0 ? 'Loading...' : `${globalState.value.searchedStudents.length} ${pageName.value as string}`)

watch(data, async () => {
  setStudents(data.value as iStudent[])
  setSearchedStudents(data.value as iStudent[])
  setRenderedStudents(globalState.value.searchedStudents.slice(0, constants.maxItemsToLoad))
  selectedStudent.value = globalState.value.renderedStudents[0]
})

const handlePerson = async (person: iPerson) => selectedStudent.value = person

const handlePersons = (persons:iPerson[]) => {
  setSearchedStudents(persons)
  setRenderedStudents(globalState.value.searchedStudents.slice(0, constants.maxItemsToLoad))
  selectedStudent.value = globalState.value.renderedStudents[0]
  updateThumbnailListHeight()
}

const updateThumbnailListHeight = () => {
  const fn = thumbnailListRef.value?.classList
  fn?.remove("landscape:h-auto")
  fn?.remove("landscape:h-thumbnails")
  // const thumbnailListHeight = getComputedStyle(thumbnailListRef.value as Element).height
  const thumbnailListHeight = thumbnailListRef.value?.getBoundingClientRect().height as number
  // 44 is the height of status bar, hence it's factored in
  // const personsListHeight = getComputedStyle(personsListRef.value as Element).height
  const personsListHeight = personsListRef.value?.getBoundingClientRect().height as number - 44
  const isThumbnailListHeightLess = thumbnailListHeight < personsListHeight


  console.log("thumbnailListHeight", thumbnailListHeight, "personsListHeight", personsListHeight, "isThumbnailListHeightLess", isThumbnailListHeightLess)

  thumbnailListHeight < personsListHeight ? fn?.add("landscape:h-auto") : fn?.add("landscape:h-thumbnails")
}

onMounted(async () => {
  await refresh()
  window.addEventListener("resize", () => {
    console.log("what device landscape is this", whatDeviceLandscapeIsThis())
  })
})
</script>