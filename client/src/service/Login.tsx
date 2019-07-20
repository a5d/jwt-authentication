import baseHttp from './baseHttp'

export const loginService = (payload: object) => baseHttp('POST', 'login', payload);
