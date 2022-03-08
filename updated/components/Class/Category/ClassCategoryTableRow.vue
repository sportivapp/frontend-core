<template>
  <tr
    class="class-category-row"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <td>
      <span class="spv-body--2 class-category-row__text--black">
        {{ category.title }}
      </span>
    </td>
    <td>
      <span class="spv-body--2 class-category-row__text--black">
        {{ scheduleText(firstSchedule) }}
        <span
          v-if="category.schedules.length > 1"
          class="class-category-row__text--grey"
        >
          + {{ category.schedules.length - 1 }}
        </span>
      </span>
    </td>
    <td>
      <span class="spv-body--2 class-category-row__text--black">
        {{ coachName(firstCoach) }}
        <span
          v-if="category.categoryCoachUserIds.length > 1"
          class="class-category-row__text--grey"
        >
          + {{ category.categoryCoachUserIds.length - 1 }}
        </span>
      </span>
    </td>
    <td>
      <v-row no-gutters justify="start" align="center">
        <v-col class="pa-0">
          <span
            v-if="isFree"
            class="spv-subtitle--2 class-category-row__price--free"
          >
            Gratis
          </span>
          <span v-else class="spv-subtitle--2 class-category-row__price--paid">
            {{ category.price | convertToPrice }}
            <span class="class-category-row__text--grey">
              / bulan
            </span>
          </span>
        </v-col>
        <v-spacer />
        <v-col cols="auto" class="pa-0">
          <div
            :class="[
              'class-category-row__actions__container',
              {'class-category-row__actions__container--hidden': !isHover}
            ]"
          >
            <v-btn
              icon
              @click="handleClickEdit"
            >
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn
              icon
              @click="handleClickDelete"
            >
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </td>
  </tr>
</template>

<script>

import { dateToHourAndMinute } from '@/utils/date'
import { convertToPrice } from '@/utils/price'
import { mapGetters } from 'vuex'

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
  name: 'ClassCategoryTableRow',
  filters: {
    convertToPrice
  },
  props: {
    category: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isHover: false
    }
  },
  computed: {
    ...mapGetters('class', [
      'selectedCoaches',
      'classUsers'
    ]),
    isFree () {
      return this.category.price === 0
    },
    firstSchedule () {
      return this.category.schedules && this.category.schedules[0]
    },
    firstCoach () {
      return this.category.categoryCoachUserIds &&
      this.category.categoryCoachUserIds[0]
    }
  },
  methods: {
    dateFromHourAndMinute (hour, minute) {
      const newDate = new Date()
      newDate.setHours(hour, minute)
      return newDate
    },
    startTimeDate (schedule) {
      return this.dateFromHourAndMinute(schedule.startHour,
        schedule.startMinute)
    },
    endTimeDate (schedule) {
      return this.dateFromHourAndMinute(schedule.endHour,
        schedule.endMinute)
    },
    scheduleText (schedule) {
      return dayText[schedule.day] + ' (' +
        dateToHourAndMinute(this.startTimeDate(schedule)) + ' - ' +
        dateToHourAndMinute(this.endTimeDate(schedule)) + ')'
    },
    handleClickEdit () {
      this.$emit('edit')
    },
    handleClickDelete () {
      this.$emit('delete')
    },
    coachName (coachId) {
      const selectedCoach = this.classUsers.find(classCoach =>
        classCoach.euserid === coachId)
      return selectedCoach
        ? selectedCoach.eusername
        : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.class-category-row {
  &:hover {
    background-color: $neutral-almost-white !important;

    td {
      background-color: $neutral-almost-white !important;
    }
  }

  &__text {
    &--black {
      color: $neutral-black;
    }

    &--grey {
      color: $neutral-neutral;
    }
  }

  &__price {
    &--free {
      color: $green-100;
    }

    &--paid {
      white-space: nowrap;
      color: $orange-100;
    }
  }

  &__actions {
    &__container {
      &--hidden {
        visibility: hidden;
      }
    }
  }
}
</style>
