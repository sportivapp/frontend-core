<template>
  <v-container
    class="legal pa-0 ma-0 justify-start align-start"
    fill-height
    fluid
  >
    <v-row justify="center" align="start" class="legal__wrapper">
      <v-col align="center" cols="12" md="4" class="legal__tabs">
        <legal-tabs />
      </v-col>
      <v-col align="center" cols="12" md="6" class="legal__content">
        <nuxt-child />
      </v-col>
    </v-row>
    <home-footer />
  </v-container>
</template>

<script>
import HomeFooter from '@/components/Footer/HomeFooter'

export default {
  name: 'LegalPage',
  components: {
    HomeFooter
  },
  data: () => ({
    selectOption: 0
  }),
  // computed: {
  //   selectedOption: {
  //     set () {
  //       this.changeSelectedTab(this.$route.path)
  //     },
  //     get () {
  //       return this.selectOption
  //     }
  //   }
  // },
  mounted () {
    this.changeSelectedTab(this.$route.path)
  },
  methods: {
    changeSelectedTab (path) {
      if (path === '/legal/term-of-services') {
        this.selectOption = 0
      } else if (path === '/legal/privacy-policy') {
        this.selectOption = 1
      }
      // else if (this.$route.path === '/legal/lisence&agreement') {
      //   this.selectOption = 2
      // }
      // return this.selectOption
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~vuetify/src/styles/settings/_variables';

$app-bar-height: 56px;

.legal{
  background-color: $grey-10;
  color: $black-neutral;
  overflow-x: hidden;
  @media #{map-get($display-breakpoints, 'md-and-up')} {
    padding-top: 20px;
  }

  &__wrapper {
    margin: 40px 20px;
    @media #{map-get($display-breakpoints, 'md-and-down')} {
      margin: (20px + $app-bar-height) 20px;
    }
  }

  &__content {
    padding: 0;
    @media #{map-get($display-breakpoints, 'md-and-up')} {
      padding: 0 0 0 40px;
    }
  }

  &__tabs {
    padding: 0;
  }
}
</style>
