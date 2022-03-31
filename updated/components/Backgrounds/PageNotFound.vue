<template>
  <v-row justify="center" align="center">
    <v-col cols="auto">
      <v-row justify="center" align="center">
        <img
          class="not-found__img"
          src="../../assets/images/bg/404.png"
          alt="404"
        >
      </v-row>
      <v-row class="not-found__title" justify="center" align="center">
        {{ $t('common.pageNotFound') }}
      </v-row>
      <v-row justify="center" align="center">
        <span class="not-found__msg">
          {{ $t('common.typeAgain') }}
        </span>
        &nbsp;
        <nuxt-link to="/" class="not-found__link">
          {{ $t('common.homePage') }}
        </nuxt-link>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>

<style lang="scss" scoped>
.not-found {
  &__img {
    width: 100%;
    height: auto;
    max-height: 250px;
    object-fit: contain;
  }

  &__title {
    margin-top: 36px;
    font-weight: 700;
    font-size: 23px;
    color: $black-neutral;
  }

  &__msg {
    font-size: 16px;
    color: $grey-3;
  }

  &__link {
    text-decoration: none;
    font-size: 16px;
    color: $green-2;
  }
}
</style>
