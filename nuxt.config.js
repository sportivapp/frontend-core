import languages from './static/lang/languages'

export default {
  ssr: false,
  publicRuntimeConfig: {
    tournamentUrl: process.env.TOURNAMENT_URL || 'https://tournament.sportiv.app',
    tournamentCreateUrl: process.env.TOURNAMENT_CREATE_URL || 'https://tournament.sportiv.app/tournament/form/step-1'
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
    '~/assets/vendors/vue-tel-input.scss',
    '~/assets/styles/index.scss'
  ],

  styleResources: {
    scss: [
      '~/assets/styles/index.scss'
    ]
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios',
    '~/plugins/vue-clipboard',
    '~/plugins/TiptapVuetify',
    '~/plugins/vuelidate'
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
        strategy: 'no_prefix',
        detectBrowserLanguage: true,
        langDir: 'static/lang/'
      }
    ],
    '@nuxtjs/proxy',
    '@nuxtjs/axios',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/style-resources'
  ],
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
  build: {
    transpile: ['vuetify/lib', 'tiptap-vuetify']
  }
}
