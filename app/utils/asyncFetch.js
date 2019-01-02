// const CREDS = 'include'
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) { return response }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}
const asyncFetch = async function (obj) {
  const url = obj.url
  const method = obj.method || 'GET'
  const body = obj.obj || null
  let headers = obj.headers || new Headers({ 'Content-Type': 'application/json' })
  const token = localStorage.getItem('token')
  if (obj.author && token) {
    headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    })
  }
  let confFetch = { method, headers }
  if (method === 'POST') { confFetch = { method, headers, body: JSON.stringify(body) } }
  return new Promise(function (resolve, reject) {
    fetch(url, confFetch)
      .then(checkStatus)
      .then(res => res.json())
      .then(res => { resolve(res) })
      .catch(err => { reject(err) })
  })
}

export default asyncFetch
