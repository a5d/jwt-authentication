import baseHttp from './baseHttp'

const logoutService = () => baseHttp('POST', 'logout')

export default logoutService