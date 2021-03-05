import { api, getUrl } from '@/config/api'

export const state = () => ({
  classPermissions: {},
  classList: [],
  classListPaging: {},
  sessionParticipant: [],
  sessionHistoryParticipant: [],
  classCategoryDetail: {},
  classUsers: [],
  userCurrentCompany: {},
  selectedCoaches: [],
  classDetail: {},
  classParticipants: [],
  snackBarData: {}
})

export const getters = {
  classPermissions: state => state.classPermissions,
  hasClassPermission: state => (permissionKey) => {
    return state.classPermissions[permissionKey] === true
  },
  classList: state => state.classList,
  classListPaging: state => state.classListPaging,
  sessionParticipant: state => state.sessionParticipant,
  sessionHistoryParticipant: state => state.sessionHistoryParticipant,
  classCategoryDetail: state => state.classCategoryDetail,
  classUsers: state => state.classUsers,
  userCurrentCompany: state => state.userCurrentCompany,
  selectedCoaches: state => state.selectedCoaches,
  classDetail: state => state.classDetail,
  classParticipants: state => state.classParticipants,
  showSuccessSnackBar: state => state.showSuccessSnackBar,
  snackBarData: state => state.snackBarData
}

export const mutations = {
  setClassPermissions (state, permissions) {
    state.classPermissions = permissions
  },
  setClassList (state, classList) {
    state.classList = classList
  },
  setClassListPaging (state, classListPaging) {
    state.classListPaging = classListPaging
  },
  setSessionParticipant (state, sessionParticipant) {
    state.sessionParticipant = sessionParticipant
  },
  setSessionHistoryParticipant (state, sessionHistoryParticipant) {
    state.sessionHistoryParticipant = sessionHistoryParticipant
  },
  setClassCategoryDetail (state, classCategoryDetail) {
    state.classCategoryDetail = classCategoryDetail
  },
  setClassUsers (state, response) {
    state.classUsers = response
  },
  setUserCurrentCompany (state, response) {
    state.userCurrentCompany = response
  },
  setSelectedCoaches (state, response) {
    state.selectedCoaches = [...response]
  },
  setClassDetail (state, detail) {
    state.classDetail = detail
  },
  setClassParticipants (state, participants) {
    state.classParticipants = participants
  },
  setSnackBarData (state, data) {
    state.snackBarData = data
  }
}

export const actions = {
  verifyClassRedirectToken (_, { data, successCallback, errHandler } = {}) {
    this.$axios.post(getUrl(api.class.verifyToken), data)
      .then((res) => {
        successCallback && successCallback(res)
      })
      .catch((err) => {
        errHandler && errHandler(err)
      })
  },
  getClassPermissions ({ commit }, { successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.class.permissions))
      .then((res) => {
        commit('setClassPermissions', res.data.data)
        successCallback && successCallback(res)
      })
      .catch((err) => {
        errHandler && errHandler(err)
      })
  },
  getClassList ({ commit }, { params, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.class.classList(params))).then((response) => {
      commit('setClassList', response.data.data)
      commit('setClassListPaging', response.data.paging)
      successCallback && successCallback(response)
    }).catch((error) => {
      errHandler && errHandler(error)
    })
  },
  getSessionParticipant ({ commit }, { init, classCategoryId, sessionId, params, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.class.classSessionParticipant(classCategoryId, sessionId, params))).then((response) => {
      if (init) {
        commit('setSessionParticipant', response.data.data)
      } else {
        commit('setSessionHistoryParticipant', response.data.data)
      }
      successCallback && successCallback(response)
    }).catch((error) => {
      errHandler && errHandler(error)
    })
  },
  getClassCategoryDetail ({ commit }, { classId, classCategoryId, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.class.classCategoryDetail(classId, classCategoryId))).then((response) => {
      commit('setClassCategoryDetail', response.data.data)
      successCallback && successCallback(response)
    }).catch((error) => {
      errHandler && errHandler(error)
    })
  },
  createClass ({ commit }, { body, successCallback, errHandler } = {}) {
    this.$axios.post(getUrl(api.class.createClass), body)
      .then((_) => {
        successCallback && successCallback()
      })
      .catch((_) => {
        errHandler && errHandler()
      })
  },
  getUsers ({ commit }, { params, companyId, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.class.users({ companyId, params })))
      .then((response) => {
        commit('setClassUsers', response.data.data)
        successCallback && successCallback()
      })
      .catch((e) => {
        errHandler && errHandler(e)
      })
  },
  getUserCurrentCompany ({ commit }, { successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.class.currentCompany))
      .then(async (response) => {
        await commit('setUserCurrentCompany', response.data.data)
        successCallback && successCallback()
      })
      .catch((e) => {
        errHandler && errHandler(e)
      })
  },
  updateSelectedCoaches ({ commit }, selectedCoaches) {
    commit('setSelectedCoaches', selectedCoaches)
  },
  async uploadFile (_, { data, successCallback, errHandler }) {
    await this.$axios.post(getUrl(api.class.file), data).then((res) => {
      successCallback && successCallback(res.data.data)
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  },
  getClassDetail ({ commit }, { id, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.class.classDetail(id)))
      .then((res) => {
        commit('setClassDetail', res.data.data)
        successCallback && successCallback(res.data.data)
      })
      .catch((err) => {
        errHandler && errHandler(err)
      })
  },
  getClassParticipants ({ commit }, { id, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.class.classParticipants(id)))
      .then((res) => {
        commit('setClassParticipants', res.data.data.classCategories)
        successCallback && successCallback(res)
      })
      .catch((err) => {
        errHandler && errHandler(err)
      })
  },
  deleteClass ({ _ }, { id, successCallback, errHandler } = {}) {
    this.$axios.delete(getUrl(api.class.deleteClass(id)))
      .then((res) => {
        successCallback && successCallback(res)
      })
      .catch((err) => {
        errHandler && errHandler(err)
      })
  },
  addClassCategory ({ commit }, { id, body, successCallback, errHandler } = {}) {
    this.$axios.post(getUrl(api.class.insertClassCategory(id)), body)
      .then((res) => {
        successCallback && successCallback(res)
      })
      .catch((err) => {
        errHandler && errHandler(err)
      })
  },
  setSnackBar ({ commit }, data) {
    commit('setSnackBarData', data)
  }
}
