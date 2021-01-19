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
          class="register-form"
        >
          <v-container class="px-12">
            <v-row
              justify="center"
              align="center"
              class="ma-0"
            >
              <span class="register-form__title pa-4">{{
                $t('registerPage.register')
              }}</span>
            </v-row>
            <v-form
              ref="form"
              v-model="validForm"
              lazy-validation
            >
              <v-row class="py-0">
                <v-col class="py-0">
                  <v-row>
                    <span class="register-form__header">{{
                      $t("registerPage.email")
                    }}</span>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="email"
                      :rules="rules.email"
                      autofocus
                      dense
                      rounded
                      validate-on-blur
                      class="form-input"
                    />
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="pt-0 pb-4">
                <v-col class="py-0">
                  <v-row>
                    <span class="register-form__header">{{
                      $t("registerPage.phone")
                    }}</span>
                  </v-row>
                  <v-row class="pa-0">
                    <v-col class="pa-0">
                      <client-only>
                        <vue-tel-input
                          v-model="phone"
                          :preferred-countries="['ID']"
                          :input-options="{showDialCode: true}"
                          placeholder=" "
                          mode="international"
                          required
                          valid-characters-only
                          :autofocus="false"
                          @validate="handleValidatePhone"
                        />
                      </client-only>
                      <div
                        v-if="!isValidPhone"
                        class="v-messages theme--light error--text pt-1"
                        role="alert"
                      >
                        <div class="v-messages__wrapper">
                          <div class="v-messages__message">
                            {{ error.phone }}
                          </div>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="py-0">
                <v-col class="py-0">
                  <v-row>
                    <span class="register-form__header">{{
                      $t("registerPage.password")
                    }}</span>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="password"
                      :rules="rules.password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      :hint="$t('registerPage.passwordHint')"
                      dense
                      rounded
                      validate-on-blur
                      persistent-hint
                      class="form-input"
                      @click:append="showPassword = !showPassword"
                    />
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="py-0">
                <v-col class="py-0">
                  <v-row>
                    <span class="register-form__header">{{
                      $t("registerPage.confirmPassword")
                    }}</span>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="confirmPassword"
                      :rules="rules.confirmPassword"
                      :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      dense
                      rounded
                      validate-on-blur
                      persistent-hint
                      class="form-input"
                      @click:append="showConfirmPassword = !showConfirmPassword"
                    />
                  </v-row>
                </v-col>
              </v-row>
              <v-row
                justify="space-between"
                align="center"
                class="pb-2"
              >
                <v-checkbox
                  v-model="agree"
                  :rules="rules.agree"
                  class="form-selection ma-0"
                >
                  <template v-slot:label>
                    {{ $t('registerPage.agreeStart') }}&nbsp;
                    <nuxt-link class="register__links" to="/legal/term-of-services">
                      {{ $t('registerPage.legal') }}
                    </nuxt-link>
                    &nbsp;{{ $t('registerPage.agreeMid') }}&nbsp;
                    <nuxt-link class="register__links" to="/legal/privacy-policy">
                      {{ $t('registerPage.privacy') }}
                    </nuxt-link>
                    &nbsp;{{ $t('registerPage.agreeEnd') }}
                  </template>
                </v-checkbox>
              </v-row>
              <v-row>
                <sportiv-button
                  class="mb-7"
                  type="button"
                  @click="handleClickRegisterButton"
                >
                  <moon-loader
                    v-if="isSendingOtp"
                    size="28px"
                    color="white"
                  />
                  <span
                    v-else
                    class="text-capitalize"
                  >
                    {{ $t('registerPage.register') }}
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
      class="mt-10 register__register-title"
    >
      {{ $t('registerPage.alreadyHaveAccount') }}
      <nuxt-link
        to="/login"
        class="register__login-btn"
      >
        {{ $t('registerPage.login') }}
      </nuxt-link>
    </v-row>
  </v-container>
</template>

<script>
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import { VueTelInput } from 'vue-tel-input'
import SportivButton from '@/components/inputs/SportivButton/SportivButton'
import { isValidEmail, isValidPhoneNumber } from '@/utils/validation'
import { mapActions } from 'vuex'
import { errorToText } from '@/utils/error'

export default {
  name: 'RegisterUser',
  components: {
    SportivButton,
    VueTelInput,
    MoonLoader
  },
  data () {
    return {
      validForm: true,
      showPassword: false,
      showConfirmPassword: false,
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agree: false,
      isValidPhone: true,
      isSendingOtp: false,
      error: {
        phone: ''
      },
      rules: {
        email: [
          v => !!v || 'Email can not be empty',
          v => isValidEmail(v) || 'Email must be valid'
        ],
        password: [
          v => !!v || 'Password can not be empty',
          v =>
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-[\]()]).{8,}$/.test(v) ||
              this.$t('registerPage.passwordHint')
        ],
        confirmPassword: [
          v => !!v || 'Confirm password can not be empty',
          v => v === this.password ||
              'Confirm password does not match'
        ],
        agree: [
          v => !!v || 'You have to agree to the terms and condition'
        ]
      }
    }
  },
  computed: {
    registerForm () {
      return this.$refs.form
    },
    formattedPhoneNumber () {
      return this.phone
        .replaceAll(' ', '')
        .replaceAll('-', '')
    }
  },
  methods: {
    ...mapActions([
      'sendOtp'
    ]),
    isSameWithPassword (pass) {
      return this.password === pass
    },
    validatePhoneNumber () {
      if (isValidPhoneNumber(this.formattedPhoneNumber)) {
        this.isValidPhone = true
        this.error.phone = ''
      } else {
        this.isValidPhone = false
        this.error.phone = 'Phone number must be valid'
      }
      return this.isValidPhone
    },
    handleValidatePhone (validationObject) {
      this.isValidPhone = validationObject.isValid
      this.error.phone = validationObject.isValid
        ? ''
        : 'Phone number must be valid'
    },
    validateInput () {
      return this.registerForm.validate() && this.isValidPhone
    },
    handleClickRegisterButton () {
      if (this.isSendingOtp) { return }
      if (this.validateInput()) {
        this.isSendingOtp = true
        const data = {
          email: this.email
        }
        this.sendOtp({
          data,
          successCallback: this.successSendOtp,
          errHandler: this.failSendOtp
        })
      }
    },
    failSendOtp (error) {
      this.isSendingOtp = false
      this.$swal({
        icon: 'error',
        text: errorToText({
          defaultErrorText: 'Something went wrong when registering, please try again',
          errorMapping: this.$t('registerOtp.error'),
          error: error.response.data.errorMessage
        })
      })
    },
    successSendOtp () {
      this.isSendingOtp = false
      const userInfo = {
        email: this.email,
        mobileNumber: this.formattedPhoneNumber,
        password: this.password
      }
      this.$emit('finishedUserForm', userInfo)
    }
  }
}

</script>

<style lang="scss" scoped>
@import "assets/input-override";
@import "assets/vendors/vue-tel-input";

::v-deep .v-label {
  font-size: 11px;
  line-height: 80%;
  font-weight: 500;
  flex-wrap: wrap !important;
  line-height: 1.5em;
}

.row {
  padding: 0;
}

.register {
  &__login-btn, &__register-title {
    font-weight: 600;
  }

  &__login-btn {
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

  &__forgot-btn {
    font-size: 10px;
    height: 100%;
  }

  &__agree, &__links {
    font-size: 11px;
    line-height: 80%;
    font-weight: 500;
  }

  &__agree {
    color: $grey-3;
  }

  &__links {
    &:hover {
      text-decoration: underline;
    }

    text-decoration: none;
    color: $green-1 !important;
  }
}

.register-form {
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
