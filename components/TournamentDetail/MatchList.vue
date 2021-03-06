<template>
  <v-row
    class="match-list"
    justify="start"
    align="center"
  >
    <v-col
      v-for="(match, index) in matches"
      :key="index"
      class="match-list__item"
      md="3"
      sm="6"
      cols="12"
    >
      <match-tile :match="match" :knockout-stage="knockoutStage" />
    </v-col>
  </v-row>
</template>

<script>
import MatchTile from '@/components/TournamentDetail/MatchTile'
export default {
  name: 'MatchList',
  components: { MatchTile },
  props: {
    knockoutStage: {
      type: Boolean,
      default: false
    },
    matches: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>
.match-list {
  width: 100%;
  padding-left: 12px;

  &__item {
    width: 220px;
    padding: 16px 16px 0 0;
    &:nth-child(4n) {
      padding-right: 0 !important;
    }
  }
}
</style>
