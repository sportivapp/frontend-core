<template>
  <v-container class="ma-0 pa-0 class-category" fluid>
    <v-row align="center" justify="center">
      <v-col cols="auto" md="4" class="pl-1">
        <v-select
          v-model="sessionId"
          :items="categorySessions"
          outlined
          dense
          placeholder="Pilih Sesi"
          item-value="uuid"
          item-text="theDate"
          :menu-props="{ bottom: true, offsetY: true }"
          class="spv-body--2"
          @change="getSessionParticipantList"
        />
      </v-col>
      <v-col
        v-if="sessionId"
        cols="auto"
        md="4"
      >
        <span class="spv-subtitle--2 pr-1">
          Hadir
        </span>
        <span class="class-category-history__item--green spv-subtitle--2">
          {{ checkIn }}
        </span>
        <span class="class-category-history__item--grey spv-subtitle--2">
          /{{ participantCount }}
        </span>
      </v-col>
      <v-col
        v-else
        cols="auto"
        md="4"
      />
      <v-col cols="auto" md="3" class="px-0" />
    </v-row>
    <v-divider />
    <v-data-table
      class="class-category-history"
      :items="sessionHistoryParticipant"
    >
      <template v-slot:header>
        <thead class="class-category-history__header-container">
          <tr class="class-category-history__header--background">
            <th class="class-category-history__header--left pl-10">
              <span class="class-category-history__header--left">
                Nama
              </span>
            </th>
            <th class="class-category-history__header--left">
              <span class="class-category-history__header--left">
                Email
              </span>
            </th>
            <th class="class-category-history__header--action">
              <span class="class-category-history__header--action">
                Kehadiran
              </span>
            </th>
            <th class="class-category-history__header--action">
              <span class="class-category-history__header--action">
                Penilaian
              </span>
            </th>
            <th class="class-category-history__header--action">
              <span class="class-category-history__header--action" />
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:item="{ item }">
        <tr class="class-category-history__item">
          <td class="class-category-history__item pl-10">
            <v-avatar size="30" class="mr-3">
              <v-img :src="getParticipantImageUrl(item)" />
            </v-avatar>
            <span class="class-category-history__item">
              {{ item.user.eusername ? item.user.eusername : '' }}
            </span>
          </td>
          <td class="class-category-history__item">
            <span>
              {{ item.user.euseremail ? item.user.euseremail : '' }}
            </span>
          </td>
          <td
            v-if="!item.isCheckIn"
            class="class-category-history__item--center"
          >
            <span>
              <v-icon class="class-category-history__item--red">
                mdi-close-circle
              </v-icon>
            </span>
          </td>
          <td
            v-else
            class="class-category-history__item--center"
          >
            <span>
              <v-icon class="class-category-history__item--green">
                mdi-check-circle
              </v-icon>
            </span>
          </td>
          <td
            class="class-category-history__item--center"
          >
            <v-rating
              v-if="item.isCheckIn"
              readonly=""
              :value="item.classRating.rating"
              color="#F4B718"
              background-color="#D5D5D5"
              dense=""
            />
          </td>
          <td
            class="class-category-history__item--center"
          >
            <v-btn
              v-if="item.isCheckIn && item.classRating!==null"
              class="spv-subtitle--3"
              rounded=""
              color="primary"
              outlined=""
              @click="handlePreviewModal(item.classCategoryUuid, item.isCheckIn,item.classRating, item.user)"
            >
              lihat review
            </v-btn>
            <v-btn
              v-if="!item.isCheckIn && item.classReason!==null"
              class="spv-subtitle--3"
              rounded=""
              color="primary"
              outlined=""
              @click="handlePreviewModal(item.classCategoryUuid, item.isCheckIn,item.classReason, item.user)"
            >
              lihat alasan
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <view-review-modal v-model="showReviewModal" :is-attend="isAttend" :review="reviewObject" />
  </v-container>
</template>

<script>
import { toFullDateWeekdayHourMinute, milisecondToFullDate } from '@/utils/date'
import { mapGetters, mapActions } from 'vuex'
import { staticUrl } from '@/config/api'
import ViewReviewModal from '@/components/Class/ClassCategory/Modal/ViewReviewModal'

export default {
  name: 'ClassCategorySession',
  components: {
    ViewReviewModal
  },
  props: {
    history: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      sessionId: '',
      sessionList: [],
      isTableLoading: false,
      isCheckIn: '',
      dateStart: '',
      dateEnd: '',
      timeStart: '',
      timeEnd: '',
      checkIn: 0,
      participantCount: 0,
      showReviewModal: false,
      isAttend: false,
      reviewObject: {}
    }
  },
  computed: {
    ...mapGetters('class', [
      'sessionHistoryParticipant'
    ]),
    categorySessions () {
      const sessions = this.history.categorySessions.map((session) => {
        return {
          ...session,
          theDate: toFullDateWeekdayHourMinute(session.startDate)
        }
      })
      return sessions
    }
  },
  created () {
    this.init()
    this.getSessionParticipantList()
  },
  methods: {
    ...mapActions('class', [
      'getSessionParticipant'
    ]),
    init () {
      this.sessionId = this.history.categorySessions[0].uuid
      this.handleSessionList()
    },
    constructParams () {
      return {
        // isCheckIn: this.isCheckIn
        isCheckIn: true
      }
    },
    getSessionParticipantList (init = false) {
      this.isTableLoading = true
      this.getSessionParticipant({
        init,
        classCategoryId: this.history.uuid,
        sessionId: this.sessionId,
        params: this.constructParams(),
        successCallback: this.handleParticipantCount
      })
    },
    handleSessionList () {
      for (let i = 0; i < this.history.categorySessions.length; i++) {
        if (this.history.categorySessions[i].status === 'DONE') {
          this.dateStart = toFullDateWeekdayHourMinute(this.history.categorySessions[i].startDate)
          this.dateEnd = toFullDateWeekdayHourMinute(this.history.categorySessions[i].endDate)
          // getTime
          this.dateStart = this.dateStart.split(' ')
          this.dateEnd = this.dateEnd.split(' ')
          this.timeStart = this.dateStart[4].split(':')
          this.timeStart.length = 2
          this.timeStart = this.timeStart.join(':')
          this.timeEnd = this.dateEnd[4].split(':')
          this.timeEnd.length = 2
          this.timeEnd = this.timeEnd.join(':')
          // delete time from dateStart
          this.dateStart.pop()
          this.dateStart = this.dateStart.join(' ')

          // this.sessionList.push({
          //   uuid: this.history.categorySessions[i].uuid,
          //   classCategoryUuid: this.history.categorySessions[i].classCategoryUuid,
          //   month: this.history.categorySessions[i].month,
          //   startDate: this.history.categorySessions[i].startDate,
          //   endDate: this.history.categorySessions[i].endDate,
          //   status: this.history.categorySessions[i].status,
          //   dateTime: this.dateStart + ' (' + this.timeStart + ' - ' + this.timeEnd + ')'
          // })
        }
      }
    },
    handlePreviewModal (id, isAttend, review, user) {
      const selectedSession = this.categorySessions.filter(session => session.uuid === id)
      this.isAttend = isAttend
      if (isAttend) {
        this.reviewObject = {
          ...review,
          categoryTitle: this.history.title,
          startTime: milisecondToFullDate(selectedSession[0].startDate) || 'tgl Sesi',
          user
        }
      } else {
        this.reviewObject = {
          classReason: review,
          categoryTitle: this.history.title,
          startTime: milisecondToFullDate(selectedSession[0].startDate) || 'tgl Sesi',
          user
        }
      }

      this.showReviewModal = true
    },
    getParticipantImageUrl (participant) {
      return participant && participant.user &&
        participant.user.file
        ? staticUrl + participant.user.file.efilename
        : require('@/assets/images/logos/sportiv-logo-small.png')
    },
    handleParticipantCount () {
      this.participantCount = this.sessionHistoryParticipant.length
      this.checkIn = 0
      for (let i = 0; i < this.participantCount; i++) {
        if (this.sessionHistoryParticipant[i].isCheckIn) {
          this.checkIn++
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-text-field__details {
  display: none !important;
}

.class-category-history {
  width: 100%;

  &__header {
    color: $neutral-grey;
    margin: 0;
    padding: 0;

    &--left {
      width: 300px;
    }

    &--action {
      text-align: center !important;
      white-space: nowrap;
      text-align: justify;
    }

    &--background {
      height: 52px;
    }
  }

  &__item {
    color: #000000;
    margin: 0;
    padding: 0;

    &--center {
      text-align: center;
    }

    &--red {
      color: $red-100 !important;
    }

    &--green {
      color: $green-100 !important;
    }

    &--grey {
      color: $neutral-grey !important;
    }
  }
}

// ::v-deep .v-tooltip__content {
//   border-radius: 8px !important;
// }
</style>
