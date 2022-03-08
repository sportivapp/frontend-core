<template>
  <v-row class="news-content" no-gutters>
    <v-col>
      <v-row>
        <img
          v-if="hasImage"
          alt="news-image"
          class="news-content__image"
          :src="newsImageUrl"
        >
        <v-divider v-else />
      </v-row>
      <v-row class="news-content__content pt-6">
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="news-content__content__text tiptap"
          v-html="newsDetail.enewscontent || ''"
        />
        <!--eslint-enable-->
      </v-row>
      <v-row>
        <v-col>
          <v-row class="pb-4">
            <span class="news-content__category__title">
              {{ $t('common.category') }}
            </span>
          </v-row>
          <v-row>
            <v-chip
              class="news-content__category"
              color="rgba(235, 235, 235, 0.8)"
              text-color="#525252"
            >
              {{ newsDetail.industry.eindustryname }}
            </v-chip>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { staticUrl } from '@/config/api'

export default {
  name: 'NewsDetailContent',
  computed: {
    ...mapGetters('news', [
      'newsDetail'
    ]),
    hasImage () {
      return this.newsDetail.file
    },
    newsImageUrl () {
      return staticUrl + this.newsDetail.file.efilename
    }
  }
}
</script>

<style lang="scss" scoped>
.news-content {
  &__image {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  &__image-source {
    font-size: 14px;
    color: $grey-3;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__content {
    max-width: 100%;
    white-space: pre-line;
    font-size: 16px;
    word-break: break-word;
    color: $black-neutral;

    &__text {
      width: 100%;
    }
  }

  &__category {
    font-size: 16px;

    &__title {
      font-size: 14px;
      font-weight: 600;
    }
  }
}
</style>

<style lang="scss">
@import "../../assets/vendors/tiptap.scss";
</style>
