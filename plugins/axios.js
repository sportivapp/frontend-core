export default function ({ $axios, store, redirect }) {
  $axios.onRequest((config) => {
    if (process.client) {
      const Cookie = require('js-cookie')
      if (Cookie.get('token')) {
        const token = Cookie.get('token')
        store.dispatch('setToken', token)
      }
    }

    if (store.state.token) {
      config.headers.common.Authorization = store.state.token
    }
  })

  $axios.onError((error) => {
    if (error.response.status === 401) {
      store.dispatch('logout')
      redirect('/login')
    }
  })
}
