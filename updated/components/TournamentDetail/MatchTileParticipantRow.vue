<template>
  <v-container
    :class="[
      'match-participant-row',
      { 'match-participant-row--top': !positionBottom },
      { 'match-participant-row--bottom': positionBottom }
    ]"
  >
    <v-row align="center">
      <v-col class="match-participant-row__logo__container" cols="2">
        <img
          v-if="imageUrl "
          :src="imageUrl"
          width="24"
          height="24"
        >
        <img
          v-else
          src="@/assets/images/logos/sportiv-logo-small.png"
          width="24"
          height="24"
        >
      </v-col>
      <v-col
        cols="8"
        :class="[
          'match-participant-row__name__container',
          { 'match-participant-row__name__container--black':
            showBlackBackground }
        ]"
        align="start"
      >
        <span
          :class="[
            'spv-subtitle--3',
            'ml-1',
            { 'match-participant-row__name__container--grey':
              !winningTeam & matchStatus == 'DONE' },
          ]"
        >
          {{ participantName }}
        </span>
      </v-col>
      <v-col
        cols="2"
        :class="[
          'match-participant-row__score__container',
          { 'match-participant-row__score__container--black':
            showBlackBackground },
          { 'match-participant-row__score__container--orange':
            winningTeam },
        ]"
      >
        <span
          v-if="participantScore"
          :class="[
            'spv-subtitle--3',
            { 'match-participant-row__score__container--grey':
              !winningTeam & matchStatus == 'DONE' },
          ]"
        >
          {{ participantScore }}
        </span>
        <span v-else class="match-participant-row__score spv-subtitle--3">
          -
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { registrationStatus, tournamentStatus } from '@/config/tournamentStatus'
import { staticUrl } from '@/config/api'

export default {
  name: 'MatchTileParticipantRow',
  props: {
    participantLogo: {
      type: String,
      default: ''
    },
    participantName: {
      type: String,
      default: ''
    },
    participantScore: {
      type: Number,
      default: null
    },
    positionBottom: {
      type: Boolean,
      default: false
    },
    winningTeam: {
      type: Boolean,
      default: false
    },
    matchStatus: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters('tournament', [
      'tournamentDetail'
    ]),
    showBlackBackground () {
      return this.tournamentDetail.status === tournamentStatus.upComing &&
        this.tournamentDetail.registrationStatus === registrationStatus.closed
    },
    imageUrl () {
      return this.participantLogo ? staticUrl + this.participantLogo : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.match-participant-row {
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;

  &--top {
    border-style: solid solid none solid;
    border-width: 1px;
    border-color: $light-grey-1;
    border-radius: 4px 4px 0 0 ;
  }

  &--bottom {
    border-style: solid solid solid solid;
    border-width: 1px;
    border-color: $light-grey-1;
    border-radius: 0 0 4px 4px;
  }

  &__name {
    margin-left: 8px;
    color: $black-neutral;

    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;

    &__container {
      padding: 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      &--black {
        background-color: black;
      }

      &--grey {
        color: $grey-neutral;
      }
    }
  }

  &__score {
    color: $black-neutral;

    &__container {
      text-align: center;
      padding: 5px;
      background-color: $white-neutral;

      &--black {
        background-color: black;
      }

      &--orange {
        background-color: $orange-4;
        color: $white-2;
      }

      &--grey {
        color: $grey-neutral;
      }
    }
  }

  &__logo {
    &__container{
      padding: 5px 0px 5px 5px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
</style>
