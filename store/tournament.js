import { apiTournament, getUrlTournament } from '@/config/api'
import { tournamentMatchStages } from '@/config/tournamentStages'

export const state = () => ({
  latestTournament: [],
  tournamentList: [],
  tournamentOrganizer: [],
  tournamentListPaging: {},
  latestTournamentPaging: {},
  tournamentDetail: {},
  tournamentParticipantList: [],
  groupStageParticipantList: [],
  knockoutStageParticipantList: [],
  groupStageStandingTable: [],
  groupStageMatchList: [],
  knockOutStageMatchList: []
})

export const getters = {
  latestTournament: state => state.latestTournament,
  tournamentList: state => state.tournamentList,
  tournamentOrganizer: state => state.tournamentOrganizer,
  tournamentListPaging: state => state.tournamentListPaging,
  latestTournamentPaging: state => state.latestTournamentPaging,
  tournamentDetail: state => state.tournamentDetail,
  tournamentParticipantList: state => state.tournamentParticipantList,
  groupStageParticipantList: state => state.groupStageParticipantList,
  knockoutStageParticipantList: state => state.knockoutStageParticipantList,
  groupStageStandingTable: state => state.groupStageStandingTable,
  groupStageMatchList: state => state.groupStageMatchList,
  knockOutStageMatchList: state => state.knockOutStageMatchList
}

export const mutations = {
  setLatestTournament (state, latestTournament) {
    state.latestTournament = latestTournament
  },
  setTournamentList (state, value) {
    state.tournamentList = value
  },
  addTournamentList (state, value) {
    state.tournamentList = [...state.tournamentList, ...value]
  },
  addTournamentOrganizer (state, value) {
    state.tournamentOrganizer = value
  },
  setTournamentListPaging (state, value) {
    state.tournamentListPaging = value
  },
  setLatestTournamentPaging (state, latestTournamentPaging) {
    state.latestTournamentPaging = latestTournamentPaging
  },
  setTournamentDetail (state, value) {
    state.tournamentDetail = value
  },
  setTournamentParticipantList (state, value) {
    state.tournamentParticipantList = value
  },
  setGroupStageParticipantList (state, value) {
    state.groupStageParticipantList = value
  },
  setKnockoutStageParticipantList (state, value) {
    state.knockoutStageParticipantList = value
  },
  setGroupStageStandingTable (state, value) {
    state.groupStageStandingTable = value
  },
  setGroupStageMatchList (state, value) {
    state.groupStageMatchList = value
  },
  setKnockOutStageMatchList (state, value) {
    state.knockOutStageMatchList = value
  }
}

export const actions = {
  getTournamentList ({ commit }, { params, init, successCallback, errHandler }) {
    this.$axios.get(getUrlTournament(apiTournament.tournament.list(params)))
      .then((res) => {
        if (init) {
          commit('setTournamentList', res.data.data)
        } else {
          commit('addTournamentList', res.data.data)
        }
        commit('setTournamentListPaging', res.data.paging)
        successCallback && successCallback()
      }).catch((e) => {
        errHandler && errHandler(e)
      })
  },
  getLatestTournament ({ commit }, { params, successCallback, errHandler } = {}) {
    this.$axios.get(getUrlTournament(apiTournament.tournament.list(params))).then((response) => {
      commit('setLatestTournament', response.data.data)
      commit('setLatestTournamentPaging', response.data.paging)
      successCallback && successCallback(response)
    }).catch((error) => {
      errHandler && errHandler(error)
    })
  },
  getTournamentDetail ({ commit }, { id, successCallback, errHandler } = {}) {
    this.$axios.get(getUrlTournament(apiTournament.tournament.detail(id))).then((res) => {
      commit('setTournamentDetail', res.data.data)
      successCallback && successCallback(res)
    }).catch((error) => {
      errHandler && errHandler(error)
    })
  },
  // PARTICIPANTS ------------------------------------------------------------------------
  getTournamentParticipantList ({ commit }, { id, successCallback, errHandler } = {}) {
    this.$axios.get(getUrlTournament(apiTournament.tournament.participants(id))).then((res) => {
      commit('setTournamentParticipantList', res.data.data)
      successCallback && successCallback(res)
    }).catch((error) => {
      errHandler && errHandler(error)
    })
  },
  getStageParticipantList ({ commit }, { data, successCallback, errHandler } = {}) {
    this.$axios.get(getUrlTournament(apiTournament.tournament.stageParticipant(data.tournamentId, data.params)))
      .then((res) => {
        if (data.params.type === tournamentMatchStages.knockOutStage) {
          commit('setKnockoutStageParticipantList', res.data.data)
        } else {
          commit('setGroupStageParticipantList', res.data.data)
        }
        successCallback && successCallback(res)
      }).catch((error) => {
        errHandler && errHandler(error)
      })
  },
  // STANDING TABLE ----------------------------------------------------------------------
  getGroupStageStandingTable ({ commit }, { id, successCallback, errHandler } = {}) {
    this.$axios.get(getUrlTournament(apiTournament.tournament.tournamentDetailStandings(id)))
      .then((res) => {
        commit('setGroupStageStandingTable', res.data.data)
        successCallback && successCallback(res)
      })
      .catch((error) => {
        errHandler && errHandler(error)
      })
  },
  // MATCH LIST --------------------------------------------------------------------------
  getGroupStageMatchList ({ commit }, { id, successCallback, errHandler } = {}) {
    this.$axios.get(getUrlTournament(apiTournament.tournament.tournamentDetailMatchList(id, tournamentMatchStages.groupStage)))
      .then((res) => {
        commit('setGroupStageMatchList', res.data.data)
        successCallback && successCallback(res)
      })
      .catch((error) => {
        errHandler && errHandler(error)
      })
  },
  getKnockOutStageMatchList ({ commit }, { id, successCallback, errHandler } = {}) {
    this.$axios.get(getUrlTournament(apiTournament.tournament.tournamentDetailMatchList(id, tournamentMatchStages.knockOutStage)))
      .then((res) => {
        commit('setKnockOutStageMatchList', res.data.data)
        successCallback && successCallback(res)
      })
      .catch((error) => {
        errHandler && errHandler(error)
      })
  }
}
