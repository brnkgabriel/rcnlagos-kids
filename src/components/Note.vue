<template>
  <div class="grid grid-cols-1 items-center justify-start gap-y-2 rounded bg-white w-full p-4">
    <div aria-label="info" class="mb-4">Add a note for {{ globalState.selectedStudent.firstName }}</div>

    <div class="flex flex-col justify-start w-full">
      <label for="detailednote" :class="subline_small">Where is the child?</label>
      <ListComponent :list="location" @selected="handleLocation" />
    </div>

    <div class="flex flex-col justify-start w-full">
      <label for="detailednote" :class="subline_small">What church program is this?</label>
      <ListComponent :list="events" @selected="handleEvents" />
    </div>
    <div class="flex flex-col justify-start w-full">
      <label for="detailednote" :class="subline_small">Detailed note</label>
      <input :class="input" v-model="note.note_description" type="text" id="detailednote" />
    </div>
    <button type="submit" :class="submitBtnClass" @click="submitNote">
      <div>submit</div>
      <div aria-label="spinloader" v-if="!ready"
        class="w-[16px] h-[16px] border-black border-2 border-l-0 border-r-0 rounded-full spin-loader active"></div>
      <Icon v-if="ready" class="w-[16px] h-[16px]" :type="constants.check" :active="true" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { iNote } from '../types';


const { input, subline_small, submitbtn } = useUi()
const { globalState } = useGlobals()

interface iNoteDetail {
  note_title: string;
  note_description: string;
  event_string_id: string;
}

const events = [
  "Threshing Floor (January 21, 2022)"
]

const location = [
  'In class',
  'Has gone home',
]
const note = ref<iNoteDetail>({
  note_description: "",
  note_title: location[0],
  event_string_id: events[0]
})
const ready = computed(() => note.value.note_description.length > 0)
const submitBtnClass = computed(() => `${submitbtn} ${ready.value === false ? "pointer-events-none bg-rcngray-700 opacity-50" : ""}`)

const handleLocation = (location: string) => {
  console.log("handling Location, location is", location)
  note.value.note_title = location
}

const handleEvents = (event: string) => {
  console.log("handling Events, event is", event)
  note.value.event_string_id = event
}

const submitNote = async () => {
  let preppedNote: iNote = {
    student_firstname: globalState.value.selectedStudent.firstName as string,
    student_lastname: globalState.value.selectedStudent.lastName as string,
    student_email: globalState.value.selectedStudent.email as string,
    note_title: "",
    note_description: "",
    teacher_firstname: globalState.value.user.data.firstName as string,
    teacher_lastname: globalState.value.user.data.lastName as string,
    teacher_contact: globalState.value.user.data.phoneNumber as string,
    teacher_email: globalState.value.user.data.email as string,
    teacher_picture: globalState.value.user.data.imageUrl as string,
    event_string_id: "",
  }

  preppedNote = { ...preppedNote, ...note.value }
  // const options = {
  //   headers: { "Content-type": "multipart/form-data" },
  //   method: 'POST',
  //   body: preppedNote,
  //   params: {
  //     table: "notes",
  //     column: "",
  //     value: "",
  //     update: "",
  //     foreignkey: ""
  //   }
  // }
  // const sRes = await useFetch(constants.dataPostApiUrl, options)


  console.log("prepped note", preppedNote)
}
</script>