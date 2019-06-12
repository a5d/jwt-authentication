const logoutService = () => {
  return fetch(`${process.env.API_URL}logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {'content-type': 'application/json'}
  })
}

export default logoutService