<template>
  <tr
    v-if="session.status == 'ONGOING' || session.status == 'UPCOMING'"
    class="class-category-session-row"
    @mouseover="showButton"
    @mouseleave="hideButton"
  >
    <td class="class-category-session-row pl-10">
      <span class="class-category-session-row">
        {{ dateStart[0] ? dateStart[0] : '' }}
      </span>
    </td>
    <td class="class-category-session-row">
      <span>
        {{ dateStart[1] ? dateStart[1] : '' }} {{ dateStart[2] ? dateStart[2] : '' }}
      </span>
    </td>
    <td class="class-category-session-row">
      <span class="class-category-session-row__time">
        {{ dateStart[3] ? dateStart[3] : '' }}
      </span>
    </td>
    <td class="class-category-session-row">
      <span class="class-category-session-row__time">
        {{ timeStart ? timeStart : '' }} - {{ timeEnd ? timeEnd : '' }}
      </span>
    </td>
    <td
      v-if="session.status == 'ONGOING'"
      class="class-category-session-row"
    >
      <span class="class-category-session-row__status class-category-session-row__status--yellow px-2 py-1">
        Berjalan
      </span>
    </td>
    <td
      v-else-if="session.status == 'UPCOMING'"
      class="class-category-session-row"
    >
      <span class="class-category-session-row__status class-category-session-row__status--orange px-2 py-1">
        Akan Datang
      </span>
    </td>
    <td class="class-category-session-row__right pr-10">
      <v-btn
        v-show="showHide"
        :sync="showReschedule"
        class="class-category-session-row__button--orange mr-10"
        @click="toggleShowReschedule"
      >
        Ganti Waktu
      </v-btn>
      <v-btn
        v-show="showHide"
        :sync="showParticipantList"
        class="class-category-session-row__button--green mr-5"
        @click="toggleShowParticipantList"
      >
        Lihat Peserta
      </v-btn>
    </td>
    <class-category-session-dialog
      :session="session ? session : ''"
      :category="category"
      :sync="showParticipantList"
      keep-alive
      @clickOutside="toggleShowParticipantList"
    />
    <class-category-reschedule
      :sync="showReschedule"
      :category="category"
      :session="session ? session : ''"
      keep-alive
      @clickOutside="toggleShowReschedule"
    />
  </tr>
</template>

<script>
import { toFullDateWeekdayHourMinute } from '@/utils/date'
import ClassCategorySessionDialog from '@/components/Class/ClassCategory/ClassCategorySessionDialog'
import ClassCategoryReschedule from '@/components/Class/ClassCategory/ClassCategoryReschedule'

export default {
  name: 'ClassCategorySessionRow',
  components: { ClassCategorySessionDialog, ClassCategoryReschedule },
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
      showParticipantList: false,
      showReschedule: false,
      participantList: [],
      dateStart: '',
      dateEnd: '',
      timeStart: '',
      timeEnd: '',
      showHide: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getFullDate()
    },
    getFullDate () {
      this.dateStart = toFullDateWeekdayHourMinute(this.session.startDate)
      this.dateEnd = toFullDateWeekdayHourMinute(this.session.endDate)
      this.dateStart = this.dateStart.split(' ')
      this.dateEnd = this.dateEnd.split(' ')
      // get weekday
      this.dateStart[0] = this.dateStart[0].replace(',', '')
      // delete milisecond
      this.timeStart = this.dateStart[4].split(':')
      this.timeStart.length = 2
      this.timeStart = this.timeStart.join(':')
      this.timeEnd = this.dateEnd[4].split(':')
      this.timeEnd.length = 2
      this.timeEnd = this.timeEnd.join(':')
    },
    toggleShowParticipantList () {
      this.showParticipantList = !this.showParticipantList
    },
    toggleShowReschedule () {
      this.showReschedule = !this.showReschedule
    },
    showButton () {
      this.showHide = true
    },
    hideButton () {
      this.showHide = false
    }
  }
}
</script>

<style lang="scss" scoped>
.class-category-session-row {
  color: #000000;
  height: 60px;

  &__time {
    font-size: 16px;
    line-height: 24px;
  }

  &__status {
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
    border-radius: 20px;
    color: $neutral-white !important;

    &--yellow {
      background-color: $yellow-100;
    }

    &--orange {
      background-color: $orange-100;
    }
  }

  &__right {
    direction: rtl;
    white-space: nowrap;
    text-align: justify;
  }

  &__button {

    &--green {
      box-shadow: none !important;
      background-color: $neutral-white !important;
      height: 32px !important;
      font-size: 12px;
      line-height: 28px;
      font-weight: 600;
      color: $green-100 !important;
      border-radius: 8px;
      border: 1px solid $green-100;
    }

    &--orange {
      box-shadow: none !important;
      background-color: $neutral-white !important;
      height: 32px !important;
      font-size: 12px;
      line-height: 28px;
      font-weight: 600;
      color: $orange-100 !important;
      border-radius: 8px;
      border: 1px solid $orange-100;
    }
  }
}
</style>
