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
          class="otp-form"
        >
          <v-container class="px-12">
            <v-row
              justify="center"
              align="center"
              class="ma-0"
            >
              <span class="otp-form__title pa-4">{{
                $t('registerOtp.title')
              }}</span>
            </v-row>
            <v-form
              ref="form"
              v-model="validForm"
            >
              <v-row
                justify="center"
                align="center"
              >
                <span class="otp__guide">{{
                  $t('registerOtp.guide')
                }}
                </span>
              </v-row>
              <v-row
                justify="center"
                align="center"
                class="py-8"
              >
                <otp-input
                  ref="otpInput"
                  input-classes="otp-input"
                  :num-inputs="4"
                  :should-auto-focus="true"
                  :is-input-num="true"
                  separator=""
                  @on-change="handleOtpChange"
                />
              </v-row>
              <v-row
                justify="center"
                align="center"
                class="pb-8"
              >
                <moon-loader
                  v-if="isSendingOtp"
                  size="14px"
                  color="#0AB28A"
                />
                <span
                  v-else
                  class="otp__send-again"
                  @click="handleClickSendAgain"
                >
                  {{ $t('registerOtp.sendAgain') }}
                </span>
              </v-row>
              <v-row>
                <sportiv-button
                  :disabled="!otpValid"
                  class="mb-7"
                  type="button"
                  @click="handleClickVerify"
                >
                  <moon-loader
                    v-if="isSendingRegister"
                    size="28px"
                    color="white"
                  />
                  <span
                    v-else
                    class="text-capitalize"
                  >
                    {{ $t('registerOtp.verify') }}
                  </span>
                </sportiv-button>
              </v-row>
            </v-form>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import SportivButton from '@/components/inputs/SportivButton/SportivButton'
import OtpInput from '@bachdgvn/vue-otp-input'
import { mapActions } from 'vuex'
import { errorToText } from '@/utils/error'

export default {
  name: 'RegisterOTP',
  components: {
    SportivButton,
    OtpInput,
    MoonLoader
  },
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      validForm: true,
      showPassword: false,
      otp: '',
      isSendingRegister: false,
      isSendingOtp: false
    }
  },
  computed: {
    otpValid () {
      return this.otp.length === 4
    }
  },
  methods: {
    ...mapActions([
      'sendOtp',
      'register'
    ]),
    handleOtpChange (otp) {
      this.otp = otp
    },
    handleClickVerify () {
      if (this.isSendingRegister) { return }
      this.isSendingRegister = true
      const data = {
        ...(this.userInfo),
        otpCode: this.otp
      }
      this.register({
        data,
        successCallback: this.successRegister,
        errHandler: this.failRegister
      })
    },
    handleClickSendAgain () {
      if (this.isSendingOtp) { return }
      this.isSendingOtp = true
      const data = {
        email: this.userInfo.email
      }
      this.sendOtp({
        data,
        successCallback: this.successSendOtp,
        errHandler: this.failSendOtp
      })
    },
    successRegister () {
      this.isSendingRegister = false
      this.$swal({
        icon: 'success',
        title: 'Success',
        text: 'Account created'
      }).then((value) => {
        if (value) {
          this.$router.push('/login')
        }
      })
    },
    failRegister (error) {
      this.isSendingRegister = false
      this.$swal({
        icon: 'error',
        text: errorToText({
          defaultErrorText: 'Something went wrong when sending OTP, please try again',
          errorMapping: this.$t('registerPage.error'),
          error: error.response.data.errorMessage
        })
      })
    },
    successSendOtp () {
      this.isSendingOtp = false
    },
    failSendOtp () {
      this.isSendingOtp = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "assets/input-override";
@import "assets/vendors/otp-input/otp-input";

.row {
  padding: 0;
}

.otp {
  &__guide {
    text-align: center;
    font-weight: 500;
    font-size: 13px;
  }

  &__send-again {
    font-weight: 600;
    font-size: 14px;
    text-decoration: none;
    color: $green-1 !important;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.otp-form {
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
