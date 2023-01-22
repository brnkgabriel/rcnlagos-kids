<template>

  <div class="card-item" data-year="2022">
    <div class="card-item-title relative">
      {{ note.note_title }}
    </div>
    <div class="card-item-desc">{{ formatDate(note.created_at as string) }}</div>
    <div aria-label="circle" :style="circleStyle"></div>
  </div>
</template>
<script setup lang="ts">import { iColor, iCombined, iNote } from '../types';

const props = defineProps<{
  person: iCombined;
  note: iNote,
  sColor: iColor
}>();

const circleStyle = computed(() => obj2Str({
  "position": "absolute",
  "width": "12px",
  "height": "12px",
  "background": `linear-gradient(to bottom, ${props.sColor[100]} 0%, ${props.sColor[700]} 100%)`,
  "border": `2px solid #fff`,
  "border-radius": "50%",
  "top": "2px",
  "left": "0px"
}))

</script>
