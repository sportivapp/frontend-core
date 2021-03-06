<template>
  <round-list
    identifier="matches"
    :is-knockout-stage="isKnockoutStage"
    :groups="matchGroups"
  >
    <template v-slot:item="{ item }">
      <match-list
        :knockout-stage="isKnockoutStage"
        :matches="item.matches"
      />
    </template>
  </round-list>
</template>

<script>
import RoundList from '@/components/TournamentDetail/RoundList'
import MatchList from '@/components/TournamentDetail/MatchList'
import { mapGetters } from 'vuex'

export default {
  name: 'TournamentStageMatch',
  components: {
    RoundList,
    MatchList
  },
  props: {
    isKnockoutStage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('tournament', [
      'knockOutStageMatchList',
      'groupStageMatchList'
    ]),
    matchGroups () {
      return this.isKnockoutStage
        ? this.knockOutStageMatchList
        : this.groupStageMatchList
    }
  }
}
</script>

<style scoped>

</style>
