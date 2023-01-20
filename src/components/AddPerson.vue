<template>
  <div class="h-full flex flex-col gap-y-2 overflow-y-auto">
    <div aria-label="notes" class="sticky left-0 top-0 z-[1] bg-rcngray-500">
      <div :class="mainline_small" class="text-center">Add Student</div>
      <div :class="subline_small" class="text-center">Fill in his/her details</div>
    </div>
    <form ref="formRef" @submit.prevent="handleSubmit"
      class="mx-auto w-full max-w-[960px] rounded bg-white grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
      <div class="flex flex-col justify-start w-full">
        <label for="firstName" :class="subline_small">First name</label>
        <input type="text" id="firstName" name="firstName" autocomplete="off" :class="input" placeholder="John"
          v-model="selected.firstName" required />
      </div>
      <div class="flex flex-col justify-start w-full sm:row-start-2 sm:row-end-3">
        <label for="lastName" :class="subline_small">Last name</label>
        <input type="text" id="lastName" name="lastName" autocomplete="off" :class="input" placeholder="Doe"
          v-model="selected.lastName" required />
      </div>
      <div v-show="showImage" aria-label="avatarngender"
        class="flex justify-center gap-x-2 sm:row-start-1 sm:row-end-3 justify-self-center items-center">
        <label for="avatar" class="relative cursor-pointer rounded-full overflow-hidden">
          <div v-show="!isAvatarLoading" aria-label="icon-wrap"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rcngray-700 p-1 border-rcngray-500 border-[2px] flex items-center justify-center opacity-80">
            <Icon type="edit" :active="true" class="text-rcngray-900 w-[12px]" />
          </div>
          <div v-show="isAvatarLoading" aria-label="spinloaderwrap"
            class="absolute z-10 w-full h-full bg-black opacity-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
            <div aria-label="spinloader"
              class="w-[16px] h-[16px] border-white border-2 border-l-0 border-r-0 rounded-full spin-loader active">
            </div>
          </div>
          <input name="imageUrl" id="avatar" type="file" class="hidden" accept="image/*" @change="toCropImage" />
          <img class="rounded-full w-[80px] block m-auto" :src="imgSrc(imageSrc)" alt="avatar" />
        </label>
        <SwitchComp left="male" right="female" :value="handleGender" name="gender" :class="subline" />
      </div>
      <div class="flex flex-col justify-start w-full">
        <label for="phoneNumber" :class="subline_small">Parent's Phone Number</label>
        <input type="text" id="phoneNumber" name="phoneNumber" autocomplete="off" :class="input"
          placeholder="08021116498" v-model="selected.parentsContact" required />
      </div>
      <div class="flex flex-col justify-start w-full">
        <label for="birthday" :class="subline_small">Birthday</label>
        <input type="text" id="birthday" name="birthday" autocomplete="off" :class="input" placeholder="October 1, 2002"
          v-model="selected.birthday" required />
      </div>
      <label v-show="showImage" for="galleryImg"
        class="relative cursor-pointer sm:col-span-2 overflow-hidden rounded-full" :style="galleryStyle">
        <div v-show="!isPicImgLoading" aria-label="icon-wrap"
          class="absolute right-[8px] bottom-[8px] bg-rcngray-700 p-1 border-rcngray-500 rounded-full border-[2px] flex items-center justify-center">
          <Icon type="edit" :active="true" class="text-rcngray-900 w-[12px]" />
        </div>
        <div v-show="isPicImgLoading" aria-label="spinloaderwrap"
          class="absolute z-10 w-full h-full bg-black opacity-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          <div aria-label="spinloader"
            class="w-[16px] h-[16px] border-white border-2 border-l-0 border-r-0 rounded-full spin-loader active"></div>
        </div>
        <input name="imageUrl" id="galleryImg" type="file" class="hidden" accept="image/*"
          @change="toCropGalleryImage" />
      </label>
      <button type="submit" :class="submitbtn">
      
        <div>submit</div>
        <div aria-label="spinloader"  v-if="!ready"
            class="w-[16px] h-[16px] border-black border-2 border-l-0 border-r-0 rounded-full spin-loader active"></div>
        <Icon v-if="ready" class="w-[16px] h-[16px]" :type="constants.check" :active="true" />
      </button>
    </form>
    <CropperModal v-if="isOpen" :is-open="isOpen" :img-file="imgFile" @cropped="onCrop" @opened="onOpened" />
    <CropperModal v-if="isGalleryOpen" :is-open="isGalleryOpen" :img-file="galleryImgFile" @cropped="onGalleryCrop"
      :options="galleryOptions" @opened="onGalleryOpened" />

  </div>
</template>
<script setup lang="ts">
import { iMedia, iPerson, iStudent, iUpload } from "~~/src/types/index"
import { Ref } from "vue";
import CropperModal from "~~/src/components/CropperModal.vue";

const { input, submitbtn, subline, mainline_small, subline_small } = useUi()
const formRef = ref()
const selected = ref<iStudent>({})
const imageSrc = computed(() => selected.value.imageUrl ?? '')
const galleryImg = ref('/icons/avatar.svg')
const media = ref<iMedia>({})
const isAvatarLoading = ref(false)
const isPicImgLoading = ref(false)
const canSubmit = ref(true)
// const isAvatarSending = ref(false)
// const isPicImgSending = ref(false)

const ready = computed(() => media.value.mediaUrl && selected.value.imageUrl && canSubmit.value)

const submitBtnClass = computed(() => `${submitbtn} ${ready.value ?? "pointer-events-none bg-rcngray-700 opacity-50"}`)

const galleryStyle = computed(() => obj2Str({
  "background-image": `url(${galleryImg.value})`,
  "background-repeat": "no-repeat",
  "background-size": "cover",
  "background-position": "center",
  "height": "50.625vw",
  "max-height": "360px",
  "width": "100%",
  "border-radius": "4px"
}))

const showImage = computed(() => {
  return selected.value.firstName &&
    selected.value.lastName
})

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
  try {
    const fetchOptions = {
      headers: { "Content-type": "multipart/form-data" },
      method: 'POST',
      body: toUpload
    }
    const { data } = await useFetch(constants.imageUploadApiUrl, fetchOptions)
    const url = constants.pictureUrl(data.value as string)
    selected.value.imageUrl = url
    console.log("url from server", url)
  } catch (error) {
    console.log(error)
  }
}

const onGalleryCrop = async (toUpload: iUpload) => {
  galleryImg.value = toUpload.file

  console.log("data from client", toUpload)
  // isPicImgSending.value = true
  try {
    const fetchOptions = {
      headers: { "Content-type": "multipart/form-data" },
      method: 'POST',
      body: toUpload
    }
    const { data } = await useFetch(constants.imageUploadApiUrl, fetchOptions)
    const url = constants.pictureUrl(data.value as string)

    media.value = {
      firstName: selected.value.firstName,
      lastName: selected.value.lastName,
      email: studentEmail(selected.value as iPerson),
      mediaType: "picture",
      mediaUrl: url
    }

    // isPicImgSending.value = false
    console.log("media from server", media.value)
  } catch (error) {
    // isPicImgSending.value = false
    console.log(error)
  }
}

const onOpened = (flag: boolean) => isOpen.value = flag
const onGalleryOpened = (flag: boolean) => isGalleryOpen.value = flag

const toCropImage = async (evt: Event) => {
  const target = evt.target as HTMLInputElement

  isAvatarLoading.value = true
  if (target.files) {
    const fileObj = target.files[0]
    const type = fileObj.type
    const extension = type.split('/')[1]
    const compressed = await handleImageCompression(fileObj)
    // const file = await getBase64(fileObj) as string
    const file = await getBase64(compressed as File) as string
    isAvatarLoading.value = false
    isOpen.value = true
    imgFile.value = {
      file,
      name: `${id(personName(selected.value), '-')}.${extension}`,
      path: id(personName(selected.value), '-'),
      type
    }
  }
}

const toCropGalleryImage = async (evt: Event) => {
  const target = evt.target as HTMLInputElement

  isPicImgLoading.value = true
  if (target.files) {
    const fileObj = target.files[0]
    const type = fileObj.type
    const extension = type.split('/')[1]
    const compressed = await handleImageCompression(fileObj)
    // const file = await getBase64(fileObj) as string
    const file = await getBase64(compressed as File) as string
    isPicImgLoading.value = false
    isGalleryOpen.value = true
    galleryImgFile.value = {
      file,
      name: `${id(personName(selected.value), '-')}.${extension}`,
      path: `${id(personName(selected.value), '-')}/landscape`,
      type
    }
  }
}

const handleSubmit = async (evt: Event) => {

  const studentObj: iStudent = {
    about: "Blessed Child",
    type: "Student",
    duration: "1440",
    email: studentEmail(selected.value as iPerson),
    ...selected.value
  }


  canSubmit.value = false

  try {
    const studentOptions = {
      headers: { "Content-type": "multipart/form-data" },
      method: 'POST',
      body: studentObj,
      params:  {
        table: "students",
        column: "",
        value: "",
        update: "",
        foreignkey: ""
      }
    }
    const mediaOptions = {
      headers: { "Content-type": "multipart/form-data" },
      method: 'POST',
      body: media.value,
      params:  {
        table: "media",
        column: "",
        value: "",
        update: "",
        foreignkey: ""
      }
    }
    const sRes = await useFetch(constants.dataPostApiUrl, studentOptions)
    const mRes = await useFetch(constants.dataPostApiUrl, mediaOptions)

    console.log("student response", sRes.error.value)
    console.log("media response", mRes.error.value)
    canSubmit.value = true
    
    navigateTo('/students')
  } catch (error) {
    console.log(error)
    canSubmit.value = true
  }
}

</script>