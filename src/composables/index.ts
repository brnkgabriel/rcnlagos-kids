import { iColor, iCombined, iGlobal, iGlobalState, iMedia, iStudent } from "../types"

const subline = "text-xs"
const tiny = "text-xxxs font-bold"
const grayText = "text-rcngray-900"
const flexCenterCenter = "flex justify-center items-center"

export const useUi = () => {
  return {
    mainline: "text-rcnblue-500 font-semibold text-sm",
    texttrim: "w-full overflow-hidden whitespace-nowrap text-ellipsis",
    mainline_small: "text-rcnblue-500 font-semibold",
    subline_small: subline,
    subline,
    grayText,
    breadcrumb: grayText + " uppercase mb-1 " + tiny,
    logo: flexCenterCenter + " bg-white shadow-custom absolute top-[40%] left-[16px] w-[50px] h-[50px] rounded-full p-2 z-10 -translate-y-1/2",
    bottomNavLink: flexCenterCenter + " flex-col cursor-pointer",
    bottomNavLinkIcon: flexCenterCenter + " w-[32px] h-[32px]",
    homeNavLink: "rounded-full bg-white shadow-custom p-3 w-[250px] text-center cursor-pointer text-rcnblue-500 border-2 text-xs",
    button: "rounded-full bg-rcnblue-500 shadow-custom p-3 w-full text-center cursor-pointer text-white border-2 text-xs uppercase",
    center: "absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2",
    flex_center: "flex flex-col justify-center items-center",
    input: "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rcnblue-500 focus:border-rcnblue-500 block w-full h-[42px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-rcnblue-500 dark:focus:border-rcnblue-500",
    studentItem: "flex flex-col flex-grow w-1/2 sm:w-1/4 overflow-hidden rounded-md shadow-custom bg-white cursor-pointer",
    studentItemOccupationIcon: "w-[16px] h-[16px]",
    studentsComponent: "h-full flex flex-col sm:flex-row sm:gap-x-2 landscape:flex-row landscape:gap-x-2 portrait:flex-col",
    cardTimeline: "",
    selectedComponent: "selected h-reverseprofile landscape:h-full sm:h-full flex flex-col",
    search: "absolute w-[32px] h-[32px] right-[4px] top-half -translate-y-1/2 bg-rcnblue-500 rounded-md flex justify-center items-center cursor-pointer",
    searchIcon: "w-[24px] h-[24px] text-white",
    dropdown: "absolute top-full right-[8px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none capitalize overflow-hidden",
    dropdownLogout: "text-gray-700 block px-4 py-2 text-sm cursor-pointer",
    cardList: "whitespace-nowrap overflow-y-hidden overflow-x-auto sm:flex sm:flex-wrap sm:gap-2 sm:overflow-y-auto sm:overflow-x-hidden sm:h-auto"
  }
}

export const all = (query: string, parent?: HTMLElement) => parent ? parent.querySelectorAll(query) : document.querySelectorAll(query)

export const el = (query: string, parent?: HTMLElement) => parent ? parent.querySelector(query) as HTMLElement : document.querySelector(query) as HTMLElement

export const position = (idx: number, list: any[]) => idx === list.length - 1 ? "last" : "others"

export const color = (identifier: string): iColor => {
  const sum = [...identifier].reduce((acc, cur) => acc += cur.charCodeAt(0), 0)
  const keys = Object.keys(constants.colorNames)
  const idx = sum % keys.length
  const key = keys[idx]
  // @ts-ignore
  const colorObj = constants.colorNames[key]
  return colorObj
}

export const constants = {
  dataApiUrl: "/api/g-data",
  imageUploadApiUrl: "/api/p-image",
  colorNames: {
    slate: {
      100: "#f1f5f9",
      200: "#e2e8f0",
      600: "#475569",
      700: "#334155"
    },
    gray: {
      100: "#f3f4f6",
      200: "#e5e7eb",
      600: "#4b5563",
      700: "#374151"
    },
    zinc: {
      100: "#f4f4f5",
      200: "#e4e4e7",
      600: "#52525b",
      700: "#3f3f46"
    },
    stone: {
      100: "#f5f5f4",
      200: "#e7e5e4",
      600: "#57534e",
      700: "#44403c"
    },
    red: {
      100: "#fee2e2",
      200: "#fecaca",
      600: "#dc2626",
      700: "#b91c1c"
    },
    orange: {
      100: "#ffedd5",
      200: "#fed7aa",
      600: "#ea580c",
      700: "#c2410c"
    },
    amber: {
      100: "#fef3c7",
      200: "#fde68a",
      600: "#d97706",
      700: "#b45309"
    },
    yellow: {
      100: "#fef9c3",
      200: "#fef08a",
      600: "#ca8a04",
      700: "#a16207"
    },
    lime: {
      100: "#ecfccb",
      200: "#d9f99d",
      600: "#65a30d",
      700: "#4d7c0f"
    },
    green: {
      100: "#dcfce7",
      200: "#bbf7d0",
      600: "#16a34a",
      700: "#15803d"
    },
    emerald: {
      100: "#d1fae5",
      200: "#a7f3d0",
      600: "#059669",
      700: "#047857"
    },
    teal: {
      100: "#ccfbf1",
      200: "#99f6e4",
      600: "#0d9488",
      700: "#0f766e"
    },
    cyan: {
      100: "#cffafe",
      200: "#a5f3fc",
      600: "#0891b2",
      700: "#0e7490"
    },
    sky: {
      100: "#e0f2fe",
      200: "#bae6fd",
      600: "#0284c7",
      700: "#0369a1"
    },
    blue: {
      100: "#dbeafe",
      200: "#bfdbfe",
      600: "#2563eb",
      700: "#1d4ed8"
    },
    indigo: {
      100: "#e0e7ff",
      200: "#c7d2fe",
      600: "#4f46e5",
      700: "#4338ca"
    },
    violet: {
      100: "#ede9fe",
      200: "#ddd6fe",
      600: "#7c3aed",
      700: "#6d28d9"
    },
    purple: {
      100: "#f3e8ff",
      200: "#e9d5ff",
      600: "#9333ea",
      700: "#7e22ce"
    },
    fuchsia: {
      100: "#fae8ff",
      200: "#f5d0fe",
      600: "#c026d3",
      700: "#a21caf"
    },
    pink: {
      100: "#fce7f3",
      200: "#fbcfe8",
      600: "#db2777",
      700: "#be185d"
    },
    rose: {
      100: "#ffe4e6",
      200: "#fecdd3",
      600: "#e11d48",
      700: "#be123c"
    }
  },
  monthMap: {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12
  },
  monthList: [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
  ],
  birthdayMinDuration: "1440",
  home: 'home',
  settings: 'settings',
  teachers: 'teachers',
  students: 'students',
  events: 'events',
  occupation: 'occupation',
  phonecall: 'phonecall',
  edit: 'edit',
  search: 'search',
  signout: 'signout',
  teachersItem: 'teachersItem',
  teachersList: 'teachersList',
  vertical: 'vertical',
  horizontal: 'horizontal',
  registered: 'registered',
  anonymous: 'anonymous',
  globals: "globals",
  div: 'div',
  whatsappIcon: (student: iStudent | null) => {
    let number = student ? student?.parentsContact : "0"
    // @ts-ignore
    const num = phone(number)
    number = num.slice(1, num.length)

    return `https://api.whatsapp.com/send?phone=${number}&text=${parentsAddress(student)}`
  }
}

export const parentsAddress = (student: iStudent | null) => student?.lastName ? `Hello Sir/Ma (we're contacting you with respect to ${student.firstName})` : 'Names'

export const studentName = (student: iStudent | null) => student?.lastName ? `${student.firstName} ${student.lastName}` : 'Firstname Surname'

export const imgSrc = (url: string) => url.length > 0 ? url : '/icons/avatar.svg'

export const editUrl = (student: iStudent | null) => {
  if (!student) return "/student"
  const firstName = student.firstName?.split(' ').join('-').toLowerCase()
  const lastName = student.lastName?.split(' ').join('-').toLowerCase()
  return `/${firstName}-${lastName}`
}

export const typeStudent = (data: any) => data as iStudent[]

export const minutesToMilliseconds = (minutes: string | undefined) => {
  if (!minutes) return 0
  const mins = Number(minutes)
  return 1000 * 60 * mins
}

const startAndEndTimes = (item: iCombined, type: string) => {
  const strDuration = type === constants.students ? item.duration : constants.birthdayMinDuration
  const duration = minutesToMilliseconds(strDuration)
  const dateStr = type === constants.students ? item.birthday : item.birthday
  const dateInstance = new Date(dateStr as string)
  const $mIdx = dateInstance.getMonth()
  const $date = dateInstance.getDate()
  const $year = new Date().getFullYear()
  const sTime = +new Date($year, $mIdx, $date)
  const eTime = sTime + duration
  return { sTime, eTime }
}

export const reorder = (list: iCombined[], type: string) => {
  let prev = null
  let next = null
  let live = null
  switch (type) {
    case constants.students:
      prev = list.filter(item => {
        const { eTime } = startAndEndTimes(item, constants.students)
        return Date.now() > eTime
      }).sort((a, b) => +new Date(a.birthday as string) - +new Date(b.birthday as string))

      next = list.filter(item => {
        const { sTime } = startAndEndTimes(item, constants.students)
        return Date.now() < sTime
      }).sort((a, b) => +new Date(a.birthday as string) - +new Date(b.birthday as string))

      live = list.filter(item => {
        const { sTime, eTime } = startAndEndTimes(item, constants.students)
        return Date.now() >= sTime && Date.now() <= eTime
      }).sort((a, b) => +new Date(a.birthday as string) - +new Date(b.birthday as string))

      return { prev, next, live, reordered: [...live, ...next, ...prev] };
    case constants.teachers:
      prev = list.filter(item => {
        const { eTime } = startAndEndTimes(item, constants.teachers)
        return Date.now() > eTime
      }).sort((a, b) => +new Date(a.birthday as string) - +new Date(b.birthday as string))

      next = list.filter(item => {
        const { sTime } = startAndEndTimes(item, constants.teachers)
        return Date.now() < sTime
      }).sort((a, b) => +new Date(a.birthday as string) - +new Date(b.birthday as string))

      live = list.filter(item => {
        const { sTime, eTime } = startAndEndTimes(item, constants.teachers)
        return Date.now() >= sTime && Date.now() <= eTime
      }).sort((a, b) => +new Date(a.birthday as string) - +new Date(b.birthday as string))

      return { prev, next, live, reordered: [...live, ...next, ...prev] };
    default:
      break;
  }
}

export const search = (term: string, list: iCombined[]) => {
  return list.filter(student => {
    return student.firstName?.toLowerCase().includes(term) ||
      student.lastName?.toLowerCase().includes(term) ||
      student.birthday?.toLowerCase().includes(term) ||
      student.gender?.toLowerCase().includes(term) ||
      student.age?.toLowerCase().includes(term) ||
      student.parentsContact?.toLowerCase().includes(term) ||
      student.role?.toLowerCase().includes(term)
  })
}

const replacePattern = (pattern: string, str: string) => {
  var re = new RegExp(pattern, 'g')
  return str.replace(re, '-')
}

export const id = (name: string, delim: string) => {
  var replaceApostrophe = replacePattern("'", name)
  var replaceAmpersand = replacePattern('&', replaceApostrophe)
  var replacePercent = replacePattern('%', replaceAmpersand)
  return replacePercent.toLowerCase().split(' ').join(delim)
}

export const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export const phone = (number: any) => {
  if (!number) return ""
  switch (number[0]) {
    case "0": return "+234" + number.slice(1, number.length)
    case "1": return "+1" + number.slice(1, number.length)
    case "2": return "+234" + number.slice(3, number.length)
    case "+": return number[1] === "2" ? "+234" + number.slice(4, number.length) : "+1" + number.slice(4, number.length)
    default: return number
  }
}

export const fromLocalStorage = (key: string, json?: any) => {
  const localStateStr = localStorage.getItem(key)
  return localStateStr ? JSON.parse(localStateStr) : json
}

export const toLocalStorage = (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data))

export const getUser = async (email: string | undefined) => {
  const supabase = useSupabaseClient()
  let { data: res, error } = await supabase
    .from(constants.teachers)
    .select("*")
    .eq("email", email)

  if (error) throw error
  return res
}

export const useGlobals = () => {
  const globalState = useState<iGlobal>(constants.globals)

  const setSlides = (value: iMedia[]) => {
    globalState.value.slides = value
  }

  return { globalState, setSlides }
}

export const operatingSystem = () => {
  // @ts-ignore
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
      return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  // @ts-ignore
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
  }

  return "unknown";
}

export const comboInput = () => operatingSystem() === "iOS" ? "w-full border-none py-2 pl-3 pr-10 text-[16px] leading-5 text-gray-900 focus-visible:outline-none" : "w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus-visible:outline-none"

export const placeholderStudents = [
  {
    firstName: "First name",
    lastName: "Last name",
    parentsContact: "Parent's contact",
    gender: "gender",
    class: "class",
    email: "email",
    imageUrl: "/icons/image.svg",
    birthday: "birthday",
    about: "about Firstname Lastname",
    role: "role",
    age: "age",
    duration: "duration"
  },
  {
    firstName: "First name",
    lastName: "Last name",
    parentsContact: "Parent's contact",
    gender: "gender",
    class: "class",
    email: "email",
    imageUrl: "/icons/image.svg",
    birthday: "birthday",
    about: "about Firstname Lastname",
    role: "role",
    age: "age",
    duration: "duration"
  },
  {
    firstName: "First name",
    lastName: "Last name",
    parentsContact: "Parent's contact",
    gender: "gender",
    class: "class",
    email: "email",
    imageUrl: "/icons/image.svg",
    birthday: "birthday",
    about: "about Firstname Lastname",
    role: "role",
    age: "age",
    duration: "duration"
  },
  {
    firstName: "First name",
    lastName: "Last name",
    parentsContact: "Parent's contact",
    gender: "gender",
    class: "class",
    email: "email",
    imageUrl: "/icons/image.svg",
    birthday: "birthday",
    about: "about Firstname Lastname",
    role: "role",
    age: "age",
    duration: "duration"
  },
  {
    firstName: "First name",
    lastName: "Last name",
    parentsContact: "Parent's contact",
    gender: "gender",
    class: "class",
    email: "email",
    imageUrl: "/icons/image.svg",
    birthday: "birthday",
    about: "about Firstname Lastname",
    role: "role",
    age: "age",
    duration: "duration"
  },
  {
    firstName: "First name",
    lastName: "Last name",
    parentsContact: "Parent's contact",
    gender: "gender",
    class: "class",
    email: "email",
    imageUrl: "/icons/image.svg",
    birthday: "birthday",
    about: "about Firstname Lastname",
    role: "role",
    age: "age",
    duration: "duration"
  },
  {
    firstName: "First name",
    lastName: "Last name",
    parentsContact: "Parent's contact",
    gender: "gender",
    class: "class",
    email: "email",
    imageUrl: "/icons/image.svg",
    birthday: "birthday",
    about: "about Firstname Lastname",
    role: "role",
    age: "age",
    duration: "duration"
  }
]