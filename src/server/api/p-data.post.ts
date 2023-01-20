import { H3Event, getQuery, readBody } from "h3"
import { api } from "../lib/supabase"
import { iDataApiOptions } from "~~/src/types"

export default defineEventHandler(async (event: H3Event) => {
  try {
    const query = getQuery(event) as any

    const body = await readBody(event) as any 

    const options: iDataApiOptions = query as iDataApiOptions
    const response = await api.addData(options, body) 
    return response
  } catch (error: any) {
    return { error: error.message }
  }
})