<template>
    <Listbox v-model="selectedcategory">
      <div aria-label="listinnerwrap" :class="listinnerwrap">
        <ListboxButton :class="listbutton">
          <span aria-label="listspantruncate" :class="listspantruncate">
            {{ selectedcategory.name }}
          </span>
          <span :class="listiconspan">
            <ChevronUpDownIcon :class="listicon" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition 
          leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions :class="listboxoptions">
            <ListboxOption v-slot="{ active, selected }" v-for="category in categories" :key="category.name" :value="category"
              as="template">
              <li :class="[liClass(active), listboxoptionli]">
                <span :class="[ spanClass(selected), listspantruncate ]">
                  {{ category.name }}
                </span>
                <span
                  aria-label="listboxoptionspan"
                  v-if="selected"
                  :class="listboxoptionspan">
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid/index'
const emit = defineEmits<{
  (e: 'selected', selection: string): void
}>()

const {
  listinnerwrap,
  listbutton,
  listspantruncate,
  listiconspan,
  listicon,
  listboxoptions,
  listboxoptionli,
  listboxoptionspan
} = useUi()

const liClass = (isActive: boolean) => isActive
  ? 'bg-amber-100 text-amber-900'
  : 'text-gray-900'

const spanClass = (isSelected: boolean) => isSelected
  ? 'font-medium' : 'font-normal'

const categories = [
  { name: 'Single' },
  { name: 'Married' },
  { name: 'Engaged' },
]
const selectedcategory = ref(categories[0])

watch(selectedcategory, () => emit("selected", selectedcategory.value.name))
</script>
