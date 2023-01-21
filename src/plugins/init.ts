import { iGlobal } from "~~/src/types"
import { constants } from "../composables"

export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
  useState<iGlobal>(constants.globals, () => ({
    slides: [],
    events: [],
    media: [],
    notes: [],
    selectedStudent: {

    },
    students: [],
    renderedStudents: [],
    searchedStudents: [],
    teachers: [],
    renderedTeachers: [],
    searchedTeachers: [],
    user: {
      data: {},
      email: ""
    },
    authType: {
      key: "",
      value: ""
    },
    route: {
      fromRoute: "",
      toRoute: ""
    }
  }))
})
