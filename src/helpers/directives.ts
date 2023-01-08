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