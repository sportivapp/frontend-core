<template>
  <v-card class="px-9 pt-7 pb-5">
    <v-row class="px-10">
      <v-col>
        <v-row justify="start">
          <v-avatar size="40">
            <img :src="homeLogo" alt="">
          </v-avatar>
        </v-row>
      </v-col>
      <v-col class="text-center" align-self="center">
        <span class="spv-heading--4">Statistik Pertandingan</span>
      </v-col>
      <v-col>
        <v-row justify="end">
          <v-avatar size="40">
            <img :src="awayLogo" alt="">
          </v-avatar>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-for="statistic in statisticData" :key="statistic.title" class="px-13">
      <v-col align-self="center">
        <v-row justify="start">
          <span class="spv-body--1">{{ statistic.homeScore }}</span>
        </v-row>
      </v-col>
      <v-col class="text-center" align-self="center">
        <span class="spv-body--2">{{ statistic.title }}</span>
        <v-progress-linear v-model="statistic.progress" class="progress-bar" height="8" />
      </v-col>
      <v-col align-self="center">
        <v-row justify="end">
          <span class="spv-body--1">{{ statistic.awayScore }}</span>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Statistic',
  data: () => ({
    progress: 50,
    statisticData: []
  }),
  computed: {
    ...mapGetters('match', ['matchStatistic', 'matchInfo']),
    homeLogo () {
      return this.matchInfo.homeTeam && this.matchInfo.homeTeam.logo.name ? '/src' + this.matchInfo.homeTeam.logo.name : require('@/assets/images/logos/sportiv-logo-small.png')
    },
    awayLogo () {
      return this.matchInfo.awayTeam && this.matchInfo.awayTeam.logo.name ? '/src' + this.matchInfo.awayTeam.logo.name : require('@/assets/images/logos/sportiv-logo-small.png')
    }
  },
  async mounted () {
    const params = {
      tournamentId: this.$route.params.tournamentId,
      matchId: this.$route.params.matchId
    }
    await this.getMatchSummaryStatistic({ params, succesCallback: this.succesCallback })
  },
  methods: {
    ...mapActions('match', ['getMatchSummaryStatistic']),
    succesCallback (data) {
      if (data) {
        this.mapDataStatistic(data)
      }
    },
    countProgress (totalScore = 0, firstTeamScore = 0) {
      return firstTeamScore / totalScore * 100
    },
    mapDataStatistic (data) {
      this.statisticData = [{
        title: 'FIELD GOALS',
        homeScore: data.firstStatistic.fieldGoalsMade,
        awayScore: data.secondStatistic.fieldGoalsMade,
        progress: this.countProgress(data.firstStatistic.fieldGoalsMade + data.secondStatistic.fieldGoalsMade, data.firstStatistic.fieldGoalsMade)
      }, {
        title: 'TWO POINTS',
        homeScore: data.firstStatistic.twoPointsMade,
        awayScore: data.secondStatistic.twoPointsMade,
        progress: this.countProgress(data.firstStatistic.fieldGoalsMade + data.secondStatistic.twoPointsMade, data.firstStatistic.twoPointsMade)

      }, {
        title: 'THREE POINTS',
        homeScore: data.firstStatistic.threePointsMade,
        awayScore: data.secondStatistic.threePointsMade,
        progress: this.countProgress(data.firstStatistic.threePointsMade + data.secondStatistic.threePointsMade, data.firstStatistic.threePointsMade)

      }, {
        title: 'FREE THROWS',
        homeScore: data.firstStatistic.freeThrowsMade,
        awayScore: data.secondStatistic.freeThrowsMade,
        progress: this.countProgress(data.firstStatistic.freeThrowsMade + data.secondStatistic.freeThrowsMade, data.firstStatistic.freeThrowsMade)

      }, {
        title: 'REBOUND',
        homeScore: data.firstStatistic.offensiveRebounds,
        awayScore: data.secondStatistic.offensiveRebounds,
        progress: this.countProgress(data.firstStatistic.offensiveRebounds + data.secondStatistic.offensiveRebounds, data.firstStatistic.offensiveRebounds)

      }, {
        title: 'ASSIST',
        homeScore: data.firstStatistic.assists,
        awayScore: data.secondStatistic.assists,
        progress: this.countProgress(data.firstStatistic.assists + data.secondStatistic.assists, data.firstStatistic.assists)

      }, {
        title: 'STEALS',
        homeScore: data.firstStatistic.steals,
        awayScore: data.secondStatistic.steals,
        progress: this.countProgress(data.firstStatistic.steals + data.secondStatistic.steals, data.firstStatistic.steals)

      }, {
        title: 'BLOCKS',
        homeScore: data.firstStatistic.blocks,
        awayScore: data.secondStatistic.blocks,
        progress: this.countProgress(data.firstStatistic.blocks + data.secondStatistic.blocks, data.firstStatistic.blocks)

      }, {
        title: 'TURN OVERS',
        homeScore: data.firstStatistic.turnovers,
        awayScore: data.secondStatistic.turnovers,
        progress: this.countProgress(data.firstStatistic.turnovers + data.secondStatistic.turnovers, data.firstStatistic.turnovers)

      }, {
        title: 'FOULS',
        homeScore: data.firstStatistic.foulsOn,
        awayScore: data.secondStatistic.foulsOn,
        progress: this.countProgress(data.firstStatistic.foulsOn + data.secondStatistic.foulsOn, data.firstStatistic.foulsOn)

      }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-bar{
  width:300px;
  border-radius: 10px;

}
</style>
