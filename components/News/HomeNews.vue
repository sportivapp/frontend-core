<template>
  <news-headline
    see-all-link="/news"
    :news-list="latestNews"
    :is-loading="isLoading"
  />
</template>

<script>
import NewsHeadline from '@/components/News/NewsHeadline'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'HomeNews',
  components: { NewsHeadline },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('news', [
      'latestNews'
    ])
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
        size: 3,
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

</style>
