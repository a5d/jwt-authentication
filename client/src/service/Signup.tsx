import baseHttp from './baseHttp'

const signupService = (payload: object) => baseHttp('POST', 'signup', payload)

export default signupService