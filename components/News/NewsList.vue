<template>
  <v-container class="news-list pa-0">
    <v-row
      no-gutters
      align="center"
      class="news-list__item mx-n2"
      justify="start"
    >
      <v-col
        v-for="n in newsList"
        :key="n.enewsid"
        class="py-3 px-2 ma-0"
        cols="12"
        md="4"
        sm="6"
      >
        <news-tile size="medium" :news="n" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewsTile from '@/components/News/NewsTile'

export default {
  name: 'NewsList',
  components: { NewsTile },
  props: {
    newsList: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
