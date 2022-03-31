<template>
  <v-container
    class="legal pa-0 ma-0 justify-start align-start"
    fluid
  >
    <v-row
      justify="center"
      align="start"
      class="legal__wrapper"
    >
      <v-col align="center" cols="12" md="3" class="legal__tabs">
        <div id="legal-tab" class="sticky-menu">
          <legal-tabs />
        </div>
      </v-col>
      <v-col align="center" cols="12" md="7" class="legal__content">
        <nuxt-child id="content" />
      </v-col>
    </v-row>
    <home-footer />
  </v-container>
</template>

<script>
// import HomeFooter from '@/components/Footer/HomeFooter'

export default {
  name: 'LegalPage',
  components: {
    // HomeFooter
  },
  data: () => ({
    selectOption: 0,
    scrollPosition: 0
  }),
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleWindowResize)
    this.changeSelectedTab(this.$route.path)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleWindowResize)
  },
  methods: {
    changeSelectedTab (path) {
      if (path === '/legal/term-of-services') {
        this.selectOption = 0
      } else if (path === '/legal/privacy-policy') {
        this.selectOption = 1
      }
    },
    handleScroll (value) {
      if (this.$vuetify.breakpoint.mdAndUp) {
        if (document.getElementById('content').scrollHeight - 200 < document.documentElement.scrollTop) {
          document.getElementById('legal-tab').style = 'position:absolute;z-index:1;bottom:1100px;'
        } else if (document.getElementById('content').scrollHeight - 200 >= document.documentElement.scrollTop) {
          document.getElementById('legal-tab').style = 'position:fixed'
        }
      } else {
        document.getElementById('legal-tab').style = 'position:initial'
      }
    },
    handleWindowResize () {
      if (!this.$vuetify.breakpoint.mdAndUp) {
        document.getElementById('legal-tab').style = 'position:initial'
      }
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
  overflow: auto;
  height: 100%;
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

.sticky-menu{
    position:initial;
  @media #{map-get($display-breakpoints, 'md-and-up')} {
    position: fixed;
    margin-left: 60px;
  }
}

</style>
