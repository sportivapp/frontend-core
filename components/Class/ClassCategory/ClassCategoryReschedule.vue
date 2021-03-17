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
        <v-col class="session-reschedule px-0 pb-5" cols="auto" md="11">
          <class-category-reschedule-item
            :category="category"
            :session="session ? session : ''"
          />
        </v-col>
      </v-row>
      <v-divider />
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { toFullDateWeekdayHourMinute } from '@/utils/date'
import ClassCategoryRescheduleItem from '@/components/Class/ClassCategory/ClassCategoryRescheduleItem'

export default {
  name: 'ClassCategorySessionReschedule',
  components: { ClassCategoryRescheduleItem },
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
      isTableLoading: false,
      dateStart: '',
      dateEnd: '',
      timeStart: '',
      startHour: '',
      startMinute: '',
      endHour: '',
      endMinute: '',
      timeEnd: ''
    }
  },
  computed: {
    ...mapGetters('class', [
      'sessionParticipant'
    ])
  },
  created () {
    this.initData()
  },
  methods: {
    ...mapActions('class', [
      'getSessionParticipant'
    ]),
    initData () {
      this.getFullDate()
    },
    getFullDate () {
      this.dateStart = toFullDateWeekdayHourMinute(this.session.startDate)
      this.dateEnd = toFullDateWeekdayHourMinute(this.session.endDate)
      this.dateStart = this.dateStart.split(' ')
      this.dateEnd = this.dateEnd.split(' ')
      // get weekday
      this.dateStart[0] = this.dateStart[0].replace(',', '')
      this.dateEnd[0] = this.dateEnd[0].replace(',', '')
      // delete milisecond
      this.timeStart = this.dateStart[4].split(':')
      this.timeStart.length = 2
      // this.timeStart = this.timeStart.join(':')
      this.timeEnd = this.dateEnd[4].split(':')
      this.timeEnd.length = 2
      this.startHour = this.timeStart[0]
      this.startMinute = this.timeStart[1]
      this.endHour = this.timeEnd[0]
      this.endMinute = this.timeEnd[1]
      // this.timeEnd = this.timeEnd.join(':')
      // console.log(this.dateStart[0] + ' - ' + this.dateEnd[0])
      // console.log(this.startHour + ' - ' + this.endHour)
      // console.log(this.startMinute + ' - ' + this.endMinute)
      this.categorySchedules = [
        {
          day: 'MONDAY',
          startHour: 10,
          startMinute: 0,
          endHour: 12,
          endMinute: 0
        }
      ]
    },
    handleClickOutside () {
      this.$emit('clickOutside')
    }
  }
}
</script>

<style lang="scss" scoped>
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
    color: $green-100 !important;
  }

  &__grey {
    color: $neutral-grey !important;
  }
}
</style>
