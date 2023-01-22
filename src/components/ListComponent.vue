<template>
    <Listbox v-model="selectedItem">
      <div aria-label="listinnerwrap" :class="listinnerwrap">
        <ListboxButton :class="listbutton">
          <span aria-label="listspantruncate" :class="listspantruncate">
            {{ selectedItem }}
          </span>
          <span :class="listiconspan">
            <ChevronUpDownIcon :class="listicon" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition 
          leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions :class="listboxoptions">
            <ListboxOption v-slot="{ active, selected }" v-for="item in props.list" :key="item" :value="item"
              as="template">
              <li :class="[liClass(active), listboxoptionli]">
                <span :class="[ spanClass(selected), listspantruncate ]">
                  {{ item }}
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
const props = defineProps<{
  list: string[]
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

const selectedItem = ref("Select from the list...")

watch(selectedItem, () => emit("selected", selectedItem.value))
</script>
