<template>
  <div>
    <v-row class="about-bg" justify="center">
      <v-col cols="5">
        <text-info-header />
      </v-col>

      <v-col cols="3">
        <img
          class="about-bg__sportiv-activ"
          src="../../assets/images/bg/sportiv_activ2.png"
          alt="sportiv-activ2"
        >
      </v-col>
    </v-row>

    <about-info />
  </div>
</template>

<script>
import TextInfoHeader from '../Card/TextInfoHeader'
import AboutInfo from './AboutInfo'

export default {
  components: {
    TextInfoHeader,
    AboutInfo
  }
}
</script>

<style lang="scss" scoped>
.about-bg {
  background-color: white;
  padding: 45px 0 0 0;

  img {
    // position: absolute;
    object-fit: cover;
    max-width: 100%;
  }

  &__sportiv-activ2 {
    transform: scaleX(-1);
    bottom: 0;
    width: 450px;
    height: auto;
  }
}
</style>
