<template>
  <div class="tournament-participant">
    <template v-if="hasParticipants">
      <div class="tournament-participant__search-bar">
        <search-bar label="Cari peserta" @search="handleSearch" />
      </div>
      <div class="tournament-participant__table">
        <tournament-participant-table :search-text="searchText" />
      </div>
    </template>
    <template v-else>
      <empty-template
        class="pt-10"
        :empty-image="require('@/assets/images/empty/empty-tournament-participants.png')"
        :title="$t('tournament.emptyParticipants')"
        :sub-title="$t('tournament.emptyParticipantsSub')"
      />
    </template>
  </div>
</template>

<script>
import TournamentParticipantTable
  from '@/components/TournamentDetail/TournamentParticipant/TournamentParticipantTable'
import SearchBar from '@/components/inputs/SearchBar'
import { mapGetters } from 'vuex'
import EmptyTemplate from '@/components/Others/EmptyTemplate.vue'

export default {
  name: 'TournamentAllParticipant',
  components: {
    TournamentParticipantTable,
    SearchBar,
    EmptyTemplate
  },
  data () {
    return {
      searchText: ''
    }
  },
  computed: {
    ...mapGetters('tournament', [
      'tournamentParticipantList'
    ]),
    hasParticipants () {
      return this.tournamentParticipantList && this.tournamentParticipantList.length > 0
    }
  },
  methods: {
    handleSearch (searchString) {
      this.searchText = searchString
    }
  }
}
</script>

<style lang="scss" scoped>
.tournament-participant{

  &__table {
    margin-top: 16px;
  }
}
</style>
