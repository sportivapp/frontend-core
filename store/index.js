import { api, getUrl } from '~/config/api'

const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  token: '',
  user: { init: false },
  countries: [],
  provinces: [],
  cities: [],
  industries: [],
  homeBanners: []
})

export const getters = {
  isLoggedIn: state => !!(state.token),
  user: state => state.user,
  countries: state => state.countries,
  provinces: state => state.provinces,
  cities: state => state.cities,
  industries: state => state.industries,
  homeBanners: state => state.homeBanners
}

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setUser (state, user) {
    state.user = user
  },
  setCountries (state, countries) {
    state.countries = countries
  },
  setProvinces (state, provinces) {
    state.provinces = provinces
  },
  setCities (state, cities) {
    state.cities = cities
  },
  setIndustries (state, industries) {
    state.industries = industries
  },
  setHomeBanners (state, values) {
    state.homeBanners = values
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let token = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        token = parsed.token
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setToken', token)
  },
  setToken ({ commit }, token) {
    Cookie.set('token', token)
    commit('setToken', token)
  },
  sendOtp (_, { data, successCallback, errHandler } = {}) {
    this.$axios.post(getUrl(api.otp), data).then((res) => {
      successCallback && successCallback(res)
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  },
  register (_, { data, successCallback, errHandler } = {}) {
    this.$axios.post(getUrl(api.register), data).then((res) => {
      successCallback && successCallback(res)
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  },
  login ({ commit }, { data, successCallback, errHandler } = {}) {
    this.$axios.post(getUrl(api.login), data).then((res) => {
      const token = res.data.data
      Cookie.set('token', token)
      commit('setToken', token)
      successCallback && successCallback(res)
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  },
  forgotPassword (_, { data, successCallback, errHandler } = {}) {
    this.$axios.post(getUrl(api.forgotPassword), data).then((res) => {
      successCallback && successCallback(res)
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  },
  validateResetPassword (_, { data, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.validateResetPassword(data.token, data.email))).then((res) => {
      successCallback && successCallback(res)
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  },
  resetPassword (_, { data, params, successCallback, errHandler } = {}) {
    this.$axios.post(getUrl(api.resetPassword(params.token, params.email)), data).then((res) => {
      successCallback && successCallback(res)
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  },
  getProfile ({ commit }, { successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.profile)).then((res) => {
      commit('setUser', res.data.data)
      successCallback && successCallback(res)
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  },
  logout ({ commit }, { successCallback, errHandler } = {}) {
    this.$axios.delete(getUrl(api.logout)).then((res) => {
      commit('setToken', null)
      commit('setUser', { init: false })
      Cookie.remove('token')
      this.$router.push('/')
      successCallback && successCallback(res)
    }).catch((error) => {
      errHandler && errHandler(error)
    })
  },
  getCountries ({ commit }, { successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.countries)).then((res) => {
      commit('setCountries', res.data.data)
      successCallback && successCallback(res)
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  },
  getProvinces ({ commit }, { params, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.provinces(params))).then((res) => {
      commit('setProvinces', res.data.data)
      successCallback && successCallback(res)
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  },
  getCities ({ commit }, { params, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.city(params))).then((res) => {
      commit('setCities', res.data.data)
      successCallback && successCallback(res)
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  },
  getIndustries ({ commit }, { successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.industries)).then((res) => {
      commit('setIndustries', res.data.data)
      successCallback && successCallback(res)
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  },
  getHomeBanners ({ commit }, { successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.homeBanner))
      .then((res) => {
        commit('setHomeBanners', res.data.data)
        successCallback && successCallback(res)
      }).catch((e) => {
        errHandler && errHandler(e)
      })
  }
}
