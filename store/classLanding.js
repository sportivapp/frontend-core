import { api, getUrl } from '@/config/api'

export const state = () => ({
  classLandingList: [],
  classLandingListPaging: {},
  generatedSessions: []

})

export const getters = {
  classLandingList: state => state.classLandingList,
  classLandingListPaging: state => state.classLandingListPaging,
  generatedSessions: state => state.generatedSessions
}

export const mutations = {
  setClassLandingList (state, classList) {
    state.classLandingList = classList
  },
  setClassLandingListPaging (state, classListPaging) {
    state.classLandingListPaging = classListPaging
  },
  setGeneratedSessions (state, data) {
    state.generatedSessions = data
  }
}

export const actions = {
  getClassLandingList ({ commit }, { params, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.classLanding.classList(params))).then((response) => {
      commit('setClassLandingList', response.data.data)
      commit('setClassLandingListPaging', response.data.paging)
      successCallback && successCallback(response)
    }).catch((error) => {
      errHandler && errHandler(error)
    })
  },
  createClassLanding ({ _ }, { body, successCallback, errHandler } = {}) {
    this.$axios.post(getUrl(api.classLanding.createClass), body)
      .then((_) => {
        successCallback && successCallback()
      })
      .catch((_) => {
        errHandler && errHandler()
      })
  },
  generateSessions ({ commit }, { body, successCallback, errHandler } = {}) {
    this.$axios.post(getUrl(api.classLanding.sessionGenerate), body)
      .then((res) => {
        commit('setGeneratedSessions', res.data.data)
        successCallback && successCallback()
      })
      .catch((_) => {
        errHandler && errHandler()
      })
  }

}
