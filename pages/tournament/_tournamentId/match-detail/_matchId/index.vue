<template>
  <div>
    <div class="match-card mx-auto my-2">
      <simple-breadcrumb :items="breadcrumbs" />
      <match-info-card />
    </div>

    <div class="tab-container">
      <v-tabs grow class="tab-content mx-auto">
        <v-tab nuxt link :to="`/tournament/${$route.params.tournamentId}/match-detail/${$route.params.matchId}/statistic`">
          STATISTIK
        </v-tab>
        <v-tab nuxt link :to="`/tournament/${$route.params.tournamentId}/match-detail/${$route.params.matchId}/lineup`">
          LINEUP
        </v-tab>
      </v-tabs>
    </div>
    <div class="body-container">
      <div class="child-container mx-auto pt-5">
        <nuxt-child keep-alive />
      </div>
      <home-footer />
    </div>
  </div>
</template>

<script>
import HomeFooter from '@/components/Footer/HomeFooter'
import MatchInfoCard from '@/components/MatchInfo/MatchInfoCard'
import { mapGetters, mapActions } from 'vuex'
import SimpleBreadcrumb from '@/components/Breadcrumb/SimpleBreadcrumb.vue'

export default {
  name: 'MatchDetail',
  scrollToTop: true,
  components: {
    HomeFooter,
    MatchInfoCard,
    SimpleBreadcrumb
  },
  computed: {
    ...mapGetters('match', [
      'matchInfo',
      'matchHomeTeamLineup'
    ]),
    breadcrumbs () {
      return [
        {
          text: 'Semua Daftar',
          disabled: false,
          to: '/'
        },
        {
          text: (this.matchInfo.tournament && this.matchInfo.tournament.name) || '',
          disabled: false,
          to: '/tournament/' + this.$route.params.tournamentId
        },
        {
          text: 'Pertandingan: ' + (this.matchInfo.homeTeam && this.matchInfo.homeTeam.name) + ' vs ' + (this.matchInfo.awayTeam && this.matchInfo.awayTeam.name) || '',
          disabled: false,
          to: this.$route.path
        }
      ]
    }
  },
  async mounted () {
    const params = {
      tournamentId: this.$route.params.tournamentId,
      matchId: this.$route.params.matchId
    }
    await this.getMatchInfo({ params, succesCallback: this.succesCallback })
  },
  methods: {
    ...mapActions('match', [
      'getMatchInfo',
      'getMatchTeamLineup'
    ]),
    ...mapActions(['getProvinces']),
    async succesCallback (res) {
      const params = {
        countryId: res.tournamentLocation.countryId,
        size: 9999
      }
      await this.getProvinces({ params })
      const paramsLineup = {
        tournamentId: this.$route.params.tournamentId,
        matchId: this.$route.params.matchId,
        teamId: res.homeTeam.id,
        type: 'HOME'
      }
      this.getMatchTeamLineup({ params: paramsLineup, succesCallback: this.fetchAwayLineup(res.awayTeam.id) })
    },
    async fetchAwayLineup (awayTeamId) {
      const paramsLineup = {
        tournamentId: this.$route.params.tournamentId,
        matchId: this.$route.params.matchId,
        teamId: awayTeamId,
        type: 'AWAY'
      }
      await this.getMatchTeamLineup({ params: paramsLineup })
    }
  }

}
</script>

<style lang="scss" scoped>
.body-container{
  width: 100%;
  height: 100%;
  background-color: #F7F8F9;
}

.match-card{
  max-width: 1040px;
  height: 230px;
}

.tab-container{
  width: 100%;
  top: 58px;
  position: sticky;
  z-index: 1;
  background-color: white;
}

.tab-content{
  max-width: 1040px;
}

.child-container{
  max-width: 1040px;
}

</style>
