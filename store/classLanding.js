import { api, getUrl } from '@/config/api'

export const state = () => ({
  classLandingList: [],
  classLandingListPaging: {},
  myClassLandingList: [],
  myClassLandingListPaging: {},
  generatedSessions: [],
  classDetail: {},
  classUsers: []
})

export const getters = {
  classLandingList: state => state.classLandingList,
  classLandingListPaging: state => state.classLandingListPaging,
  myClassLandingList: state => state.myClassLandingList,
  myClassLandingListPaging: state => state.myClassLandingListPaging,
  generatedSessions: state => state.generatedSessions,
  classDetail: state => state.classDetail,
  classUsers: state => state.classUsers
}

export const mutations = {
  setClassLandingList (state, classList) {
    state.classLandingList = classList
  },
  setClassLandingListPaging (state, classListPaging) {
    state.classLandingListPaging = classListPaging
  },
  setMyClassLandingList (state, classList) {
    state.myClassLandingList = classList
  },
  setMYClassLandingListPaging (state, myClassListPaging) {
    state.myClassLandingListPaging = myClassListPaging
  },
  setGeneratedSessions (state, data) {
    state.generatedSessions = data
  },
  setClassDetail (state, detail) {
    state.classDetail = detail
  },
  setClassUsers (state, response) {
    state.classUsers = response
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
  getMyClassLandingList ({ commit }, { params, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.classLanding.myClassList(params))).then((response) => {
      commit('setMyClassLandingList', response.data.data)
      commit('setMYClassLandingListPaging', response.data.paging)
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
      .catch((error) => {
        errHandler && errHandler(error)
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
  },
  getClassDetail ({ commit }, { id, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.classLanding.classDetail(id)))
      .then((res) => {
        commit('setClassDetail', res.data.data)
        successCallback && successCallback(res.data.data)
      })
      .catch((err) => {
        errHandler && errHandler(err)
      })
  },
  deleteClassLanding ({ _ }, { id, successCallback, errHandler } = {}) {
    this.$axios.delete(getUrl(api.classLanding.deleteClass(id)))
      .then((res) => {
        successCallback && successCallback(res)
      })
      .catch((err) => {
        errHandler && errHandler(err)
      })
  },
  getUsers ({ commit }, { params, companyId, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.class.users({ companyId, params })))
      .then(async (response) => {
        await commit('setClassUsers', response.data.data)
        successCallback && successCallback()
      })
      .catch((e) => {
        errHandler && errHandler(e)
      })
  },
  updateClassLanding ({ _ }, { id, body, successCallback, errHandler } = {}) {
    this.$axios.put(getUrl(api.classLanding.updateClass(id)), body)
      .then((res) => {
        successCallback && successCallback(res)
      })
      .catch((err) => {
        errHandler && errHandler(err)
      })
  },
  addClassCategoryLanding ({ commit }, { id, body, successCallback, errHandler } = {}) {
    this.$axios.post(getUrl(api.classLanding.insertClassCategory(id)), body)
      .then((res) => {
        successCallback && successCallback(res)
      })
      .catch((err) => {
        errHandler && errHandler(err)
      })
  }

}