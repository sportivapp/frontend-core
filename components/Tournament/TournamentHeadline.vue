<template>
  <v-container class="tournament-headline ma-0 pa-0">
    <v-row align="center" justify="space-around">
      <v-col align="start" class="py-0" cols="12" md="5">
        <v-row
          class="tournament-headline__title"
          no-gutters
          justify="start"
          align="center"
        >
          <v-col v-if="enableOrangeDot" cols="auto" class="tournament-headline__title__dot">
            <v-img
              height="20"
              width="20"
              :src="require('@/assets/images/icons/orange-dot.png')"
            />
          </v-col>
          <v-col cols="auto">
            <h4 class="tournament-headline__title__text">
              {{ $t('tournament.title') }}
            </h4>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer />
      <v-col
        v-if="hasSeeAllLink"
        :align="isSmallDevice ? 'start' : 'end'"
        cols="12"
        md="5"
        class="py-0"
      >
        <see-all-button :link="seeAllLink" />
      </v-col>
    </v-row>
    <v-row class="tournament-headline__content" justify="center" align="center">
      <v-col
        v-if="isLoading"
        cols="12"
        md="12"
        class="tournament-headline__loading"
      >
        <v-progress-circular
          color="#FF7041"
          indeterminate
          size="50"
        />
      </v-col>
      <v-col v-else-if="hasNoTournament" cols="12" md="12" class="pt-0 px-3">
        <empty-template
          class="pa-0 ma-0"
          :empty-image="require('@/assets/images/empty/empty-tournament.png')"
          :title="$t('tournament.emptyTitle')"
          :sub-title="$t('tournament.emptySubTitle')"
        />
      </v-col>
      <v-col v-else cols="12" md="12" class="pb-0 pt-9 px-3">
        <tournament-carousel :tournament-list="tournamentList" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SeeAllButton from '@/components/Navigation/SeeAllButton/SeeAllButton'
import TournamentCarousel from '@/components/Tournament/TournamentCarousel'
import EmptyTemplate from '@/components/Others/EmptyTemplate'

export default {
  name: 'TournamentHeadline',
  components: {
    SeeAllButton,
    TournamentCarousel,
    EmptyTemplate
  },
  props: {
    seeAllLink: {
      type: String,
      default: ''
    },
    tournamentList: {
      type: Array,
      default: () => ([])
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    enableOrangeDot: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isSmallDevice () {
      return this.$vuetify.breakpoint.name === 'xs'
    },
    hasSeeAllLink () {
      return this.seeAllLink
    },
    hasNoTournament () {
      return this.tournamentList.length <= 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/settings/_variables';

.tournament-headline {
  width: 100%;

  &__loading {
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__title {
    &__dot {
      @media #{map-get($display-breakpoints, 'md-and-up')} {
        margin-left: -24px;
      }
      margin-right: 12px;
    }

    &__text {
      font-size: 24px;
      font-weight: 700;
      line-height: 36px;
    }
  }
}
</style>
