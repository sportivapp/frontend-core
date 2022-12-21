<template>
  <tr
    class="class-category-session-row"
    @mouseover="showButton"
    @mouseleave="hideButton"
  >
    <td class="class-category-session-row pl-10">
      <span class="class-category-session-row">
        {{ day }}
      </span>
    </td>
    <td class="class-category-session-row">
      <span>
        {{ startDate ? startDate : '' }} - {{ endDate ? endDate : '' }}
      </span>
    </td>
    <td class="class-category-session-row">
      <span class="class-category-session-row__time">
        {{ year ? year : '' }}
      </span>
    </td>
    <td class="class-category-session-row">
      <span class="class-category-session-row__time">
        {{ startTime ? startTime : '' }} - {{ endTime ? endTime : '' }}
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
        :sync="showParticipantList"
        class="class-category-session-row__button mr-10"
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
  </tr>
</template>

<script>
import ClassCategorySessionDialog from '@/components/Class/ClassCategory/ClassCategorySessionDialog'
import moment from 'moment'
import { toIndonesiaDateAndTime } from '@/utils/date'
export default {
  name: 'ClassCategorySessionRow',
  components: { ClassCategorySessionDialog },
  props: {
    session: {
      type: Object,
      required: true
    },
    category: {
      type: Object,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      showParticipantList: false,
      participantList: [],
      day: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      year: '',
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
      const startDate = parseInt(this.session.startDate)
      const endDate = parseInt(this.session.endDate)
      const formattedDate = toIndonesiaDateAndTime(moment(startDate).format('dddd, DD MMMM YYYY')).split(',')[0]
      this.day = formattedDate
      this.startDate = moment(startDate).format('DD/MM')
      this.endDate = moment(endDate).format('DD/MM')
      this.startTime = moment(startDate).format('hh:mm')
      this.endTime = moment(endDate).format('hh:mm')
      this.year = moment(startDate).format('YYYY')
    },
    toggleShowParticipantList () {
      this.showParticipantList = !this.showParticipantList
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
}
</style>
