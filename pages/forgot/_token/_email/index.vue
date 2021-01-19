<template>
  <v-container fill-height>
    <v-row
      justify="center"
      align="center"
      class="mb-8"
    >
      <nuxt-link to="/">
        <img
          src="../../../../assets/images/logos/sportiv-orange.svg"
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
          class="reset-form"
        >
          <v-row
            v-if="isValidating"
            justify="center"
            align="center"
          >
            <v-col align="center">
              <moon-loader
                size="50px"
                color="#0AB28A"
              />
            </v-col>
          </v-row>
          <reset-password-form
            v-else
          />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import { mapActions } from 'vuex'
import ResetPasswordForm from '@/components/ResetPassword/ResetPasswordForm'

export default {
  name: 'ResetPasssword',
  components: {
    ResetPasswordForm,
    MoonLoader
  },
  data () {
    return {
      isValidating: true
    }
  },
  computed: {
    token () {
      return this.$route.params.token
    },
    email () {
      return this.$route.params.email
    }
  },
  created () {
    if (!this.token || !this.email) {
      this.$router.push('/')
      return
    }

    const data = {
      token: this.token,
      email: this.email
    }
    this.validateResetPassword({
      data,
      successCallback: this.successValidatePassword,
      errHandler: this.failValidatePassword
    })
  },
  methods: {
    ...mapActions([
      'validateResetPassword'
    ]),
    successValidatePassword () {
      this.isValidating = false
    },
    failValidatePassword (error) {
      this.$swal({
        icon: 'error',
        title: 'Whoops',
        allowOutsideClick: false,
        text: `The link you give is wrong: ${error.response.data.errorMessage}`
      }).then((value) => {
        if (value) {
          this.$router.push('/')
        }
      })
    }
  },
  head () {
    return {
      title: this.$t('common.resetPassword')
    }
  },
  layout: 'login-register'
}
</script>

<style lang="scss" scoped>
.reset-form {
  border-radius: 12px;
  font-size: 13px;
}

.spotify-logo-long {
  width: 100%;
  height: auto;
  max-width: 300px;
  object-fit: contain;
}
</style>
