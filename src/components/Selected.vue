<template>
  <div :class="selectedComponent" data-state="#about" :style="bgStyle">
    <div class="card-header">
      <div class="card-cover" :style="coverStyle">
      </div>
      <img :src="avatar" alt="avatar" class="card-avatar" />
      <div class="card-identity">
        <h1 class="card-fullname">{{ fullname }}</h1>
        <h2 class="card-birthday">{{ props.person.class ?? birthday }}</h2>
      </div>
    </div>
    <div class="card-main h-smain">
      <div class="card-section is-active" id="about">
        <div class="card-content">
          <!-- <div class="card-subtitle">ABOUT</div>
          <p class="card-desc">{{ about }}</p> -->
          <div v-if="props.person.parentsContact" aria-label="teacherlastnote" class="shadow-custom bg-white rounded p-2 flex gap-2 relative text-xs">
            <div aria-label="teacherdetails" class="flex flex-col gap-y-1">
              <img class="rounded-full w-[60px]" :src="imgSrc('')" alt="avatar"/>
              <div aria-label="teachername" class="truncate w-full">Bro. Lanre</div>
              <div aria-label="teachercontacticons" class="flex gap-2">
                <a :href="constants.whatsappIcon(props.person)" class="shadow-cta rounded-full">
                  <img src="/icons/whatsapp.svg" class="w-[32px]" alt="whatsapp icon" />
                </a>
                <a
                  :href="contactNumber"
                  :style="callStyle"
                  class="shadow-cta rounded-full p-2 w-[32px] h-[32px] flex justify-center items-center">
                  <Icon type="phonecall" :active="true" class="w-[16px] text-white" />
                </a>
              </div>
            </div>
            <div aria-label="teachernote" class="flex flex-col gap-2">
              <div class="font-bold w-full truncate">Has gone home</div>
              <div>her mum came to pick her</div>
            </div>
            <div aria-label="time" class="absolute right-[8px] bottom-0 text-xxs uppercase font-semibold opacity-50">6:00 pm</div>
          </div>
        </div>
      </div>
      <div class="card-section h-full" id="notes">
        <div class="card-content h-full">
          <div class="card-subtitle">NOTES</div>
          <div v-if="props.person.parentsContact" class="card-timeline relative h-full" :class="cardTimeline">
            <div class="card-item" data-year="2023">
              <div class="card-item-title relative">
                <span>{{ heShe }} left with parent by </span>
                <span>8:30 PM</span>
              </div>
              <div class="card-item-desc">{{ hisHer }} mum came to pick {{ himHer }}</div>
              <div aria-label="circle" :style="circleStyle"></div>
            </div>
            <div class="card-item" data-year="2022">
              <div class="card-item-title relative">
                <span>{{ heShe }}'s in class by </span>
                <span>6:00 PM</span>
              </div>
              <div class="card-item-desc">{{ hisHer }} dad dropped {{ himHer }}</div>
              <div aria-label="circle" :style="circleStyle"></div>
            </div>
            <div aria-label="trail" :style="trailStyle"></div>
          </div>
        </div>
      </div>
      <div class="card-section" id="contact">
        <div class="card-content">
          <div class="card-subtitle">{{ props.person.parentsContact ? "PARENT'S CONTACT" : "CONTACT" }}</div>
          <div class="card-contact-wrapper flex flex-col gap-y-2">
            <div class="contact">
              <a :href="contactNumber" class="card-contact">
                <PhoneIcon class="w-[16px] h-[16px]" :style="iconStyle" />
                <span>{{ phoneNo }}</span>
              </a>
              <a :href="constants.whatsappIcon(props.person)" class="card-contact">
                <ChatBubbleLeftRightIcon class="w-[16px] h-[16px]"  :style="iconStyle" />
                <span>{{ whatsAppNo }}</span>
              </a>
            </div>
            <a class="contact-me text-center" :href="'tel:' + phone(props.person?.parentsContact || props.person?.phoneNumber)"
              :style="ctaStyle">CALL PARENT</a>
          </div>
        </div>
      </div>
      <div class="card-section h-full" id="gallery">
        <div class="card-content">
          <Slide v-if="media" :media="media" />
        </div>
      </div>
    </div>
    <div class="card-buttons flex justify-between" :style="bgStyle">
      <button data-type="btn" data-section="#about" class="is-active relative">
        <div class="clickable absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <Icon :active="isAboutActive" class="w-5" type="about" />
        <div>ABOUT</div>
      </button>
      <button data-type="btn" data-section="#notes" class="relative">
        <div class="clickable absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <Icon :active="isNoteActive" class="w-5" type="notes" />
        <div>NOTES</div>
      </button>
      <button data-type="btn" data-section="#contact" class="relative">
        <div class="clickable absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <Icon :active="isContactActive" class="w-5" type="contact" />
        <div>CONTACT</div>
      </button>
      <button data-type="btn" data-section="#gallery" class="relative">
        <div class="clickable absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <Icon :active="isGalleryActive" class="w-5" type="gallery" />
        <div>GALLERY</div>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { iColor, iMedia, iCombined } from '../types';
import { PhoneIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid/index'
const props = defineProps<{
  person: iCombined;
}>();
const avatarPlaceholder = "/icons/avatar.svg"

const { cardTimeline, selectedComponent } = useUi()

const currentTab = ref(constants.about)

const isAboutActive = computed(() => currentTab.value === constants.about)
const isNoteActive = computed(() => currentTab.value === constants.notes)
const isContactActive = computed(() => currentTab.value === constants.contact)
const isGalleryActive = computed(() => currentTab.value === constants.gallery)
const media = computed(() => (props.person?.media || props.person?.teachermedia as iMedia[]))
const contactNumber = computed(() => `tel:${phone(props.person?.parentsContact || props.person?.phoneNumber)}`)
const himHer = computed(() => props.person?.gender === constants.Male ? "him" : "her")
const hisHer = computed(() => props.person?.gender === constants.Male ? "his" : "her")
const heShe = computed(() => props.person?.gender === constants.Male ? "he" : "she")


const fullname = computed(() => props.person?.firstName ? `${props.person?.firstName} ${props.person?.lastName}` : 'Firstname Surname')
const avatar = computed(() => props.person?.imageUrl ?? avatarPlaceholder)
const birthday = computed(() => props.person?.birthday ?? `January 1`)
// const about = computed(() => props.person?.about ?? `Blessed Child`)


const sColor = computed<iColor>(() => {
  return props.person?.email 
  ? color(props.person?.email) 
  : { 100: "#dbeafe", 200: "#bfdbfe", 600: "#2563eb", 700: "#1d4ed8" }
})

const bgObj = (val: string) => ({"background-color": val})

const circleStyle = computed(() => obj2Str({
  "position": "absolute",
  "width": "12px",
  "height": "12px",
  "background": `linear-gradient(to bottom, ${sColor.value[100]} 0%, ${sColor.value[700]} 100%)`,
  "border": `2px solid #fff`,
  "border-radius": "50%",
  "top": "2px",
  "left": "0px"
}))

const trailStyle = computed(() => obj2Str({
    "background": `linear-gradient(to top, ${sColor.value[100]} 0%, ${sColor.value[700]} 100%);`,
    "left": "6px",
    "width": "2px",
    "top": "2px",
    "height": "100%",
    "position": "absolute",
    "transform": "translateX(-50%)"
}))
const iconStyle = computed(() => obj2Str({
  "fill": sColor.value[700],
  "border-color": sColor.value[700]
}))
const coverStyle = computed(() => obj2Str(bgObj(sColor.value[700])))
const bgStyle = computed(() => obj2Str(bgObj(sColor.value[100])))
const ctaStyle = computed(() => obj2Str({
  ...bgObj(sColor.value[600]),
  "box-shadow": `0 4px 20px -5px ${sColor.value[600]}`
}))
const callStyle = computed(() => obj2Str({
  "background-color": sColor.value[700]
}))

const number = (contact: string | undefined, msg: string) => {
  if (contact && contact.length > 0)
    return props.person?.parentsContact || props.person?.phoneNumber
  return `${msg} number...`
}

const phoneNo = computed(() => number(props.person?.parentsContact || props.person?.phoneNumber, "Phone"))
const whatsAppNo = computed(() => number(props.person?.parentsContact || props.person?.phoneNumber, "WhatsApp"))

const handleTabNavigation = () => {
  const buttons = document.querySelectorAll(".card-buttons button");
  const sections = document.querySelectorAll(".card-section");
  const selected = document.querySelector(".selected");

  const handleButtonClick = (btn: HTMLElement) => {
    const sectionStr = btn.getAttribute("data-section")
    const sectionEl = el(sectionStr as string)
    currentTab.value = sectionStr?.substring(1, sectionStr.length) as string
    
    sectionStr !== "#about"
      ? selected?.classList.add("is-active")
      : selected?.classList.remove("is-active");
    selected?.setAttribute("data-state", sectionStr as string);
    sections.forEach((s) => s.classList.remove("is-active"));
    buttons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    sectionEl.classList.add("is-active");
  };

  selected?.addEventListener('click', evt => {
    const target = evt.target as HTMLElement
    if (target.classList.contains('clickable')) {
      const btn = target.parentElement
      handleButtonClick(btn as HTMLElement)
    }
  })

}

onMounted(() => {
  handleTabNavigation()
})

</script>
<style lang="">
  
</style>