<template>
  <v-container class="tournament-bottom-list pa-0">
    <tournament-list :tournament-list="tournamentList" />
  </v-container>
</template>

<script>
import TournamentList from '@/components/Tournament/TournamentList'

export default {
  name: 'TournamentPageBottomList',
  components: {
    TournamentList
  },
  props: {
    tournamentList: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>
.tournament-bottom-list{
  width: 100%;
  height: 100%;

  &__title {
    font-weight: 700;
    font-size: 23px;
  }
}
</style>
