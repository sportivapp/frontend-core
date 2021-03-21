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
        <category-schedule-list-item
          v-model="value[index]"
          :index="index"
          :total-data="value.length"
          @delete="handleDeleteSchedule"
        />
      </td>
    </tr>
    <tr>
      <td colspan="2" class="category-schedule-list__add">
        <v-btn
          text
          class="category-schedule-list__add-btn"
          :disabled="disableAddSchedule"
          @click="handleClickAddSchedule"
        >
          <v-row>
            <v-col class="px-0">
              <v-icon>
                mdi-plus-circle
              </v-icon>
            </v-col>
            <v-col>
              Tambah Jadwal
            </v-col>
          </v-row>
        </v-btn>
      </td>
    </tr>
  </table>
</template>

<script>
import CategoryScheduleListItem
  from '@/components/Class/Category/CategoryScheduleListItem'
import { duplicateObject } from '@/utils/object'

const defaultAddNewSchedule = {
  day: 'MONDAY',
  startHour: 10,
  startMinute: 0,
  endHour: 12,
  endMinute: 0
}

export default {
  name: 'CategoryScheduleList',
  components: {
    CategoryScheduleListItem
  },
  props: {
    value: {
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
    },
    handleCheckValidation (v) {
      console.log(v)
      const newArray = duplicateObject(this.value)
      this.$emit('input', newArray)
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

  &__delete {
    width: auto;
  }

  &__add-btn {
    color: $orange-100 !important;
  }
}
</style>
