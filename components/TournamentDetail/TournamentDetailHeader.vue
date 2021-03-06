<template>
  <div>
    <template v-if="tournamentDetail.banners && tournamentDetail.banners.length > 0">
      <v-carousel
        hide-delimiter-background
        :hide-delimiters="isSingleBanner"
        :show-arrows="!isSingleBanner"
        height="440"
        class="tournament-header__carousel"
      >
        <v-carousel-item
          v-for="(item,i) in tournamentDetail.banners"
          :key="i"
          :src="`${staticUrl}/${item.link}`"
        />
      </v-carousel>
    </template>
    <p class="tournament-header__title">
      {{ tournamentDetail && tournamentDetail.name }}
    </p>
    <v-row no-gutters justify="start" align="center" class="pb-5">
      <v-col cols="auto" class="pl-1 pr-3">
        <v-avatar size="36">
          <v-img :src="imageUrl" />
        </v-avatar>
      </v-col>
      <v-col cols="auto">
        Penyelenggara :
      </v-col>
      <v-col cols="auto" class="pl-1 pr-6 tournament-header__organizer">
        {{ tournamentProvider }}
      </v-col>
      <v-col cols="auto">
        <v-chip
          label
          :color="statusChipColor"
          :text-color="statusChipTextColor"
        >
          {{ statusChipText }}
        </v-chip>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { staticUrl } from '@/config/api'
import { mapGetters } from 'vuex'
import { milisecondToFullDateShortMonth } from '@/utils/date'

const tournamentStatusTextColor = {
  UPCOMING: '#FF7041',
  ONGOING: '#F4B718',
  FINISHED: '#0AB281'
}

const tournamentStatusText = {
  // UPCOMING: 'Akan Datang',
  ONGOING: 'Berlangsung',
  FINISHED: 'Selesai'
}

const tournamentStatusColor = {
  UPCOMING: '#FFF4F0',
  ONGOING: '#FFF3D3',
  FINISHED: '#DCF1EB'
}

export default {
  name: 'TournamentDetailHeader',
  data () {
    return {
      staticUrl,
      tournamentStatusColor,
      tournamentStatusText,
      tournamentStatusTextColor
    }
  },
  computed: {
    ...mapGetters('tournament', [
      'tournamentDetail'
    ]),
    tournamentCreatorName () {
      return this.tournamentDetail && this.tournamentDetail.creator
        ? this.tournamentDetail.creator.name : ''
    },
    tournamentProvider () {
      return this.tournamentDetail && this.tournamentDetail.company
        ? this.tournamentDetail.company.name : this.tournamentCreatorName
    },
    statusChipText () {
      let statusText = tournamentStatusText[this.tournamentDetail.status]
        ? tournamentStatusText[this.tournamentDetail.status]
        : ''
      if (this.tournamentDetail.status === 'UPCOMING') {
        // if (this.tournamentDetail.registrationStatus === 'CLOSED') {
        //   statusText = 'Akan Datang: ' + milisecondToFullDateShortMonth(this.tournamentDetail.startDateRegistration)
        // }
        statusText = this.tournamentDetail.registrationStatus === 'CLOSED'
          ? 'Akan Datang : ' + milisecondToFullDateShortMonth(this.tournamentDetail.startDateRegistration)
          : 'Registrasi Dibuka : ' + this.registrationDate
      }
      return statusText
    },
    statusChipTextColor () {
      return tournamentStatusTextColor[this.tournamentDetail.status]
        ? tournamentStatusTextColor[this.tournamentDetail.status]
        : ''
    },
    statusChipColor () {
      return tournamentStatusColor[this.tournamentDetail.status]
        ? tournamentStatusColor[this.tournamentDetail.status]
        : ''
    },
    imageUrl () {
      return this.tournamentDetail && this.tournamentDetail.company &&
        this.tournamentDetail.company.logo
        ? require(`${staticUrl}/${this.tournamentDetail.company.logo.name}`)
        : require('../../assets/images/logos/sportiv-logo-small.png')
    },
    registrationDate () {
      return milisecondToFullDateShortMonth(this.tournamentDetail.startDateRegistration) + ' - ' + milisecondToFullDateShortMonth(this.tournamentDetail.endDateRegistration)
    },
    isSingleBanner () {
      return this.tournamentDetail.banners && this.tournamentDetail.banners.length === 1
    }
  }
}
</script>

<style lang="scss" scoped>
// ------------------------------------------------------------------------
// change carousel button style -------------------------------------------

::v-deep .tournament-header__carousel.v-window > .v-window__container > .v-window__prev {
  border: none;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0px rgba(0, 0, 0, 0.14), 0 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
}

::v-deep .tournament-header__carousel.v-window > .v-window__container > .v-window__prev > .v-btn {
  background-color: white;
  color: #FF7041;
}

::v-deep .tournament-header__carousel.v-window > .v-window__container > .v-window__next {
  border: none;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0px rgba(0, 0, 0, 0.14), 0 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
}

::v-deep .tournament-header__carousel.v-window > .v-window__container > .v-window__next > .v-btn {
  background-color: white;
  color: #FF7041;
}
// done change carousel button---------------------------------------------
// ------------------------------------------------------------------------

//-------------------------------------------------------------------------
// change carousel controls style -----------------------------------------
::v-deep .v-carousel__controls__item.v-btn {
  color: $light-grey-1;
  opacity: 1;
  &:hover {
    &:before {
      opacity: 0.5 !important;
    }
  }
}

::v-deep .v-carousel__controls__item.v-btn.v-btn--active {
  color: $orange-4;
  &:before {
    opacity: 0;
  }
}

::v-deep .v-carousel__controls__item > .v-btn__content > .v-icon{
  opacity: 1;
}

// done change carousel control style -------------------------------------
//-------------------------------------------------------------------------

.tournament-header {
  &__title {
    margin: 0;
    padding: 20px 5px;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    letter-spacing: -0.005em;
    color: #1B1C1E;
  }

  &__carousel {
    border-radius: 12px;
  }

  &__organizer {
    color: #707070;
    font-weight: 600;
  }
}
</style>
