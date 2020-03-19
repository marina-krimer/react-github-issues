export async function fetchToJson(url, params) {
  const responseCheckStatus = async response => {
    if (response.status !== 200 && !response.ok) {
      return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
  }

  const responseToJson = async response => response.json()

  return fetch(url)
    .then(responseCheckStatus)
    .then(responseToJson)
}
