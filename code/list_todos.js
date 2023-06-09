import { okResponse } from './lib/constants.js'
import { handleCORS, mustBePOST, mustBeJSON, apiKey } from './lib/checks.js'

export async function onRequest(context) {

  // handle CORS/POST/JSON/apikey checks
  const r = handleCORS(context) || apiKey(context) || mustBePOST(context) || mustBeJSON(context)
  if (r) return r

  // list keys in the KV store, bound to this worker as TODOLIST
  const res = await context.env.TODOLIST.list()

  // map to a list of objects
  const output = res.keys.map((k) => {
    // k.name = '1681480420026'
    return {
      id: k.name,
      ...k.metadata
    }
  })

  // send response
  return new Response(JSON.stringify({ ok: true, list: output }), okResponse)

}
