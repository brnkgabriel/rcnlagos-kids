<template>
  <div class="h-full">
    <div v-if="globalState.teachers.length > 0" aria-label="original personswrap" :class="personswrap">
      <div aria-label="personslist" :class="personslist">
        <div aria-label="personslistfilternstatus" :class="personslistfilternstatus">
          <ComboBox :persons="globalState.teachers" @persons="handlePersons" @person="handlePerson" />
          <div :class="personsliststatus">
            {{ status }}
          </div>
        </div>
        <div aria-label="personslistcards" :class="personslistcardsclass" v-infinite-scroll>
          <Thumbnail
            v-for="(teacher, idx) in globalState.renderedTeachers"
            :key="idx"
            :person="teacher"
            :class="position(idx, globalState.renderedTeachers)"
            @click="selectedTeacher = teacher" />
        </div>
      </div>
      <Selected :person="selectedTeacher" :class="personslistselection" />
    </div>
    <div v-else aria-label="skeleton personswrap" :class="personswrap">
      <div aria-label="personslist" :class="personslist">
        <div aria-label="personslistfilternstatus" :class="personslistfilternstatus">
          <div aria-label="combobox"></div>
          <div :class="personsliststatus">
            Loading...
          </div>
        </div>
        <div aria-label="personslistcards" :class="personslistcardsclass">
          <Thumbnail
            v-for="(teacher, idx) in skeletonTeachers"
            :key="idx"
            :person="teacher"
            :class="position(idx, skeletonTeachers)"
            @click="selectedTeacher = teacher" />
        </div>
      </div>
      <Selected :person="skeletonSelectedTeacher" :class="personslistselection" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { iDataApiOptions, iPerson, iTeacher } from '../types';
import { vInfiniteScroll } from "~~/src/helpers/directives"

const {
  personswrap,
  personslist,
  personslistfilternstatus,
  personsliststatus,
  personslistcards,
  personslistselection
} = useUi()

const { globalState, setTeachers, setRenderedTeachers, setSearchedTeachers } = useGlobals()
const pageName = ref(useRoute().name)
const skeletonTeachers = ref<iTeacher[]>(placeholderPersons)
const skeletonSelectedTeacher = ref<iTeacher>(placeholderPersons[0])
const selectedTeacher = ref<iTeacher>({})

const options: iDataApiOptions = {
  table: "teachers",
  column: "",
  value: "",
  update: "",
  foreignkey: "teachermedia(*)"
}

const { data, refresh } = await useLazyFetch(() => constants.dataApiUrl, { params: { ...options } })

const status = computed(() => globalState.value.searchedTeachers.length === 0 ? 'Loading...' : `${globalState.value.searchedTeachers.length} ${pageName.value as string}`)
const personslistcardsclass = computed(
  () => globalState.value.searchedTeachers.length === globalState.value.renderedTeachers.length
  ? `${personslistcards} h-thumbnails landscape:h-auto`
  : personslistcards
)

watch(data, async () => {
  console.log("data.value from teachers", data.value)
  setTeachers(data.value as iTeacher[])
  setSearchedTeachers(data.value as iTeacher[])
  setRenderedTeachers(globalState.value.searchedTeachers.slice(0, constants.maxItemsToLoad))
  selectedTeacher.value = globalState.value.renderedTeachers[0]
})

const handlePerson = async (person: iPerson) => selectedTeacher.value = person

const handlePersons = (persons:iPerson[]) => {
  setSearchedTeachers(persons)
  setRenderedTeachers(globalState.value.searchedTeachers.slice(0, constants.maxItemsToLoad))
  selectedTeacher.value = globalState.value.renderedTeachers[0]
}

onMounted(async () => {
  await refresh()
  window.addEventListener("resize", () => {
    console.log("what device landscape is this", whatDeviceLandscapeIsThis())
  })
})
</script>