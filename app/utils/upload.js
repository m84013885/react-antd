// const CREDS = 'include'
// function checkStatus (response) {
//   if (response.status >= 200 && response.status < 300) { return response }
//   const error = new Error(response.statusText)
//   error.response = response
//   throw error
// }
const asyncFetch = async function (obj) {
  const url = obj.url
  const method = 'POST'
  // const credentials = CREDS
  const body = obj.data

  const token = localStorage.getItem('token')
  const headers = new Headers({
    'Authorization': token
  })
  const confFetch = { method, headers, body }
  return new Promise(function (resolve, reject) {
    fetch(url, confFetch)
      // .then(checkStatus)
      .then(res => res.json())
      .then(res => { resolve(res) })
      .catch(err => { reject(err) })
  })
}

export default asyncFetch
