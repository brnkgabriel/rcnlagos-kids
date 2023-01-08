<template>
  <div>    
    <div class="card-subtitle flex justify-between items-center">
      <div aria-label="head">GALLERY</div>
      <div aria-label="stats" class="text-xxs">{{ num + 1 }} / {{ props.media.length }}</div>
    </div>
    <div class="card-slide-wrapper relative max-h-[225px] md:h-slide">
      <div class="controls absolute">
        <div ref="prev" class="prev absolute"></div>
        <div ref="next" class="next absolute"></div>
      </div>
      <!-- <div class="card-slide is-active" :style="slide1Style"></div>
      <div class="card-slide" :style="slide2Style"></div> -->
      <div ref="list" v-for="(media, idx) in props.media" :key="idx" :class="slideClass(idx)" :style="slideStyle(media)" :data-idx="idx" :data-url="media.mediaUrl"></div>
    </div>
  </div>
</template>
<script setup lang="ts">import { iMedia } from '../types';

const props = defineProps<{
  media: iMedia[]
}>();

const slideStyle = (media: iMedia) => `background-image: url(${media.mediaUrl});background-repeat:no-repeat;background-size:cover;background-position:center`
const slideClass = (idx: number) => idx === 0 ? 'card-slide is-active' : 'card-slide'
const prev = ref<HTMLDivElement>()
const next = ref<HTMLDivElement>()
const list = ref<HTMLDivElement[]>([])

let num = ref(0)

watch(() => props.media, (media, prevMedia) => { 
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