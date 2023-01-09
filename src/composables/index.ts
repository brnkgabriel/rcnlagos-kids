import { iColor, iCombined, iDynamicObject, iGlobal, iGlobalState, iMedia, iStudent, iSwitch } from "../types"

const subline = "text-xs"
const tiny = "text-xxxs font-bold"
const grayText = "text-rcngray-900"
const flexCenterCenter = "flex justify-center items-center"
const mainline = "text-rcnblue-500 font-semibold text-sm"
const center = "absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
const flex_center = "flex flex-col justify-center items-center"

export const useUi = () => {
  return {
    btmnavwrap: "flex justify-center items-center gap-x-8 bg-white z-10",
    comboinputwrap: "relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md sm:text-sm",
    combobutton: "absolute inset-y-0 right-0 flex items-center pr-2",
    chevronupdownicon: "h-5 w-5 text-gray-400",
    comboboxoptions: "absolute mt-1 h-[150px] w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg sm:text-sm",
    nothingfound: "relative cursor-default select-none py-2 px-4 text-gray-700",
    comboboxoptionli: "relative cursor-default select-none py-2 pl-10 pr-4",
    comboboxoptionspanicon: "absolute inset-y-0 left-0 flex items-center pl-3",
    cropperwrap: "fixed inset-0 overflow-y-auto",
    cropperblankdiv: "fixed inset-0 bg-black bg-opacity-25",
    cropperinnerwrap: "flex min-h-full items-center justify-center p-4 text-center",
    cropperdialogpanel: "w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",
    cropperdialogtitle: "text-lg font-medium leading-6 text-gray-900",
    cropperbutton: "inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
    disclosurewrap: "w-full",
    disclosureinnerwrap: "mx-auto w-full max-w-md rounded-2xl bg-white p-2",
    disclosurebutton: "flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-rcnblue-500 hover:bg-rcnblue-200 focus:outline-none focus-visible:ring focus-visible:ring-rcnblue-100 focus-visible:ring-opacity-75",
    disclosurepanel: "px-4 pt-4 pb-2 text-sm text-gray-500",
    listinnerwrap: "relative mt-1",
    listbutton: "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm",
    listspantruncate: "block truncate",
    listiconspan: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2",
    listicon: "h-5 w-5 text-gray-400",
    listboxoptions: "absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
    listboxoptionli: "relative cursor-default select-none py-2 pl-10 pr-4",
    listboxoptionspan: "absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600",
    loginwrap: "w-full h-full",
    logintopslides: "relative w-full h-40% overflow-hidden",
    logintopslide: "h-full w-full flex items-center justify-center",
    loginbottomcontent: "flex flex-col gap-y-2 h-60% justify-center items-center",
    logintitle: "text-center text-rcnblue-500 px-4",
    loginnavigation: "flex flex-col justify-center items-center gap-y-2 capitalize",
    loginnavicon: "w-[24px] absolute top-1/2 left-[8px] -translate-y-1/2",
    wfull: "w-full",
    hfull: "h-full",
    slidetitlenstatus: "card-subtitle flex justify-between items-center",
    slidebody: "card-slide-wrapper relative max-h-[225px] sm:h-slide sm:max-h-full",
    studentwrap: "bg-white rounded shadow-custom inline-block mx-1 w-[100px] sm:m-0 align-top cursor-pointer basis-[100px] flex-grow sm:w-1/4 relative overflow-hidden",
    studentavatar: "w-full rounded opacity-0",
    studentnamewrap: "px-1/2 py-1 flex items-center justify-center font-title w-full absolute text-white bottom-0 left-1/2 -translate-x-1/2 bg-rcngray-100",
    studentname: "w-3/4 text-center overflow-hidden text-ellipsis whitespace-nowrap",
    studentswrap: "h-full flex flex-col sm:flex-row sm:gap-x-2 landscape:flex-row landscape:gap-x-2 portrait:flex-col",
    studentslist: "mb-2 sm:h-full w-full sm:w-1/2 landscape:h-full landscape:w-1/2 portrait:w-full sm:portrait:h-1/2",
    studentslistfilternstatus: "pb-2 flex justify-between items-center sticky z-10",
    studentsliststatus: "text-xxs uppercase text-rcnblue-500 my-2 font-bold opacity-50 w-1/4 overflow-hidden whitespace-nowrap text-ellipsis text-right",
    studentslistcards: "whitespace-nowrap overflow-y-hidden overflow-x-auto sm:flex sm:flex-wrap sm:gap-2 sm:overflow-y-auto sm:overflow-x-hidden sm:h-auto",
    studentslistselection: "sm:w-1/2 landscape:w-1/2 portrait:w-full",
    switchwrap: "flex gap-2 justify-center items-center capitalize h-[44px]",
    switchcomponent: (options: iSwitch) => {
      const common = "relative inline-flex h-6 w-11 items-center rounded-full"
      const { enabled, left, right } = options
      return `${common} ${enabled ? left : right}`
    },
    switchcomponentspan: (options: iSwitch) => {
      const common = "inline-block h-4 w-4 transform rounded-full bg-white transition"
      const { enabled, left, right } = options
      return `${common} ${enabled ? left : right}`
    },
    tabwrap: "w-full max-w-md sm:px-0",
    tablist: "flex space-x-1 rounded-xl bg-blue-900/20 p-1",
    tabbuttoncolor: "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
    tabbuttonring: "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
    tabbuttonselected: (selected: boolean) => {
      return selected
      ? 'bg-white shadow'
      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
    },
    tabpanelcolor: "rounded-xl bg-white p-3",
    tabpanelring: "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
    tabpanelli: "relative rounded-md p-3 hover:bg-gray-100",
    tabpanelh3: "text-sm font-medium leading-5",
    tabpanelinnerul: "mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500",
    tabpanelacolor: "absolute inset-0 rounded-md",
    tabpanelaring: "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2",
    teacherswrap: "h-full overflow-auto",
    topnavwrap: "shadow-custom bg-white flex justify-between items-center relative",
    topnavnotification: "rounded-full border-2 border-bglight-700 p-[2px] h-[40px] w-[40px] cursor-pointer",
    topnavavatar: "rounded-full",
    topnavlogo: "h-[32px]",
    topnavsitename: `${center} ${flex_center} ${mainline} uppercase font-bold font-title`,
    // common styles below
    texttrim: "w-full overflow-hidden whitespace-nowrap text-ellipsis",
    mainline_small: "text-rcnblue-500 font-semibold",
    subline_small: subline,
    mainline,
    center,
    flex_center,
    subline,
    grayText,
    breadcrumb: grayText + " uppercase mb-1 " + tiny,
    logo: flexCenterCenter + " bg-white shadow-custom absolute top-[40%] left-[16px] w-[50px] h-[50px] rounded-full p-2 z-10 -translate-y-1/2",
    bottomNavLink: flexCenterCenter + " flex-col cursor-pointer",
    bottomNavLinkIcon: flexCenterCenter + " w-[32px] h-[32px]",
    homeNavLink: "rounded-full bg-white shadow-custom p-3 w-[250px] text-center cursor-pointer text-rcnblue-500 border-2 text-xs",
    button: "rounded-full bg-rcnblue-500 shadow-custom p-3 w-full text-center cursor-pointer text-white border-2 text-xs uppercase",
    input: "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rcnblue-500 focus:border-rcnblue-500 block w-full h-[42px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-rcnblue-500 dark:focus:border-rcnblue-500",
    studentItem: "flex flex-col flex-grow w-1/2 sm:w-1/4 overflow-hidden rounded-md shadow-custom bg-white cursor-pointer",
    studentItemOccupationIcon: "w-[16px] h-[16px]",
    cardTimeline: "",
    selectedComponent: "selected h-reverseprofile landscape:h-full sm:h-full flex flex-col",
    search: "absolute w-[32px] h-[32px] right-[4px] top-half -translate-y-1/2 bg-rcnblue-500 rounded-md flex justify-center items-center cursor-pointer",
    searchIcon: "w-[24px] h-[24px] text-white",
    dropdown: "absolute top-full right-[8px] z-[100] w-fit mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none capitalize overflow-hidden",
    dropdownLogout: "text-gray-700 block px-4 py-2 text-sm cursor-pointer",
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

export const obj2Str = (obj: iDynamicObject) => Object.keys(obj)
.reduce((acc, cur) => acc + `${cur}:${obj[cur]};`, "")