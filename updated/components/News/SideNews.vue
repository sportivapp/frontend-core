<template>
  <v-row class="side-news" justify="start" align="center">
    <span class="side-news__title">
      {{ $t('news.otherNews') }}
    </span>
    <v-list>
      <long-news-tile v-for="n in 5" :key="n" />
    </v-list>
  </v-row>
</template>

<script>
import LongNewsTile from '@/components/News/LongNewsTile'

export default {
  name: 'SideNews',
  components: { LongNewsTile },
  props: {
    news: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss">
.side-news {
  padding-left: 60px;
  padding-right: 30px;

  &__title {
    color: $black-neutral;
    font-size: 20px;
    font-weight: 600;
  }

  .v-list {
    background-color: transparent !important;
  }
}
</style>
