<template>
  <div aria-label="teacherlastnote" class="shadow-custom bg-white rounded p-2 flex gap-2 relative text-xs">
    <div aria-label="teacherdetails" class="flex flex-col gap-y-1">
      <img class="rounded-full w-[60px]" :src="imgSrc(note.teacher_picture)" alt="avatar" />
      <div aria-label="teachername" class="truncate w-full">{{ note.teacher_firstname }} {{ note.teacher_lastname }}
      </div>
      <div aria-label="teachercontacticons" class="flex gap-2">
        <a :href="constants.whatsappIcon(teacher)" class="shadow-cta rounded-full">
          <img src="/icons/whatsapp.svg" class="w-[32px]" alt="whatsapp icon" />
        </a>
        <a :href="contactNumber" :style="callStyle"
          class="shadow-cta rounded-full p-2 w-[32px] h-[32px] flex justify-center items-center">
          <Icon type="phonecall" :active="true" class="w-[16px] text-white" />
        </a>
      </div>
    </div>
    <div aria-label="teachernote" class="flex flex-col gap-2">
      <div class="font-bold w-full truncate">{{ note.note_title }}</div>
      <div>{{ note.note_description }}</div>
    </div>
    <div aria-label="time" class="absolute right-[8px] bottom-0 text-xxs uppercase font-semibold opacity-50">{{
      formatDate(note.created_at as string)
    }}</div>
  </div>
</template>
<script setup lang="ts">
import { iColor, iCombined, iNote, iTeacher } from '../types';

const props = defineProps<{
  person: iCombined;
  sColor: iColor;
  note: iNote;
}>()

const teacher = computed(() => {
  const obj = {
    phoneNumber: props.note.teacher_contact,
    firstName: props.note.teacher_firstname,
    lastName: props.note.teacher_lastname
  }
  return obj as iTeacher
})

const contactNumber = computed(() => `tel:${phone(props.note.teacher_contact)}`)
const callStyle = computed(() => obj2Str({
  "background-color": props.sColor[700]
}))
</script>