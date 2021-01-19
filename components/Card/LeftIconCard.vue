<template>
  <v-card class="icon" max-width="430px" max-height="120px">
    <v-row dense justify="center">
      <v-col cols="3">
        <img
          class="icon__img"
          :src="img"
          :alt="alt"
        >
      </v-col>

      <v-col cols="9">
        <v-card-title class="pb-1 icon__title">
          {{ title }}
        </v-card-title>
        <v-card-text class="icon__subtitle">
          {{ subtitle }}
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'card title'
    },
    subtitle: {
      type: String,
      default: 'card subtitle'
    },
    img: {
      type: String,
      default: require('@/assets/images/icons/turnamen.png')
    },
    alt: {
      type: String,
      default: 'card alt text'
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  border-radius: 16px;
  margin: 14px;

  &__img {
    padding: 16px 22px;
  }

  &__title {
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
  }

  &__subtitle {
    font-size: 12px;
    line-height: 210%;
  }
}
</style>
