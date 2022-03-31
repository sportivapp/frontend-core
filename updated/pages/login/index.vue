<template>
  <v-container fill-height>
    <v-row
      justify="center"
      align="center"
      class="mb-8"
    >
      <nuxt-link to="/">
        <img
          src="../../assets/images/logos/sportiv-orange.svg"
          class=".spotify-logo-long"
        >
      </nuxt-link>
    </v-row>
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        md="4"
        sm="8"
        xs="10"
      >
        <v-sheet
          elevation="5"
          class="login-form"
          @submit.prevent=""
        >
          <v-container class="px-12">
            <v-row
              justify="center"
              align="center"
              class="ma-0"
            >
              <span class="login-form__title pa-4">{{
                $t('loginPage.login')
              }}</span>
            </v-row>
            <v-form
              ref="form"
              v-model="validForm"
              lazy-validation
            >
              <v-row>
                <v-col class="py-0">
                  <v-row>
                    <span class="login-form__header">{{
                      $t('loginPage.email')
                    }}</span>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="email"
                      :rules="rules.email"
                      dense
                      rounded
                      autofocus
                      validate-on-blur
                      class="form-input"
                    />
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="py-0">
                <v-col class="py-0">
                  <v-row>
                    <span class="login-form__header">{{
                      $t("loginPage.password")
                    }}</span>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="password"
                      :rules="rules.password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      dense
                      rounded
                      validate-on-blur
                      class="form-input"
                      @click:append="showPassword = !showPassword"
                    />
                  </v-row>
                </v-col>
              </v-row>
              <v-row justify="space-between" align="center">
                <v-col class="pa-0" align="start">
                  <v-row class="ma-0">
                    <v-checkbox
                      :label="$t('loginPage.rememberMe')"
                      class="form-selection"
                    />
                  </v-row>
                </v-col>
                <v-col class="pa-0" align="end">
                  <nuxt-link
                    to="/forgot-password"
                    class="login__forgot-btn"
                  >
                    {{ $t('loginPage.forgotPassword') }}
                  </nuxt-link>
                </v-col>
              </v-row>
              <v-row
                v-if="loginErrorMessage"
                justify="center"
                align="center"
                class="pa-0"
              >
                <v-col>
                  <div
                    class="v-messages theme--light error--text pt-1 login__error"
                    role="alert"
                  >
                    <div class="v-messages__wrapper">
                      <div class="v-messages__message">
                        {{ loginErrorMessage }}
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <sportiv-button
                  type="submit"
                  class="mb-7"
                  @click="handleClickLogin"
                >
                  <v-progress-circular
                    v-if="isSendingRequest"
                    color="white"
                    indeterminate
                    size="28"
                  />
                  <span
                    v-else
                    class="text-capitalize"
                  >
                    {{ $t('loginPage.login') }}
                  </span>
                </sportiv-button>
              </v-row>
            </v-form>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
      class="mt-10 login__register-title"
    >
      {{ $t('loginPage.notHaveAccount') }}
      <nuxt-link
        to="/register"
        class="login__register-btn"
      >
        {{ $t('loginPage.register') }}
      </nuxt-link>
    </v-row>
  </v-container>
</template>

<script>
import SportivButton from '@/components/inputs/SportivButton/SportivButton'
import { mapActions } from 'vuex'
import { isValidEmail } from '~/utils/validation'

export default {
  name: 'Login',
  components: {
    SportivButton
  },
  data () {
    return {
      email: '',
      password: '',
      validForm: true,
      showPassword: false,
      isSendingRequest: false,
      loginErrorMessage: '',
      rules: {
        email: [
          v => !!v || 'Email can not be empty',
          v => isValidEmail(v) || 'Email must be valid'
        ],
        password: [
          v => !!v || 'Password can not be empty'
        ]
      }
    }
  },
  computed: {
    loginForm () {
      return this.$refs.form
    },
    redirectUrl () {
      return this.$route.query.redirect
    },
    redirectOutside () {
      return this.$route.query.redirectOutside
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    loginUser () {
      const data = {
        email: this.email,
        password: this.password
      }
      this.login({
        data,
        successCallback: this.successLogin,
        errHandler: this.failLogin
      })
    },
    handleClickLogin () {
      if (this.isSendingRequest) { return }
      if (this.loginForm.validate()) {
        this.loginErrorMessage = ''
        this.isSendingRequest = true
        this.loginUser()
      }
    },
    successLogin () {
      this.isSendingRequest = false
      if (this.redirectOutside) {
        window.location.href = this.redirectOutside
      } else {
        const redirect = this.redirectUrl ? this.redirectUrl : '/'
        this.$router.push(redirect)
      }
    },
    failLogin () {
      this.isSendingRequest = false
      this.loginErrorMessage = 'Wrong email or password'
    }
  },
  head () {
    return {
      title: this.$t('common.login')
    }
  },
  layout: 'login-register',
  middleware: ['not-authenticated']
}
</script>

<style lang="scss" scoped>
@import "assets/input-override";

.row {
  padding: 0;
}

.login {
  &__register-btn, &__forgot-btn {
    text-wrap: normal;
    word-break: keep-all;
    cursor: pointer;
    text-decoration: underline;
    padding-left: 4px;
    color: $green-1 !important;
    white-space: nowrap;
  }

  &__register-btn, &__register-title {
    font-weight: 500;
    font-size: 13px;
  }

  &__register-title {
    font-size: 13px;
    color: $grey-3;
  }

  &__forgot-btn {
    font-size: 10px;
    height: 100%;
  }

  &__error {
    text-align: center;
  }
}

.login-form {
  border-radius: 12px;
  font-size: 13px;

  &__title {
    color: black;
    font-size: 24px;
    font-weight: 600;
  }

  &__header {
    color: $grey-3;
    font-size: 13px;
    font-weight: 500;
  }
}

.spotify-logo-long {
  width: 100%;
  height: auto;
  max-width: 300px;
  object-fit: contain;
}
</style>
