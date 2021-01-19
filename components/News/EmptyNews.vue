<template>
  <v-container class="empty-news ma-0 pa-0">
    <v-row no-gutters class="empty-news__image" justify="center" align="center">
      <img src="../../assets/images/empty/empty-news.png" alt="">
    </v-row>
    <v-row no-gutters class="empty-news__title pt-9" justify="center" align="center">
      {{ $t('news.emptyTitle') }}
    </v-row>
    <v-row
      no-gutters
      class="empty-news__sub-title"
      justify="center"
      align="center"
    >
      {{ $t('news.emptySubTitle') }}
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'EmptyNews'
}
</script>

<style lang="scss" scoped>
.empty-news {
  &__image {
    img {
      height: 300px;
      width: 300px;
      object-fit: contain;
    }
  }

  &__title {
    font-size: 23px;
    font-weight: 700;
    color: $black-neutral;
  }

  &__sub-title {
    font-size: 16px;
    color: $grey-neutral;
  }

}
</style>
