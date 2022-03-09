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
          class="forgot-form"
        >
          <v-container class="px-12">
            <v-row
              justify="center"
              align="center"
              class="ma-0"
            >
              <span class="forgot-form__title pa-4">{{
                $t('forgotPasswordPage.forgotTitle')
              }}</span>
            </v-row>
            <v-form
              ref="form"
              v-model="validForm"
              @submit.prevent=""
            >
              <v-row>
                <span class="forgot__guide">{{
                  $t('forgotPasswordPage.guide')
                }}</span>
              </v-row>
              <v-row>
                <v-col class="pb-0 pt-4">
                  <v-row>
                    <span class="forgot-form__header">{{
                      $t('forgotPasswordPage.email')
                    }}</span>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="email"
                      :rules="rules.email"
                      dense
                      rounded
                      validate-on-blur
                      class="form-input"
                    />
                  </v-row>
                </v-col>
              </v-row>
              <v-row
                v-if="errorMessage"
                justify="center"
                align="center"
                class="pa-0"
              >
                <v-col>
                  <div
                    class="v-messages theme--light error--text pt-1 forgot__error"
                    role="alert"
                  >
                    <div class="v-messages__wrapper">
                      <div class="v-messages__message">
                        {{ errorMessage }}
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-row class="pt-4">
                <sportiv-button
                  type="submit"
                  class="mb-7"
                  @click="handleClickSendEmail"
                >
                  <moon-loader
                    v-if="isSendingRequest"
                    size="28px"
                    color="white"
                  />
                  <span
                    v-else
                    class="text-capitalize"
                  >
                    {{ $t('forgotPasswordPage.send') }}
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
      class="mt-10"
    >
      <nuxt-link
        to="/login"
        class="forgot__login-btn"
      >
        {{ $t('forgotPasswordPage.back') }}
      </nuxt-link>
    </v-row>
  </v-container>
</template>

<script>
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import SportivButton from '@/components/inputs/SportivButton/SportivButton'
import { mapActions } from 'vuex'
import { isValidEmail } from '~/utils/validation'

export default {
  name: 'ForgotPasssword',
  components: {
    SportivButton,
    MoonLoader
  },
  data () {
    return {
      isSendingRequest: false,
      validForm: false,
      email: '',
      errorMessage: '',
      rules: {
        email: [
          v => !!v || 'Email can not be empty',
          v => isValidEmail(v) || 'Email must be valid'
        ]
      }
    }
  },
  computed: {
    forgotForm () {
      return this.$refs.form
    }
  },
  methods: {
    ...mapActions([
      'forgotPassword'
    ]),
    sendForgotPassword () {
      const data = {
        email: this.email
      }
      this.forgotPassword({
        data,
        successCallback: this.successForgotPassword,
        errHandler: this.failForgotPassword
      })
    },
    handleClickSendEmail () {
      if (this.isSendingRequest) { return }
      if (this.forgotForm.validate()) {
        this.isSendingRequest = true
        this.errorMessage = ''
        this.sendForgotPassword()
      }
    },
    successForgotPassword () {
      this.isSendingRequest = false
      this.$swal({
        icon: 'success',
        title: 'Success',
        text: 'Reset password link sent!'
      }).then((value) => {
        if (value) {
          this.$router.push('/login')
        }
      })
    },
    failForgotPassword (error) {
      this.isSendingRequest = false
      this.errorMessage = error.response.data.errorMessage ||
        'Failed to send forgot password, please try again'
    }
  },
  head () {
    return {
      title: this.$t('common.forgotPassword')
    }
  },
  layout: 'login-register'
}
</script>

<style lang="scss" scoped>
@import "assets/input-override";

.row {
  padding: 0;
}

.forgot {
  &__guide {
    font-weight: 500;
    font-size: 11px;
    text-align: center;
  }

  &__login-btn {
    font-weight: 500;
    font-size: 13px;
    text-wrap: normal;
    word-break: keep-all;
    cursor: pointer;
    text-decoration: underline;
    padding-left: 4px;
    color: $green-1 !important;
    white-space: nowrap;
  }

  &__register-title {
    font-size: 13px;
    color: $grey-3;
  }

  &__error {
    text-align: center;
  }
}

.forgot-form {
  border-radius: 12px;
  font-size: 13px;

  &__title {
    text-align: center;
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
