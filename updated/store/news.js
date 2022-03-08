import { api, getUrl } from '@/config/api'

export const state = () => ({
  latestNews: [],
  latestNewsPaging: {},
  newsDetail: {},
  newsDetailViewCount: 0
})

export const getters = {
  latestNews: state => state.latestNews,
  latestNewsPaging: state => state.latestNewsPaging,
  newsDetail: state => state.newsDetail,
  newsDetailViewCount: state => state.newsDetailViewCount
}

export const mutations = {
  setLatestNews (state, latestNews) {
    state.latestNews = latestNews
  },
  addLatestNews (state, moreLatestNews) {
    state.latestNews = [...state.latestNews, ...moreLatestNews]
  },
  setLatestNewsPaging (state, latestNewsPaging) {
    state.latestNewsPaging = latestNewsPaging
  },
  setNewsDetail (state, newsDetail) {
    state.newsDetail = newsDetail
  },
  setNewsDetailViewCount (state, newsDetailViewCount) {
    state.newsDetailViewCount = newsDetailViewCount
  },
  setNewsDetailLike (state, like) {
    state.newsDetail.isLiked = like
  }
}

export const actions = {
  getLatestNews ({ commit }, { params, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.news(params))).then((response) => {
      commit('setLatestNews', response.data.data)
      commit('setLatestNewsPaging', response.data.paging)
      successCallback && successCallback(response)
    }).catch((error) => {
      errHandler && errHandler(error)
    })
  },
  loadMoreNews ({ commit }, { params, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.news(params))).then((response) => {
      commit('addLatestNews', response.data.data)
      commit('setLatestNewsPaging', response.data.paging)
      successCallback && successCallback(response)
    }).catch((error) => {
      errHandler && errHandler(error)
    })
  },
  getNewsDetail ({ commit }, { id, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.newsDetail(id))).then((response) => {
      commit('setNewsDetail', response.data.data)
      successCallback && successCallback(response)
    }).catch((error) => {
      errHandler && errHandler(error)
    })
  },
  getNewsDetailViewCount ({ commit }, { id, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.newsDetailViewCount(id))).then((response) => {
      commit('setNewsDetailViewCount', response.data.data)
      successCallback && successCallback(response)
    }).catch((error) => {
      errHandler && errHandler(error)
    })
  },
  likeNewsDetail ({ commit }, { id, successCallback, errHandler } = {}) {
    this.$axios.get(getUrl(api.newsDetailLike(id)))
      .then((response) => {
        commit('setNewsDetailLike', response.data.data)
        successCallback && successCallback(response)
      }).catch((error) => {
        errHandler && errHandler(error)
      })
  },
  unLikeNewsDetail ({ commit }, { id, successCallback, errHandler } = {}) {
    this.$axios.delete(getUrl(api.newsDetailLike(id)))
      .then((response) => {
        commit('setNewsDetailLike', response.data.data)
        successCallback && successCallback(response)
      }).catch((error) => {
        errHandler && errHandler(error)
      })
  }
}
