<template>
  <nuxt-link
    :class="
      ['tournament-tile',
       {'tournament-tile--big' : isSizeBig },
       {'tournament-tile--medium' : isSizeMedium },
       {'tournament-tile--small' : isSizeSmall }
      ]"
    :to="tournamentLink"
    :title="tournament.name"
  >
    <v-sheet
      elevation="2"
      :class="[
        'tournament-tile__sheet',
        {'tournament-tile__sheet--big':isSizeBig},
        {'tournament-tile__sheet--medium':isSizeMedium},
        {'tournament-tile__sheet--small':isSizeSmall}
      ]"
    >
      <!-- tournament status -->
      <v-chip
        v-if="tournament.status == 'UPCOMING' && tournament.registrationStatus == 'OPEN'"
        :class="[
          'tournament-tile__status',
          'tournament-tile__status--orange',
          { 'tournament-tile__status--big': isSizeBig },
          { 'tournament-tile__status--medium': isSizeMedium },
          { 'tournament-tile__status--small': isSizeSmall }
        ]"
      >
        {{ $t('tournament.openRegistration') }}
      </v-chip>
      <v-chip
        v-else-if="tournament.status == 'FINISHED'"
        :class="[
          'tournament-tile__status',
          'tournament-tile__status--green',
          { 'tournament-tile__status--big': isSizeBig },
          { 'tournament-tile__status--medium': isSizeMedium },
          { 'tournament-tile__status--small': isSizeSmall }
        ]"
      >
        {{ $t('tournament.finished') }}
      </v-chip>
      <v-chip
        v-else-if="tournament.status == 'ONGOING'"
        :class="[
          'tournament-tile__status',
          'tournament-tile__status--green',
          { 'tournament-tile__status--big': isSizeBig },
          { 'tournament-tile__status--medium': isSizeMedium },
          { 'tournament-tile__status--small': isSizeSmall }
        ]"
      >
        {{ $t('tournament.onGoing') }}
      </v-chip>
      <v-chip
        v-else
        :class="[
          'tournament-tile__status',
          'tournament-tile__status--orange',
          { 'tournament-tile__status--big': isSizeBig },
          { 'tournament-tile__status--medium': isSizeMedium },
          { 'tournament-tile__status--small': isSizeSmall }
        ]"
      >
        {{ $t('tournament.upComing') }}
      </v-chip>
      <!-- tournament image -->
      <v-row
        :class="[
          'tournament-tile__main-image pa-0 ma-0',
          {'tournament-tile__main-image--big': isSizeBig },
          {'tournament-tile__main-image--medium' : isSizeMedium},
          {'tournament-tile__main-image--small': isSizeSmall},
          {'tournament-tile__main-image--empty': !imgUrl}
        ]"
      >
        <img
          v-if="imgUrl"
          :src="imgUrl"
          alt="tournament-image"
        >
        <img
          v-else
          src="../../assets/images/logos/sportiv-grey.png"
          alt="tournament-image"
        >
      </v-row>
      <!-- tournament detail -->
      <v-row
        justify="center"
        align="center"
        :class="[
          'tournament-tile__detail ma-0',
          { 'tournament-tile__detail--big pa-5': isSizeBig },
          { 'tournament-tile__detail--medium pa-3': isSizeMedium },
          { 'tournament-tile__detail--small pa-2': isSizeSmall },
        ]"
      >
        <!-- industry name -->
        <v-col cols="12" class="pa-0 flex-column justify-space-between">
          <span class="tournament-tile__detail spv-body--3">
            <span
              class="tournament-tile__detail__category spv-body--3"
              :title="tournament.industry.name"
            >
              {{ tournament.industry.name }}
            </span>
            | {{ tournament.locations ? tournament.locations[0].address : '' }}
          </span>
        </v-col>
        <!-- tournament name -->
        <v-col cols="12" class="pa-0 flex-column justify-space-between">
          <span
            :class="[
              'tournament-tile__detail__title',
              {'tournament-tile__detail__title--big' : isSizeBig},
              {'tournament-tile__detail__title--medium' : isSizeMedium},
              {'tournament-tile__detail__title--small' : isSizeSmall}
            ]"
            :title="tournament.name"
          >
            {{ tournament.name }}
          </span>
        </v-col>
        <!-- tournament date -->
        <v-col cols="12" class="pa-0 flex-column justify-space-between">
          <span
            :class="[
              'tournament-tile__detail__subtitle pa-0 ma-0',
              {'tournament-tile__detail__subtitle--big' : isSizeBig},
              {'tournament-tile__detail__subtitle--medium' : isSizeMedium},
              {'tournament-tile__detail__subtitle--small' : isSizeSmall}
            ]"
          >
            <v-icon size="20" color="#DADADA">
              mdi-calendar-blank
            </v-icon>
            {{ tournamentDate }}
          </span>
        </v-col>
        <!-- tournament participant -->
        <!-- <v-col cols="4" class="pa-0 flex-column justify-space-between">
          <span
            :class="[
              'tournament-tile__detail__subtitle pa-0 ma-0',
              {'tournament-tile__detail__subtitle--big' : isSizeBig},
              {'tournament-tile__detail__subtitle--medium' : isSizeMedium},
              {'tournament-tile__detail__subtitle--small' : isSizeSmall}
            ]"
          >
            <v-icon size="20" color="#DADADA">
              mdi-account-supervisor
            </v-icon>
            <span>
              {{ tournament.participantCount || 0 }}/{{ tournament.maxParticipant || 0 }} &nbsp;{{ $t('tournament.team') }}
            </span>
          </span>
        </v-col> -->
        <v-col cols="12" class="pa-0 flex-column justify-space-between">
          <span class="spv-caption--2 tournament-tile__detail__price">
            <span
              :class="[
                'tournament-tile__detail__price',
                {'tournament-tile__detail__price--orange' : hasFee},
                {'tournament-tile__detail__price--green' : !hasFee}
              ]"
            >
              {{ tournamentPrice }}
            </span>
            / {{ $t('tournament.team') }}
          </span>
        </v-col>
      </v-row>
    </v-sheet>
  </nuxt-link>
</template>

<script>
import moment from 'moment'
import { convertToPrice } from '@/utils/price.js'
import { staticUrl } from '@/config/api'

const tileSize = {
  big: 'big',
  medium: 'medium',
  small: 'small'
}
export default {
  name: 'TournamentTile',
  props: {
    tournament: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: tileSize.big
    }
  },
  computed: {
    isSizeBig () {
      return this.size === tileSize.big
    },
    isSizeMedium () {
      return this.size === tileSize.medium
    },
    isSizeSmall () {
      return this.size === tileSize.small
    },
    imgUrl () {
      return this.tournament.banners.length > 0
        ? staticUrl + this.tournament.banners[0].link
        : null
    },
    tournamentDate () {
      return moment(new Date(this.tournament.startDate)).format('DD MMM YYYY') + ' - ' + moment(new Date(this.tournament.endDate)).format('DD MMM YYYY')
    },
    tournamentLink () {
      return `/tournament/${this.tournament.id}`
    },
    hasFee () {
      if (!this.tournament.price || this.tournament.price === '0') {
        return ''
      } else {
        return this.tournament.price
      }
    },
    tournamentPrice () {
      if (!this.tournament.price || this.tournament.price === '0') { return this.$t('tournament.priceFree') }
      return convertToPrice(this.tournament.price)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-chip {
  max-width: none;
}

.tournament-tile {
  width: 100%;
  height: 100%;
  position: relative;
  text-decoration: none;

  &__status {
    position: absolute;
    top: 20px;
    right: 20px;
    font-weight: 600;
    z-index: 1;

    &--orange{
      background-color: #FFF1EC !important;
      color: $orange-4;
    }

    &--green{
      background-color: #DCF1EB !important;
      color: $green-2;
    }

    &--big {
      font-size: 14px;
    }

    &--medium, &--small {
      font-size: 10px;
    }

    &--small {
      height: fit-content;
      top: 10px;
      left: 10px;
    }
  }

  &__sheet {
    width: 100%;
    overflow: hidden;
    border-radius: 16px;
    background-color: white;
    position: relative;
    padding: 10px;

    &--big {
      height: 450px;
    }

    &--medium {
      height: 345px;
    }

    &--small {
      height: 200px;
    }
  }

  &__main-image {
    border-radius: 16px;
    width: 100%;
    overflow: hidden;

    &--big, &--medium {
      height: 60%;
    }

    &--small {
      height: 50%;
    }

    &--empty {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $white-neutral;

      img {
        object-fit: contain !important;
        max-width: 50%;
        max-height: 50%;
      }
    }

    img {
      border-radius: 16px 16px 0 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &__detail {
    color: $grey-3;
    &--big, &--medium {
      height: 40%;
    }

    &--small {
      height: 50%;
    }

    &__category {
      color: $orange-4;
      overflow: hidden;
    }

    &__title {
      height: 50%;
      color: $black-neutral;
      display: -webkit-box;
      word-break: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;

      &--big {
        font-size: 23px;
        font-weight: 700;
      }

      &--medium {
        font-size: 14px;
        font-weight: 600;
      }

      &--small {
        font-size: 12px;
        font-weight: 600;
      }
    }

    &__subtitle{
      color: $grey-3;
      display: -webkit-box;
      word-break: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;

      &--big {
        font-size: 12px;
        font-weight: 400;
      }

      &--medium {
        font-size: 10px;
        font-weight: 400;
      }

      &--small {
        font-size: 9px;
        font-weight: 400;
      }
    }

    &__price {
      font-weight: 600;

      &--orange{
        color:  $orange-4;
      }

      &--green{
        color: $green-2;
      }
    }
  }
}
</style>
