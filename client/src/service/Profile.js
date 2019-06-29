import baseHttp from './baseHttp'

const profileService = () => baseHttp('GET', 'profile')

export default profileService