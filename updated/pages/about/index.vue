<template>
  <v-container
    class="pa-0 ma-0"
    fill-height
    fluid
  >
    <about-bg />

    <v-row justify="center">
      <feature />
    </v-row>

    <v-row class="z-index" justify="center">
      <visi-misi
        v-for="visimisi in $t('aboutUs.visiMisiList')"
        :key="visimisi.id"
        :img="visimisi.img"
        :alt="visimisi.alt"
        :title="visimisi.title"
        :subtitle="visimisi.subtitle"
      />
    </v-row>
    <home-footer />
  </v-container>
</template>

<script>
import AboutBg from '../../components/About/AboutBg'
import Feature from '../../components/About/Feature'
import VisiMisi from '../../components/About/VisiMisi'

export default {
  name: 'About',
  components: {
    AboutBg,
    Feature,
    VisiMisi
  },
  head () {
    return {
      title: this.$t('common.about')
    }
  }
}
</script>

<style scoped>
.z-index {
  z-index: 2;
  background-color: white;
}
</style>
