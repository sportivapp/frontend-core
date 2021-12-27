<template>
  <table class="category-schedule-list">
    <tr
      v-for="(schedule, index) in value"
      :key="index"
      class="category-schedule-list__row"
    >
      <td class="category-schedule-list__number">
        {{ index + 1 }}.
      </td>
      <td class="category-schedule-list__cell">
        <category-landing-schedule-list-item
          v-model="value[index]"
          :index="index"
          :total-data="value.length"
          :is-fee-per-session="isFeePerSession"
          :session-fee="sessionFee"
          :category-period="categoryPeriod"
          @delete="handleDeleteSchedule"
          @validate="$emit('validate')"
        />
      </td>
    </tr>
    <tr>
      <td colspan="2" class="category-schedule-list__add">
        <v-btn
          outlined=""
          class="category-schedule-list__add-btn"
          @click="handleClickAddSchedule"
        >
          Tambah
        </v-btn>
      </td>
    </tr>
  </table>
</template>

<script>

import CategoryLandingScheduleListItem from '@/components/Class/Category/CategoryLandingScheduleListItem'
import { duplicateObject } from '@/utils/object'

const defaultAddNewSchedule = {
  startTimeDate: null,
  endTimeDate: null,
  isRecurring: true,
  price: 0,
  startTime: null,
  endTime: null
}

export default {
  name: 'CategoryLandingScheduleList',
  components: {
    CategoryLandingScheduleListItem
  },
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    accessFrom: {
      type: String,
      default: ''
    },
    sessionFee: {
      type: Number,
      default: 0
    },
    isFeePerSession: {
      type: Boolean,
      required: true
    },
    categoryPeriod: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    disableAddSchedule () {
      return this.value.length >= 7
    }
  },
  methods: {
    handleDeleteSchedule (deleteIndex) {
      const newArray = duplicateObject(this.value)
      newArray.splice(deleteIndex, 1)
      this.$emit('input', newArray)
    },
    handleClickAddSchedule () {
      const newArray = duplicateObject(this.value)
      newArray.push({ ...defaultAddNewSchedule })
      this.$emit('input', newArray)
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss" scoped>
.category-schedule-list {
  width: 100%;

  &__number, &__cell {
    padding: 4px 0;
  }

  &__number{
    width: 13px;
  }

  &__delete {
    width: auto;
  }

  &__add-btn {
    color: $orange-100 !important;
  }
}
</style>
