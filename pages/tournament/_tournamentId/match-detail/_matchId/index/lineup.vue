<template>
  <v-card class="px-9 pt-7">
    <v-dialog v-model="showMemberStatistic" content-class="statistic-container" max-width="656px">
      <div>
        <MemberStatisticCard
          :member="memberData"
          @closeCard="handleCloseMemberStatistic"
        />
      </div>
    </v-dialog>
    <v-row class="px-10">
      <v-col>
        <v-row justify="start">
          <v-avatar size="40">
            <img :src="homeLogo" alt="">
          </v-avatar>
        </v-row>
      </v-col>
      <v-col class="text-center" align-self="center">
        <span class="spv-heading--4">Lineup</span>
      </v-col>
      <v-col>
        <v-row justify="end">
          <v-avatar size="40">
            <img :src="awayLogo" alt="">
          </v-avatar>
        </v-row>
      </v-col>
    </v-row>
    <v-container>
      <v-row class="border-top">
        <v-col class="border-right" cols="6">
          <lineup-table
            title="Pemain Inti"
            :arr-data="matchHomeTeamLineup.core"
            :is-position-right="false"
            :enable-show-statistic="true"
            @clickStatistic="handleShowMemberStatistic"
          />
        </v-col>
        <v-col cols="6">
          <lineup-table
            title="Pemain Inti"
            :arr-data="matchAwayTeamLineup.core"
            :is-position-right="true"
            :enable-show-statistic="true"
            @clickStatistic="handleShowMemberStatistic"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="border-right" cols="6">
          <lineup-table
            title="Pemain Cadangan"
            :arr-data="matchHomeTeamLineup.sub"
            :is-position-right="false"
            :enable-show-statistic="true"
            @clickStatistic="handleShowMemberStatistic"
          />
        </v-col>
        <v-col cols="6">
          <lineup-table
            title="Pemain Cadangan"
            :arr-data="matchAwayTeamLineup.sub"
            :is-position-right="true"
            :enable-show-statistic="true"
            @clickStatistic="handleShowMemberStatistic"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="border-right" cols="6">
          <lineup-table
            title="Pelatih"
            :arr-data="matchHomeTeamLineup.official && matchHomeTeamLineup.official.filter((member)=> member.type === 'COACH')"
            :is-position-right="false"
            :enable-show-statistic="true"
            single
            @clickStatistic="handleShowMemberStatistic"
          />
        </v-col>
        <v-col cols="6">
          <lineup-table
            title="Pelatih"
            :arr-data="matchAwayTeamLineup.official && matchAwayTeamLineup.official.filter((member)=> member.type === 'COACH')"
            :is-position-right="true"
            :enable-show-statistic="true"
            single
            @clickStatistic="handleShowMemberStatistic"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="border-right" cols="6">
          <lineup-table
            title="Manajer"
            :arr-data="matchHomeTeamLineup.official && matchHomeTeamLineup.official.filter((member)=> member.type === 'MANAGER')"
            :is-position-right="false"
            :enable-show-statistic="true"
            single
            @clickStatistic="handleShowMemberStatistic"
          />
        </v-col>
        <v-col cols="6">
          <lineup-table
            title="Manajer"
            :arr-data="matchAwayTeamLineup.official && matchAwayTeamLineup.official.filter((member)=> member.type === 'MANAGER')"
            :is-position-right="true"
            :enable-show-statistic="true"
            single
            @clickStatistic="handleShowMemberStatistic"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import LineupTable from '@/components/MatchInfo/LineupTable.vue'
import MemberStatisticCard from '@/components/MatchInfo/MemberStatisticCard.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Lineup',
  components: {
    LineupTable,
    MemberStatisticCard
  },
  data: () => ({
    showMemberStatistic: false,
    memberData: {}
  }),
  computed: {
    ...mapGetters('match', ['matchHomeTeamLineup', 'matchAwayTeamLineup', 'memberStatistic', 'matchInfo']),
    homeLogo () {
      return this.matchInfo.homeTeam && this.matchInfo.homeTeam.logo.name ? '/src' + this.matchInfo.homeTeam.logo.name : require('@/assets/images/logos/sportiv-logo-small.png')
    },
    awayLogo () {
      return this.matchInfo.awayTeam && this.matchInfo.awayTeam.logo.name ? '/src' + this.matchInfo.awayTeam.logo.name : require('@/assets/images/logos/sportiv-logo-small.png')
    }
  },
  watch: {
    memberStatistic: {
      handler (value) {
        this.mapMemberStatistic(value)
      }
    }
  },
  methods: {
    ...mapActions('match', ['getStatisticByMatchParticipantMemberId']),
    async handleShowMemberStatistic (member) {
      const params = {
        tournamentId: member.tournamentId,
        matchId: '69765b95-fc7a-435a-8c3b-0bffbe7929cf',
        teamId: member.teamId,
        matchMemberId: member.matchMemberId
      }
      this.memberData = {
        name: member.name,
        backNumber: member.backNumber,
        position: member.position
      }
      await this.getStatisticByMatchParticipantMemberId({ params })
      this.showMemberStatistic = true
    },
    handleCloseMemberStatistic () {
      this.showMemberStatistic = false
    },
    mapMemberStatistic (memberStatistic) {
      this.memberData = {
        ...this.memberData,
        statisticData: [
          {
            title: 'FIELD GOALS',
            score: memberStatistic.fieldGoalsMade
          },
          {
            title: 'STEALS',
            score: memberStatistic.steals
          },
          {
            title: '2 POINTS',
            score: memberStatistic.twoPointsMade
          },
          {
            title: 'BLOCKS',
            score: memberStatistic.blocks
          },
          {
            title: '3 POINTS',
            score: memberStatistic.threePointsMade
          },
          {
            title: 'TURNOVERS',
            score: memberStatistic.turnovers
          },
          {
            title: 'FREE THROWS',
            score: memberStatistic.freeThrowsMade
          },
          {
            title: 'FOULS',
            score: memberStatistic.foulsOn
          },
          {
            title: 'REBOUND',
            score: memberStatistic.totalRebounds
          },
          {
            title: 'ASSITS',
            score: memberStatistic.assists
          }
        ]

      }
    }
  }
}
</script>

<style lang="scss" scoped>
.border-right{
  border-right: 1px solid #D5D5D5;
}
.border-top{
  border-top: 1px solid #D5D5D5;
}
::v-deep .statistic-container{
  border-radius: 16px;
}
</style>
