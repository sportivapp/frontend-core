<template>
  <v-card
    class="icon"
    max-width="400px"
    flat
  >
    <img
      :src="img"
      :alt="alt"
    >

    <v-card-title class="pa-0 icon__title">
      {{ title }}
    </v-card-title>

    <v-card-subtitle class="pa-0 icon__subtitle">
      {{ subtitle }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title'
    },
    subtitle: {
      type: String,
      default: 'subtitle'
    },
    img: {
      type: String,
      default: require('@/assets/images/bg/visi.png')
    },
    alt: {
      type: String,
      default: 'alt'
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  margin: 100px 30px 40px 40px;

  &__title {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    padding: 15px 0 !important;
  }

  &__subtitle {
    color: $black-neutral;
    font-weight: 700;
    font-size: 17px;
    line-height: 28.8px;
  }
}
</style>
