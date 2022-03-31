<template>
  <v-container fill-height>
    <register-user
      v-if="!hasFinishedUserForm"
      @finishedUserForm="handleFinishUserForm"
    />
    <register-o-t-p
      v-else
      :user-info="userInfo"
    />
  </v-container>
</template>

<script>
import RegisterUser from '@/components/Register/RegisterUser'
import RegisterOTP from '@/components/Register/RegisterOTP'

export default {
  name: 'RegisterPage',
  layout: 'login-register',
  middleware: ['not-authenticated'],
  components: { RegisterOTP, RegisterUser },
  data () {
    return {
      hasFinishedUserForm: false,
      userInfo: {}
    }
  },
  methods: {
    handleFinishUserForm (userInfo) {
      this.hasFinishedUserForm = true
      this.userInfo = { ...userInfo }
    }
  },
  head () {
    return {
      title: this.$t('common.register')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
