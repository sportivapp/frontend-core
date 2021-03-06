<template>
  <v-hover v-slot="{ hover }">
    <v-sheet
      class="match-tile"
      max-width="344"
    >
      <v-container class="match-tile__container">
        <v-row class="match-tile__top" no-gutters>
          <v-container class="py-0">
            <v-row class="match-tile__participant">
              <match-tile-participant-row
                :winning-team="isWinningTeam(match.homeTeam)"
                :participant-logo="homeTeamLogo"
                :participant-name="homeTeamName"
                :participant-score="match.homeScore"
                :match-status="match.status"
              />
              <match-tile-participant-row
                position-bottom
                :winning-team="isWinningTeam(match.awayTeam)"
                :participant-logo="awayTeamLogo"
                :participant-name="awayTeamName"
                :participant-score="match.awayScore"
                :match-status="match.status"
              />
            </v-row>
            <v-row class="match-tile__info">
              <v-col class="pa-0">
                <v-row
                  no-gutters
                  class="match-tile__date"
                  justify="start"
                  align="center"
                >
                  <v-col cols="auto">
                    <v-icon
                      class="match-tile__info__icon"
                      size="12"
                    >
                      mdi-calendar-range
                    </v-icon>
                  </v-col>
                  <v-col class="match-tile__info__text__container">
                    <span v-if="match.startDate" class="match-tile__info__text spv-caption--1">
                      {{ matchDateText }}
                    </span>
                    <span v-else class="match-tile__info__text spv-caption--1">
                      Belum ditentukan
                    </span>
                  </v-col>
                </v-row>
                <v-row
                  no-gutters
                  class="match-tile__location"
                  justify="start"
                  align="center"
                >
                  <v-col cols="auto">
                    <v-icon
                      class="match-tile__info__icon"
                      size="12"
                    >
                      mdi-map-marker
                    </v-icon>
                  </v-col>
                  <v-col class="match-tile__info__text__container">
                    <span v-if="match.tournamentLocation" class="match-tile__info__text spv-caption--1">
                      {{ matchLocationText }}
                    </span>
                    <span v-else class="match-tile__info__text spv-caption--1">
                      Belum ditentukan
                    </span>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <v-fade-transition>
            <v-overlay
              v-if="hover"
              class="match-tile__overlay"
              z-index="4"
              absolute
              color="white"
              opacity="0.9"
            >
              <v-container
                class="match-tile__overlay__content"
                fluid
                fill-height
              >
                <v-row v-if="showMatchDetailButton">
                  <v-btn
                    class="match-tile__btn match-tile__btn--detail"
                    outlined
                    @click="handleClickMatchDetail"
                  >
                    Detail Pertandingan
                  </v-btn>
                </v-row>
              </v-container>
            </v-overlay>
          </v-fade-transition>
        </v-row>
        <v-row
          v-if="statusIsDone"
          no-gutters
          class="match-tile__status match-tile__status match-tile__status--finished"
          justify="center"
          align="center"
        >
          <v-col
            class="pa-0 match-tile__status__text"
            cols="auto"
          >
            Selesai
          </v-col>
        </v-row>
        <v-row
          v-else-if="statusIsOnProgress"
          no-gutters
          class="match-tile__status match-tile__status match-tile__status--ongoing"
          justify="center"
          align="center"
        >
          <v-col
            class="pa-0 match-tile__status__text"
            cols="auto"
          >
            Sedang Berlangsung
          </v-col>
        </v-row>
        <v-row
          v-else-if="statusIsDelay"
          no-gutters
          class="match-tile__status match-tile__status match-tile__status--delayed"
          justify="center"
          align="center"
        >
          <v-col
            class="pa-0 match-tile__status__text"
            cols="auto"
          >
            Ditunda
          </v-col>
        </v-row>
        <v-row
          v-else
          no-gutters
          class="match-tile__status match-tile__status"
          justify="center"
          align="center"
        >
          <v-col
            class="pa-0 match-tile__status__text"
            cols="auto"
          >
            Belum Dimulai
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-hover>
</template>

<script>
import moment from 'moment'
import {
  matchStatus,
  registrationStatus,
  tournamentStatus
} from '@/config/tournamentStatus'
import { mapActions, mapGetters } from 'vuex'
import MatchTileParticipantRow
  from '~/components/TournamentDetail/MatchTileParticipantRow'

export default {
  name: 'MatchTile',
  components: { MatchTileParticipantRow },
  props: {
    knockoutStage: {
      type: Boolean,
      default: false
    },
    match: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('tournament', [
      'tournamentDetail',
      'groupStageParticipantList',
      'knockoutStageParticipantList'
    ]),
    showMatchDetailButton () {
      return this.tournamentDetail.status !== tournamentStatus.unPublished &&
        (this.tournamentDetail.status !== tournamentStatus.upComing &&
          this.tournamentDetail.registrationStatus === registrationStatus.closed)
    },
    matchStatus () {
      return this.match.status || ''
    },
    statusIsDone () {
      return this.matchStatus === matchStatus.done
    },
    statusIsUpComing () {
      return this.matchStatus === matchStatus.upComing
    },
    statusIsOnProgress () {
      return this.matchStatus === matchStatus.onProgress
    },
    statusIsDelay () {
      return this.matchStatus === matchStatus.delay
    },
    matchLocation () {
      return this.match.tournamentLocation || {}
    },
    matchLocationText () {
      const address = this.matchLocation.address || ''
      const city = this.matchLocation.city ? this.matchLocation.city.name : ''
      const state = this.matchLocation.state ? this.matchLocation.state.name : ''
      const country = this.matchLocation.country ? this.matchLocation.country.name
        : ''

      return `${address}, ${city}, ${state}, ${country}`
    },
    matchDateText () {
      return moment(new Date(this.match.startDate)).format('DD MMMM YYYY HH:mm')
    },
    matchSchedule () {
      const defaultDate = this.match.startDate ? new
      Date(this.match.startDate) : new Date()
      return {
        matchDate: defaultDate.toISOString(),
        matchTime: moment(defaultDate).format('HH:mm'),
        locationId: this.match.tournamentLocationId
      }
    },
    homeTeamName () {
      return this.homeTeam ? this.homeTeam.name : ''
    },
    awayTeamName () {
      return this.awayTeam ? this.awayTeam.name : ''
    },
    homeTeamLogo () {
      return this.homeTeam && this.homeTeam.logo ? this.homeTeam.logo.name : ''
    },
    awayTeamLogo () {
      return this.awayTeam && this.awayTeam.logo ? this.awayTeam.logo.name : ''
    },
    homeTeam () {
      return this.getTeam(this.match.home_entry_id)
    },
    awayTeam () {
      return this.getTeam(this.match.away_entry_id)
    },
    currentStageParticipant () {
      return this.knockoutStage
        ? this.knockoutStageParticipantList
        : this.groupStageParticipantList
    }
  },
  methods: {
    ...mapActions('tournament', [
      'getGroupStageMatchList',
      'getKnockOutStageMatchList'
    ]),
    isWinningTeam (team) {
      const teamId = team ? team.id : ''
      if (!this.match.winningTeamId) {
        return false
      }
      return this.match.winningTeamId === teamId
    },
    handleClickMatchDetail () {
      this.$router.push(`/tournament/${this.$route.params.tournamentId}/match-detail/${this.match.id}/statistic`)
    },
    getParticipant (entryId) {
      return this.currentStageParticipant.find(participant =>
        participant.entryNumber === entryId)
    },
    getTeam (entryId) {
      const participant = this.getParticipant(entryId)
      return participant && participant.team
    }
  }
}
</script>

<style lang="scss" scoped>
.match-tile {
  width: 100%;
  position: relative;
  border-radius: 8px;
  border: 1px solid $light-grey-1;

  &__container {
    padding: 0
  }

  &__top {
    width: 100%;
    position: relative;
  }

  &__participant {
    // margin-top: 12px;
    // TODO remove when Vuetify patch is released
    margin-top: 12px !important;
    padding-left: 8px;
    padding-right: 8px;
  }

  &__info {
    padding: 8px;

    &__icon {
      color: $grey-3;
    }

    &__text {
      padding-left: 8px;
      color: $grey-3;

      word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;

      &__container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }

  &__btn {
    width: 100%;
    font-size: 12px;
    font-weight: 600;
    border-radius: 8px;

    &--detail {
      border: 1px solid $orange-4;
      color: $orange-4;
      margin-bottom: 8px;
    }
  }

  &__status {
    width: 100%;
    overflow: hidden;
    border-radius: 0 0 8px 8px;
    height: 24px;
    font-size: 12px;
    font-weight: 600;
    color: $grey-neutral;

    background-color: $white-neutral;

    &--finished {
      background-color: #DCF1EB;
      color: $green-2;
    }

    &--ongoing {
      background-color: #FFF3D3;
      color: #F4B718;
    }

    &--delayed {
      background-color: #FFE5E5;
      color: #FF3333;
    }

    &__text {
      word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  &__overlay {
    overflow: hidden;
    border-radius: 8px;

    &__content {
      padding: 0 40px
    }
  }
}
</style>
