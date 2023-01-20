import { H3Event, getQuery, readBody } from "h3"
import { api } from "../lib/supabase"
import { iDataApiOptions } from "~~/src/types"

export default defineEventHandler(async (event: H3Event) => {
  try {
    const query = getQuery(event) as any

    const body = await readBody(event) as any

    console.log("query from post is", query)
    console.log("body from post is", body)

    const options: iDataApiOptions = query as iDataApiOptions
    const response = await api.addData(options, body)
    // console.log("server options is", options)
    // const data: any[] = response as any[]
    return response
  } catch (error: any) {
    return { error: error.message }
  }
})