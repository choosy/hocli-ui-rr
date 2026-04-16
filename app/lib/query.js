import axios from 'axios'

export const apiBase =
  process.env.NEXT_PUBLIC_HOCLIUI_API_URL || process.env.HOCLIUI_API_URL

console.log('apiBase is ########################')
console.log(apiBase)

export async function query(method, path, payload) {
  // console.log('query() called with')
  // console.log(`method ${method}`)
  // console.log(`path ${path}`)
  // console.log('and payload')
  // console.log(payload)

  const url = `${apiBase}${path}`

  let response

  if (method === 'get') {
    response = await axios.get(url, payload) // essential to await
  } else {
    response = await axios.post(url, payload) // essential to await
  }

  console.log('query returns response.data -> see below')
  console.log(response.data)

  return response.data
}
