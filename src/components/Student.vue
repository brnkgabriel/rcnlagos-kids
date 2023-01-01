<template>
  <div class="bg-white rounded shadow-custom inline-block align-top mx-1 cursor-pointer w-[100px] relative overflow-hidden">
    <img
      class="w-full h-[100px] rounded"
      :src="props.student.imageUrl"
      :alt="props.student.firstName + ' ' + props.student.lastName"/>
    <div class="p-1/2 flex items-center justify-center font-title w-full overflow-hidden text-ellipsis whitespace-nowrap absolute text-white bottom-0 left-1/2 -translate-x-1/2 bg-rcngray-100">
      <span>{{ props.student.firstName }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { iStudent } from '../types';

const { center } = useUi()

const props = defineProps<{
  student: iStudent;
}>();
</script>