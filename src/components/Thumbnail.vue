<template>
  <div aria-label="thumbnailwrap" :class="thumbnailwrap" :style="thumbStyle">
    <!-- <img
      :class="studentavatar"
      :src="props.person.imageUrl"
      v-loaded
      :alt="props.person.firstName + ' ' + props.person.lastName"/> -->
    <div aria-label="studentnamewrap" :class="studentnamewrap">
      <span :class="studentname">{{ props.person.firstName }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { iStudent, iTeacher } from '../types';
import { vLoaded } from '../helpers/directives';
const props = defineProps<{
  person: iStudent | iTeacher;
}>();

const thumbStyle = computed(() => obj2Str({
  "background-image": `url(${props.person.imageUrl})`,
  "background-repeate": "no-repeat",
  "background-position": "center",
  "background-size": "cover"
}))

const {
  thumbnailwrap,
  studentavatar,
  studentnamewrap,
  studentname
} = useUi()
</script>