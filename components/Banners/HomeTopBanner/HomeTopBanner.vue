<template>
  <section class="home-top-banner">
    <v-row no-gutters justify="center" class="pa-0 ma-0">
      <v-col cols="12" md="10">
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
              <v-col cols="11" md="10" class="px-3">
                <img
                  class="home-top-banner__item elevation-2"
                  :src="banner"
                  alt="banner"
                >
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: 'HomeTopBanner',
  data () {
    return {
      banners: [
        require('../../../assets/images/banners/banner2.png'),
        require('../../../assets/images/banners/banner3.png'),
        require('../../../assets/images/banners/banner4.png')
      ]
    }
  }
}
</script>

<style lang="scss">

.home-top-banner {
  width: 100%;
  padding-top: 30px;
  background-color: #FF8D5B;

  &__container {
    overflow: hidden;
    margin-bottom: 50px;
    width: 100%;
    height: 100%;
  }

  &__item {
    border-radius: 20px;
    object-fit: contain;
    width: 100%;
    max-width: 100%;
    height: auto;
  }

  .v-carousel__controls__item.v-btn {
    color: $orange-5;
    opacity: 1;
  }

  .v-carousel__controls__item.v-btn.v-btn--active {
    color: white;
  }

  .v-carousel__controls__item.v-btn.v-btn--active:before {
    opacity: 0;
  }

  .v-carousel__controls__item.v-btn:hover:before {
    opacity: 0.5;
  }

  .v-carousel__controls__item .v-icon {
    opacity: 1;
  }

  .v-window {
    &__prev, &__next {
      .v-btn {
        background-color: white;

        &:hover {
          background-color: rgba(255, 255, 255, 0.8);
        }
      }

      i {
        color: #FF7041 !important;
      }
    }
  }
}

</style>
