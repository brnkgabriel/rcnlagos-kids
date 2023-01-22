<template>
  <div class="h-full">
    <div v-if="globalState.teachers.length > 0" aria-label="original personswrap" :class="personswrap">
      <div ref="personsListRef" aria-label="personslist" :class="personslist">
        <div aria-label="personslistfilternstatus" :class="personslistfilternstatus">
          <ComboBox :persons="globalState.teachers" @persons="handlePersons" @person="handlePerson" />
          <div :class="personsliststatus">
            {{ status }}
          </div>
        </div>
        <div ref="thumbnailListRef" aria-label="personslistcards" :class="personslistcards" v-infinite-scroll>
          <Thumbnail
            v-for="(teacher, idx) in globalState.renderedTeachers"
            :key="idx"
            :person="teacher"
            :class="position(idx, globalState.renderedTeachers)"
            @click="selectedTeacher = teacher" />
        </div>
      </div>
      <Selected :notes="skeletonNotes" :person="selectedTeacher" :class="personslistselection" />
    </div>
    <div v-else aria-label="skeleton personswrap" :class="personswrap">
      <div aria-label="personslist" :class="personslist">
        <div aria-label="personslistfilternstatus" :class="personslistfilternstatus">
          <div aria-label="combobox"></div>
          <div :class="personsliststatus">
            Loading...
          </div>
        </div>
        <div aria-label="personslistcards" :class="personslistcards">
          <Thumbnail
            v-for="(teacher, idx) in skeletonTeachers"
            :key="idx"
            :person="teacher"
            :class="position(idx, skeletonTeachers)"
            @click="selectedTeacher = teacher" />
        </div>
      </div>
      <Selected :notes="skeletonNotes" :person="skeletonSelectedTeacher" :class="personslistselection" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { iDataApiOptions, iNote, iPerson, iTeacher } from '../types';
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

const { globalState, setTeachers, setRenderedTeachers, setSearchedTeachers } = useGlobals()
const pageName = ref(useRoute().name)
const skeletonTeachers = ref<iTeacher[]>(placeholderPersons)
const skeletonSelectedTeacher = ref<iTeacher>(placeholderPersons[0])
const skeletonNotes = ref<iNote[]>([])
const selectedTeacher = ref<iTeacher>({})
const thumbnailListRef = ref<HTMLDivElement>()
const personsListRef = ref<HTMLDivElement>()

const options: iDataApiOptions = {
  table: "teachers",
  column: "",
  value: "",
  update: "",
  foreignkey: "teachermedia(*)"
}

const { data, refresh } = await useLazyFetch(() => constants.dataApiUrl, { params: { ...options } })

const status = computed(() => globalState.value.searchedTeachers.length === 0 ? 'Loading...' : `${globalState.value.searchedTeachers.length} ${pageName.value as string}`)

watch(data, async () => {
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
  updateThumbnailListHeight(thumbnailListRef as Ref<HTMLDivElement>, personsListRef as Ref<HTMLDivElement>)
}

onMounted(async () => {
  await refresh()
  window.addEventListener("resize", () => {
    console.log("what device landscape is this", whatDeviceLandscapeIsThis())
  })
})
</script>