<template>
  <div class="text-sm flex flex-col gap-y-4">
    <SwitchComp :left="constants.parent" right="admin" name="authType" :value="value" />
    <div>
      <input type="text" :placeholder="(placeholderRef as string)" :class="input" class="pointer-events-none"
        :value="inputfield" />
      <div v-if="hasError" class="text-red-600 text-xxs font-semibold text-center">{{ error }}</div>
    </div>
    <div class="grid grid-cols-3 grid-rows-4 gap-2 items-center justify-items-center w-[152px] mx-auto">
      <div v-for="(num, idx) in 10" @click="handleClick" :key="idx" :class="cellClass(idx)"
        :data-num="(num).toString().slice(-1)">{{ (num).toString().slice(-1) }}
      </div>
      <div :class="iconClass('col-start-1 col-end-1 row-start-4 row-end-4 p-2 relative')" data-num="delete">
        <div @click="handleClick" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
        </div>
        <Icon :type="constants.left" :active="true" />
      </div>
      <div :class="iconClass('col-start-3 col-end-3 row-start-4 row-end-4 p-2 relative')" data-num="forward">
        <div @click="handleClick" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
        </div>
        <Icon :type="constants.right" :active="true" />
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">

import { Ref } from "vue";
import { iDynamicObject, iAuthType, iDataApiOptions, iTeacher } from "~~/src/types/index"

const { numpad, input } = useUi()
const { setAuthType, globalState, setUserData } = useGlobals()

const switchRef = ref(constants.parent)
const map: iDynamicObject = {
  parent: "Parent number (e.g. 08012345678)",
  admin: "Access pin (e.g. 1234)"
}

const error = ref("")
const hasError = computed(() => error.value.length > 0)

const inputfield = ref("")

const authType: Ref<iAuthType> = computed(() => ({
  key: switchRef.value,
  value: inputfield.value
}))

const value = (selected: string) => switchRef.value = selected
const placeholderRef = computed(() => map[switchRef.value])

const cellClass = (idx: number) => `${numpad} ${(idx === 9) && 'col-start-2 col-end-2'}`
const iconClass = (pos: string) => `${numpad} ${pos}`

const pop = (target: HTMLElement) => {
  target.classList.add("pop")
  setTimeout(() => target.classList.remove("pop"), 150);
}

const handleClick = async (evt: Event) => {
  const target = evt.target as HTMLElement
  const parent = target.parentElement
  const targetNum = target.getAttribute("data-num")
  const parentNum = parent?.getAttribute("data-num")

  pop(target)

  targetNum && (inputfield.value += targetNum)

  if (parentNum) {
    pop(parent as HTMLElement)
    switch (parentNum) {
      case constants.delete:
        inputfield.value = inputfield.value.substring(0, inputfield.value.length - 1)
        break;
      case constants.forward:
        const authT = authType.value
        if (authT.key === constants.parent && authT.value.length !== 11) {
          return handleError("Phone numbers should be 11 characters")
        }

        if (authT.key === constants.admin && authT.value.length !== 4) {
          return handleError("Expected pin is 4 characters")
        }

        if (authT.key === constants.admin) handleAdminPin(authT)
        if (authT.key === constants.parent) handleParentPhoneNumber(authT)
        break;
    }
  }
}

const handleError = (msg: string) => {
  error.value = msg
  setTimeout(() => error.value = "", 5000);
}

const handleAdminPin = async (authT: iAuthType) => {
  const options: iDataApiOptions = {
    table: "codes",
    column: "code",
    value: authT.value,
    update: "",
    foreignkey: ""
  }
  const { data } = await useFetch(constants.dataApiUrl, { params: { ...options } })
  const obj = data.value as iDynamicObject
  if (obj[0]) {
    setAuthType(authT)
    const userCookie = useCookie("user", { maxAge: 60 * 60 * 8 })
    userCookie.value = `key=${authT.key}|value=${authT.value}`
    navigateTo("/students")
  }

  if (!obj[0]) {
    handleError("Wrong pin, try again")
  }
}

const handleParentPhoneNumber = async (authT: iAuthType) => {
  const options: iDataApiOptions = {
    table: "students",
    column: "parentsContact",
    value: authT.value,
    update: "",
    foreignkey: ""
  }
  const { data } = await useFetch(constants.dataApiUrl, { params: { ...options } })
  const obj = data.value as iDynamicObject
  if (obj[0]) {
    setAuthType(authT)
    const userCookie = useCookie("user", { maxAge: 60 * 60 * 8 })
    userCookie.value = `key=${authT.key}|value=${authT.value}`
    navigateTo("/students")
  }

  if (!obj[0]) {
    handleError("No student with your phone number")
  }
}

</script>
<style lang="">
  
</style>