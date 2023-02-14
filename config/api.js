import { serializeQueryParams } from '@/utils/query'

const baseUrl = 'https://api.sportiv.asia/core/api/v1'
const baseUrlTournament = 'https://api.sportiv.asia/tournament'

const staticUrl = 'https://api.sportiv.asia/core/'

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
  city: params => `/city${serializeQueryParams(params)}`,
  industries: '/industry',
  news: params => `/user-news${serializeQueryParams(params)}`,
  newsDetail: id => `/user-news/${id}`,
  newsDetailViewCount: id => `/user-news/${id}/count`,
  newsDetailLike: id => `/user-news/${id}/like`,
  homeBanner: '/banner',
  class: {
    verifyToken: '/verify/token',
    permissions: '/permissions/class',
    classList: params => `/class-v2${serializeQueryParams(params)}`,
    myClassList: params => `/landing/my-class-v2${serializeQueryParams(params)}`,
    classDetail: id => `/class-v2/${id}`,
    classCategoryDetail: (classId, classCategoryId) => `/mobile/class-v2/${classId}/class-category/${classCategoryId}`,
    classSessionParticipant: (classCategoryId, sessionId, params) => `/class-category/${classCategoryId}/class-category-session/${sessionId}/participants${serializeQueryParams(params)}`,
    createClass: '/class-v2',
    users: data => `/company/${data.companyId}/users${serializeQueryParams(data.params)}`,
    currentCompany: '/current-company',
    file: '/file',
    classParticipants: id => `/class-v2/${id}/participants`,
    deleteClass: id => `/class-v2/${id}`,
    insertClassCategory: id => `/class-v2/${id}/class-category`,
    updateClass: id => `/class-v2/${id}`,
    getCategorySchedule: categoryId => `/class-category/${categoryId}/schedule`,
    extendCategorySession: categoryId => `/class-category/${categoryId}/extend`,
    updateClassCategory: (classId, classCategoryId) => `/landing/class-v2/${classId}/class-category/${classCategoryId}`
  },
  classLanding: {
    createClass: '/landing/class-v2',
    classList: params => `/landing/class-v2${serializeQueryParams(params)}`,
    classDetail: id => `/landing/class-v2/${id}`,
    deleteClass: id => `/landing/class-v2/${id}`,
    myClassList: params => `/landing/my-class-v2${serializeQueryParams(params)}`,
    users: data => `/landing/company/${data.companyId}/users${serializeQueryParams(data.params)}`,
    sessionGenerate: '/common/class-category-session-generate',
    updateClass: id => `/landing/class-v2/${id}`,
    insertClassCategory: id => `/landing/class-v2/${id}/class-category`
  },
  setting: {
    getAllBanks: '/common/banks',
    companyBanks: '/company-banks',
    updateMainBank: params => `/company-banks/${params.bankUuid}/main`,
    deleteBank: params => `/company-banks/${params.bankUuid}`
  }
}

const apiTournament = {
  tournament: {
    detail: id => `/tournament/${id}`,
    list: params => `/user/tournament${serializeQueryParams(params)}`,
    participants: id => `/tournament/${id}/participants`,
    stageParticipant: (tournamentId, params) => `/tournament/${tournamentId}/stages/participants${serializeQueryParams(params)}`,
    tournamentDetailStandings: id => `/tournament/${id}/matches/standings`,
    tournamentDetailMatchList: (id, stage) => `/tournament/${id}/matches?stage=${stage}`
  },
  match: {
    matchInfo: params => `/tournament/${params.tournamentId}/matches/${params.matchId}`,
    matchSummaryStatistic: params => `/tournament/${params.tournamentId}/user/matches/${params.matchId}/statistic`,
    matchTeamLineup: params => `/tournament/${params.tournamentId}/matches/${params.matchId}/teams/${params.teamId}/lineup?type=${params.type}`,
    matchParticipantStatistic: params => `/tournament/${params.tournamentId}/matches/${params.matchId}/teams/${params.teamId}/match-participant-member/${params.matchMemberId}/statistic`
  }
}

const getUrl = (path) => {
  return baseUrl + path
}

const getUrlTournament = (path) => {
  return baseUrlTournament + path
}

export {
  api,
  apiTournament,
  getUrl,
  staticUrl,
  getUrlTournament
}