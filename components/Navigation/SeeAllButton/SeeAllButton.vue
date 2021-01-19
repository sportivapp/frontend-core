<template>
  <v-container class="flex-row align-center justify-center">
    <nuxt-link :to="link">
      <span>{{ $t('common.seeAll') }}</span>
    </nuxt-link>
    <nuxt-link v-if="showIcon" :to="link">
      <v-btn class="ml-2" elevation="2" icon>
        <v-icon>
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </nuxt-link>
  </v-container>
</template>

<script>
export default {
  name: 'SeeAllButton',
  props: {
    showIconWhenSmall: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: '#'
    }
  },
  computed: {
    showIcon () {
      return this.showIconWhenSmall || !this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

::v-deep .v-btn__content, span {
  font-weight: 600;
  color: $green-1;
}
</style>
