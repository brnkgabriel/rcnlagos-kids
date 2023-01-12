export const vSelected = {
  updated: (ele: Element) => {
    // console.log("vSelected component updated")
  },
  mounted: (ele: Element) => {
    const buttons = document.querySelectorAll(".card-buttons button");
    const sections = document.querySelectorAll(".card-section");
    const card = document.querySelector(".card");

    const handleButtonClick = (e: Event) => {
      const target = e.target as HTMLElement
      const targetSection = target.getAttribute("data-section")
      const section = el(targetSection as string)
      targetSection !== "#about"
        ? ele.classList.add("is-active")
        : ele.classList.remove("is-active");
      ele.setAttribute("data-state", targetSection as string);
      sections.forEach((s) => s.classList.remove("is-active"));
      buttons.forEach((b) => b.classList.remove("is-active"));
      target.classList.add("is-active");
      section.classList.add("is-active");
    };

    buttons.forEach((btn) => {
      btn.addEventListener("click", handleButtonClick);
    });

  },
  unmounted: (ele: Element) => {
    // console.log("vSelected component unmounted")
  }
}

const loaded = (ele: Element) => {
  const img = ele as HTMLImageElement
  img.onload = () => img.classList.add("loaded")
}

export const vLoaded = {
  mounted: (ele: Element) => loaded(ele),
  updated: (ele: Element) => loaded(ele)
}

interface iData {
  maxItem: number;
  observer: IntersectionObserver | null;
  observation: (entries: IntersectionObserverEntry[]) => void
}

const data: iData = {
  maxItem: constants.maxItemsToLoad,
  observer: null,
  observation: (entries: IntersectionObserverEntry[]) => {
    console.log("entries", entries)
    const entry = entries[0]
    if (!entry.isIntersecting) return
    console.log("is intersecting, load more")
    loadMore()
    entry.target.classList.remove("last")
    data.observer?.unobserve(entry.target)
  }
}

const loadMore = () => {
  const { globalState, addToRenderedStudents } = useGlobals()
  const sLen = globalState.value.searchedStudents.length
  const rLen = globalState.value.renderedStudents.length
  const sIdx = rLen
  const eIdx = sIdx + data.maxItem
  const more = globalState.value.searchedStudents.slice(sIdx, eIdx)
  
  console.log("inside loadMore, sLen", sLen, "rLen", rLen)

  rLen === sLen ? unobserveAll() : addToRenderedStudents(more)
}

const unobserveAll = () => {
  const lastStudents = all(`div[aria-label="studentwrap"]:last-child`)
  lastStudents.forEach(lastStudent => data.observer?.unobserve(lastStudent))
  data.observer = null
  console.log("unobserving all")
}

const initializeObserver = (ele: Element, from: string) => {
  const options = { threshold: 1, root: ele }
  data.observer = new IntersectionObserver(data.observation, options)
  const last = el(`.-laststudent`, ele as HTMLElement)
  console.log(`inside ${from} hook`)
  if (last) data.observer.observe(last as Element)
}

export const vInfiniteScroll = {
  updated: (ele: Element) => initializeObserver(ele, "updated"),
  mounted: (ele: Element) => initializeObserver(ele, "mounted"),
  unmounted: (ele: Element) => {
    console.log("inside unmounted hook")
    unobserveAll()
  }
}