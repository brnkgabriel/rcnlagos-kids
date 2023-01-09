<template>
  <div aria-label="studentwrap" :class="studentwrap">
    <img
      :class="studentavatar"
      :src="props.student.imageUrl"
      v-loaded
      :alt="props.student.firstName + ' ' + props.student.lastName"/>
    <div aria-label="studentnamewrap" :class="studentnamewrap">
      <span :class="studentname">{{ props.student.firstName }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { iStudent } from '../types';
import { vLoaded } from '../helpers/directives';
const props = defineProps<{
  student: iStudent;
}>();

const {
  studentwrap,
  studentavatar,
  studentnamewrap,
  studentname
} = useUi()
</script>