import baseHttp from './baseHttp'

const checkService = () => baseHttp('GET', 'check')

export default checkService