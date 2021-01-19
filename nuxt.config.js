import languages from './static/lang/languages'

const dev = () => process.env.NODE_ENV !== 'production'

export default {
  ssr: false,
  publicRuntimeConfig: {
    tournamentUrl: process.env.tournamentUrl || 'https://tournament.sportiv.app',
    tournamentSeeAll: process.env.tournamentSeeAll || 'https://tournament.sportiv.app/tournament',
    tournamentCreateUrl: process.env.tournamentCreateUrl || 'https://tournament.sportiv.app/create'
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Sportiv',
    titleTemplate: 'Sportiv - %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap'
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/colors.scss',
    '~/assets/vendors/vue-sweetalert2.scss',
    '~/assets/vendors/vue-tel-input.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios',
    '~/plugins/vue-clipboard'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    [
      'nuxt-i18n',
      {
        seo: false,
        lazy: true,
        locales: languages,
        defaultLocale: 'en',
        vueI18n: {
          fallbackLocale: 'id'
        },
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          alwaysRedirect: true
        },
        langDir: 'static/lang/'
      }
    ],
    '@nuxtjs/proxy',
    '@nuxtjs/axios',
    'vue-sweetalert2/nuxt'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
    validateStatus: (code) => {
      return code >= 200 && code <= 302
    }
  },

  proxy: {
    '/backend': {
      target: dev()
        ? 'https://api.quickplay.app/api/v1'
        : '/',
      pathRewrite: {
        '^/backend': '/'
      }
    },
    '/src': {
      target: dev()
        ? 'https://api.quickplay.app/'
        : '/src/',
      pathRewrite: {
        '^/src': '/'
      }
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#FF7041'
        }
      }
    },
    customVariables: ['~/assets/variables.scss']
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
}
