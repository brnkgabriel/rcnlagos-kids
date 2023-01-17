<template>
  <div class="h-full">
    <div :class="mainline_small" class="text-center">Wait!!!</div>
    <div :class="subline_small" class="text-center">Don't use (still work in progress)</div>
    <form ref="formRef" @submit.prevent="handleSubmit"
      class="mx-auto w-full max-w-md rounded-2xl bg-white p-2 pb-8 h-full overflow-y-auto flex flex-col gap-y-2">
      <div class="px-4 py-2 text-sm text-gray-500 flex flex-col justify-start gap-y-2">
        <div class="flex justify-between items-center gap-x-2">
          <label for="avatar" class="relative cursor-pointer">
            <div aria-label="icon-wrap"
              class="absolute right-0 bottom-0 bg-rcngray-700 rounded-full p-1 border-rcngray-500 border-[2px] flex items-center justify-center">
              <Icon type="edit" :active="true" class="text-rcngray-900 w-[12px]" />
            </div>
            <input name="imageUrl" id="avatar" type="file" class="hidden" accept="image/*" @change="toCropImage" />
            <img class="rounded-full w-[80px]" :src="imgSrc('')" alt="avatar" />
          </label>
          <Switch left="male" right="female" :value="handleGender" name="gender" :class="subline" />
        </div>
        <div aria-label="names" class="flex justify-between items-center gap-x-2">
          <div class="flex flex-col justify-start w-full">
            <label for="firstName" :class="subline_small">First name</label>
            <input type="text" id="firstName" name="firstName" autocomplete="off" :class="input" placeholder="John"  required />
          </div>
          <div class="flex flex-col justify-start w-full">
            <label for="lastName" :class="subline_small">Last name</label>
            <input type="text" id="lastName" name="lastName" autocomplete="off" :class="input" placeholder="Doe"  required />
          </div>
        </div>
        <div class="flex flex-col justify-start w-full">
          <label for="email" :class="subline_small">Email</label>
          <input type="email" id="email" name="email" autocomplete="off" :class="input" placeholder="john.doe@gmail.com"  required />
        </div>
        <div class="flex flex-col justify-start w-full">
          <label for="phoneNumber" :class="subline_small">Parent's Phone Number</label>
          <input type="text" id="phoneNumber" name="phoneNumber" autocomplete="off" :class="input"
            placeholder="08021116498"  required />
        </div> 
        <div class="flex flex-col justify-start w-full">
          <label for="birthday" :class="subline_small">Birthday</label>
          <input type="text" id="birthday" name="birthday" autocomplete="off" :class="input" placeholder="October 1, 2002" required />
        </div>
      </div>
      <button type="submit" :class="button">submit</button>
    </form>
    <CropperModal v-if="isOpen" :is-open="isOpen" :img-file="imgFile" @cropped="onCrop" @opened="onOpened" />

  </div>
</template>
<script setup lang="ts">
import { iStudent, iUpload } from "~~/src/types/index"
import { Ref } from "vue";
import CropperModal from "~~/src/components/CropperModal.vue";

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
  // try {
  //   const fetchOptions = {
  //     headers: { "Content-type": "multipart/form-data" },
  //     method: 'POST',
  //     body: toUpload
  //   }
  //   const { data } = await useFetch(constants.imageUploadApiUrl, fetchOptions)
  //   console.log("data from server", data.value)
  // } catch (error) {
  //   console.log(error)
  // }
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
      path: id(personName(selected.value), '-'),
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