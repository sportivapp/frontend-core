<template>
  <tournament-headline
    see-all-link="/tournament"
    :tournament-list="latestTournament"
    :is-loading="isLoading"
    enable-orange-dot
  />
</template>

<script>
import TournamentHeadline from '@/components/Tournament/TournamentHeadline'
import { mapActions, mapGetters } from 'vuex'

const LIST_TO = 3

export default {
  name: 'HomeTournament',
  components: { TournamentHeadline },
  data () {
    return {
      isLoading: false,
      LIST_TO,
      currentPage: 1,
      searchInput: '',
      status: 'ALL'
    }
  },
  computed: {
    ...mapGetters('tournament', [
      'latestTournament'
    ])
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions('tournament', [
      'getLatestTournament'
    ]),
    constructParams () {
      return {
        isDraft: false,
        page: this.currentPage,
        size: this.LIST_TO,
        keyword: this.searchInput,
        status: this.status
      }
    },
    init () {
      if (this.isLoading) { return }
      this.isLoading = true
      this.getLatestTournament({
        params: this.constructParams(),
        successCallback: this.finishGetLatestTournament,
        errHandler: this.finishGetLatestTournament
      })
    },
    finishGetLatestTournament () {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
