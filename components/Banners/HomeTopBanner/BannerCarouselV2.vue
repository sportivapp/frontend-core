<template>
  <VueSlickCarousel v-if="banners.length > 0" v-bind="slickOptions">
    <div
      v-for="(banner, index) in banners"
      :key="index"
      class="home-top-banner__item__wrapper"
    >
      <img
        class="home-top-banner__item"
        :src="banner"
        alt="banner"
      >
    </div>
  </VueSlickCarousel>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'BannerCarouselV2',
  components: {
    VueSlickCarousel
  },
  props: {
    banners: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    slickOptions () {
      return {
        arrows: false,
        dots: true,
        infinite: true,
        centerMode: true,
        slidesToScroll: 1,
        variableWidth: true,
        centerPadding: '0px',
        touchMove: this.$vuetify.breakpoint.smAndDown,
        autoplay: true,
        autoplaySpeed: 4000
      }
    }
  }
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/settings/_variables';
.slick-dots li.slick-active button:before {
  font-size: 8px;
  opacity: 1;
  color: white;
}

.slick-dots li button:before {
  font-size: 8px;
  opacity: 0.65;
  color: white;
}

.slick-arrow {
  z-index: 2;
  width: 36px !important;
  height: 36px !important;
}

.slick-prev:before, .slick-next:before {
  width: 36px;
  height: 36px;
  font-size: 36px;
  opacity: 1;
}

.slick-next {
  margin-right: 100px;
}

.slick-prev {
  margin-left: 100px;
}
</style>
