<template>
  <div aria-label="homelayoutbottomcontentwrap" :class="homelayoutbottomcontentwrap">
    <div aria-label="note" class="text-center">
      <div aria-label="welcome" :class="mainline">Welcome to</div>
      <div aria-label="rcnlagos" :class="mainline">Remnant Christian Network Lagos</div>
      <div aria-label="footnote" :class="subline_small">Towards the rebirth of Apostolic Christianity</div>
    </div>

    <div aria-label="title" class="flex flex-col text-center text-rcnblue-500 font-extrabold font-body uppercase text-3xl">
      <div aria-label="top">children</div>
      <div aria-label="bottom">department</div>
    </div>

    <div aria-label="navigation" class="flex flex-col justify-center items-center gap-y-2">
      <NuxtLink href="/teachers" :class="btn">Teachers</NuxtLink>
      <a href="/students" :class="btn">Students</a>
    </div>
  </div>
</template>
<script setup lang="ts">

const { btn, subline_small, mainline, homelayoutbottomcontentwrap } = useUi()
const { globalState } = useGlobals()
const user = useSupabaseUser()

watch(user, () => {
  const { fromRoute, toRoute } = globalState.value.route
  console.log("from homepage user, route is", globalState.value.route)

  if (fromRoute === "" && toRoute === "") navigateTo("/students")
  // else if (user.value) navigateTo(globalState.value.route.toRoute)
})

definePageMeta({
  layout: "home"
})
</script>