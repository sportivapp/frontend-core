<template>
  <v-container class="feature" fluid>
    <h1 class="feature__title text-center">
      {{ $t('aboutUs.featureTitle') }}
    </h1>

    <h3 class="feature__subtitle pb-5 text-center">
      {{ $t('aboutUs.featureSubtitle') }}
    </h3>

    <v-row justify="center">
      <left-icon-card
        v-for="(icon, index) in $t('aboutUs.cardList')"
        :key="index"
        :img="icon.img"
        :alt="icon.alt"
        :title="icon.title"
        :subtitle="icon.subtitle"
      />
    </v-row>

    <span>
      <h1 class="feature__text">
        {{ $t('aboutUs.featureText') }}
      </h1>
    </span>
  </v-container>
</template>

<script>
import LeftIconCard from '../Card/LeftIconCard.vue'
export default {
  components: {
    LeftIconCard
  }
}
</script>

<style lang="scss" scoped>
.feature {
  padding: 60px 10%;
  background-color: $orange-4;

  &__title {
    color: white;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
  }

  &__subtitle {
    color: white;
    font-size: 26px;
  }

  &__text {
    position: absolute;
    left: 948px;
    top: 990px;
    z-index: 1;

    font-weight: 700;
    font-size: 200px;
    line-height: 300px;
    color: #FFF4F0;
    opacity: 0.4;
  }
}
@media only screen and (max-width: 769px) {
  .feature {
    &__text {
      display: none;
    }
  }
}
</style>
