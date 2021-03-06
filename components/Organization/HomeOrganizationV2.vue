<template>
  <v-container class="home-organization">
    <v-row justify="center" align="center">
      <v-col>
        <v-row justify="center" align="center">
          <v-col align="center" cols="12" md="8">
            <span class="home-organization__title">
              {{ $t('home.trustedByTitle') }}
            </span>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col align="center" cols="12" md="8">
            <span class="home-organization__sub-title">
              {{ $t('home.trustedBySubTitle') }}
            </span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="home-organization__banner">
      <organization-carousel :org-list="orgList" :item-per-slide="1" />
    </v-row>
  </v-container>
</template>

<script>
const orgList = [
  require('@/assets/images/logos/apssi.png')
]

export default {
  name: 'HomeOrganizationV2',
  data () {
    return {
      orgList
    }
  }
}
</script>

<style lang="scss" scoped>
.home-organization {
  &__title {
    font-size: 28px;
    font-weight: 700;
    line-height: 42px;
    text-align: center;
    color: #FF7041;
  }

  &__sub-title {
    font-size: 14px;
    font-weight: 400;
    line-height: 27px;
    text-align: center;
    color: #303030;
  }
}
</style>
