<template>
  <nuxt-link :to="link" class="long-news-tile">
    <v-row
      class="long-news-tile__row pa-0 my-3 mx-0"
      justify="start"
      align="center"
    >
      <v-col class="pa-0" cols="auto">
        <img
          class="long-news-tile__image"
          src="https://gtimg.tokyo2020.org/image/private/t_article-image-desktop/production/byaigvjg4eju6mxwmiyn"
        >
      </v-col>
      <v-col class="py-0 pr-0 pl-3">
        <span class="long-news-tile__title">Lorem ipsum dolor sit amet,
          consectetur adipisicing
          elit. Facere
          iure laborum laudantium molestiae perferendis voluptatem voluptates. Aspernatur at deleniti eos incidunt ipsum minima placeat possimus quasi quos, ratione temporibus voluptates.</span>
        <span class="long-news-tile__timestamp">Kamis, 15 Oktober 2020</span>
      </v-col>
    </v-row>
  </nuxt-link>
</template>

<script>
export default {
  name: 'LongNewsTile',
  props: {
    link: {
      type: String,
      default: '#'
    }
  }
}
</script>

<style lang="scss" scoped>
.long-news-tile {
  width: 100%;
  height: 70px;
  background-color: transparent;
  text-decoration: none;

  &__image {
    border-radius: 8px;
    width: 60px;
    height: 60px;
    object-fit: cover;
  }

  &__title {
    font-size: 14px;
    font-weight: 600;
    color: $black-neutral;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__timestamp {
    font-size: 13px;
    color: $grey-neutral;
  }
}
</style>
