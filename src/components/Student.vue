<template>
  <div class="bg-white rounded shadow-custom inline-block align-top mx-1 cursor-pointer w-[60px]">
    <img
      class="w-full h-[60px] rounded"
      :src="props.student.imageUrl"
      :alt="props.student.firstName + ' ' + props.student.lastName"/>
    <div class="text-center px-2 py-1 font-title w-full overflow-hidden text-ellipsis whitespace-nowrap">{{ props.student.firstName }}</div>
  </div>
</template>
<script setup lang="ts">
import { iStudent } from '../types';

const { center } = useUi()

const props = defineProps<{
  student: iStudent;
}>();
</script>