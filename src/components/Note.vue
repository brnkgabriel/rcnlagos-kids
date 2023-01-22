<template>
  <div class="rounded bg-white w-full p-4 flex flex-col gap-y-2 mx-auto max-w-sm">
    <div aria-label="info" class="mb-4">Add a note for {{ globalState.selectedStudent.firstName }}</div>

    <div class="grid grid-cols-1 gap-y-4">  
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

    </div>
    <div v-if="isSubmitted" :class="subline_small">Note successfully submitted...</div>
    <button v-if="!isSubmitted" type="submit" :class="submitBtnClass" @click="submitNote">
      <div>submit</div>
      <div aria-label="spinloader" v-if="!ready"
        class="w-[16px] h-[16px] border-black border-2 border-l-0 border-r-0 rounded-full spin-loader active"></div>
      <Icon v-if="ready" class="w-[16px] h-[16px]" :type="constants.check" :active="true" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { iDataApiOptions, iDynamicObject, iEvent, iNote, iNoteDetail } from '../types';


const { input, subline_small, submitbtn } = useUi()
const { globalState } = useGlobals()

const events = ref([
  'Threshing Floor (January 21, 2022)'
])

const location = [
  'In class',
  'Has gone home',
]


const note = ref<iNoteDetail>({
  note_description: "",
  note_title: location[0],
  event_string_id: events.value[0]
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const ready = computed(() => note.value.note_description.length > 0 && !isSubmitting.value)
const submitBtnClass = computed(() => `${submitbtn} ${ready.value === false ? "pointer-events-none bg-rcngray-700 opacity-50" : ""}`)

const options: iDataApiOptions = {
  table: "events",
  column: "",
  value: "",
  update: "",
  foreignkey: ""
}

const { data } = await useLazyFetch(() => constants.dataApiUrl, { params: { ...options } })

watch(data, () => {
  events.value = (data.value as iEvent[])
    .map((event: iEvent) => `${event.event_type} (${event.event_date})`)
})

const handleLocation = (location: string) => { 
  note.value.note_title = location
}

const handleEvents = (event: string) => {
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

  isSubmitting.value = true
  const options = {
    headers: { "Content-type": "multipart/form-data" },
    method: 'POST',
    body: preppedNote,
    params: {
      table: "notes",
      column: "",
      value: "",
      update: "",
      foreignkey: ""
    }
  }

  const { data } = await useFetch(constants.dataPostApiUrl, options)

  isSubmitting.value = false
  const obj = data.value as iDynamicObject
  if (obj.error) {
    console.log("unsuccessfully saved data. There is error")
  } else {
    console.log("successfully saved data")
    isSubmitted.value = true
    setTimeout(() => {
      navigateTo("/students")
    }, 1000);
  }
}
</script>