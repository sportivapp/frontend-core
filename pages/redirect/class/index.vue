<template>
  <v-container fluid fill-height>
    <v-row justify="center" align="center">
      <v-progress-circular
        color="#FF7041"
        indeterminate
        size="50"
      />
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'IndexVue',
  layout: 'empty',
  created () {
    this.init()
  },
  methods: {
    ...mapActions([
      'setToken'
    ]),
    ...mapActions('class', [
      'verifyClassRedirectToken'
    ]),
    successVerify () {
      this.setToken(this.$route.query.token)
      this.$router.push('/class')
    },
    failVerify () {
      this.$router.push('/')
    },
    init () {
      const data = {
        tok: this.$route.query.token
      }
      this.verifyClassRedirectToken({
        data,
        successCallback: this.successVerify,
        errHandler: this.failVerify
      })
    }
  }
}
</script>

<style scoped>

</style>
