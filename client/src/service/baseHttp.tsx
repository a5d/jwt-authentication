const baseHttpService = (method: string, url: string, payload?: object) => {
  return fetch(process.env.API_URL + url, {
    method,
    credentials: 'include',
    body: JSON.stringify(payload),
    headers: {'content-type': 'application/json'}
  })
    .then(res => res.json())
}

export default baseHttpService