import { corsHeaders, notOkResponse, notOk, badMethod, badContentType, notAuthorisedResponse } from './constants.js'

export const handleCORS = (context) => {
  // handle OPTIONS (CORS pre-flight request)
  if (context.request.method.toUpperCase() === 'OPTIONS') {
    return new Response(null, {
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Headers': context.request.headers.get(
          'Access-Control-Request-Headers'
        )
      }
    })
  }
  return null
}

export const mustBePOST = (context) => {
  // must be a POST
  if (context.request.method.toUpperCase() !== 'POST') {
    return new Response(badMethod, notOkResponse)
  }
  return null
}

export const mustBeJSON = (context) => {
  // must be an application/json header
  const contentType = context.request.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) {
    return new Response(badContentType, notOkResponse)
  }
  return null
}

export const apiKey = (context) => {
  // must be an application/json header
  const apiKey = context.request.headers.get('apikey')
  if (!apiKey || apiKey !== context.env.API_KEY) {
    return new Response(notOk, notAuthorisedResponse)
  }
  return null
}
