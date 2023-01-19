import { readBody } from "h3"
import { iUpload } from "~~/src/types/index"
import { supabase } from "../lib/supabase"
import { constants } from "~~/src/composables"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event) as iUpload

    const filePath = `${body.path}/${body.name}`
    
    const res = await fetch(body.file)
    const blob = await res.blob()

    const { data, error } = await supabase.storage
      .from(constants.pictures)
      .upload(filePath, blob, {
        contentType: body.type,
        upsert: true,
      })

    if (error) throw error

    return data.path
  } catch (error: any) {
    return { error: error.message }
  }
})