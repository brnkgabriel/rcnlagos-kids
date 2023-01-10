<template>
  <div :class="selectedComponent" data-state="#about" :style="bgStyle">
    <div class="card-header">
      <div class="card-cover" :style="coverStyle">
      </div>
      <img :src="avatar" alt="avatar" class="card-avatar" />
      <div class="card-identity">
        <h1 class="card-fullname">{{ fullname }}</h1>
        <h2 class="card-birthday">{{ birthday }}</h2>
      </div>
    </div>
    <div class="card-main">
      <div class="card-section is-active" id="about">
        <div class="card-content">
          <div class="card-subtitle">ABOUT</div>
          <p class="card-desc">{{ about }}</p>
          <div aria-label="teacherlastnote" class="shadow-custom bg-white rounded p-2 flex gap-2 relative">
            <div aria-label="teacherdetails" class="flex flex-col gap-y-2">
              <img class="rounded-full w-[60px]" :src="imgSrc('')" alt="avatar"/>
              <div aria-label="teachername" class="truncate w-full">Bro. Lanre</div>
              <div aria-label="teachercontacticons" class="flex gap-2">
                <a :href="constants.whatsappIcon({})" class="shadow-cta rounded-full">
                  <img src="/icons/whatsapp.svg" class="w-[32px]" alt="whatsapp icon" />
                </a>
                <a :href="'tel:' + phone('')"
                  class="shadow-cta rounded-full p-2 bg-rcnorange-500 w-[32px] h-[32px] flex justify-center items-center">
                  <Icon type="phonecall" :active="true" class="w-[16px] text-white" />
                </a>
              </div>
            </div>
            <div aria-label="teachernote" class="flex flex-col gap-2">
              <div class="font-bold">{{ student.firstName }} has gone home</div>
              <div>her mum came to pick her</div>
            </div>
            <div aria-label="time" class="absolute right-[8px] bottom-[8px] text-xxs uppercase font-semibold opacity-50">6:00 pm</div>
          </div>
        </div>
      </div>
      <div class="card-section h-full" id="notes">
        <div class="card-content h-full">
          <div class="card-subtitle">NOTES</div>
          <div class="card-timeline relative h-full" :class="cardTimeline">
            <div class="card-item" data-year="2014">
              <div class="card-item-title relative">
                <span>Front-end developer @</span>
                <span>JotForm</span>
              </div>
              <div class="card-item-desc">Disrupt stumptown retro everyday carry unicorn.</div>
              <div aria-label="circle" :style="circleStyle"></div>
            </div>
            <div class="card-item" data-year="2012">
              <div class="card-item-title relative">
                <span>Front-end developer @</span>
                <span>JotForm</span>
              </div>
              <div class="card-item-desc">Disrupt stumptown retro everyday carry unicorn.</div>
              <div aria-label="circle" :style="circleStyle"></div>
            </div>
            <div class="card-item" data-year="2010">
              <div class="card-item-title relative">
                <span>Front-end developer @</span>
                <span>JotForm</span>
              </div>
              <div class="card-item-desc">Disrupt stumptown retro everyday carry unicorn.</div>
              <div aria-label="circle" :style="circleStyle"></div>
            </div>
            <div aria-label="trail" :style="trailStyle"></div>
          </div>
        </div>
      </div>
      <div class="card-section" id="contact">
        <div class="card-content">
          <div class="card-subtitle">PARENT'S CONTACT</div>
          <div class="card-contact-wrapper flex flex-col gap-y-2">
            <div class="contact">
              <a :href="'tel:' + phone(props.student.parentsContact)" class="card-contact">
                <PhoneIcon class="w-[16px] h-[16px]" :style="iconStyle" />
                <span>{{ phoneNo }}</span>
              </a>
              <a :href="constants.whatsappIcon(props.student)" class="card-contact">
                <ChatBubbleLeftRightIcon class="w-[16px] h-[16px]"  :style="iconStyle" />
                <span>{{ whatsAppNo }}</span>
              </a>
            </div>
            <a class="contact-me text-center" :href="'tel:' + phone(props.student.parentsContact)"
              :style="ctaStyle">CALL PARENT</a>
          </div>
        </div>
      </div>
      <div class="card-section h-full" id="gallery">
        <div class="card-content">
          <Slide :media="media" />
        </div>
      </div>
    </div>
    <div class="card-buttons flex justify-between" :style="bgStyle">
      <button data-section="#about" class="is-active">ABOUT</button>
      <button data-section="#notes">NOTES</button>
      <button data-section="#contact">CONTACT</button>
      <button data-section="#gallery">GALLERY</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { iColor, iDataApiOptions, iDynamicObject, iMedia, iStudent } from '../types';
import { PhoneIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid/index'
const props = defineProps<{
  student: iStudent;
  media: iMedia[]
}>();
const avatarPlaceholder = "/icons/avatar.svg"

const { cardTimeline, selectedComponent } = useUi()

const fullname = computed(() => props.student.firstName ? `${props.student.firstName} ${props.student.lastName}` : 'Firstname Surname')
const avatar = computed(() => props.student.imageUrl ?? avatarPlaceholder)
const birthday = computed(() => props.student.birthday ?? `January 1`)
const about = computed(() => props.student.about ?? `Blessed Child`)

const sColor = computed<iColor>(() => {
  return props.student.email 
  ? color(props.student.email) 
  : { 100: "#dbeafe", 200: "#bfdbfe", 600: "#2563eb", 700: "#1d4ed8" }
})

// const options: iDataApiOptions = {
//   table: "events",
//   column: "",
//   value: "",
//   update: ""
// }


const bgObj = (val: string) => ({"background-color": val})
 

const circleStyle = computed(() => obj2Str({
  "position": "absolute",
  "width": "12px",
  "height": "12px",
  "background": `linear-gradient(to bottom, ${sColor.value[100]} 0%, ${sColor.value[700]} 100%)`,
  "border": `2px solid #fff`,
  "border-radius": "50%",
  "top": "2px",
  "left": "37px"
}))

const trailStyle = computed(() => obj2Str({
    "background": `linear-gradient(to top, ${sColor.value[100]} 0%, ${sColor.value[700]} 100%);`,
    "left": "42px",
    "width": "2px",
    "top": "2px",
    "height": "100%",
    "position": "absolute"
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

const number = (contact: string | undefined, msg: string) => {
  if (contact && contact.length > 0)
    return props.student.parentsContact
  return `${msg} number...`
}

const phoneNo = computed(() => number(props.student.parentsContact, "Phone"))
const whatsAppNo = computed(() => number(props.student.parentsContact, "WhatsApp"))

const slideStyle = (media: iMedia) => `background-image: url(${media.mediaUrl});background-repeat:no-repeat;background-size:cover;background-position:center`
const slideClass = (idx: number) => idx === 0 ? 'card-slide is-active' : 'card-slide'
</script>
<style lang="">
  
</style>