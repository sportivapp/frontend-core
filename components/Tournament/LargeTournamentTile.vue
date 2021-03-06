<template>
  <nuxt-link
    class="large-tournament-tile"
    :to="tournamentLink"
    :title="tournament.name"
  >
    <v-sheet
      elevation="2"
      class="large-tournament-tile__sheet"
    >
      <v-chip
        class="large-tournament-tile__category"
        color="rgba(235, 235, 235, 0.8)"
        text-color="#525252"
      >
        {{ tournament.industry.name }}
      </v-chip>
      <v-row class="large-tournament-tile__container" no-gutters>
        <v-col
          cols="6"
          :class="[
            'large-tournament-tile__main-image pa-0 ma-0',
            {'large-tournament-tile__main-image--empty': !imgUrl}
          ]"
        >
          <img
            v-if="imgUrl"
            :src="imgUrl"
            alt="Profile"
          >
          <img
            v-else
            src="../../assets/images/logos/sportiv-grey.png"
            alt="Profile"
          >
        </v-col>
        <v-col
          cols="6"
          class="pt-12 px-9 pb-10"
          align="center"
          align-self="center"
        >
          <v-row
            justify="center"
            align="center"
            class="large-tournament-tile__detail ma-0"
          >
            <v-col class="pa-0" align-self="center" align="start">
              <v-row no-gutters>
                <span
                  class="large-tournament-tile__detail__title"
                  :title="tournament.name"
                >
                  {{ tournament.name }}
                </span>
              </v-row>
              <v-row class="pt-5" no-gutters>
                <author-summary
                  :start="tournament.startDate"
                  :end="tournament.endDate"
                  :author="tournament.creator"
                  class="'large-tournament-tile__detail__author'"
                  size="big"
                />
              </v-row>
              <v-row class="pt-12" no-gutters>
                <v-btn
                  class="large-tournament-tile__read-btn"
                  color="#0AB28A"
                  elevation="0"
                >
                  {{ $t('tournament.readNow') }}
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>
  </nuxt-link>
</template>

<script>
import AuthorSummary from '@/components/Tournament/AuthorSummary'
import { staticUrl } from '@/config/api'

export default {
  name: 'LargetournamentTile',
  components: { AuthorSummary },
  props: {
    tournament: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgUrl () {
      return this.tournament.banners.length > 0
        ? staticUrl + this.tournament.banners[0].link
        : null
    },
    tournamentLink () {
      return `/tournament/${this.tournament.id}`
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-chip {
  max-width: none;
}

.large-tournament-tile {
  width: 100%;
  position: relative;
  text-decoration: none;

  &__category {
    position: absolute;
    top: 15px;
    left: 15px;
    font-weight: 600;
    z-index: 1;

    font-size: 16px;
  }

  &__container {
    height: 100%;
    width: 100%;
  }

  &__sheet {
    width: 100%;
    overflow: hidden;
    border-radius: 16px;
    background-color: white;
    position: relative;

    height: 360px;
  }

  &__main-image {
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    &--empty {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $white-neutral;

      img {
        height: 50%;
        width: 50%;
        object-fit: contain;
      }
    }
  }

  &__detail {
    &__title {
      height: 50%;
      color: $black-neutral;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;

      font-size: 23px;
      font-weight: 700;
    }
  }

  &__read-btn {
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
  }
}
</style>
