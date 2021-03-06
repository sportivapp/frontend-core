<template>
  <v-carousel
    cycle
    interval="4000"
    height="auto"
    hide-delimiter-background
    :show-arrows="$vuetify.breakpoint.mdAndUp"
  >
    <v-carousel-item
      v-for="(banner, index) in banners"
      :key="index"
      eager
    >
      <v-row
        no-gutters
        class="home-top-banner__container"
        justify="center"
        align="start"
      >
        <v-col align="center" cols="11" md="10" class="px-3">
          <img
            class="home-top-banner__item elevation-2"
            :src="banner"
            alt="banner"
          >
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'BannerCarouselV1',
  props: {
    banners: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style scoped>

</style>
