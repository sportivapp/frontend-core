<template>
  <div>
    <template v-if="groupStageStandingTable.length > 1">
      <round-list identifier="standing" :groups="groupStageStandingTable">
        <template v-slot:item="{ item }">
          <standing-table class="standing-table-wrapper" :items="item.teams" />
        </template>
      </round-list>
    </template>
    <template v-if="groupStageStandingTable && groupStageStandingTable.length===1">
      <standing-table :items="groupStageStandingTable[0].teams" />
    </template>
  </div>
</template>

<script>
import RoundList from '@/components/TournamentDetail/RoundList'
import StandingTable from '@/components/Tables/StandingTable/StandingTable'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TournamentStageStanding',
  components: {
    RoundList,
    StandingTable
  },
  computed: {
    ...mapGetters('tournament', [
      'groupStageStandingTable'
    ])
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions('tournament', [
      'getGroupStageStandingTable'
    ]),
    init () {
      this.getGroupStageStandingTable({
        id: this.$route.params.tournamentId
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.standing-table-wrapper {
  margin-top: 12px;
}
</style>
