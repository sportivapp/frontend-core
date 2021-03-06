<template>
  <v-container class="tournament-list pa-0">
    <v-row
      no-gutters
      align="center"
      class="tournament-list__item mx-n2"
      justify="start"
    >
      <v-col
        v-for="t in tournamentList"
        :key="t.id"
        class="py-3 px-2 ma-0"
        cols="12"
        md="4"
        sm="6"
      >
        <tournament-tile size="medium" :tournament="t" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TournamentTile from '@/components/Tournament/TournamentTile'

export default {
  name: 'TournamentList',
  components: { TournamentTile },
  props: {
    tournamentList: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
