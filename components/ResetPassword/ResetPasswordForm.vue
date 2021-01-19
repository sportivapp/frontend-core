<template>
  <v-container class="px-12">
    <v-row
      justify="center"
      align="center"
      class="ma-0"
    >
      <span class="reset-form__title pa-4">{{
        $t('resetPasswordPage.title')
      }}</span>
    </v-row>
    <v-form
      ref="form"
      v-model="validForm"
      lazy-validation
      @submit.prevent=""
    >
      <v-row>
        <v-col class="pb-0 pt-4">
          <v-row>
            <span class="reset-form__header">
              {{ $t('resetPasswordPage.password') }}
            </span>
          </v-row>
          <v-row>
            <v-text-field
              v-model="password"
              :rules="rules.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              :hint="$t('resetPasswordPage.passwordHint')"
              dense
              rounded
              persistent-hint
              validate-on-blur
              class="form-input"
              @click:append="showPassword = !showPassword"
            />
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pb-0 pt-4">
          <v-row>
            <span class="reset-form__header">{{
              $t('resetPasswordPage.confirmPassword')
            }}</span>
          </v-row>
          <v-row>
            <v-text-field
              v-model="confirmPassword"
              :rules="rules.confirmPassword"
              :append-icon="showConfirmPassword ? 'mdi-eye' :
                'mdi-eye-off'"
              :type="showConfirmPassword ? 'text' : 'password'"
              dense
              rounded
              persistent-hint
              validate-on-blur
              class="form-input"
              @click:append="showConfirmPassword = !showConfirmPassword"
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
            class="v-messages theme--light error--text pt-1 reset__error"
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
          @click="handleClickSubmitButton"
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
            {{ $t('resetPasswordPage.save') }}
          </span>
        </sportiv-button>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import { mapActions } from 'vuex'
import SportivButton from '~/components/inputs/SportivButton/SportivButton'

export default {
  name: 'ResetPasswordForm',
  components: {
    SportivButton,
    MoonLoader
  },
  data () {
    return {
      isSendingRequest: false,
      validForm: false,
      errorMessage: '',
      showPassword: false,
      showConfirmPassword: false,
      password: '',
      confirmPassword: '',
      rules: {
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
        ]
      }
    }
  },
  computed: {
    resetForm () {
      return this.$refs.form
    }
  },
  methods: {
    ...mapActions([
      'resetPassword'
    ]),
    sendResetPassword () {
      const params = {
        email: this.$route.params.email,
        token: this.$route.params.token
      }
      const data = {
        password: this.password
      }
      this.resetPassword({
        data,
        params,
        successCallback: this.successResetPassword,
        errHandler: this.failResetPassword
      })
    },
    handleClickSubmitButton () {
      if (this.isSendingRequest) { return }
      if (this.resetForm.validate()) {
        this.isSendingRequest = true
        this.errorMessage = ''
        this.sendResetPassword()
      }
    },
    successResetPassword () {
      this.isSendingRequest = false
      this.$swal({
        icon: 'success',
        title: 'Success',
        text: 'Password changed!',
        allowOutsideClick: false
      }).then((value) => {
        if (value) {
          this.$router.push('/login')
        }
      })
    },
    failResetPassword (error) {
      this.isSendingRequest = false
      this.errorMessage = `Fail to reset password: ${error.response.data.errorMessage}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "assets/input-override";

.row {
  padding: 0;
}

.reset {
  &__guide {
    font-weight: 500;
    font-size: 11px;
    text-align: center;
  }

  &__error {
    text-align: center;
  }
}

.reset-form {
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
</style>
