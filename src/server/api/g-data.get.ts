import { H3Event, getQuery } from "h3"
import { api } from "../lib/supabase"
import { iStudent, iDataApiOptions } from "~~/src/types"

export default defineEventHandler(async (event: H3Event) => {
  try {
    const query = getQuery(event) as any

    const options: iDataApiOptions = query as iDataApiOptions
    const response = await api.getData(options)
    console.log("server options is", options)
    const data: any[] = response as any[]
    return data
  } catch (error: any) {
    return { error: error.message }
  }
})