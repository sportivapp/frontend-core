<template>
  <v-progress-circular
    color="#FF7041"
    indeterminate
    size="50"
  />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Logout',
  created () {
    this.logout()
  },
  methods: {
    ...mapActions([
      'logout'
    ])
  },
  head () {
    return {
      title: this.$t('common.logout')
    }
  }
}
</script>

<style scoped>

</style>
