<template>
  <v-row justify="center" align="center">
    <v-col cols="auto">
      <v-row justify="center" align="center">
        <img
          class="under-construction__img"
          src="../../assets/images/bg/under-construction.png"
          alt="under-construction"
        >
      </v-row>
      <v-row class="under-construction__title" justify="center" align="center">
        {{ $t('common.underConsTitle') }}
      </v-row>
      <v-row justify="center" align="center">
        <span class="under-construction__msg">
          {{ $t('common.underConsMessage') }}
        </span>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'UnderConstruction'
}
</script>

<style lang="scss" scoped>
.under-construction {
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
