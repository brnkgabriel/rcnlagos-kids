<template>
  <div aria-label="disclosurewrap" :class="disclosurewrap">
    <div aria-label="disclosureinnerwrap" :class="disclosureinnerwrap">
      <Disclosure v-slot="{ open }">
        <DisclosureButton :class="disclosurebutton">
          <span>You're welcome, can we meet you?</span>
          <ChevronUpIcon :class="iconClass(open)" />
        </DisclosureButton>
        <DisclosurePanel :class="disclosurepanel">
          Biodata
        </DisclosurePanel>
      </Disclosure>
      <Disclosure as="div" class="mt-2" v-slot="{ open }">
        <DisclosureButton :class="disclosurebutton">
          <span>What do you do?</span>
          <ChevronUpIcon :class="iconClass(open)" />
        </DisclosureButton>
        <DisclosurePanel :class="disclosurepanel">
          Occupation
        </DisclosurePanel>
      </Disclosure>
      <Disclosure as="div" class="mt-2" v-slot="{ open }">
        <DisclosureButton :class="disclosurebutton">
          <span>Are you married?</span>
          <ChevronUpIcon :class="iconClass(open)" />
        </DisclosureButton>
        <DisclosurePanel :class="disclosurepanel">
          Marrital status
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/24/solid/index'

const {
  disclosurewrap,
  disclosureinnerwrap,
  disclosurebutton,
  disclosurepanel
} = useUi()

const iconClass = (isOpen: boolean) => isOpen 
  ? `rotate-180 transform h-5 w-5 text-rcnblue-500` 
  : `h-5 w-5 text-rcnblue-500`
</script>
