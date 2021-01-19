<template>
  <v-container class="pa-0">
    <div id="contentContainer" class="text-justify" />
  </v-container>
</template>

<script>
import { termOfServices } from '@/assets/docs/termOfServices.json'
export default {
  name: 'TermOfServices',
  mounted () {
    this.fetchContent()
  },
  methods: {
    fetchContent () {
      document.getElementById('contentContainer').innerHTML = termOfServices
    }
  }
}
</script>
