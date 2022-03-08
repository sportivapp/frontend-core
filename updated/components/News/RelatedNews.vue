<template>
  <v-row class="related-news" no-gutters>
    <v-col>
      <v-row justify="start" align="center">
        <span class="related-news__title">
          {{ $t('news.relatedNews') }}
        </span>
      </v-row>
      <v-row align="center" class="related-news__list ml-n3" justify="start">
        <v-col
          v-for="n in newsForRelatedNews"
          :key="n.enewsid"
          cols="12"
          sm="6"
          md="4"
          class="px-1 py-0"
        >
          <news-tile :news="n" size="small" class="mx-1" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import NewsTile from '@/components/News/NewsTile'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'RelatedNews',
  components: { NewsTile },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('news', [
      'latestNews'
    ]),
    currentNewsId () {
      return this.$route.params.id
    },
    newsForRelatedNews () {
      const newsOtherThanCurrent = this.latestNews
        .filter(news => news.enewsid + '' !== this.currentNewsId)
      return newsOtherThanCurrent
        .slice(0, this.latestNews.length < 3 ? this.latestNews.length : 3)
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions('news', [
      'getLatestNews'
    ]),
    init () {
      if (this.isLoading) { return }
      this.isLoading = true
      const params = {
        size: 4,
        page: 0
      }
      this.getLatestNews({
        params,
        successCallback: this.finishGetLatestNews,
        errHandler: this.finishGetLatestNews
      })
    },
    finishGetLatestNews () {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.related-news {
  &__title {
    font-size: 23px;
    font-weight: 700;
  }
}
</style>
