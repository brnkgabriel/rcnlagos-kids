<template>
  <component :is="comp.icon" :class="comp.color" />
</template>
<script setup lang="ts">
import {
  HomeModernIcon as HomeIconOutline,
  UserIcon as TeachersIconOutline,
  UserGroupIcon as StudentsIconOutline,
  Cog6ToothIcon as SettingsIconOutline,
  CalendarDaysIcon as EventsIconOutline,
  WrenchScrewdriverIcon as OccupationIconOutline,
  PhoneArrowUpRightIcon as PhonecallIconOutline,
  PencilSquareIcon as NoteIconOutline,
  PhotoIcon as GalleryIconOutline,
  UserCircleIcon as AboutIconOutline,
  PencilIcon as EditIconOutline,
  PowerIcon as SignoutIcon,
  UserPlusIcon as AddIconOutline
} from "@heroicons/vue/24/outline/index"
import {
  HomeModernIcon as HomeIconSolid,
  UserIcon as TeachersIconSolid,
  UserGroupIcon as StudentsIconSolid,
  Cog6ToothIcon as SettingsIconSolid,
  CalendarDaysIcon as EventsIconSolid,
  WrenchScrewdriverIcon as OccupationIconSolid,
  PhoneArrowUpRightIcon as PhonecallIconSolid,
  PencilSquareIcon as NoteIconSolid,
  PhotoIcon as GalleryIconSolid,
  UserCircleIcon as AboutIconSolid,
  PencilIcon as EditIconSolid,
  MagnifyingGlassIcon as SearchIcon,
  ArrowLeftIcon, ArrowRightIcon,
  UserPlusIcon as AddIconSolid
} from "@heroicons/vue/24/solid/index"

const comp = computed(() => {
  let icon = null
  let color = props.active ? 'text-rcnblue-500' : 'text-rcngray-900'
  switch (props.type) {
    case constants.settings:
      icon = props.active ? SettingsIconSolid : SettingsIconOutline
      break;
    case constants.students:
      icon = props.active ? StudentsIconSolid : StudentsIconOutline
      break
    case constants.teachers:
      icon = props.active ? TeachersIconSolid : TeachersIconOutline
      break
    case constants.events:
      icon = props.active ? EventsIconSolid : EventsIconOutline
      break
    case constants.occupation:
      icon = props.active ? OccupationIconSolid : OccupationIconOutline
      break
    case constants.phonecall:
      icon = props.active ? PhonecallIconSolid : PhonecallIconOutline
      break
    case constants.contact:
      icon = props.active ? PhonecallIconSolid : PhonecallIconOutline
      break
    case constants.edit:
      icon = props.active ? EditIconSolid : EditIconOutline
      break;
    case constants.home:
      icon = props.active ? HomeIconSolid : HomeIconOutline
      break;
    case constants.notes:
      icon = props.active ? NoteIconSolid : NoteIconOutline
      break;
    case constants.gallery:
      icon = props.active ? GalleryIconSolid : GalleryIconOutline
      break;
    case constants.about:
      icon = props.active ? AboutIconSolid : AboutIconOutline
      break;
    case constants.add:
      icon = props.active ? AddIconSolid : AddIconOutline
      break;
    case constants.search:
      icon = SearchIcon
      break;
    case constants.signout:
      icon = SignoutIcon
      break;
    case constants.left:
      icon = ArrowLeftIcon
      break;
    case constants.right:
      icon = ArrowRightIcon;
      break
    default:
      break;
  }
  return { icon, color }
})

const props = defineProps<{
  active?: boolean
  type?: string
}>()
</script>
<style lang="">
    
</style>