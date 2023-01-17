<template>
  <div class="h-full">
    <div :class="mainline_small" class="text-center">Wait!!!</div>
    <div :class="subline_small" class="text-center">Don't use (still work in progress)</div>
    <form ref="formRef" @submit.prevent="handleSubmit"
      class="mx-auto w-full max-w-[960px] rounded bg-white p-2 pb-8 h-full overflow-y-auto flex flex-col gap-y-2">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 gap-y-4">
        <label for="avatar" class="relative cursor-pointer">
          <div aria-label="icon-wrap"
            class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-rcngray-700 rounded-full p-1 border-rcngray-500 border-[2px] flex items-center justify-center">
            <Icon type="edit" :active="true" class="text-rcngray-900 w-[12px]" />
          </div>
          <input name="imageUrl" id="avatar" type="file" class="hidden" accept="image/*" @change="toCropImage" />
          <img class="rounded-full w-[80px] block m-auto" :src="imgSrc(imageSrc)" alt="avatar" />
        </label>
        <Switch left="male" right="female" :value="handleGender" name="gender" :class="subline" />
        <div class="flex flex-col justify-start w-full">
          <label for="firstName" :class="subline_small">First name</label>
          <input type="text" id="firstName" name="firstName" autocomplete="off" :class="input" placeholder="John" v-model="selected.firstName"  required />
        </div>
        <div class="flex flex-col justify-start w-full">
          <label for="lastName" :class="subline_small">Last name</label>
          <input type="text" id="lastName" name="lastName" autocomplete="off" :class="input" placeholder="Doe" v-model="selected.lastName" required />
        </div>
        <div class="flex flex-col justify-start w-full">
          <label for="phoneNumber" :class="subline_small">Parent's Phone Number</label>
          <input type="text" id="phoneNumber" name="phoneNumber" autocomplete="off" :class="input" placeholder="08021116498" v-model="selected.parentsContact"  required />
        </div> 
        <div class="flex flex-col justify-start w-full">
          <label for="birthday" :class="subline_small">Birthday</label>
          <input type="text" id="birthday" name="birthday" autocomplete="off" :class="input" placeholder="October 1, 2002" v-model="selected.birthday" required />
        </div>
        <label for="galleryImg" class="relative cursor-pointer sm:col-span-2" :style="galleryStyle">
          <div aria-label="icon-wrap"
            class="absolute right-[8px] bottom-[8px] bg-rcngray-700 rounded-full p-1 border-rcngray-500 border-[2px] flex items-center justify-center">
            <Icon type="edit" :active="true" class="text-rcngray-900 w-[12px]" />
          </div>
          <input name="imageUrl" id="galleryImg" type="file" class="hidden" accept="image/*" @change="toCropGalleryImage" />
        </label>
      </div>
      <button type="submit" :class="btn">submit</button>
    </form>
    <CropperModal v-if="isOpen" :is-open="isOpen" :img-file="imgFile" @cropped="onCrop" @opened="onOpened" />
    <CropperModal
      v-if="isGalleryOpen"
      :is-open="isGalleryOpen"
      :img-file="galleryImgFile"
      @cropped="onGalleryCrop"
      :options="galleryOptions"
      @opened="onGalleryOpened" />

  </div>
</template>
<script setup lang="ts">
import { iStudent, iUpload } from "~~/src/types/index"
import { Ref } from "vue";
import CropperModal from "~~/src/components/CropperModal.vue";

const { input, btn, subline, mainline_small, subline_small } = useUi()
const formRef = ref()
const selected = ref<iStudent>({})
const imageSrc = computed(() => selected.value.imageUrl ?? '')
const galleryImg = ref('/icons/avatar.svg')

const galleryStyle = computed(() => obj2Str({
  "background-image": `url(${galleryImg.value})`,
  "background-repeat": "no-repeat",
  "background-size": "cover",
  "background-position": "center",
  "height": "56.25vw",
  "max-height": "360px",
  "width": "100%",
  "border-radius": "4px"
}))

const isOpen = ref(false)
const isGalleryOpen = ref(false)

const imgFile: Ref<iUpload> = ref({
  file: "",
  name: "",
  path: "",
  type: ""
})

const galleryOptions = {
  viewMode: 1,
  dragMode: "crop",
  aspectRatio: 1920 / 1080
}

const galleryImgFile: Ref<iUpload> = ref({
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

const onGalleryCrop = async (toUpload: iUpload) => {
  galleryImg.value = toUpload.file

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
const onGalleryOpened = (flag: boolean) => isGalleryOpen.value = flag

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

const toCropGalleryImage = async (evt: Event) => {
  const target = evt.target as HTMLInputElement

  if (target.files) {
    const fileObj = target.files[0]
    const file = await getBase64(fileObj) as string
    isGalleryOpen.value = true
    galleryImgFile.value = {
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