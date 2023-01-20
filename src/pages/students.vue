<template>
  <Students />
</template>
<script setup lang="ts">
definePageMeta({
  layout: "catalog",
  middleware: "guard"
})
</script>