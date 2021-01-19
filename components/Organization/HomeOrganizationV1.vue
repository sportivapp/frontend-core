<template>
  <v-container class="organization-headline ma-0 pa-0">
    <v-row align="center" justify="space-around">
      <v-col align="start" class="py-0" cols="12" md="12">
        <h4 class="organization-headline_title">
          {{ $t('organization.organizationPartner') }}
        </h4>
      </v-col>
    </v-row>
    <v-row
      align="center"
      class="organization-headline__content"
      justify="center"
    >
      <v-col
        class="organization-headline"
        cols="12"
        md="6"
      >
        <img
          class="organization-logo"
          src="../../assets/images/logos/apssi.png"
        >
      </v-col>
      <v-col
        class="organization-text"
        cols="12"
        md="6"
      >
        <v-row no-gutters>
          <span class="organization-text-title">
            {{ $t('organization.organizationTitle') }}
          </span>
        </v-row>
        <v-row no-gutters>
          <label class="organization-text-body">
            {{ $t('organization.organizationBody') }}
          </label>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

</script>

<style lang="scss" scoped>

.organization-headline_title {
  font-size: 33px;
  font-weight: bold;
}

.organization-text-title {
  color: $orange-4;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 40px;
}

.organization-text-title:link {
  text-decoration: none;
}

.organization-text-body {
  color: $grey-12;
  font-size: 18px;
}

.organization-logo {
  width: 316px;
  height: 267px;
  object-fit: contain;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-top: 10%;
}
</style>
