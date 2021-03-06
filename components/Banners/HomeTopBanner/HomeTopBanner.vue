<template>
  <section class="home-top-banner">
    <v-row no-gutters justify="center" class="pa-0 ma-0">
      <v-col class="pb-12">
        <banner-carousel-v1
          v-if="$vuetify.breakpoint.smAndDown"
          :banners="bannersToShow"
        />
        <banner-carousel-v2
          v-else
          :banners="bannersToShow"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import BannerCarouselV1 from '@/components/Banners/HomeTopBanner/BannerCarouselV1'
import BannerCarouselV2 from '@/components/Banners/HomeTopBanner/BannerCarouselV2'
import { mapActions, mapGetters } from 'vuex'
import { staticUrl } from '@/config/api'

export default {
  name: 'HomeTopBanner',
  components: {
    BannerCarouselV1,
    BannerCarouselV2
  },
  computed: {
    ...mapGetters([
      'homeBanners'
    ]),
    bannersToShow () {
      return this.homeBanners
        .filter(ban => ban.banner && ban.banner.efilename)
        .map(ban => staticUrl + ban.banner.efilename)
    }
  },
  created () {
    this.getHomeBanners()
  },
  methods: {
    ...mapActions([
      'getHomeBanners'
    ])
  }
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/settings/_variables';

.home-top-banner {
  width: 100%;
  padding-top: 30px;
  background-color: #FF8D5B;

  &__container {
    overflow: hidden;
    margin-bottom: 50px;
    width: 100%;
  }

  &__item {
    border-radius: 20px;
    object-fit: contain;
    width: auto;

    @media #{map-get($display-breakpoints, 'md-and-up')} {
      height: 240px;
    }

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      height: 112px;
    }

    &__wrapper {
      display: flex;
      justify-content: center;
      padding: 0 20px;
    }
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
