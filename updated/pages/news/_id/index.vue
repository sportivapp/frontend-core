<template>
  <v-container
    class="news-detail ma-0 justify-start align-start"
    fill-height
    fluid
  >
    <v-row justify="center" align="center" no-gutters>
      <v-col
        v-if="isLoading"
        cols="12"
        md="6"
        class="news-detail__loading pt-10"
      >
        <v-progress-circular
          color="#FF7041"
          indeterminate
          size="50"
        />
      </v-col>
      <v-col v-else cols="11" md="6" class="pt-10 px-0">
        <v-row>
          <v-col class="px-0">
            <span class="news-detail__title">
              {{ newsDetail.enewstitle }}
            </span>
          </v-col>
          <v-col cols="auto" class="pr-0 pt-5">
            <v-btn icon elevation="1" @click="handleClickLike">
              <v-icon v-if="newsDetail.isLiked" color="#FF7041">
                mdi-heart
              </v-icon>
              <v-icon v-else>
                mdi-heart-outline
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="space-between" align="center" class="py-3">
          <v-col class="pa-0">
            <author-summary
              :date="newsDetail.enewsdate"
              :author="newsDetail.creator"
              :company="newsDetail.company"
            />
          </v-col>
          <v-col cols="12" sm="auto" class="news-detail__statistic pa-0">
            <v-row justify="end" align="center" class="ma-0">
              <v-col class="news-detail__statistic__tooltip" cols="auto">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-row
                      v-bind="attrs"
                      justify="center"
                      align="center"
                      v-on="on"
                    >
                      <v-col cols="auto" class="pa-0">
                        <v-icon color="#AAAAAA">
                          mdi-eye
                        </v-icon>
                      </v-col>
                      <v-col cols="auto" class="py-0 pr-0 pl-1">
                        {{ viewCountText }}
                      </v-col>
                    </v-row>
                  </template>
                  <span>
                    {{ $t('news.seen', { count: viewCountText }) }}
                  </span>
                </v-tooltip>
              </v-col>
              <v-divider
                vertical
                class="px-1 my-3"
              />
              <v-col cols="auto" class="py-0 pr-0 pl-2">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-row
                      v-clipboard:copy="shareUrl"
                      v-clipboard:success="successCopy"
                      v-clipboard:error="failCopy"
                      v-bind="attrs"
                      no-gutters
                      justify="center"
                      align="center"
                      v-on="on"
                    >
                      <v-col class="pr-1">
                        <span class="news-detail__share">
                          {{ $t('news.share') }}
                        </span>
                      </v-col>
                      <v-col class="pl-0">
                        <v-sheet class="news-detail__share__icon" elevation="1">
                          <v-icon color="black" small class="pa-1">
                            mdi-link-variant
                          </v-icon>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </template>
                  <span>{{ $t('news.copy') }}</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <news-detail-content />
        <v-divider class="news-detail__divider mx-0 pa-0" />
        <related-news class="news-detail__related-news" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewsDetailContent from '@/components/News/NewsDetailContent'
import RelatedNews from '@/components/News/RelatedNews'
import { mapActions, mapGetters } from 'vuex'
import { viewCountFormat } from '@/utils/count'
import AuthorSummary from '~/components/News/AuthorSummary'

export default {
  name: 'Index',
  components: {
    RelatedNews,
    NewsDetailContent,
    AuthorSummary
  },
  data () {
    return {
      isLoading: false,
      isLoadingLike: false
    }
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ]),
    ...mapGetters('news', [
      'newsDetail',
      'newsDetailViewCount'
    ]),
    newsId () {
      return this.$route.params.id
    },
    shareUrl () {
      return window.location.href
    },
    viewCountText () {
      return viewCountFormat(this.newsDetailViewCount)
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions('news', [
      'getNewsDetail',
      'getNewsDetailViewCount',
      'likeNewsDetail',
      'unLikeNewsDetail'
    ]),
    init () {
      this.isLoading = true
      this.getNewsDetail({
        id: this.newsId,
        successCallback: this.successGetNewsDetail,
        errHandler: this.failGetNewsDetail
      })
    },
    successGetNewsDetail () {
      this.isLoading = false
      this.getNewsViewCount()
    },
    failGetNewsDetail () {
      this.isLoading = false
      this.$router.push('/news')
    },
    getNewsViewCount () {
      this.getNewsDetailViewCount({
        id: this.newsId
      })
    },
    successCopy () {
      this.$swal({
        icon: 'success',
        iconColor: '#0AB281',
        title: this.$t('news.successCopy'),
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      })
    },
    failCopy () {
      this.$swal({
        icon: 'error',
        iconColor: '#FF7041',
        title: this.$t('news.failCopy'),
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      })
    },
    handleClickLike () {
      if (this.isLoadingLike) { return }

      if (!this.isLoggedIn) {
        this.$router.push({
          path: '/login',
          query: { redirect: this.$route.fullPath }
        })
      }

      this.isLoadingLike = true
      if (this.newsDetail.isLiked) {
        this.sendUnLikeNews()
      } else {
        this.sendLikeNews()
      }
    },
    sendLikeNews () {
      this.likeNewsDetail({
        id: this.newsId,
        successCallback: this.finishLikeOrUnlike,
        errHandler: this.finishLikeOrUnlike
      })
    },
    sendUnLikeNews () {
      this.unLikeNewsDetail({
        id: this.newsId,
        successCallback: this.finishLikeOrUnlike,
        errHandler: this.finishLikeOrUnlike
      })
    },
    finishLikeOrUnlike () {
      this.isLoadingLike = false
    }
  },
  head () {
    return {
      title: this.newsDetail.enewstitle || this.$t('common.news')
    }
  }
}
</script>

<style lang="scss" scoped>
.news-detail {
  background-color: $grey-10;

  &__loading {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__share {
    white-space: nowrap;
    word-break: keep-all;
    flex-wrap: nowrap;
    color: $grey-3;
    font-size: 12px;

    &__icon {
      background-color: $light-grey-2;
      border-radius: 36px;
    }
  }

  &__title {
    font-size: 33px;
    font-weight: 700;
    word-break: break-word;
  }

  &__statistic {
    height: 30px;

    &__tooltip {
      color: $grey-neutral;
    }
  }

  &__divider {
    margin-top: 60px;
    margin-bottom: 30px;
  }

  &__related-news {
    margin-bottom: 130px;
  }
}

::v-deep .swal2-container {
  color: white;
}
</style>
