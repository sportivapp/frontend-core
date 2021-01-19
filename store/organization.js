import { api, getUrl } from '@/config/api'

export const state = () => ({
  myOrganizations: []
})

export const getters = {
  myOrganizations: state => state.myOrganizations
}

export const mutations = {
  setMyOrganization (state, organizations) {
    state.myOrganizations = organizations
  }
}

export const actions = {
  getMyOrganizations ({ commit }, { params, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.myOrganizations(params))).then((res) => {
      commit('setMyOrganization', res.data.data)
      successCallback && successCallback(res)
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  },
  loginOrganization (_, { data, successCallback, errHandler } = {}) {
    this.$axios.post(getUrl(api.loginCompany), data).then((res) => {
      successCallback && successCallback(res)
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  },
  createOrganization (_, { data, successCallback, errHandler } = {}) {
    this.$axios.post(getUrl(api.createCompany), data).then((res) => {
      successCallback && successCallback(res)
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  }
}
