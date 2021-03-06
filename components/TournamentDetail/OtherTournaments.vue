<template>
  <v-container>
    <v-row no-gutters class="spv-subtitle--1 px-2 pb-2">
      Turnamen Lainnya
      <v-spacer />
      <div
        class="other-tournaments__see-all"
        @click="handleClickSeeAll"
      >
        Lihat Semua
      </div>
    </v-row>
    <v-row
      no-gutters
      align="center"
      justify="start"
    >
      <v-col
        v-for="(tournament, index) in tournamentListToShow"
        :key="index"
        class="py-3 px-2 ma-0"
        cols="12"
        md="4"
        sm="6"
      >
        <tournament-tile size="medium" :tournament="tournament" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TournamentTile from '@/components/Tournament/TournamentTile'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'OtherTournaments',
  components: { TournamentTile },
  computed: {
    ...mapGetters('tournament', [
      'tournamentList'
    ]),
    tournamentListToShow () {
      const listToShow = this.tournamentList.filter(tournament => tournament.id !== this.$route.params.tournamentId)
      return listToShow.slice(0, 3)
    }
  },
  created () {
    this.initComponent()
  },
  methods: {
    ...mapActions('tournament', [
      'getTournamentList'
    ]),
    constructParams () {
      return {
        page: 1,
        size: 5
      }
    },
    initComponent (init = true) {
      this.getTournamentList({
        init,
        params: this.constructParams()
      })
    },
    handleClickSeeAll () {
      this.$router.push('/tournament')
    }
  }
}
</script>

<style lang="scss" scoped>
.other-tournaments {
  &__see-all {
    color: #0AB281;
    cursor: pointer;
  }

}
</style>
