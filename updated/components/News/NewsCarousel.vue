<template>
  <v-carousel
    :hide-delimiters="!showControls"
    :show-arrows="showControls"
    class="news-carousel"
    height="auto"
    hide-delimiter-background
    :show-arrows-on-hover="!isSmallDevice"
  >
    <v-carousel-item
      v-for="news in newsList"
      :key="news.enewsid"
      class="pa-0"
    >
      <v-row
        class="news-carousel__item justify-center align-start pt-1 pb-12 px-4"
      >
        <large-news-tile
          class="hidden-sm-and-down"
          :news="news"
        />
        <news-tile
          class="hidden-md-and-up"
          size="medium"
          :news="news"
        />
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import LargeNewsTile from '@/components/News/LargeNewsTile'
import NewsTile from '@/components/News/NewsTile'

export default {
  name: 'NewsCarousel',
  components: {
    NewsTile,
    LargeNewsTile
  },
  props: {
    newsList: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    showControls () {
      return this.newsList.length > 1
    },
    isSmallDevice () {
      return this.$vuetify.breakpoint.name === 'xs'
    }
  }
}
</script>

<style lang="scss">
.news-carousel {
  &__item {
    overflow: hidden;
    border-radius: 16px;
  }

  .v-carousel__controls__item.v-btn {
    color: $light-grey-1;
    opacity: 1;
    &:hover {
      &:before {
        opacity: 0.5 !important;
      }
    }
  }
  .v-carousel__controls__item.v-btn.v-btn--active {
    color: $orange-4;
    &:before {
      opacity: 0;
    }
  }
  .v-carousel__controls__item {
    .v-icon {
      opacity: 1;
    }
  }

  .v-window {
    &__prev, &__next {
      border: none;
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0px rgba(0, 0, 0, 0.14), 0 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
      .v-btn {
        background-color: white;
        color: #FF7041;
      }
    }

  }
}

</style>
