import { serializeQueryParams } from '@/utils/query'

const baseUrl = '/backend'

const staticUrl = '/src/'

const api = {
  otp: '/otp-email',
  register: '/user',
  login: '/login',
  logout: '/logout',
  forgotPassword: '/forget-email',
  validateResetPassword: (token, email) => `/forget-check/${token}/${email}`,
  resetPassword: (token, email) => `/forget-set-password/${token}/${email}`,
  profile: '/profile',
  myOrganizations: params => `/my-company${serializeQueryParams(params)}`,
  loginCompany: '/login-company',
  createCompany: '/company',
  countries: '/country',
  provinces: params => `/state${serializeQueryParams(params)}`,
  industries: '/industry',
  news: params => `/user-news${serializeQueryParams(params)}`,
  newsDetail: id => `/user-news/${id}`,
  newsDetailViewCount: id => `/user-news/${id}/count`,
  newsDetailLike: id => `/user-news/${id}/like`
}

const getUrl = (path) => {
  return baseUrl + path
}

export {
  api,
  getUrl,
  staticUrl
}
