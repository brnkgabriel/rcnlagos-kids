<template lang="">
  <div aria-label="homelayoutbottomcontentwrap" :class="homelayoutbottomcontentwrap">
    <Numpad />
  </div>
</template>
<script setup lang="ts">

const { homelayoutbottomcontentwrap } = useUi()

definePageMeta({
  layout: "home"
})
</script>