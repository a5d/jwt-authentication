import baseHttp from './baseHttp'

const loginService = (payload: object) => baseHttp('POST', 'login', payload)

export default loginService