<template>
  <v-row class="category-schedule-item">
    <v-col class="category-schedule-item__content">
      <v-row
        :class="[
          'category-schedule-item__content__wrapper',
          `category-schedule-item__content__wrapper-${index}`
        ]"
        justify="start"
        align="center"
      >
        <v-col cols="auto" class="pa-0" align="center">
          <v-menu
            bottom
            offset-y
            open-on-click
            close-on-content-click
            :attach="`.category-schedule-item__content__wrapper-${index}`"
            content-class="select-menu__content"
            nudge-bottom="4"
            class="select-menu"
          >
            <template v-slot:activator="slotProps">
              <v-row
                class="select-menu__activator select-menu__activator--day"
                v-bind="slotProps.attrs"
                align="center"
                justify="space-between"
                no-gutters
                v-on="slotProps.on"
              >
                <v-col cols="auto">
                  {{ getDayText(value.day) }}
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
              <v-list class="select-menu__select__sheet">
                <v-list-item
                  v-for="day in dayValues"
                  :key="day"
                  :class="[
                    'select-menu__select__item',
                    { 'select-menu__select__item--selected': value.day === day }
                  ]"
                  @click="changeDay(day)"
                >
                  <span class="select-menu__select__item__text">
                    {{ getDayText(day) }}
                  </span>
                </v-list-item>
              </v-list>
            </template>
          </v-menu>
        </v-col>
        <v-divider vertical class="mx-2" />
        <v-col cols="auto" class="pa-0">
          <v-row no-gutters>
            <v-col cols="auto" class="pa-0">
              <v-menu
                :close-on-content-click="false"
                bottom
                offset-y
                :attach="`.category-schedule-item__content__wrapper-${index}`"
                content-class="select-menu__content"
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
                      {{ getTimeFromDate(startTime) }}
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
                :attach="`.category-schedule-item__content__wrapper-${index}`"
                content-class="select-menu__content"
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
                      {{ getTimeFromDate(endTime) }}
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
        <v-spacer />
      </v-row>
    </v-col>
    <v-col cols="auto" class="category-schedule-item__delete">
      <v-btn
        icon
        @click="handleClickDelete"
      >
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { dateToHourAndMinute } from '@/utils/date'

const dayValues = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY'
]

const dayText = {
  MONDAY: 'Senin',
  TUESDAY: 'Selasa',
  WEDNESDAY: 'Rabu',
  THURSDAY: 'Kamis',
  FRIDAY: 'Jumat',
  SATURDAY: 'Sabtu',
  SUNDAY: 'Minggu'
}

export default {
  name: 'CategoryScheduleListItem',
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dayValues,
      dayText
    }
  },
  computed: {
    startTime () {
      return this.getTime(this.value.startHour, this.value.startMinute)
    },
    endTime () {
      return this.getTime(this.value.endHour, this.value.endMinute)
    }
  },
  methods: {
    getDayText (dayValue) {
      return dayText[dayValue] || ''
    },
    changeDay (day) {
      this.$emit('input', {
        ...this.value,
        day
      })
    },
    handleClickDelete () {
      this.$emit('delete', this.index)
    },
    getTime (hour, minute) {
      const dateWithTime = new Date()
      dateWithTime.setHours(hour, minute)
      return dateWithTime
    },
    getTimeFromDate (date) {
      return dateToHourAndMinute(date)
    },
    handleChangeStartTime (time) {
      this.$emit('input', {
        ...this.value,
        startHour: time.split(':')[0],
        startMinute: time.split(':')[1]
      })
    },
    handleChangeEndTime (time) {
      this.$emit('input', {
        ...this.value,
        endHour: time.split(':')[0],
        endMinute: time.split(':')[1]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
      border: 1px solid $neutral-light-grey;
      border-radius: 8px;
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
