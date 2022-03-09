<template>
  <v-container class="news-bottom-list pa-0">
    <v-row no-gutters>
      <v-col class="pa-0">
        <span class="news-bottom-list__title">
          {{ $t('news.otherNews') }}
        </span>
      </v-col>
      <v-col>
        <!--        <v-select></v-select>-->
        <!--        <v-select></v-select>-->
      </v-col>
    </v-row>
    <news-list :news-list="newsList" />
    <show-more-button v-if="showLoadMore" @click="handleClick" />
  </v-container>
</template>

<script>
import NewsList from '@/components/News/NewsList'
import ShowMoreButton from '@/components/inputs/ShowMoreButton'

export default {
  name: 'NewsPageBottomList',
  components: {
    ShowMoreButton,
    NewsList
  },
  props: {
    newsList: {
      type: Array,
      default: () => ([])
    },
    showLoadMore: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      this.$emit('clickShowMore')
    }
  }
}
</script>

<style lang="scss" scoped>
.news-bottom-list{
  width: 100%;
  height: 100%;

  &__title {
    font-weight: 700;
    font-size: 23px;
  }
}
</style>
