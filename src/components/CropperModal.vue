<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0">
        <div aria-label="cropperblankdiv" :class="cropperblankdiv"></div>
      </TransitionChild>

      <div aria-label="cropperwrap" :class="cropperwrap">
        <div aria-label="cropperinnerwrap" :class="cropperinnerwrap">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel :class="cropperdialogpanel">
              <DialogTitle as="h3" :class="cropperdialogtitle">
                Crop your image
              </DialogTitle>
              <div class="mt-2">
                <VuePictureCropper
                :options="pcOptions"
                :box-style="pcBoxStyle"
                :img="props.imgFile.file"
                @ready="ready"
                />
              </div>

              <div class="mt-4">
                <button aria-label="cropperbutton" type="button"
                  :class="cropperbutton"
                  @click="getResult">
                  Crop image!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <div></div>
</template>
  
<script setup lang="ts">
import VuePictureCropper, { cropper } from "vue-picture-cropper"
import { iUpload, iCropperOptions } from "~~/src/types/index"
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue' 

const props = defineProps<{
  isOpen: boolean
  imgFile: iUpload
  options?: iCropperOptions
}>()
const emit = defineEmits<{
  (e: 'cropped', image: iUpload): void
  (e: 'opened', flag: boolean): void
}>()

const {
  cropperwrap,
  cropperblankdiv,
  cropperinnerwrap,
  cropperdialogpanel,
  cropperdialogtitle,
  cropperbutton
} = useUi()

const isOpen = ref(props.isOpen)

const pcOptions = props.options ?? {
  viewMode: 1,
  dragMode: "crop",
  aspectRatio: 1 / 1
}

const pcBoxStyle = {
  width: "100%",
  height: "100%",
  backgroundColor: "#f8f8f8",
  margin: "auto"
}
const ready = () => console.log("picture cropper is ready")

const getResult = async () => {
  if (!cropper) return
  const toUpload: iUpload = {
    file: cropper.getDataURL(),
    name: props.imgFile.name,
    type: props.imgFile.type,
    path: props.imgFile.path
  }
  emit("cropped", toUpload)
  emit("opened", false)
  isOpen.value = false
}

const closeModal = async () => {
  isOpen.value = false
  emit("opened", false)
}

</script>
  