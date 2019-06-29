import baseHttp from './baseHttp'

const loginService = payload => baseHttp('POST', 'login', payload)

export default loginService