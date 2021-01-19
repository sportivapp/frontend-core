<template>
  <v-container class="feature" fluid>
    <h1 class="feature__title">
      {{ $t('aboutUs.featureTitle') }}
    </h1>

    <h3 class="feature__subtitle pb-5">
      {{ $t('aboutUs.featureSubtitle') }}
    </h3>

    <v-row>
      <left-icon-card
        v-for="icon in $t('aboutUs.cardList')"
        :key="icon.id"
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
  padding: 60px 14% 80px 18%;
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
</style>
