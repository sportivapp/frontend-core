<template>
  <default-layout>
    <nuxt />
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/default'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Class',
  layout: 'default',
  components: {
    DefaultLayout
  },
  computed: {
    ...mapGetters('class', [
      'classPermissions'
    ])
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions('class', [
      'getClassPermissions'
    ]),
    init () {
      if (Object.keys(this.classPermissions).length <= 0) {
        // this.getClassPermissions()
      }
    }
  }
}
</script>

<style scoped>

</style>
