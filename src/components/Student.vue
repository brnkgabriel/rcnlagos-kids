<template>
  <div class="bg-white rounded shadow-custom inline-block mx-1 w-[100px]  sm:m-0 align-top cursor-pointer basis-[100px] flex-grow sm:w-1/4 relative overflow-hidden">
    <img
      class="w-full rounded opacity-0"
      :src="props.student.imageUrl"
      v-loaded
      :alt="props.student.firstName + ' ' + props.student.lastName"/>
    <div class="px-1/2 py-1 flex items-center justify-center font-title w-full absolute text-white bottom-0 left-1/2 -translate-x-1/2 bg-rcngray-100">
      <span class="w-3/4 text-center overflow-hidden text-ellipsis whitespace-nowrap">{{ props.student.firstName }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { iStudent } from '../types';
import { vLoaded } from '../helpers/directives';

const { center } = useUi()

const props = defineProps<{
  student: iStudent;
}>();
</script>