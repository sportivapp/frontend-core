<template>
  <div>
    <v-card
      v-if="$vuetify.breakpoint.mdAndUp"
      class="rounded-lg justify-left float-right legal-tabs legal-tabs--card"
      width="298"
    >
      <v-card-title>Legal</v-card-title>
      <v-tabs
        vertical
        height="auto"
        left
        :value="value"
      >
        <v-tab
          link
          to="/legal/term-of-services"
          class="legal-tabs__item"
        >
          Ketentuan Pengguna
        </v-tab>
        <v-tab
          link
          to="/legal/privacy-policy"
          class="legal-tabs__item"
        >
          Kebijakan Privasi
        </v-tab>
        <!-- <v-tab
          @click="$router.push('/legal/lisence&agreement')"
        >
          End User Lisence & Agreement
        </v-tab> -->
      </v-tabs>
    </v-card>
    <v-app-bar
      v-else
      class="legal-tabs legal-tabs--app-bar"
      app
      hide-on-scroll
      absolute
      color="white"
    >
      <v-tabs
        grow
        class="mx-0"
        :show-arrows="false"
      >
        <v-tab
          class="mx-0 legal-tabs__item"
          @click="$router.push('/legal/term-of-services')"
        >
          Ketentuan Pengguna
        </v-tab>
        <v-tab
          class="legal-tabs__item"
          @click="$router.push('/legal/privacy-policy')"
        >
          Kebijakan Privasi
        </v-tab>
        <!-- <v-tab
          @click="$router.push('/legal/lisence&agreement')"
        >
          End User Lisence & Agreement
        </v-tab> -->
      </v-tabs>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'LegalTabs'
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/settings/_variables';

.legal-tabs {
  &--card {
    padding-bottom: 40px;
  }

  &--app-bar {
    margin-top: 56px;

    ::v-deep .v-toolbar__content {
      padding: 4px 0;
    }
  }

  ::v-deep .v-tab {
    text-transform: none !important;

    @media #{map-get($display-breakpoints, 'md-and-up')} {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
</style>
