import { okResponse, notOkResponse, missingResponse, notOk } from './lib/constants.js'
import { handleCORS, mustBePOST, mustBeJSON, apiKey } from './lib/checks.js'

export async function onRequest(context) {

  // handle CORS/POST/JSON/apikey checks
  const r = handleCORS(context) || apiKey(context) || mustBePOST(context) || mustBeJSON(context)
  if (r) return r

  // parse the json
  const json = await context.request.json()

  // if there's a id
  if (json.id) {
    // delete the id from the KV store
    const r = await context.env.TODOLIST.get(json.id)
    const v = JSON.parse(r)
    if (v === null) {
      return new Response(JSON.stringify({ ok: false, msg: 'Missing' }), missingResponse);
    }

    // send response
    return new Response(JSON.stringify({ ok: true, todo: { id: json.id, ...v } }), okResponse)
  }

  // everyone else gets a 400 response
  return new Response(notOk, notOkResponse)

}
