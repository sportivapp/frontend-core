<template>
  <v-container class="ma-0 pa-0 tournament-detail" fluid>
    <v-row align-content="center" justify="center" align="center" class="tournament-detail__header" no-gutters>
      <v-col align-items="center" class="tournament-detail__header__content">
        <simple-breadcrumb :items="breadcrumbs" />
        <tournament-detail-header />
        <v-tabs
          v-model="tab"
          class="tournament-detail__header__tabs"
          color="#FF7041"
          grow
        >
          <v-tabs-slider color="#FF7041" />
          <v-tab>
            DETAIL TURNAMEN
          </v-tab>
          <template v-if="isSingleStage && !isUpComing">
            <v-tab>
              PERTANDINGAN
            </v-tab>
          </template>
          <template v-if="isMultiStage && !isUpComing">
            <v-tab>
              GROUP STAGE
            </v-tab>
            <v-tab>
              FINAL STAGE
            </v-tab>
          </template>
          <template v-if="isTypeLeague && !isUpComing">
            <v-tab>
              STANDING TABLE
            </v-tab>
          </template>
          <v-tab>
            PESERTA
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row align-content="center" justify="center" align="center" no-gutters>
      <v-col align-items="center" class="tournament-detail__body">
        <v-tabs-items
          v-model="tab"
        >
          <v-tab-item>
            <tournament-detail-info />
          </v-tab-item>
          <template v-if="isSingleStage && !isUpComing">
            <v-tab-item>
              <tournament-stage v-if="isTypeLeague" is-league-stage />
              <tournament-stage v-if="isTypeKnockout" is-knockout-stage />
            </v-tab-item>
          </template>
          <template v-if="isMultiStage && !isUpComing">
            <v-tab-item>
              <tournament-stage />
            </v-tab-item>
            <v-tab-item>
              <tournament-stage is-knockout-stage />
            </v-tab-item>
          </template>
          <template v-if="isTypeLeague && !isUpComing">
            <v-tab-item>
              <tournament-stage-standing />
            </v-tab-item>
          </template>
          <v-tab-item>
            <tournament-all-participant v-if="isSingleStage || isUpComing" />
            <tournament-stage-participant v-if="isMultiStage && !isUpComing" />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
    <v-row align-content="center" justify="center" align="center" no-gutters>
      <v-col align-items="center" class="tournament-detail__footer">
        <v-divider />
        <other-tournaments class="pt-10" />
      </v-col>
    </v-row>
    <home-footer />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { tournamentStatus } from '@/config/tournamentStatus'
import { tournamentFormat, tournamentType } from '@/config/tournamentStages'
import TournamentDetailHeader from '@/components/TournamentDetail/TournamentDetailHeader'
import TournamentDetailInfo from '@/components/TournamentDetail/TournamentDetailInfo'
import TournamentAllParticipant
  from '@/components/TournamentDetail/TournamentParticipant/TournamentAllParticipant'
import TournamentStage from '@/components/TournamentDetail/TournamentStage/TournamentStage.vue'
import TournamentStageStanding
  from '@/components/TournamentDetail/TournamentStage/TournamentStageStanding.vue'
import TournamentStageParticipant
  from '@/components/TournamentDetail/TournamentStage/TournamentStageParticipant.vue'
import OtherTournaments from '@/components/TournamentDetail/OtherTournaments.vue'
import HomeFooter from '@/components/Footer/HomeFooter'
import SimpleBreadcrumb from '../../../components/Breadcrumb/SimpleBreadcrumb.vue'

export default {
  name: 'TournamentDetail',
  components: {
    SimpleBreadcrumb,
    TournamentDetailHeader,
    TournamentDetailInfo,
    TournamentAllParticipant,
    TournamentStage,
    TournamentStageStanding,
    TournamentStageParticipant,
    OtherTournaments,
    HomeFooter
  },
  data () {
    return {
      tab: null
    }
  },
  computed: {
    ...mapGetters('tournament', [
      'tournamentDetail'
    ]),
    breadcrumbs () {
      return [
        {
          text: 'Semua Daftar',
          disabled: false,
          to: '/tournament/'
        },
        {
          text: this.tournamentDetail.name || '',
          disabled: false,
          to: '/tournament/' + this.$route.params.tournamentId
        }
      ]
    },
    isUpComing () {
      return this.tournamentDetail.status === tournamentStatus.upComing
    },
    tournamentStage () {
      return this.tournamentDetail.stage || {}
    },
    isSingleStage () {
      return this.tournamentStage.tournamentType === tournamentType.singleStage
    },
    isMultiStage () {
      return this.tournamentStage.tournamentType === tournamentType.multiStage
    },
    isTypeLeague () {
      return this.tournamentStage.tournamentFormat === tournamentFormat.league
    },
    isTypeKnockout () {
      return this.tournamentStage.tournamentFormat === tournamentFormat.knockOut
    },
    isRegistrationOpen () {
      return this.tournamentDetail.registrationStatus && this.tournamentDetail.registrationStatus === 'OPEN'
    }
  },
  created () {
    this.initPage()
    this.initTournamentParticipant()
  },
  methods: {
    ...mapActions('tournament', [
      'getTournamentDetail',
      'getTournamentParticipantList'
    ]),
    initPage () {
      this.getTournamentDetail({
        id: this.$route.params.tournamentId
      })
    },
    initTournamentParticipant () {
      this.getTournamentParticipantList({
        id: this.$route.params.tournamentId
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .theme--light.v-tabs-items {
  background-color: transparent !important;
}

.tournament-detail {
  background-color: $grey-10;

  &__header {
    background-color: #ffffff;

    &__content {
      max-width: 80%;
    }

    &__tabs {
      padding-top: 14px;
    }
  }

  &__body {
    max-width: 80%;
    margin-bottom: 50px;
    padding-top: 20px;
  }

  &__footer {
    max-width: 80%;
  }
}
</style>
