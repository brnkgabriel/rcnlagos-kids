<template>
  <div aria-label="slidewrap" class="h-full">
    <div aria-label="slidetitlenstatus" :class="slidetitlenstatus">
      <div aria-label="title">GALLERY</div>
      <div aria-label="stats" class="text-xxs">{{ num + 1 }} / {{ props.media.length }}</div>
    </div>
    <div :class="slidebody">
      <div class="controls absolute" v-show="props.media.length > 1">
        <div ref="prev" class="prev absolute"></div>
        <div ref="next" class="next absolute"></div>
      </div>
      <div
        ref="list"
        v-for="(media, idx) in props.media" :key="idx"
        :class="slideClass(idx)"
        :style="slideStyle(media.mediaUrl as string)"
        :data-idx="idx" :data-url="media.mediaUrl"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { iMedia } from '../types';

const props = defineProps<{
  media: iMedia[]
}>();

const { slidetitlenstatus, slidebody } = useUi()
let num = ref(0)

const slideStyle = (url: string) => obj2Str({
  "background-image": `url(${url})`,
  "background-repeat": "no-repeat",
  "background-size": "cover",
  "background-position": "center"
})
const slideClass = (idx: number) => idx === 0 ? 'card-slide is-active' : 'card-slide'
const prev = ref<HTMLDivElement>()
const next = ref<HTMLDivElement>()
const list = ref<HTMLDivElement[]>([])

watch(() => props.media, (curr, prev) => {
  num.value = 0
  displaySlide()
})

const handleSlideMove = (type: "prev" | "next") => {
  type === "prev" ? num.value-- : num.value++
  if (num.value < 0) num.value = props.media.length - 1
  if (num.value == props.media.length) num.value = 0

  displaySlide()
}

const displaySlide = () => {
  list.value.forEach(item => item.classList.remove("is-active"))
  list.value[num.value] && list.value[num.value].classList.add("is-active")
}

onMounted(() => {
  prev.value?.addEventListener("click", () => { handleSlideMove("prev") })
  next.value?.addEventListener("click", () => { handleSlideMove("next") })
})

</script>
<style lang="">
  
</style>