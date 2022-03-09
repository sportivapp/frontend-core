<template>
  <v-row no-gutters class="tournament-info" justify="space-between">
    <v-col class="tournament-info__container" cols="12" md="8">
      <v-card flat class="tournament-info__card">
        <v-card-title class="tournament-info__card__title">
          Deskripsi
        </v-card-title>
        <v-card-text>
          <!-- eslint-disable vue/no-v-html -->
          <div class="tournament-info__card__text" v-html="tournamentDetail.description" />
          <!--eslint-enable-->
        </v-card-text>
        <v-tabs
          v-model="tab"
          color="#FF7041"
          grow
        >
          <v-tabs-slider color="#FF7041" />
          <v-tab class="tournament-info__card__tabs">
            HADIAH
          </v-tab>
          <v-tab class="tournament-info__card__tabs">
            PERATURAN
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item class="pa-5">
            <template v-if="hasRewards">
              <v-data-table
                :headers="headers"
                :items="tournamentRewards"
                item-key="name"
                disable-filtering
                disable-pagination
                disable-sort
                hide-default-footer
              />
            </template>
            <template v-else>
              <empty-template
                :empty-image="require('@/assets/images/empty/data-not-available.png')"
                :title="$t('common.dataNotAvailable')"
                class="pb-5"
              />
            </template>
          </v-tab-item>
          <v-tab-item class="pa-5 pb-8">
            <v-row
              v-for="(rule, index) in tournamentDetail.rules"
              :key="index"
            >
              <v-col cols="auto" class="tournament-info__card__rule-number">
                <v-avatar color="#FFF4F0" size="20" class="tournament-info__card__chip">
                  {{ index+1 }}
                </v-avatar>
              </v-col>
              <v-col cols="11">
                <p class="tournament-info__card__rule-text">
                  {{ rule }}
                </p>
              </v-col>
            </v-row>
            <template v-if="!hasRules">
              <empty-template
                :empty-image="require('@/assets/images/empty/data-not-available.png')"
                :title="$t('common.dataNotAvailable')"
                class="pb-5"
              />
            </template>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
    <v-col class="tournament-info__container--right">
      <v-card class="tournament-info__card tournament-info__card--shadow">
        <v-card-title class="tournament-info__card__title">
          Info Turnamen
        </v-card-title>
        <v-simple-table class="tournament-info__card__table">
          <template v-slot:default>
            <tbody>
              <tr>
                <td>
                  Periode Registrasi
                </td>
                <td>
                  {{ registrationDate }}
                </td>
              </tr>
              <tr>
                <td>
                  Jadwal Turnamen
                </td>
                <td>
                  {{ tournamentDate }}
                </td>
              </tr>
              <tr>
                <td>
                  Peserta
                </td>
                <td>
                  {{ tournamentParticipantCount }}
                </td>
              </tr>
              <tr>
                <td>
                  Lokasi
                </td>
                <td>
                  {{ tournamentAddress }}
                </td>
              </tr>
              <tr>
                <td>
                  Sistem
                </td>
                <td>
                  {{ tournamentTypeText }}
                </td>
              </tr>
              <tr>
                <td>
                  Harga
                </td>
                <td
                  :class="tournamentDetail.price === '0'
                    ? 'tournament-info__card__price--free'
                    : 'tournament-info__card__price'
                  "
                >
                  {{ tournamentPrice }}
                  <span v-if="tournamentDetail.price && tournamentDetail.price !== '0'" class="tournament-info__card__price--small">
                    / {{ $t('tournament.team') }}
                  </span>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-divider />
        <v-card-actions class="tournament-info__card__download">
          <p>
            Daftar sekarang di Aplikasi Sportiv
          </p>
          <v-row
            no-gutters
            justify="start"
            align="center"
          >
            <v-col cols="auto">
              <a
                href="https://play.google.com/store/apps/details?id=com.sportiv"
                target="_blank"
              >
                <img
                  src="@/assets/images/icons/google_play.png"
                  class="tournament-info__card__download__image"
                >
              </a>
            </v-col>
            <v-col cols="auto" class="tournament-info__card__download--right">
              <a
                href="https://apps.apple.com/id/app/sportiv/id1548121802"
                target="_blank"
              >
                <img
                  src="@/assets/images/icons/app_store.png"
                  class="tournament-info__card__download__image"
                >
              </a>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
      <v-alert
        dismissible
        outlined
        dense
        color="#2F80ED"
        icon="mdi-information"
        close-icon="mdi-close"
        class="mt-4"
      >
        Daftar sebelum tanggal {{ registrationDeadline }}
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { milisecondToFullDate, milisecondToFullDateShortMonth } from '@/utils/date'
import { convertToPrice } from '@/utils/price'
import EmptyTemplate from '@/components/Others/EmptyTemplate'

const tournamentTypeWording = {
  MULTI_STAGE: 'Multi Stage',
  SINGLE_STAGE: 'Single Stage'
}

export default {
  name: 'TournamentDetailInfo',
  components: {
    EmptyTemplate
  },
  data () {
    return {
      tournamentTypeWording,
      tab: null,
      headers: [
        {
          text: 'Peringkat',
          align: 'start',
          value: 'name'
        },
        {
          text: 'Hadiah', value: 'prize'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('tournament', [
      'tournamentDetail'
    ]),
    tournamentDate () {
      return milisecondToFullDateShortMonth(this.tournamentDetail.startDate) + ' - ' + milisecondToFullDateShortMonth(this.tournamentDetail.endDate)
    },
    registrationDate () {
      return milisecondToFullDateShortMonth(this.tournamentDetail.startDateRegistration) + ' - ' + milisecondToFullDateShortMonth(this.tournamentDetail.endDateRegistration)
    },
    registrationDeadline () {
      return milisecondToFullDate(this.tournamentDetail.endDateRegistration)
    },
    tournamentParticipantCount () {
      const minParticipant = this.tournamentDetail.participantCount ? this.tournamentDetail.participantCount : 0
      const maxParticipant = this.tournamentDetail.maxParticipant ? this.tournamentDetail.maxParticipant : 0
      return minParticipant + '/' + maxParticipant + ' tim'
    },
    tournamentAddress () {
      return this.tournamentDetail.locations && this.tournamentDetail.locations[0]
        ? this.tournamentDetail.locations[0].address
        : ''
    },
    tournamentTypeText () {
      return tournamentTypeWording[this.tournamentDetail.tournamentType] || ''
    },
    tournamentPrice () {
      return this.tournamentDetail.price && this.tournamentDetail.price === '0'
        ? this.$t('tournament.priceFree')
        : convertToPrice(this.tournamentDetail.price)
    },
    tournamentRewards () {
      return this.tournamentDetail.rewards && this.tournamentDetail.rewards.filter((reward) => {
        return reward.name !== '' || reward.prize !== ''
      })
    },
    hasRewards () {
      return this.tournamentRewards && this.tournamentRewards.length > 0
    },
    hasRules () {
      return this.tournamentDetail.rules && this.tournamentDetail.rules.length > 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/settings/_variables';

::v-deep .v-data-table-header {
  background-color: $white-neutral;
}

::v-deep .v-card__actions {
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
}

::v-deep .tournament-info__card__table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
  border-bottom: none;
}

::v-deep .tournament-info__card__table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:last-child, .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:last-child {
  border-bottom: none;
}

::v-deep .v-alert__content {
  color: #303030;
  font-size: 12px;
  font-weight: 600 !important;
}

.tournament-info {
  margin: 0;
  padding: 0;

  &__container {
    margin-right: 20px;

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      margin-right: 0px;
      margin-bottom: 20px;
    }

    &--right {
      max-width: 360px;
    }
  }

  &__card {
    border-radius: 20px;
    &--shadow {
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15) !important;
    }

    &__title {
      font-size: 16px;
      font-weight: 700;
      color: $black-neutral;
    }

    &__text {
      font-size: 14px;
      font-weight: 400;
      line-height: 26px;
      color: $black-neutral;
    }

    &__tabs {
      font-size: 12px;
    }

    &__rule-number {
      max-width: 35px;
    }

    &__rule-text {
      word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    &__chip {
      font-weight: 700;
      font-size: 12px;
      line-height: 16px;
      color: #FF7041 !important;
    }

    &__price {
      color: $orange-4 !important;
      font-weight: 600 !important;

      &--free {
        color: #0AB281 !important;
        font-weight: 600 !important;
      }

      &--small {
        font-size: 12px;
        color: $grey-3;
      }
    }

    &__download {
      font-size: 14px;
      font-weight: 600;
      color: $black-neutral;
      line-height: 26px;
      background-color: $white-neutral;
      padding: 20px;
      padding-top: 9px;

      &__image {
        width: 147px;
        height: 44px;
        object-fit: contain;
      }

      &--right {
        padding-left: 8px;

        @media #{map-get($display-breakpoints, 'sm-and-down')} {
          padding-left: 0px;
        }
      }
    }

    &__table {
      td {
        line-height: 26px;
        font-size: 14px;
        vertical-align: text-top !important;
      }

      td:first-child {
        width: 30%;
        font-weight: 600;
        color: $grey-3;
      }
      td:nth-child(2) {
        padding-top: 5px;
        font-weight: 400;
        color: $black-neutral;
      }
    }
  }

}
</style>
