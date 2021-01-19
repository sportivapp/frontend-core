<template>
  <v-container class="news-headline ma-0 pa-0">
    <v-row align="center" justify="space-around">
      <v-col align="start" class="py-0" cols="12" md="5">
        <h4 class="news-headline__title">
          {{ $t('news.recentNews') }}
        </h4>
      </v-col>
      <v-spacer />
      <v-col
        v-if="hasSeeAllLink"
        :align="isSmallDevice ? 'start' : 'end'"
        cols="12"
        md="5"
        class="py-0"
      >
        <see-all-button link="/news" />
      </v-col>
    </v-row>
    <!--    <news-category-filter-->
    <!--      v-model="selectedCategoryIndex"-->
    <!--      :categories="categories"-->
    <!--    />-->
    <v-row class="news-headline__content" justify="center" align="center">
      <v-col
        v-if="isLoading"
        cols="12"
        md="12"
        class="news-headline__loading"
      >
        <v-progress-circular
          color="#FF7041"
          indeterminate
          size="50"
        />
      </v-col>
      <v-col v-else-if="hasNoNews" cols="12" md="12" class="pt-0 px-3">
        <empty-news />
      </v-col>
      <v-col v-else cols="12" md="12" class="pb-0 pt-9 px-3">
        <news-carousel :news-list="newsList" />
      </v-col>
      <!--      <v-col cols="12" md="5" class="pt-0">-->
      <!--        <side-news class="pt-3" :news="newsForSideNews" />-->
      <!--      </v-col>-->
    </v-row>
  </v-container>
</template>

<script>
import SeeAllButton from '@/components/Navigation/SeeAllButton/SeeAllButton'
// import NewsCategoryFilter from '@/components/News/NewsCategoryFilter'
import NewsCarousel from '@/components/News/NewsCarousel'
import EmptyNews from '@/components/News/EmptyNews'
// import SideNews from '@/components/News/SideNews'

export default {
  name: 'NewsHeadline',
  components: {
    EmptyNews,
    // SideNews,
    NewsCarousel,
    // NewsCategoryFilter,
    SeeAllButton
  },
  props: {
    seeAllLink: {
      type: String,
      default: ''
    },
    newsList: {
      type: Array,
      default: () => ([])
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isSmallDevice () {
      return this.$vuetify.breakpoint.name === 'xs'
    },
    hasSeeAllLink () {
      return this.seeAllLink
    },
    hasNoNews () {
      return this.newsList.length <= 0
    }
  }
}
</script>

<style lang="scss" scoped>
.news-headline {
  width: 100%;

  &__loading {
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__title {
    font-size: 33px;
  }
}
</style>
