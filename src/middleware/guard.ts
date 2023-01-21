
export default defineNuxtRouteMiddleware((to, from) => {
  const userCookie = useCookie("user")
  const { setRoute } = useGlobals()
  console.log("from middleware, from & to paths are", from.path, to.path)
  if (!userCookie.value) {
    setRoute({
      toRoute: to.path,
      fromRoute: from.path
    })
    return navigateTo("/auth")
  }
})