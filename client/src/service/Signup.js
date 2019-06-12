const signupService = ({password, email}) => {
  return fetch(`${process.env.API_URL}signup`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      email,
      password
    }),
    headers: {'content-type': 'application/json'}
  })
}

export default signupService