<template>
  <v-carousel
    hide-delimiters
    :show-arrows="showControls"
    class="organization-carousel"
    height="auto"
    hide-delimiter-background
    :show-arrows-on-hover="!isSmallDevice"
  >
    <v-carousel-item
      v-for="(org, index) in orgListToShow"
      :key="index"
      eager
      class="pa-0"
    >
      <div
        class="organization-carousel__item justify-center align-start"
      >
        <v-row>
          <template
            v-for="(banner, index2) in org"
          >
            <v-col :key="index2">
              <v-img
                class="organization-carousel__item__image"
                height="150"
                width="auto"
                contain
                :src="banner"
                alt="org"
              />
            </v-col>
            <v-col v-if="index < org.length-1" :key="index2" cols="auto">
              <v-divider />
            </v-col>
          </template>
        </v-row>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { sliceToChunks } from '@/utils/array'

export default {
  name: 'OrganizationCarousel',
  props: {
    orgList: {
      type: Array,
      default: () => ([])
    },
    itemPerSlide: {
      type: Number,
      default: 2
    }
  },
  computed: {
    showControls () {
      return this.orgListToShow.length > 1
    },
    isSmallDevice () {
      return this.$vuetify.breakpoint.name === 'xs'
    },
    orgListToShow () {
      return sliceToChunks(this.orgList, 2)
    }
  }
}
</script>

<style lang="scss">
.organization-carousel {
  &__item {
    width: 100%;
    overflow: hidden;
    background-color: white;
    border-radius: 8px;

    &__image {
      margin: 52px 0;
    }
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
