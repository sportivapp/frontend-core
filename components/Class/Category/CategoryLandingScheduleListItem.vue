<template>
  <v-row class="schedule-row" align="center">
    <v-col class="pa-0">
      <v-row class="schedule-row__card ma-0">
        <v-col class="py-0 px-1" align-self="center">
          <v-menu
            bottom=""
            offset-y=""
          >
            <template v-slot:activator="{attrs, on}">
              <v-text-field
                v-model="selectedDate"
                class="spv-body--2"
                v-bind="attrs"
                outlined=""
                placeholder="Pilih Tanggal"
                dense
                :disabled="categoryPeriod.length < 2"
                readonly=""
                hide-details
                append-icon="mdi-menu-down"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="selectedDate"
              no-title=""
              scrollable=""
              :min="categoryPeriod[0]"
              :max="categoryPeriod[1]"
              @change="handleChange"
            />
          </v-menu>
        </v-col>
        <v-col class="py-0 px-1" align-self="center">
          <v-select
            v-model="isRecurring"
            class="spv-body--2"
            :items="scheduleType"
            item-text="text"
            item-value="isRecurring"
            outlined=""
            dense
            hide-details=""
            @change="handleChange"
          />
        </v-col>
        <v-col class="py-0" align-self="center">
          <v-row align="center" justify="center">
            <span>|</span>
            <v-menu
              ref="menu"
              bottom=""
              offset-y=""
              :nudge-right="40"
              :close-on-content-click="false"
              :close-on-click="false"
              :return-value.sync="startTime"
            >
              <template v-slot:activator="{attrs, on}">
                <v-text-field
                  v-model="startTime"
                  class="time-text-field spv-body--2"
                  v-bind="attrs"
                  outlined=""
                  placeholder="00.00"
                  dense
                  readonly=""
                  hide-details
                  append-icon="mdi-menu-down"
                  v-on="on"
                />
              </template>
              <v-time-picker
                v-model="startTime"
                @click:minute="$refs.menu.save(startTime)"
                @change="handleChange"
              />
            </v-menu>
            <span>-</span>
            <v-menu
              ref="menuEnd"
              bottom=""
              offset-y=""
              :nudge-right="40"
              :close-on-content-click="false"
              :return-value.sync="endTime"
            >
              <template v-slot:activator="{attrs, on}">
                <v-text-field
                  v-model="endTime"
                  class="time-text-field spv-body--2"
                  v-bind="attrs"
                  outlined=""
                  placeholder="00.00"
                  dense
                  readonly=""
                  hide-details
                  append-icon="mdi-menu-down"
                  v-on="on"
                />
              </template>
              <v-time-picker
                v-model="endTime"
                @click:minute="$refs.menuEnd.save(endTime)"
                @change="handleChange"
              />
            </v-menu>
            <span>|</span>
          </v-row>
        </v-col>
        <v-col class="py-0 px-1" align-self="center">
          <v-text-field
            v-model.number="sessionFeeGen"
            :value="sessionFee"
            type="number"
            outlined=""
            dense
            :disabled="!isFeePerSession"
            :filled="!isFeePerSession"
            hide-details=""
            class="ml-2"
            placeholder="0"
            @change="handleChange"
          >
            <template v-slot:prepend-inner>
              <span class="spv-subtitle--2 text-field--custom__prepend">
                Rp
              </span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="auto" class="pa-0 ma-0 ">
      <v-btn icon="" @click="$emit('delete', index)">
        <v-icon size="24">
          mdi-delete
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { milisecondToFullDate, milisecondForDatePicker } from '@/utils/date'
export default {
  name: 'CategoryLandingScheduleListItem',
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    isFeePerSession: {
      type: Boolean,
      required: true
    },
    sessionFee: {
      type: Number,
      default: 0
    },
    categoryPeriod: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    selectedDate: null,
    scheduleType: [
      {
        text: 'Berulang tiap minggu',
        isRecurring: true
      },
      {
        text: 'Tidak berulang',
        isRecurring: false
      }
    ],
    fee: null,
    startTime: null,
    endTime: null
  }),
  computed: {
    convertedDate () {
      const cDate = new Date(this.selectedDate)
      return milisecondToFullDate(cDate.getTime())
    },
    sessionFeeGen: {
      set (v) {
        this.fee = v
      },
      get () {
        if (!this.isFeePerSession) {
          return this.sessionFee
        }
        return null
      }
    }
  },
  watch: {
    value: {
      handler (v) {
        if (v) {
          this.initData(v)
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    initData (v) {
      this.selectedDate = v.startTimeDate ? milisecondForDatePicker(v.startTimeDate) : new Date().toISOString().substr(0, 10)
      this.isRecurring = v.isRecurring
      this.startTime = v.startTime
      this.endTime = v.endTime
      this.fee = v.price
    },
    handleChange () {
      const session = {
        startTimeDate: this.generateDate(this.selectedDate, this.startTime),
        endTimeDate: this.generateDate(this.selectedDate, this.endTime),
        isRecurring: this.isRecurring,
        price: this.isFeePerSession ? this.fee : 0,
        startTime: this.startTime,
        endTime: this.endTime
      }
      this.$emit('input', session)
    },
    generateDate (selectedDt, time) {
      const dt = new Date(selectedDt)
      if (time && selectedDt) {
        const timeArr = time.split(':')
        // dt.setHours(timeArr[0])
        new Date(dt).setHours(dt.getHours() + timeArr[0])
        // dt.setMinutes(timeArr[1])
        new Date(dt).setMinutes(dt.getMinutes() + timeArr[1])
      }
      const getTime = dt.getTime()
      return getTime
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule-row{
  width: 100%;
  margin: 0;
  position: relative;

  &__card{
    height: 54px;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 8px;
  }
}

.time-text-field{
  width: 80px;
}

</style>
