<template>
  <v-card class="textInfoHeader" flat>
    <v-card-title class="textInfoHeader__title">
      {{ $t(title) }}
    </v-card-title>

    <h1 class="pl-3 textInfoHeader__headings">
      {{ $t(headings) }}
    </h1>

    <v-card-subtitle class="textInfoHeader__subtitle">
      {{ $t(subtitle) }}
    </v-card-subtitle>

    <img
      class="textInfoHeader__rectangle"
      src="../../assets/images/icons/rectangle.png"
      alt="rectangle"
    >
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default () {
        return this.$t('aboutUs.title')
      }
    },
    headings: {
      type: String,
      default () {
        return this.$t('aboutUs.headings')
      }
    },
    subtitle: {
      type: String,
      default () {
        return this.$t('aboutUs.subtitle')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.textInfoHeader {
  background-color: transparent;
  max-width: 380px;
  padding-bottom: 0;

  &__title {
    font-size: 20px;
    font-weight: 600;
  }

  &__headings {
    font-size: 46px;
    color: $orange-4;
    line-height: 60.95px;
  }

  &__subtitle {
    font-size: 14px;
    line-height: 210%;
    color: $black-neutral;
  }

  &__rectangle {
    padding-left: 18px;
  }
}
</style>
