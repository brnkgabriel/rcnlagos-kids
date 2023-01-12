import { iGlobal } from "~~/src/types"
import { constants } from "../composables"

export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
  useState<iGlobal>(constants.globals, () => ({
    slides: [],
    events: [],
    media: [],
    notes: [],
    students: [],
    rndStudents: [],
    teachers: []
  }))
})
