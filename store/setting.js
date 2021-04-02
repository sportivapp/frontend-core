import { api, getUrl } from '@/config/api'

export const state = () => ({
  allBanks: [],
  companyBanks: []
})

export const getters = {
  allBanks: state => state.allBanks,
  companyBanks: state => state.companyBanks
}

export const mutations = {
  setAllBanks (state, data) {
    state.allBanks = data
  },
  setCompanyBanks (state, data) {
    state.companyBanks = data
  }
}

export const actions = {
  getAllBanks ({ commit }) {
    this.$axios.get(getUrl(api.setting.getAllBanks)).then((res) => {
      commit('setAllBanks', res.data.data)
    }).catch()
  },
  getCompanyBanks ({ commit }, { successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.setting.companyBanks)).then((response) => {
      commit('setCompanyBanks', response.data.data)
      successCallback && successCallback(response)
    }).catch((error) => {
      errHandler && errHandler(error)
    })
  },
  createCompanyBank ({ _ }, { body, successCallback, errHandler } = {}) {
    this.$axios.post(getUrl(api.setting.companyBanks), body).then((response) => {
      successCallback && successCallback(response)
    }).catch((error) => {
      errHandler && errHandler(error)
    })
  }
}
