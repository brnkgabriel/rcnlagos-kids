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
        </div>
      </div>
      <div class="card-section" id="notes">
        <div class="card-content">
          <div class="card-subtitle">NOTES</div>
          <div class="card-timeline" :class="cardTimeline">
            <div class="card-item" data-year="2014">
              <div class="card-item-title">
                <span>Front-end developer @</span>
                <span>JotForm</span>
              </div>
              <div class="card-item-desc">Disrupt stumptown retro everyday carry unicorn.</div>
            </div>
            <!-- <div class="card-item" data-year="2016">
              <div class="card-item-title">
                <span>UI Developer @</span>
                <span>GitHub</span>
              </div>
              <div class="card-item-desc">Developed new conversion funnels and disrupt.</div>
            </div>
            <div class="card-item" data-year="2018">
              <div class="card-item-title">
                <span>Illustrator @</span>
                <span>Google</span>
              </div>
              <div class="card-item-desc">Onboarding illustrations for App.</div>
            </div>
            <div class="card-item" data-year="2020">
              <div class="card-item-title">
                <span>Full-Stack Developer @</span>
                <span>CodePen</span>
              </div>
              <div class="card-item-desc">Responsible for the encomposing brand experience</div>
            </div> -->
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
          <div class="card-subtitle flex justify-between items-center">
            <div aria-label="head">GALLERY</div>
            <div aria-label="stats" class="text-xxs">1 / {{ props.media.length }}</div>
          </div>
          <div class="card-slide-wrapper relative max-h-[225px] md:h-slide">
            <div class="controls absolute">
              <div class="prev absolute"></div>
              <div class="next absolute"></div>
            </div>
            <!-- <div class="card-slide is-active" :style="slide1Style"></div>
            <div class="card-slide" :style="slide2Style"></div> -->
            <div v-for="(picture, idx) in props.media" :key="idx" :class="slideClass(idx)" :style="slideStyle(picture)"></div>
          </div>
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
import { iColor, iMedia, iStudent } from '../types';
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
// const sColor = ref<iColor>({ 100: "#dbeafe", 200: "#bfdbfe", 600: "#2563eb", 700: "#1d4ed8" })
const sColor = computed<iColor>(() => {
  return props.student.email 
  ? color(props.student.email) 
  : { 100: "#dbeafe", 200: "#bfdbfe", 600: "#2563eb", 700: "#1d4ed8" }
})

// watch(props.student, () => sColor.value = color(props.student.email as string))

const iconStyle = computed(() => `fill:${sColor.value[700]};border-color:${sColor.value[700]}`)
const coverStyle = computed(() => `background-color:${sColor.value[700]};`)
const bgStyle = computed(() => `background-color:${sColor.value[100]};`)
const ctaStyle = computed(() => `background-color:${sColor.value[600]};box-shadow:0 4px 20px -5px ${sColor.value[600]}`) 

const number = (contact: string | undefined, msg: string) => {
  if (contact && contact.length > 0)
    return props.student.parentsContact
  return `${msg} number...`
}

const phoneNo = computed(() => number(props.student.parentsContact, "Phone"))
const whatsAppNo = computed(() => number(props.student.parentsContact, "WhatsApp"))

const slideStyle = (media: iMedia) => `background-image: url(${media.mediaUrl});background-repeat:no-repeat;background-size:cover;background-position:center`
const slideClass = (idx: number) => idx === 0 ? 'card-slide is-active' : 'card-slide'

// const slide1Style = `background-image: url(https://firebasestorage.googleapis.com/v0/b/rcnlagos-children-department.appspot.com/o/landscape%2F01_02_EriifeOgundeji.jpg?alt=media&token=23016bb5-686b-44d1-bdf0-24673f06b057);background-repeat:no-repeat;background-size:cover;background-position:center`
// const slide2Style = `background: url(https://firebasestorage.googleapis.com/v0/b/rcnlagos-children-department.appspot.com/o/landscape%2F01_02_EriifeOgundeji_2.jpg?alt=media&token=b1563976-6568-4282-a3ed-ee458e6cb194);background-repeat:no-repeat;background-size:cover;background-position:center`


onUpdated(() => {
  console.log("media from onUpdated is", props.media)
})
</script>
<style lang="">
  
</style>