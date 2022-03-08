<template>
  <v-menu
    bottom
    offset-y
    open-on-hover
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        class="app-bar__menu"
        elevation="0"
        text
        v-on="on"
      >
        {{ $t('common.tournament') }}
        <v-icon right>
          mdi-chevron-down
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        Lihat semua Organisasi
      </v-list-item>
      <v-list-item>
        Masuk organisasi
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'TournamentMenu'
}
</script>

<style lang="scss" scoped>

</style>
