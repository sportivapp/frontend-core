<template>
  <v-app>
    <v-container fluid fill-height class="error-page">
      <page-not-found v-if="error.statusCode === 404" />
      <under-construction v-else />
    </v-container>
  </v-app>
</template>

<script>
import PageNotFound from '@/components/Backgrounds/PageNotFound'
import UnderConstruction from '@/components/Backgrounds/UnderConstruction'
export default {
  components: { UnderConstruction, PageNotFound },
  scrollToTop: true,
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 20px;
}

.error-page {
  background-color: $grey-10;
}
</style>
