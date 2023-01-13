<template>
  <div aria-label="studentwrap" :class="studentwrap">
    <img
      :class="studentavatar"
      :src="props.person.imageUrl"
      v-loaded
      :alt="props.person.firstName + ' ' + props.person.lastName"/>
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

const {
  studentwrap,
  studentavatar,
  studentnamewrap,
  studentname
} = useUi()
</script>