<template>
  <round-list
    identifier="stage-participant"
    :groups="groups"
  >
    <template v-slot:item="{ item }">
      <div class="stage-participant__table">
        <tournament-stage-participant-table
          :participants="item.teams"
        />
      </div>
    </template>
  </round-list>
</template>

<script>
import RoundList from '@/components/TournamentDetail/RoundList'
import TournamentStageParticipantTable
  from '@/components/TournamentDetail/TournamentParticipant/TournamentStageParticipantTable'
import { mapActions, mapGetters } from 'vuex'
import { tournamentMatchStages } from '@/config/tournamentStages'

export default {
  name: 'TournamentStageParticipant',
  components: {
    RoundList,
    TournamentStageParticipantTable
  },
  props: {
    isKnockoutStage: {
      type: Boolean,
      default: false
    },
    isEditParticipant: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('tournament', [
      'groupStageParticipantList'
    ]),
    groups () {
      const participantGroups = []
      this.groupStageParticipantList.forEach((participant) => {
        const existingGroup = participantGroups.find(group => group.name ===
          participant.bracketId)
        if (!participant.team) { return }
        if (existingGroup) {
          existingGroup.teams.push(participant)
        } else {
          participantGroups.push({
            name: participant.bracketId,
            teams: [participant]
          })
        }
      })

      return participantGroups
    }
  },
  created () {
    this.initData()
  },
  methods: {
    ...mapActions('tournament', [
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
    initData () {
      this.getStageParticipantList({
        data: this.constructStageParticipantListBody(tournamentMatchStages.groupStage)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.stage-participant {
  &__table {
    width: 100%;
    margin-top: 16px;
  }
}
</style>
