<template>
  <v-dialog
    v-model="sync"
    max-width="600"
    @click:outside="handleClickOutside"
  >
    <v-card class="scroll-card">
      <h2 class="session-reschedule__card__title py-5 px-9">
        Ganti Waktu
      </h2>
      <v-row align="center" justify="center" no-gutters>
        <v-col class="session-reschedule py-0 pb-5 pl-3" cols="auto" md="6">
          <span class="spv-subtitle--1 ">
            Tanggal
          </span>
        </v-col>
        <v-col class="session-reschedule px-0 pb-5" cols="auto" md="5">
          <span class="spv-subtitle--2 pr-1">
            Jam
          </span>
        </v-col>
        <v-col class="session-reschedule px-0 pb-1" cols="auto" md="11">
          <v-row class="category-schedule-item">
            <v-col class="category-schedule-item__content">
              <v-row
                class="category-schedule-item__content__wrapper pa-0"
                justify="start"
                align="center"
              >
                <v-col cols="auto" md="6" class="py-0 pr-0 pl-3" align="center">
                  <v-menu
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    :menu-props="{ bottom: true, offsetY: true }"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateText"
                        outlined
                        dense
                        solo
                        readonly
                        persistent-hint
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="date"
                      no-title
                      :min="minDate"
                      @input="handleDate()"
                      @change="checkDate()"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="auto" md="6" class="py-0 pl-6 pr-0">
                  <v-row no-gutters class="timer">
                    <v-col cols="auto" class="pa-0">
                      <v-menu
                        :close-on-content-click="false"
                        bottom
                        offset-y
                        nudge-bottom="4"
                        class="select-menu"
                      >
                        <template v-slot:activator="slotProps">
                          <v-row
                            class="select-menu__activator select-menu__activator--time"
                            v-bind="slotProps.attrs"
                            align="center"
                            justify="space-between"
                            no-gutters
                            v-on="slotProps.on"
                          >
                            <v-col cols="auto">
                              {{ timeStart }}
                            </v-col>
                            <v-col cols="auto">
                              <v-icon v-if="slotProps.value" right>
                                mdi-menu-up
                              </v-icon>
                              <v-icon v-else right>
                                mdi-menu-down
                              </v-icon>
                            </v-col>
                          </v-row>
                        </template>
                        <template v-slot:default>
                          <v-time-picker
                            format="24hr"
                            :value="startTime"
                            @change="handleChangeStartTime"
                          />
                        </template>
                      </v-menu>
                    </v-col>
                    <v-col
                      cols="auto"
                      class="pa-0 category-schedule-item__content__dash-divider"
                    >
                      -
                    </v-col>
                    <v-col cols="auto" class="pa-0">
                      <v-menu
                        :close-on-content-click="false"
                        bottom
                        offset-y
                        nudge-bottom="4"
                        class="select-menu"
                      >
                        <template v-slot:activator="slotProps">
                          <v-row
                            class="select-menu__activator select-menu__activator-time"
                            v-bind="slotProps.attrs"
                            align="center"
                            justify="space-between"
                            no-gutters
                            v-on="slotProps.on"
                          >
                            <v-col cols="auto">
                              {{ timeEnd }}
                            </v-col>
                            <v-col cols="auto">
                              <v-icon v-if="slotProps.value" right>
                                mdi-menu-up
                              </v-icon>
                              <v-icon v-else right>
                                mdi-menu-down
                              </v-icon>
                            </v-col>
                          </v-row>
                        </template>
                        <template v-slot:default>
                          <v-time-picker
                            format="24hr"
                            :value="endTime"
                            @change="handleChangeEndTime"
                          />
                        </template>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-col>
                <span v-if="errorText" class="spv-body--3 pb-2 category-schedule-item__red">
                  {{ errorText }}
                </span>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="session-reschedule pl-3" cols="auto" md="11">
          <span class="spv-subtitle--1 ">
            Pengulangan
            <span class="session-reschedule__red">*
            </span>
          </span>
        </v-col>
        <v-col class="session-reschedule pl-3 pb-5" cols="auto" md="11">
          <v-row
            align="center"
            justify="space-between"
            no-gutters
          >
            <v-radio-group
              v-model="type"
              row
              @change="handleDate()"
            >
              <v-radio
                class="pr-10"
                label="Tidak diulangi"
                value="notRepeat"
              />
              <v-radio
                label="Sesi yang akan datang"
                value="repeat"
              />
            </v-radio-group>
          </v-row>
        </v-col>
        <v-col class="session-reschedule__right pl-3 pb-5" cols="auto" md="11">
          <v-row align="center" no-gutters>
            <v-col v-if="isDisabled" class="pl-5 pr-0 py-0" cols="auto">
              <v-btn
                outlined
                text
                disabled
              >
                <span>
                  Ganti
                </span>
              </v-btn>
            </v-col>
            <v-col v-else class="pl-5 pr-0 py-0" cols="auto">
              <v-btn
                outlined
                text
                class="session-reschedule__green"
                @click="handleReschedule()"
              >
                <span>
                  Ganti
                </span>
              </v-btn>
            </v-col>
            <v-col class="pa-0" cols="auto">
              <v-btn
                outlined
                class="session-reschedule__grey"
                @click="handleClickOutside"
              >
                <span>
                  Batal
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider />
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import { toFullDateWeekdayHourMinute, toShortDateHourMinute } from '@/utils/date'

export default {
  name: 'ClassCategorySessionReschedule',
  props: {
    sync: {
      type: Boolean,
      default: false
    },
    session: {
      type: Object,
      required: true
    },
    category: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isDisabled: false,
      type: 'notRepeat',
      isTableLoading: false,
      timeStart: '',
      timeEnd: '',
      date: null,
      dateTime: '',
      dateTexts: '',
      sessionList: [],
      errorText: ''
    }
  },
  computed: {
    ...mapGetters('class', [
      'sessionParticipant'
    ]),
    dateText () {
      return this.handleDate()
    },
    minDate () {
      return moment().format('YYYY-MM-DD')
    },
    startTime () {
      return this.getTime(this.session.startDate)
    },
    endTime () {
      return this.getTime(this.session.endDate)
    }
  },
  created () {
    this.allSessionTime()
    this.getTime()
  },
  methods: {
    ...mapActions('class', [
      'getSessionParticipant', 'categorySessionReschedule', 'setSnackBar'
    ]),
    handleDate () {
      if (this.date) {
        moment.locale('id')
        return moment(new Date(this.date)).format('dddd, DD MMM YYYY')
      } else {
        this.dateTexts = toFullDateWeekdayHourMinute(this.session.startDate)
        this.dateTexts = this.dateTexts.split(' ')
        this.dateTexts.length = 4
        this.dateTime = this.dateTexts.join(' ')
        return this.dateTime
      }
    },
    getTime () {
      let dateTimeStart = toFullDateWeekdayHourMinute(this.session.startDate)
      let dateTimeEnd = toFullDateWeekdayHourMinute(this.session.endDate)
      dateTimeStart = dateTimeStart.split(' ')
      dateTimeEnd = dateTimeEnd.split(' ')
      // delete milisecond
      const timStart = dateTimeStart[4].split(':')
      const timeEnd = dateTimeEnd[4].split(':')
      timStart.length = 2
      timeEnd.length = 2
      this.timeStart = timStart.join(':')
      this.timeEnd = timeEnd.join(':')
    },
    allSessionTime () {
      const sessionLists = this.category.categorySessions
      for (let i = 0; i < sessionLists.length; i++) {
        let dateStart = toShortDateHourMinute(sessionLists[i].startDate)
        let dateEnd = toShortDateHourMinute(sessionLists[i].endDate)
        dateStart = dateStart.split(' ')
        dateEnd = dateEnd.split(' ')
        dateStart[0] = dateStart[0].replaceAll('/', '-')
        this.sessionList.push({
          sessionUuid: sessionLists[i].uuid,
          date: dateStart[0],
          timeStart: dateStart[1],
          timeEnd: dateEnd[1]
        })
      }
    },
    handleChangeStartTime (time) {
      this.timeStart = time
      if (this.timeStart > this.timeEnd) {
        this.errorText = 'Waktu mulai tidak boleh lebih besar dari waktu berakhir'
      } else if (this.timeEnd < this.timeStart) {
        this.errorText = 'Waktu berakhir tidak boleh lebih kecil dari waktu mulai'
      } else {
        this.errorText = ''
        this.checkDate()
      }
    },
    handleChangeEndTime (time) {
      this.timeEnd = time
      if (this.timeEnd < this.timeStart) {
        this.errorText = 'Waktu berakhir tidak boleh lebih kecil dari waktu mulai'
      } else if (this.timeStart > this.timeEnd) {
        this.errorText = 'Waktu mulai tidak boleh lebih besar dari waktu berakhir'
      } else {
        this.errorText = ''
        this.checkDate()
      }
    },
    checkDate () {
      const date = this.date ? moment(new Date(this.date)).format('DD-MM-YYYY') : (moment(new Date(this.dateText)).format('DD-MM-YYYY'))
      for (let i = 0; i < this.sessionList.length; i++) {
        if (this.session.uuid !== this.sessionList[i].sessionUuid && date === this.sessionList[i].date) {
          if ((this.timeStart >= this.sessionList[i].timeStart && this.timeStart <= this.sessionList[i].timeEnd) && (this.timeEnd >= this.sessionList[i].timeStart && this.timeEnd <= this.sessionList[i].timeEnd)) {
            this.errorText = 'Tanggal dan jam yang dipilih sudah dipakai'
            this.isDisabled = true
            break
          }
        } else {
          this.errorText = ''
          this.isDisabled = false
        }
      }
    },
    async handleReschedule () {
      let fullDateStart = this.dateText + ' ' + this.timeStart
      let fullDateEnd = this.dateText + ' ' + this.timeEnd
      fullDateStart = new Date((moment(new Date(fullDateStart))))
      fullDateEnd = new Date((moment(new Date(fullDateEnd))))
      fullDateStart = fullDateStart.getTime()
      fullDateEnd = fullDateEnd.getTime()
      const body = {
        startDate: fullDateStart,
        endDate: fullDateEnd
      }
      if (this.type === 'repeat') {
        const params = {
          isRepeat: true
        }
        await this.categorySessionReschedule({
          classId: this.$route.params.classId,
          classCategoryId: this.$route.params.classCategoryId,
          sessionId: this.session.uuid,
          params,
          body,
          successCallback: this.successCallbackReschedule
        })
      } else if (this.type === 'notRepeat') {
        const params = {
          isRepeat: false
        }
        await this.categorySessionReschedule({
          classId: this.$route.params.classId,
          classCategoryId: this.$route.params.classCategoryId,
          sessionId: this.session.uuid,
          params,
          body,
          successCallback: this.successCallbackReschedule
        })
      }
    },
    successCallbackReschedule () {
      const data = {
        value: true,
        message: 'Berhasil Ganti Waktu'
      }
      this.setSnackBar(data)
      setTimeout(function () { location.reload() }, 2000)
    },
    handleClickOutside () {
      this.$emit('clickOutside')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-input__slot{
  box-shadow: none !important;
}

::v-deep .v-card {
  border-radius: 25px !important;

  &__title {
    padding-left: 64px !important;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: $neutral-black;
    text-align: center;
  }
}

.session-reschedule{

  &__center {
    text-align: center;
  }

  &__header {
    color: $neutral-grey;
    margin: 0;
    padding: 0;

    &--left {
      width: 250px;
    }

    &--center {
      text-align: center !important;
    }
  }

  &__right {
    direction: rtl;
    color: $neutral-grey;
    // text-align: center !important;
    white-space: nowrap;
    text-align: justify;
  }

  &__red {
    color: $red-100 !important;
  }

  &__green {
    background-color: $green-100 !important;
    border-color: $green-100 !important;
    color: $neutral-white !important;
  }

  &__grey {
    border-color: $neutral-grey !important;
    color: $neutral-grey !important;
  }
}

.timer {
  margin-top: -20px;
}
.category-schedule-item {
  margin: 0;

  &__content, &__delete {
    padding: 0;
  }

  &__content {
    &__wrapper {
      position: relative;
      margin: 0;
      height: 100%;
      padding: 8px;
    }

    &__dash-divider {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 8px;
    }
  }

  &__delete {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__red {
    margin-top: -20px;
    padding-left: 15px;
    color: $red-100;
  }
}

.select-menu {
  &__content {
    min-width: 174px;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.15) !important;
  }

  &__activator {
    padding: 5px 8px;
    border-radius: 4px;
    background-color: $neutral-almost-white;

    &--day {
      min-width: 174px;
    }

    &--time {
      min-width: 80px;
    }
  }

  &__select {
    &__item {
      &__text {
        color: $neutral-grey !important;
      }

      &--selected {
        background-color: $neutral-almost-white;
      }
    }
  }
}
</style>
