import { apiTournament, getUrlTournament } from '@/config/api'

export const state = () => ({
  matchInfo: {},
  matchStatistic: {},
  matchHomeTeamLineup: {},
  matchAwayTeamLineup: {},
  memberStatistic: {}
})

export const getters = {
  matchInfo: state => state.matchInfo,
  matchHomeTeamLineup: state => state.matchHomeTeamLineup,
  matchAwayTeamLineup: state => state.matchAwayTeamLineup,
  memberStatistic: state => state.memberStatistic
}

export const mutations = {
  setMatchInfo (state, data) {
    state.matchInfo = data
  },
  setMatchStatistic (state, data) {
    state.matchStatistic = data
  },
  setMatchHomeTeamLineup (state, data) {
    state.matchHomeTeamLineup = data
  },
  setMatchAwayTeamLineup (state, data) {
    state.matchAwayTeamLineup = data
  },
  setMemberStatistic (state, data) {
    state.memberStatistic = data
  }

}

export const actions = {
  getMatchInfo ({ commit }, { params, succesCallback, errHandler } = {}) {
    this.$axios.get(getUrlTournament(apiTournament.match.matchInfo(params))).then((res) => {
      commit('setMatchInfo', res.data.data)
      succesCallback && succesCallback(res.data.data)
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  },
  getMatchSummaryStatistic ({ commit }, { params, succesCallback, errHandler } = {}) {
    this.$axios.get(getUrlTournament(apiTournament.match.matchSummaryStatistic(params))).then((res) => {
      commit('setMatchStatistic', res.data.data)
      succesCallback && succesCallback(res.data.data)
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  },
  getMatchTeamLineup ({ commit }, { params, succesCallback, errHandler } = {}) {
    this.$axios.get(getUrlTournament(apiTournament.match.matchTeamLineup(params))).then((res) => {
      if (params.type === 'HOME') { commit('setMatchHomeTeamLineup', res.data.data) } else if (params.type === 'AWAY') { commit('setMatchAwayTeamLineup', res.data.data) }
      succesCallback && succesCallback()
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  },
  getStatisticByMatchParticipantMemberId ({ commit }, { params, succesCallback, errHandler } = {}) {
    this.$axios.get(getUrlTournament(apiTournament.match.matchParticipantStatistic(params))).then((res) => {
      commit('setMemberStatistic', res.data.data)
      succesCallback && succesCallback()
    }).catch((e) => {
      errHandler && errHandler(e)
    })
  }
}
