import { iCombined, iGlobalState, iStudent } from "../types"

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
    studentItem: "flex flex-col basis-[100px] flex-grow w-1/2 sm:w-1/4 overflow-hidden rounded-md shadow-custom bg-white cursor-pointer",
    studentItemOccupationIcon: "w-[16px] h-[16px]",
    search: "absolute w-[32px] h-[32px] right-[4px] top-half -translate-y-1/2 bg-rcnblue-500 rounded-md flex justify-center items-center cursor-pointer",
    searchIcon: "w-[24px] h-[24px] text-white",
    dropdown: "absolute top-full right-[8px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none capitalize overflow-hidden",
    dropdownLogout: "text-gray-700 block px-4 py-2 text-sm cursor-pointer"
  }
}

export const all = (query: string, parent?: HTMLElement) => parent ? parent.querySelectorAll(query) : document.querySelectorAll(query)

export const el = (query: string, parent?: HTMLElement) => parent ? parent.querySelector(query) as HTMLElement : document.querySelector(query) as HTMLElement

export const position = (idx: number, list: any[]) => idx === list.length - 1 ? "last" : "others"

export const constants = {
  dataApiUrl: "/api/g-data",
  imageUploadApiUrl: "/api/p-image",
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
  div: 'div',
  whatsappIcon: (student: iStudent | null) => {
    let number = student ? student?.parentsContact : "0"
    // @ts-ignore
    const num = phone(number)
    number = num.slice(1, num.length)

    return `https://api.whatsapp.com/send?phone=${number}&text=Hello%20${student?.firstName}'s dad`
  }
}

export const studentName = (student: iStudent | null) => student?.lastName ? `Hello ${student.firstName} ${student.lastName}'s parent` : 'Names'

export const imgSrc = (url: string) => url ? url : '/icons/avatar.svg'

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
  const sTime = +new Date($year,$mIdx, $date)
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

      return { prev, next, live, reordered: [ ...live, ...next, ...prev ] };
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

      return { prev, next, live, reordered: [ ...live, ...next, ...prev ] };
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

export const useGlobalState = () => {
  const globalState = useState<iGlobalState>("global")

  const setGlobalState = (value: iGlobalState) => {
    globalState.value = { ...globalState.value, ...value }
  }

  return { globalState, setGlobalState }
}