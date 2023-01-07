<template>
  <Combobox v-model="selected">
    <div class="relative">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md  sm:text-sm">
        <ComboboxInput :class="comboInput()" :displayValue="(person: any) => person.name" @change="query = $event.target.value" />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>
      </div>
      <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
        <ComboboxOptions
          class="absolute mt-1 h-[150px] w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg sm:text-sm">
          <div v-if="filteredPeople.length === 0 && query !== ''"
            class="relative cursor-default select-none py-2 px-4 text-gray-700">
            Nothing found.
          </div>

          <ComboboxOption v-for="person in filteredPeople" as="template" :key="person.id" :value="person"
            v-slot="{ selected, active }">
            <li class="relative cursor-default select-none py-2 pl-10 pr-4" :class="{
              'bg-teal-600 text-white': active,
              'text-gray-900': !active,
            }">
              <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                {{ person.name }}
              </span>
              <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3"
                :class="{ 'text-white': active, 'text-teal-600': !active }">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid/index'
import { iStudent, iPerson } from '../types';

const props = defineProps<{
  students: iStudent[];
}>();

const emit = defineEmits<{
  (e: 'person', person: iPerson): void
  (e: 'persons', person: iPerson[]): void
}>()

let people = computed(() => props.students.map((student: iStudent) => ({...student, name: studentName(student)}))) 
let selected = ref<iPerson>(people.value[0])
let query = ref('')

let filteredPeople = computed(() =>
  query.value === ''
    ? people.value
    : people.value.filter((person: iPerson) =>
      person.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.value.toLowerCase().replace(/\s+/g, ''))
    )
)

watch(selected, () => emit("person", selected.value))
watch(filteredPeople, () => emit("persons", filteredPeople.value))

</script>