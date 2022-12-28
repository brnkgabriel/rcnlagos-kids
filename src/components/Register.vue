<template>
  <div class="h-full">
    <!-- <Tabs /> -->
    <!-- <Disclosure /> -->
    <div :class="mainline_small" class="text-center">Almost there!!!</div>
    <form ref="formRef" @submit.prevent="handleSubmit"
      class="mx-auto w-full max-w-md rounded-2xl bg-white p-2 pb-8 h-full overflow-y-auto flex flex-col gap-y-2">

      <div class="flex justify-between items-center gap-x-2">
        <label for="avatar" class="relative cursor-pointer">
          <div aria-label="icon-wrap"
            class="absolute right-0 bottom-0 bg-rcngray-700 rounded-full p-1 border-rcngray-500 border-[2px] flex items-center justify-center">
            <Icon type="edit" :active="true" class="text-rcngray-900 w-[12px]" />
          </div>
          <input name="imageFile" id="avatar" type="file" class="hidden" accept="image/*" @change="toCropImage" />
          <img class="rounded-full w-[80px]" :src="imgSrc(selected.imageUrl as string)" alt="avatar" />
        </label>
        <SwitchComponent left="male" right="female" :value="handleGender" name="gender" :class="subline" />
      </div>
      <div aria-label="names" class="flex justify-between items-center gap-x-2">
        <div class="flex flex-col justify-start w-full">
          <label for="firstName" :class="subline_small">First name</label>
          <input type="text" id="firstName" name="firstName" autocomplete="off" :class="input" placeholder="John"
            v-model="selected.firstName" required />
        </div>
        <div class="flex flex-col justify-start w-full">
          <label for="lastName" :class="subline_small">Last name</label>
          <input type="text" id="lastName" name="lastName" autocomplete="off" :class="input" placeholder="Doe"
            v-model="selected.lastName" required />
        </div>
      </div>
      <div class="flex flex-col justify-start w-full">
        <label for="phoneNumber" :class="subline_small">Parents Contact</label>
        <input type="text" id="parentsContact" name="parentsContact" autocomplete="off" :class="input"
          placeholder="08021116498" v-model="selected.parentsContact" required />
      </div>
      <div class="flex flex-col justify-start w-full">
        <label for="homeAddress" :class="subline_small">Home address</label>
        <input type="text" id="homeAddress" name="homeAddress" autocomplete="off" :class="input"
          placeholder="1, Tewogbade close, Shola Martins..." v-model="selected.class" required />
      </div>
      <div class="flex flex-col justify-start w-full">
        <label for="birthday" :class="subline_small">Birthday</label>
        <input type="text" id="birthday" name="birthday" autocomplete="off" :class="input" placeholder="October 1"
          v-model="selected.birthday" required />
      </div>
      <button type="submit" :class="button">submit</button>
    </form>
    <CropperModal v-if="isOpen" :is-open="isOpen" :img-file="imgFile" @cropped="onCrop" @opened="onOpened" />

  </div>
</template>
<script setup lang="ts">
import { iStudent, iUpload } from "~~/src/types/index"
import { Ref } from "vue";
import CropperModal from "~~/components/CropperModal.vue"; 

const { input, button, subline, mainline_small, subline_small } = useUi()
const formRef = ref()
const selected = ref<iStudent>({})

const isOpen = ref(false)
const imgFile: Ref<iUpload> = ref({
  file: "",
  name: "",
  path: "",
  type: ""
})

const handleGender = (value: string) => {
  console.log("from update page, gender is", value)
  selected.value.gender = value
}

const onCrop = async (toUpload: iUpload) => {
  selected.value.imageUrl = toUpload.file

  console.log("data from client", toUpload)
  try {
    const fetchOptions = {
      headers: { "Content-type": "multipart/form-data" },
      method: 'POST',
      body: toUpload
    }
    const { data } = await useFetch(constants.imageUploadApiUrl, fetchOptions)
    console.log("data from server", data.value)
  } catch (error) {
    console.log(error)
  }
}

const onOpened = (flag: boolean) => isOpen.value = flag

const toCropImage = async (evt: Event) => {
  const target = evt.target as HTMLInputElement

  if (target.files) {
    const fileObj = target.files[0]
    const file = await getBase64(fileObj) as string
    isOpen.value = true
    imgFile.value = {
      file,
      name: fileObj.name,
      path: id(studentName(selected.value), '-'),
      type: fileObj.type
    }
  }
}

const handleSubmit = (evt: Event) => {
  const formData = new FormData(formRef.value)
  const entries = Object.fromEntries(formData.entries())
  selected.value = { ...selected.value, ...entries }
  console.log("form submission says", selected.value)
}

</script>