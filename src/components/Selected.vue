<template>
  <div class="selected" data-state="#about">
    <div class="card-header">
      <div class="card-cover" :style="style">
      </div>
      <img
        :src="avatar"
        alt="avatar" class="card-avatar" />
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
          <div class="card-timeline">
            <div class="card-item" data-year="2014">
              <div class="card-item-title">
                <span>Front-end developer @</span>
                <span>JotForm</span>
              </div>
              <div class="card-item-desc">Disrupt stumptown retro everyday carry unicorn.</div>
            </div>
            <div class="card-item" data-year="2016">
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
            </div>
          </div>
        </div>
      </div>
      <div class="card-section" id="contact">
        <div class="card-content">
          <div class="card-subtitle">PARENT'S CONTACT</div>
          <div class="card-contact-wrapper">
            <div class="contact">
              <a  :href="'tel:' + phone(props.student.parentsContact)" class="card-contact">
                <PhoneIcon class="w-[16px] h-[16px]" />
                <span>{{ phoneNo }}</span>
              </a>
              <a :href="constants.whatsappIcon(props.student)" class="card-contact">
                <ChatBubbleLeftRightIcon class="w-[16px] h-[16px]" />
                <span>{{ whatsAppNo }}</span>
              </a>
            </div>
            <a class="contact-me bg-rcnblue-200 text-center block mt-10" :href="'tel:' + phone(props.student.parentsContact)">CALL PARENT</a>
          </div>
        </div>
      </div>
      <div class="card-section" id="gallery">
        <div class="card-content">
          <div class="card-subtitle flex justify-between items-center">
            <div aria-label="head">GALLERY</div>
            <div aria-label="stats" class="text-xxs">1 / 2</div>
          </div>
          <div class="card-slide-wrapper relative">
            <div class="controls absolute">
              <div class="prev absolute"></div>
              <div class="next absolute"></div>
            </div>
            <div class="card-slide is-active" :style="slide1Style"></div>
            <div class="card-slide" :style="slide2Style"></div>
          </div>
        </div>
      </div>
    </div>
      <div class="card-buttons">
        <button data-section="#about" class="is-active">ABOUT</button>
        <button data-section="#notes">NOTES</button>
        <button data-section="#contact">CONTACT</button>
        <button data-section="#gallery">GALLERY</button>
      </div>
  </div>
</template>
<script setup lang="ts">
import { iStudent } from '../types';
import { PhoneIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid/index'
const props = defineProps<{ student: iStudent; }>();
const avatarPlaceholder = "/icons/avatar.svg"

const fullname = computed(() => props.student.firstName ? `${props.student.firstName} ${props.student.lastName}` : 'Firstname Surname')

const style = computed(() => `background-image: url(${props.student.imageUrl ?? avatarPlaceholder});`)
const avatar = computed(() => props.student.imageUrl ?? avatarPlaceholder)
const birthday = computed(() => props.student.birthday ?? `January 1`)
const about = computed(() => props.student.about ?? `Blessed Child`)

const number = (contact: string | undefined, msg: string) => {
  if (contact && contact.length > 0)
    return props.student.parentsContact
  return `${msg} number...`
}

const phoneNo = computed(() => number(props.student.parentsContact, "Phone"))
const whatsAppNo = computed(() => number(props.student.parentsContact, "WhatsApp"))

const slide1Style = `background-image: url(https://firebasestorage.googleapis.com/v0/b/rcnlagos-children-department.appspot.com/o/landscape%2F01_02_EriifeOgundeji.jpg?alt=media&token=23016bb5-686b-44d1-bdf0-24673f06b057);background-repeat:no-repeat;background-size:cover;background-position:center`
const slide2Style = `background: url(https://firebasestorage.googleapis.com/v0/b/rcnlagos-children-department.appspot.com/o/landscape%2F01_02_EriifeOgundeji_2.jpg?alt=media&token=b1563976-6568-4282-a3ed-ee458e6cb194);background-repeat:no-repeat;background-size:cover;background-position:center`
</script>
<style lang="">
  
</style>