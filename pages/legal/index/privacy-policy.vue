<template>
  <v-container class="pa-0">
    <div id="contentContainer" class="text-justify" />
  </v-container>
</template>

<script>
import { privacyPolicy } from '@/assets/docs/privacyPolicy.json'
export default {
  name: 'TermOfServices',
  scrollToTop: true,
  mounted () {
    this.fetchContent()
  },
  methods: {
    fetchContent () {
      document.getElementById('contentContainer').innerHTML = privacyPolicy
    }
  }
}
</script>
