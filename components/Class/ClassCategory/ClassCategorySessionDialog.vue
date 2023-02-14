<template>
  <v-dialog
    v-model="sync"
    max-width="900"
    @click:outside="handleClickOutside"
  >
    <v-card class="scroll-card">
      <v-card-title class="session-dialog__card__title py-5">
        {{ category.title }}
      </v-card-title>
      <v-divider />
      <v-row align="center" justify="center" no-gutters>
        <v-col class="session-dialog px-0 py-5" cols="auto" md="4">
          <span class="spv-subtitle--1 ">
            {{ date ? date : '' }}
          </span>
        </v-col>
        <v-col class="session-dialog px-0 py-5" cols="auto" md="4">
          <span class="spv-subtitle--2 pr-1">
            Hadir
          </span>
          <span class="session-dialog__green spv-subtitle--2">
            {{ checkIn }}
          </span>
          <span class="session-dialog session-dialog__grey spv-subtitle--2">
            /{{ participantCount }}
          </span>
        </v-col>
        <v-col class="session-dialog__right px-0 py-5" cols="auto" md="2" />
      </v-row>
      <v-divider />
      <v-container class="mx-auto px-1 pb-5">
        <v-data-table
          class="session-dialog"
          hide-default-footer
          :items="sessionParticipant"
        >
          <template v-slot:header>
            <thead class="session-dialog__header-container">
              <tr class="session-dialog__header--background">
                <th class="session-dialog__header--left pl-10">
                  <span class="session-dialog__header">
                    Name
                  </span>
                </th>
                <th class="session-dialog__header--left">
                  <span class="session-dialog__header">
                    Email
                  </span>
                </th>
                <th class="session-dialog__header--left session-dialog__header--center">
                  <span class="session-dialog__header--center">
                    Kehadiran
                  </span>
                </th>
              </tr>
            </thead>
          </template>
          <template v-slot:item="{ item }">
            <tr class="session-dialog">
              <td class="session-dialog pl-10">
                <v-avatar size="30" class="mr-3">
                  <v-img :src="getParticipantImageUrl(item)" />
                </v-avatar>
                <span class="session-dialog__number">
                  {{ item.user.eusername }}
                </span>
              </td>
              <td class="session-dialog">
                <span>
                  {{ item.user.euseremail }}
                </span>
              </td>
              <td
                v-if="!item.isCheckIn"
                class="session-dialog__center"
              >
                <span>
                  <v-icon class="session-dialog__red">
                    mdi-close-circle
                  </v-icon>
                </span>
              </td>
              <td
                v-else
                class="session-dialog__center"
              >
                <span>
                  <v-icon class="session-dialog__green">
                    mdi-check-circle
                  </v-icon>
                </span>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { staticUrl } from '@/config/api'

export default {
  name: 'ClassCategorySessionDialog',
  components: { },
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
      isCheckIn: '',
      date: '',
      checkIn: 0,
      participantCount: 0
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
      this.getSessionParticipantList()
      this.handleDate()
    },
    constructParams () {
      return {
        isCheckIn: this.isCheckIn
      }
    },
    getSessionParticipantList (init = true) {
      this.isTableLoading = true
      this.getSessionParticipant({
        init,
        classCategoryId: this.category.classCategoryUuid,
        sessionId: this.session.uuid,
        params: this.constructParams(),
        successCallback: this.handleParticipantCount
      })
    },
    getParticipantImageUrl (participant) {
      return participant && participant.user &&
        participant.user.file
        ? staticUrl + participant.user.file.efilename
        : require('@/assets/images/logos/sportiv-logo-small.png')
    },
    handleDate () {
      this.date = this.session.startDate ? this.session.startDate : ''
      if (this.date) {
        this.date = new Date(parseInt(this.date, 10))
        const options = {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
        this.date = this.date.toLocaleDateString('id-ID', options)
      }
    },
    handleParticipantCount () {
      this.participantCount = this.sessionParticipant.length
      for (let i = 0; i < this.participantCount; i++) {
        if (this.sessionParticipant[i].isCheckIn !== null) {
          this.checkIn++
        }
      }
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

.session-dialog{

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
