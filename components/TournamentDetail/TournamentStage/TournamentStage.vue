<template>
  <div class="tournament-stage">
    <v-row
      justify="start"
      align="center"
      no-gutters
    >
      <v-col v-if="!hideTabs" cols="12" md="6" class="pb-6">
        <v-tabs
          v-model="tab"
          fixed-tabs
          hide-slider
          class="tournament-stage__tabs tournament-stage__top"
          active-class="tournament-stage__tabs--active"
        >
          <v-tab class="tournament-stage__tabs__title">
            Pertandingan
          </v-tab>
          <v-tab v-if="showStandingTab" class="tournament-stage__tabs__title">
            Standing Table
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row no-gutters class="tournament-stage__content">
      <v-tabs-items v-model="tab" class="tournament-stage__content__item">
        <v-tab-item>
          <tournament-stage-match :is-knockout-stage="isKnockoutStage" />
        </v-tab-item>
        <v-tab-item v-if="showStandingTab">
          <tournament-stage-standing />
        </v-tab-item>
      </v-tabs-items>
    </v-row>
  </div>
</template>

<script>
import TournamentStageMatch
  from '@/components/TournamentDetail/TournamentStage/TournamentStageMatch'
import TournamentStageStanding
  from '@/components/TournamentDetail/TournamentStage/TournamentStageStanding'
import { mapActions, mapGetters } from 'vuex'
import { registrationStatus, tournamentStatus } from '@/config/tournamentStatus'
import { tournamentMatchStages } from '@/config/tournamentStages'

const statusToHideStanding = [
  tournamentStatus.draft,
  tournamentStatus.unPublished,
  tournamentStatus.upComing
]

export default {
  name: 'TournamentStage',
  components: {
    TournamentStageMatch,
    TournamentStageStanding
  },
  props: {
    isKnockoutStage: {
      type: Boolean,
      default: false
    },
    isLeagueStage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tab: 0,
      isEditParticipant: false
    }
  },
  computed: {
    ...mapGetters('tournament', [
      'tournamentDetail'
    ]),
    hideTabs () {
      return this.isKnockoutStage || this.isLeagueStage || this.tournamentDetail.status ===
        tournamentStatus.unPublished
    },
    showParticipantTab () {
      return !this.isKnockoutStage &&
        this.tournamentDetail.status !== tournamentStatus.unPublished &&
        (this.tournamentDetail.registrationStatus === registrationStatus.open ||
        this.tournamentDetail.registrationStatus === registrationStatus.closed)
    },
    showStandingTab () {
      return !this.isKnockoutStage && !this.isLeagueStage &&
        !statusToHideStanding.includes(this.tournamentDetail.status)
    }
  },
  created () {
    this.initData()
  },
  methods: {
    ...mapActions('tournament', [
      'getKnockOutStageMatchList',
      'getGroupStageMatchList',
      'getGroupStageStandingTable',
      'getTournamentParticipantList',
      'getStageParticipantList'
    ]),
    constructStageParticipantListBody (stageType) {
      const params = {
        type: stageType
      }
      const data = {
        params,
        tournamentId: this.$route.params.tournamentId
      }
      return data
    },
    initDataKnockout () {
      this.getKnockOutStageMatchList({
        id: this.$route.params.tournamentId
      })
      this.getStageParticipantList({
        data: this.constructStageParticipantListBody(tournamentMatchStages.knockOutStage)
      })
    },
    initDataLeague () {
      this.getGroupStageMatchList({
        id: this.$route.params.tournamentId
      })
      this.getGroupStageStandingTable({
        id: this.$route.params.tournamentId
      })
      this.getStageParticipantList({
        data: this.constructStageParticipantListBody(tournamentMatchStages.groupStage)
      })
    },
    initTournamentParticipant () {
      this.getTournamentParticipantList({
        id: this.$route.params.tournamentId
      })
    },
    initData () {
      this.initTournamentParticipant()
      if (this.isKnockoutStage) {
        this.initDataKnockout()
      } else {
        this.initDataLeague()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/settings/_variables';

::v-deep .v-tab {
  color: $light-grey-1 !important;
}

.tournament-stage {
  width: 100%;

  &__top {
    margin-top: 6px;
    margin-bottom: 2px;
  }

  &__tabs {
    padding: 2px;
    height: 36px;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      max-width: 100%;
    }

    @media #{map-get($display-breakpoints, 'md-and-up')} {
      max-width: 500px;
    }

    &--active {
      background-color: #ffd7ca;
      color: $orange-4 !important;
    }

    &__title {
      height: 32px;
      font-weight: 600;
      border-radius: 6px;
      line-height: 22px;
      font-size: 14px;
      text-transform: none;
    }
  }

  &__content {
    &__item {
      width: 100%;
    }
  }
}

.participant {
  &__btn {
    &--orange {
      color: white;
      background-color: $orange-4 !important;
    }

    &--grey {
      border: 1px solid $grey-neutral !important;
      color: $grey-3 !important;
      background-color: transparent;
    }

    &--green {
      color: white;
      background-color: $green-1 !important;
    }
  }
}
</style>
