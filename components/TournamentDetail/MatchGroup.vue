<template>
  <v-sheet class="match-group">
    <v-container fluid class="match-group__container">
      <v-row no-gutters>
        <span class="match-group__title spv-heading--4">
          {{ groupTitle }}
        </span>
      </v-row>
      <slot name="item" :group="matchGroup" />
    </v-container>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'
import { tournamentFormat } from '@/config/tournamentStages'
import { alphabetGroupTitle, numberGroupTitle } from '@/utils/stage'

const knockOutRoundTitles = [
  'Final',
  'Semifinal'
]
export default {
  name: 'MatchGroup',
  props: {
    identifier: {
      type: String,
      default: ''
    },
    knockoutStage: {
      type: Boolean,
      default: false
    },
    matchGroup: {
      type: Object,
      default: () => ({})
    },
    matchGroupsLength: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters('tournament', [
      'tournamentDetail'
    ]),
    groupTitle () {
      return this.knockoutStage
        ? this.knockoutStageTitle
        : this.leagueStageTitle
    },
    leagueStageTitle () {
      return this.tournamentDetail.stage &&
        this.tournamentDetail.stage.tournamentFormat === tournamentFormat.league
        ? numberGroupTitle(this.matchGroup.name)
        : alphabetGroupTitle(this.matchGroup.name)
    },
    knockoutStageTitle () {
      if (!this.matchGroup.matches) {
        return numberGroupTitle(this.matchGroup.name)
      }

      const indexRoundTitle = this.matchGroupsLength - this.matchGroup.name

      return knockOutRoundTitles[indexRoundTitle]
        ? knockOutRoundTitles[indexRoundTitle]
        : numberGroupTitle(this.matchGroup.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.match-group {
  border-radius: 8px;
  border: 1px solid $light-grey-1;

  &__container {
    padding: 16px 12px 28px 28px;
  }

  &__title {
    color: $black-neutral;
  }
}
</style>
