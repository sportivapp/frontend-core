<template>
  <v-container class="empty-news">
    <v-row no-gutters class="empty-news__image" justify="center" align="center">
      <img :src="emptyImage" alt="">
    </v-row>
    <v-row no-gutters class="empty-news__title pt-9" justify="center" align="center">
      {{ title }}
    </v-row>
    <v-row
      no-gutters
      class="empty-news__sub-title"
      justify="center"
      align="center"
    >
      {{ subTitle }}
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'EmptyTemplate',
  props: {
    emptyImage: {
      type: String,
      default: require('../../assets/images/empty/empty-news.png')
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  }
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
