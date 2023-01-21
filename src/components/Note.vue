<template>
  <div class="flex flex-col items-center justify-start gap-y-2 rounded bg-white w-full p-4">
    <div aria-label="info" class="mb-4">Add a note for {{ globalState.selectedStudent.firstName }}</div>
    <SwitchComp left="is in class" right="has gone home" :value="handleNote" name="note" :class="subline" />
    <div class="w-full">
      <div aria-label="more info" :class="subline_small" class="text-center">*More details</div>
      <input :class="input" v-model="note.note_description" type="text" />
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


const { subline, input, btn, subline_small, submitbtn } = useUi()
const { globalState } = useGlobals()

interface iNoteDetail {
  note_title: string;
  note_description: string;
}

const note = ref<iNoteDetail>({
  note_description: "",
  note_title: ""
})
const ready = computed(() => note.value.note_description.length > 0)
console.log("readi is", ready.value)
const submitBtnClass = computed(() => `${submitbtn} ${ready.value === false ? "pointer-events-none bg-rcngray-700 opacity-50" : ""}`)

const handleNote = (value: string) => {
  console.log("from update page, gender is", value)
  note.value.note_title = value
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
    event_string_id: "Threshing Floor (January 22, 2022)",
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