const profileService = () => {
  return fetch(`${process.env.API_URL}profile`, {
    method: 'GET',
    credentials: 'include',
    headers: {'content-type': 'application/json'}
  })
}

export default profileService