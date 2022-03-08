<template>
  <nuxt-link
    :class="
      ['news-tile',
       {'news-tile--big' : isSizeBig },
       {'news-tile--medium' : isSizeMedium },
       {'news-tile--small' : isSizeSmall }
      ]"
    :to="newsLink"
    :title="news.enewstitle"
  >
    <v-sheet
      elevation="2"
      :class="[
        'news-tile__sheet',
        {'news-tile__sheet--big':isSizeBig},
        {'news-tile__sheet--medium':isSizeMedium},
        {'news-tile__sheet--small':isSizeSmall}
      ]"
    >
      <v-chip
        :class="[
          'news-tile__category',
          { 'news-tile__category--big': isSizeBig },
          { 'news-tile__category--medium': isSizeMedium },
          { 'news-tile__category--small': isSizeSmall }
        ]"
        color="rgba(235, 235, 235, 0.8)"
        text-color="#525252"
      >
        {{ news.industry.eindustryname }}
      </v-chip>
      <v-row
        :class="[
          'news-tile__main-image pa-0 ma-0',
          {'news-tile__main-image--big': isSizeBig },
          {'news-tile__main-image--medium' : isSizeMedium},
          {'news-tile__main-image--small': isSizeSmall},
          {'news-tile__main-image--empty': !imgUrl}
        ]"
      >
        <img
          v-if="imgUrl"
          :src="imgUrl"
          alt="news-image"
        >
        <img
          v-else
          src="../../assets/images/logos/sportiv-grey.png"
          alt="news-image"
        >
      </v-row>
      <v-row
        justify="center"
        align="center"
        :class="[
          'news-tile__detail ma-0',
          { 'news-tile__detail--big pa-5': isSizeBig },
          { 'news-tile__detail--medium pa-3': isSizeMedium },
          { 'news-tile__detail--small pa-2': isSizeSmall },
        ]"
      >
        <v-col class="pa-0 flex-column justify-space-between">
          <span
            :class="[
              'news-tile__detail__title',
              {'news-tile__detail__title--big' : isSizeBig},
              {'news-tile__detail__title--medium' : isSizeMedium},
              {'news-tile__detail__title--small' : isSizeSmall}
            ]"
            :title="news.enewstitle"
          >
            {{ news.enewstitle }}
          </span>
          <author-summary
            class="'news-tile__detail__author'"
            :date="news.enewsdate"
            :author="news.creator"
            :company="news.company"
            :size="size"
          />
        </v-col>
      </v-row>
    </v-sheet>
  </nuxt-link>
</template>

<script>
import AuthorSummary from '@/components/News/AuthorSummary'
import { staticUrl } from '@/config/api'

const tileSize = {
  big: 'big',
  medium: 'medium',
  small: 'small'
}
export default {
  name: 'NewsTile',
  components: { AuthorSummary },
  props: {
    news: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: tileSize.big
    }
  },
  computed: {
    isSizeBig () {
      return this.size === tileSize.big
    },
    isSizeMedium () {
      return this.size === tileSize.medium
    },
    isSizeSmall () {
      return this.size === tileSize.small
    },
    imgUrl () {
      return this.news.file
        ? staticUrl + this.news.file.efilename
        : null
    },
    newsLink () {
      return `/news/${this.news.enewsid}`
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-chip {
  max-width: none;
}

.news-tile {
  width: 100%;
  height: 100%;
  position: relative;
  text-decoration: none;

  &__category {
    position: absolute;
    top: 15px;
    left: 15px;
    font-weight: 600;
    z-index: 1;

    &--big {
      font-size: 16px;
    }

    &--medium, &--small {
      font-size: 12px;
    }

    &--small {
      height: fit-content;
      top: 10px;
      left: 10px;
    }
  }

  &__sheet {
    width: 100%;
    overflow: hidden;
    border-radius: 16px;
    background-color: white;
    position: relative;

    &--big {
      height: 450px;
    }

    &--medium {
      height: 275px;
    }

    &--small {
      height: 200px;
    }
  }

  &__main-image {
    width: 100%;
    overflow: hidden;

    &--big, &--medium {
      height: 60%;
    }

    &--small {
      height: 50%;
    }

    &--empty {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $white-neutral;

      img {
        object-fit: contain !important;
        max-width: 50%;
        max-height: 50%;
      }
    }

    img {
      border-radius: 16px 16px 0 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &__detail {
    &--big, &--medium {
      height: 40%;
    }

    &--small {
      height: 50%;
    }

    &__title {
      height: 50%;
      color: $black-neutral;
      display: -webkit-box;
      word-break: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;

      &--big {
        font-size: 23px;
        font-weight: 700;
      }

      &--medium {
        font-size: 14px;
        font-weight: 600;
      }

      &--small {
        font-size: 12px;
        font-weight: 600;
      }
    }
  }
}
</style>
