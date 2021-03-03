<template>
  <v-row
    class="pt-5 pl-2 pb-12"
    justify="center"
  >
    <v-col cols="4">
      <p class="about-info text-justify">
        {{ $t('aboutUs.aboutInfoLeftParagraph') }}
      </p>
    </v-col>

    <v-col cols="4">
      <p class="about-info text-justify">
        {{ $t('aboutUs.aboutInfoRightParagraph') }}
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.about-info {
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
}
</style>
