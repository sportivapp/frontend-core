<template>
  <v-container
    class="tournament-list px-0 pt-0 mx-0 justify-start align-start"
    fill-height
    fluid
  >
    <v-row class="pt-10" justify="center" align="center" no-gutters>
      <!-- <v-col class="tournament-list__headline" cols="auto" md="12">
        <tournament-headline
          :tournament-list="tournamentForHeadline"
          :is-loading="isLoading"
        />
      </v-col> -->
      <v-col cols="auto" md="8" class="pb-5">
        <span class="tournament-list__title spv-heading--2">
          {{ $t('tournament.findTournament') }}
        </span>
      </v-col>
      <v-col cols="auto" md="8">
        <v-row class="tournament-list__search-bar rounded-lg ma-0" align="center" justify="center">
          <v-col cols="auto" md="6" class="px-0 pt-2">
            <search-bar
              class="py-0"
              :label="$t('tournament.findTournament')"
              @search="handleSearch"
            />
          </v-col>
          <v-col cols="auto" md="1" class="px-0" />
          <v-col cols="auto" md="3" class="pt-4 pl-0">
            <v-select
              v-model="industryId"
              :items="handleIndustries"
              outlined
              dense
              :placeholder="`${$t('common.select')} ${$t('createOrganization.industry')}`"
              item-value="eindustryid"
              item-text="eindustryname"
              :menu-props="{ bottom: true, offsetY: true }"
              class="spv-body--2 tournament-list__industry"
              @input="searchTournament()"
            />
          </v-col>
          <v-col cols="auto" md="1" class="pl-0">
            <v-btn
              text
              class="tournament-list__filter spv-subtitle--2"
              @click="toggleShowFilter"
            >
              Filter
            </v-btn>
          </v-col>
          <!-- filter -->
          <v-col cols="auto" md="12" class="pa-0">
            <v-expand-transition>
              <div v-show="isShowFilter">
                <v-divider />
                <v-row class=" spv-subtitle--2 pa-0">
                  <v-col cols="auto" md="11" class="pa-0">
                    <v-card-text class="tournament-list__card-black pb-0 mb-0 pl-8">
                      {{ $t('tournament.selectFilter') }}
                    </v-card-text>
                  </v-col>
                  <v-col cols="auto" md="1" class="pa-0">
                    <v-card-text
                      class="tournament-list__card-orange pb-0 mb-0 pl-0"
                      @click="handleReset()"
                    >
                      Reset
                    </v-card-text>
                  </v-col>
                </v-row>
                <v-row class="px-5 py-2">
                  <v-col cols="auto" md="12" class="py-0">
                    <v-row justify="start" align="center">
                      <v-col class="py-0" cols="auto" md="3">
                        <v-row justify="center" align="center">
                          <v-col class="tournament-list__filter--subtitle spv-subtitle--3 py-0" cols="auto" md="12">
                            {{ $t('tournament.registrationFee') }}
                          </v-col>
                          <v-col class="pb-0" cols="auto" md="12">
                            <v-select
                              v-model="fee"
                              outlined
                              dense
                              :items="$t('tournament.fee')"
                              item-value="id"
                              item-text="text"
                              :placeholder="$t('tournament.fee[0].text')"
                              :menu-props="{ bottom: true, offsetY: true }"
                              @input="searchTournament()"
                            />
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col class="py-0" cols="auto" md="4">
                        <v-row justify="center" align="center">
                          <v-col class="tournament-list__filter--subtitle spv-subtitle--3 py-0" cols="auto" md="12">
                            {{ $t('tournament.location') }}
                          </v-col>
                          <v-col class="pb-0" cols="auto" md="12">
                            <v-select
                              v-model="cityId"
                              outlined
                              dense
                              multiple
                              :items="provinces"
                              item-value="estateid"
                              item-text="estatename"
                              :placeholder="$t('tournament.fee[0].text')"
                              :menu-props="{ bottom: true, offsetY: true }"
                              @change="searchTournament()"
                            >
                              <template v-slot:selection="{ item, index }">
                                <span v-if="index === 0">
                                  {{ item.estatename }}
                                </span>
                                <span
                                  v-if="index === 1"
                                  class="grey--text caption pl-1"
                                >
                                  (+{{ item.length - 1 }} others)
                                </span>
                              </template>
                            </v-select>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col class="py-0" cols="auto" md="5">
                        <v-row justify="center" align="center">
                          <v-col class="tournament-list__filter--subtitle spv-subtitle--3 py-0" cols="auto" md="12">
                            {{ $t('tournament.tournamentDate') }}
                          </v-col>
                          <v-col class="pb-0" cols="auto" md="12">
                            <v-menu
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-y
                              :menu-props="{ bottom: true, offsetY: true }"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="dateRangeText"
                                  outlined
                                  dense
                                  solo
                                  readonly
                                  :placeholder="$t('tournament.tournamentDate')"
                                  persistent-hint
                                  prepend-icon="mdi-calendar"
                                  v-on="on"
                                />
                              </template>
                              <v-date-picker
                                v-model="dates"
                                range
                                no-title
                                @input="handleDate()"
                              />
                            </v-menu>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </div>
            </v-expand-transition>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="auto" md="8">
        <v-row>
          <v-col class="tournament-list__status spv-body--3 pt-4" cols="auto" md="9">
            <span
              :class="
                ['tournament-list__status--list pa-2 mr-2',
                 {'tournament-list__status--list--orange' : status == 'UPCOMING' }
                ]
              "
              @click="handleSortUpComing"
            >
              {{ $t('tournament.upComing') }}
            </span>
            <!-- <span
              :class="
                ['tournament-list__status--list pa-2 mr-2',
                 {'tournament-list__status--list--orange' : status == 'UPCOMING' && registrationStatus == 'OPEN'}
                ]
              "
              @click="handleSortOpenRegistration"
            >
              {{ $t('tournament.openRegistration') }}
            </span> -->
            <span
              :class="
                ['tournament-list__status--list pa-2 mr-2',
                 {'tournament-list__status--list--orange' : status == 'ONGOING' }
                ]
              "
              @click="handleSortOnGoing"
            >
              {{ $t('tournament.onGoing') }}
            </span>
            <span
              :class="
                ['tournament-list__status--list pa-2 mr-2',
                 {'tournament-list__status--list--orange' : status == 'FINISHED' }
                ]
              "
              @click="handleSortFinished"
            >
              {{ $t('tournament.finished') }}
            </span>
          </v-col>
          <v-col cols="auto" md="1" />
          <v-col cols="auto" md="2">
            <v-select
              v-model="sortBy"
              class="tournament-list__sort pa-0 ma-0"
              :menu-props="{ bottom: true, offsetY: true }"
              :items="$t('tournament.sorts')"
              item-value="id"
              item-text="text"
              :placeholder="$t('tournament.sort')"
              @input="searchTournament()"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="auto" md="8">
        <tournament-page-bottom-list
          v-if="tournamentList.length > 0"
          :tournament-list="tournamentList"
        />
      </v-col>
      <v-col
        v-cloak
        v-intersect="handleScrollMore"
        cols="auto"
        md="8"
        class="tournament-list__scroll-listener"
      />
    </v-row>
  </v-container>
</template>

<script>
// import TournamentHeadline from '@/components/Tournament/TournamentHeadline'
import { mapActions, mapGetters } from 'vuex'
import TournamentPageBottomList from '@/components/Tournament/TournamentPageBottomList'
import moment from 'moment'
import SearchBar from '@/components/inputs/SearchBar.vue'

const LIST_TO = 12

export default {
  name: 'Index',
  components: {
    // TournamentHeadline,
    TournamentPageBottomList,
    SearchBar
  },
  data () {
    return {
      LIST_TO,
      isLoading: false,
      currentPage: 1,
      searchInput: '',
      status: 'ALL',
      industryId: '',
      cityId: '',
      startDate: '',
      endDate: '',
      fee: '',
      sortBy: '',
      dates: [],
      // registrationStatus: '',
      isShowFilter: false
    }
  },
  computed: {
    ...mapGetters({
      tournamentList: 'tournament/tournamentList',
      tournamentListPaging: 'tournament/tournamentListPaging',
      provinces: 'provinces',
      industries: 'industries'
    }),
    dateRangeText () {
      return this.dates.join(' - ')
    },
    handleIndustries () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.industries.splice(0, 0, {
        eindustryid: '',
        eindustryname: 'Semua Kategori'
      })

      return this.industries
    }
    // cityText () {
    //   if (this.cityId.length === 2) {
    //     return this.cityId[0]
    //   } else if (this.cityId.length > 1) {
    //     const more = this.cityId.length - 1
    //     return this.cityId[0] + '+ ' + more + ' more'
    //   } else {
    //     return ''
    //   }
    // }
    // latestTournamentCount () {
    //   return this.latestTournament.length
    // },
    // tournamentForHeadline () {
    //   if (this.latestTournamentCount <= 0) { return [] }

    //   return this.latestTournamentCount < carouselItemsMax
    //     ? this.latestTournament.slice(0, this.latestTournamentCount)
    //     : this.latestTournament.slice(0, carouselItemsMax)
    // },
    // hasNoTournament () {
    //   return !this.isLoading && this.latestTournament.length <= 0
    // }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions('tournament', [
      'getTournamentList'
    ]),
    ...mapActions([
      'getProvinces',
      'getIndustries'
    ]),
    init () {
      this.searchTournament()
      this.sendGetProvince()
      this.getIndustries()
    },
    constructParams () {
      return {
        page: this.currentPage,
        size: this.LIST_TO,
        keyword: this.searchInput,
        status: this.status,
        startDate: this.startDate,
        endDate: this.endDate,
        industryId: this.industryId,
        cityId: this.cityId,
        sortBy: this.sortBy,
        fee: this.fee
      }
    },
    sendGetProvince () {
      const params = {
        countryId: 1,
        size: 9999
      }
      this.getProvinces({ params })
    },
    searchTournament (init = true) {
      let today = new Date()
      let oneYearAfterNow = new Date()
      oneYearAfterNow.setFullYear(oneYearAfterNow.getFullYear() + 1)
      oneYearAfterNow = moment(oneYearAfterNow).format('YYYY-MM-DD')
      today = moment(today).format('YYYY-MM-DD')
      this.startDate = this.startDate ? this.startDate : today
      this.endDate = this.endDate ? this.endDate : oneYearAfterNow

      this.isLoading = true
      this.getTournamentList({
        init,
        params: this.constructParams(),
        successCallback: this.successGetTournamentList,
        errHandler: this.failGetTournamentList
      })
    },
    successGetTournamentList () {
      this.isLoading = false
      this.currentPage = this.tournamentListPaging.page
    },
    failGetTournamentList () {
      this.isLoading = false
    },
    handleSearch (searchText) {
      this.currentPage = 1
      this.searchInput = searchText
      this.searchTournament(true)
    },
    handleSortUpComing () {
      this.currentPage = 1
      this.status === 'UPCOMING' ? this.status = 'ALL' : this.status = 'UPCOMING'
      this.searchTournament(true)
    },
    handleSortOnGoing () {
      this.currentPage = 1
      this.status === 'ONGOING' ? this.status = 'ALL' : this.status = 'ONGOING'
      this.searchTournament(true)
    },
    handleSortFinished () {
      this.currentPage = 1
      this.status === 'FINISHED' ? this.status = 'ALL' : this.status = 'FINISHED'
      this.searchTournament(true)
    },
    // handleSortOpenRegistration (registrationStatus = true) {
    //   this.status = 'ONGOING'
    //   this.searchTournament(true)
    // },
    handleDate () {
      this.startDate = this.dates[0] < this.dates[1] ? this.dates[0] : this.dates[1]
      this.endDate = this.dates[0] < this.dates[1] ? this.dates[1] : this.dates[0]
      this.searchTournament(true)
    },
    handleScrollMore () {
      if (this.isLoading || this.tournamentListPaging.totalSize ===
        this.tournamentList.length) {
        return
      }

      this.currentPage++
      this.searchTournament(false)
    },
    toggleShowFilter () {
      this.isShowFilter = !this.isShowFilter
    },
    handleReset () {
      this.currentPage = 1
      this.cityId = ''
      this.startDate = ''
      this.endDate = ''
      this.fee = ''
      this.searchTournament()
    }
  },
  head () {
    return {
      title: 'Tournament List'
    }
  }
}
</script>

<style lang="scss" scoped>

::v-deep .v-input__slot {
  box-shadow: none !important;
}

::v-deep .v-text-field__details {
  display: none !important;
}

.tournament-list {
  background-color: $grey-10;
  padding-bottom: 120px;

  &__headline{
    padding-bottom: 150px;
  }

  &__input {
    border-radius: 8px;
    background-color: white;
  }

  &__filter {
    color: $grey-3;
    border-radius: 8px;
    border: 1px solid $light-grey-1;
    padding: 10px 25px 10px 25px;
  }

  &__filter--subtitle {
    color: $grey-neutral;
  }

  &__sort {
    font-weight: 400;
    font-size: 14px !important;
    line-height: 22px !important;
  }

  &__status {
    overflow: hidden;

    &--list {
      border-radius: 16px;
      border: 1px solid $light-grey-1;
      background-color: $white-2;
      color: $grey-neutral;
      cursor: pointer;

      &--orange {
        border: 1px solid $orange-4;
        background-color: #FFF4F0;
        color: $orange-4;
      }
    }
  }

  &__title{
    color: $black-neutral;
  }

  &__search-bar{
    background-color: $white-2;
    color: $grey-3;
  }

  &__tournament-list__scroll-listener{
    padding-bottom: 12px;
  }

  &__card-black {
    font-weight: 600;
    color: $black-neutral !important;
  }

  &__card-orange {
    font-weight: 600;
    color: $orange-4 !important;
    cursor: pointer;
  }
}
</style>
