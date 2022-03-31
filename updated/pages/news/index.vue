<template>
  <v-container
    class="news-page px-0 pt-0 mx-0 justify-start align-start"
    fill-height
    fluid
  >
    <v-row justify="center" align="center" no-gutters>
      <v-col cols="11" md="8" class="pt-10">
        <news-headline
          :is-loading="isLoading"
          :news-list="newsForHeadline"
        />
        <news-page-bottom-list
          v-if="newsForSideNews.length > 0"
          :show-load-more="showLoadMore"
          :news-list="newsForSideNews"
          @clickShowMore="handleClickShowMore"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewsHeadline from '@/components/News/NewsHeadline'
import { mapActions, mapGetters } from 'vuex'

const carouselItemsMax = 3
const itemsPerCall = 9

export default {
  name: 'Index',
  components: {
    NewsHeadline
  },
  data () {
    return {
      currentPage: 0,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('news', [
      'latestNews',
      'latestNewsPaging'
    ]),
    latestNewsCount () {
      return this.latestNews.length
    },
    newsForHeadline () {
      if (this.latestNewsCount <= 0) { return [] }

      return this.latestNewsCount < carouselItemsMax
        ? this.latestNews.slice(0, this.latestNewsCount)
        : this.latestNews.slice(0, carouselItemsMax)
    },
    newsForSideNews () {
      return this.latestNewsCount > carouselItemsMax
        ? this.latestNews.slice(carouselItemsMax, this.latestNewsCount)
        : []
    },
    showLoadMore () {
      const totalPage = this.latestNewsPaging.totalPage

      if (!totalPage) { return false }
      return this.currentPage < (totalPage - 1)
    },
    hasNoNews () {
      return !this.isLoading && this.latestNews.length <= 0
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions('news', [
      'getLatestNews',
      'loadMoreNews'
    ]),
    init () {
      this.getNewsList()
    },
    getNewsList (page = 0) {
      if (this.isLoading) { return }
      this.isLoading = true
      const params = {
        size: itemsPerCall,
        page
      }
      this.getLatestNews({
        params,
        successCallback: this.successGetNews,
        errHandler: this.failGetNews
      })
    },
    loadMoreNewsList () {
      if (this.isLoading) { return }
      this.isLoading = true
      const params = {
        size: itemsPerCall,
        page: this.currentPage + 1
      }
      this.loadMoreNews({
        params,
        successCallback: this.successGetNews,
        errHandler: this.failGetNews
      })
    },
    successGetNews (response) {
      this.isLoading = false
      this.currentPage = response.data.paging.page
    },
    failGetNews (response) {
      this.isLoading = false
    },
    handleClickShowMore () {
      this.loadMoreNewsList()
    }
  },
  head () {
    return {
      title: this.$t('common.news')
    }
  }
}
</script>

<style lang="scss" scoped>

::v-deep .v-input__slot{
  box-shadow: none;
}

.news-page {
  background-color: $grey-10;
  padding-bottom: 120px;

  &__input {
    border-radius: 8px;
    background-color: white;
  }

  &__search {
    color: white;
    border-radius: 8px;
  }
}
</style>
