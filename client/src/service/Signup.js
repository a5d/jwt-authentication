import baseHttp from './baseHttp'

const signupService = payload => baseHttp('POST', 'signup', payload)

export default signupService