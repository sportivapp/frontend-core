<template>
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
                prepend-icon="mdi-calendar"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="handleDate()"
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
        <span v-if="errorText" class="spv-body--3 category-schedule-item__red">
          {{ errorText }}
        </span>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { toFullDateWeekdayHourMinute, toShortDateHourMinute } from '@/utils/date'
import moment from 'moment'

export default {
  name: 'ClassCategoryRescheduleItem',
  components: { },
  props: {
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
    dateText () {
      return this.handleDate()
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
    // init () {
    // },
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
    // getTimeFromDate (date) {
    //   return this.getTime(date)
    // },
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
      }
      // this.$emit('input', {
      //   ...this.value,
      //   startHour: time.split(':')[0],
      //   startMinute: time.split(':')[1]
      // })
    },
    handleChangeEndTime (time) {
      this.timeEnd = time
      if (this.timeEnd < this.timeStart) {
        this.errorText = 'Waktu berakhir tidak boleh lebih kecil dari waktu mulai'
      } else if (this.timeStart > this.timeEnd) {
        this.errorText = 'Waktu mulai tidak boleh lebih besar dari waktu berakhir'
      } else {
        this.errorText = ''
      }
      // this.$emit('input', {
      //   ...this.value,
      //   endHour: time.split(':')[0],
      //   endMinute: time.split(':')[1]
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
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
