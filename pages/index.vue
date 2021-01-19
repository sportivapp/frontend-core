<template>
  <v-container
    class="home pa-0 ma-0 justify-start align-start"
    fill-height
    fluid
  >
    <home-top-banner />
    <v-row no-gutters justify="center" align="center">
      <v-col class="home__news" cols="11" md="8">
        <home-news />
      </v-col>
    </v-row>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="11" md="8">
        <home-organization />
      </v-col>
    </v-row>
    <home-footer />
  </v-container>
</template>

<script>
import HomeNews from '@/components/News/HomeNews'
import HomeOrganization from '@/components/Organization/HomeOrganizationV2'
import HomeFooter from '@/components/Footer/HomeFooter'
import HomeTopBanner from '~/components/Banners/HomeTopBanner/HomeTopBanner'

export default {
  name: 'Index',
  components: {
    HomeFooter,
    HomeNews,
    HomeTopBanner,
    HomeOrganization
  },
  head () {
    return {
      title: 'Sports at your fingertips'
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  overflow-x: hidden;
  background-color: $grey-10;

  &__news {
    margin-top: 80px;
    margin-bottom: 100px;
  }
}
</style>
