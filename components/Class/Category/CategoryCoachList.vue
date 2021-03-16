<template>
  <table class="category-coach-list">
    <tr
      v-for="(coach, index) in value"
      :key="index"
      class="category-coach-list__row"
    >
      <td class="category-coach-list__number">
        {{ index + 1 }}.
      </td>
      <td class="category-coach-list__cell">
        <category-coach-list-item
          :class-coach-user-ids="classCoachUserIds"
          :category-coach-ids="value"
          :coach="value[index]"
          :index="index"
          :total-data="value.length"
          @delete="handleDeleteCoach"
          @change="handleChangeCoach"
        />
      </td>
    </tr>
    <tr>
      <td colspan="2" class="category-coach-list__add">
        <v-btn
          text
          class="category-coach-list__add-btn"
          :disabled="disableAddCoach"
          @click="handleClickAddCoach"
        >
          <v-row>
            <v-col class="px-0">
              <v-icon>
                mdi-plus-circle
              </v-icon>
            </v-col>
            <v-col>
              Tambah Pelatih
            </v-col>
          </v-row>
        </v-btn>
      </td>
    </tr>
  </table>
</template>

<script>
import CategoryCoachListItem
  from '@/components/Class/Category/CategoryCoachListItem'
import { duplicateObject } from '@/utils/object'

export default {
  name: 'CategoryCoachList',
  components: {
    CategoryCoachListItem
  },
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    classCoachUserIds: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    disableAddCoach () {
      return this.value.length >= this.classCoachUserIds.length
    }
  },
  methods: {
    handleDeleteCoach (deleteIndex) {
      const newArray = duplicateObject(this.value)
      newArray.splice(deleteIndex, 1)
      this.$emit('input', newArray)
    },
    handleClickAddCoach () {
      const newArray = duplicateObject(this.value)
      newArray.push(null)
      this.$emit('input', newArray)
    },
    swapCoach (index1, index2) {
      const newArray = duplicateObject(this.value)
      const temp = newArray[index1]
      newArray[index1] = newArray[index2]
      newArray[index2] = temp
      this.$emit('input', newArray)
    },
    changeCoach (index, newCoachId) {
      const newArray = duplicateObject(this.value)
      newArray[index] = newCoachId
      this.$emit('input', newArray)
    },
    handleChangeCoach (indexToChange, newCoachId) {
      const existingNewCoachIndex = this.value.indexOf(newCoachId)
      if (existingNewCoachIndex >= 0) {
        this.swapCoach(indexToChange, existingNewCoachIndex)
        return
      }

      this.changeCoach(indexToChange, newCoachId)
    }
  }
}
</script>

<style lang="scss" scoped>
.category-coach-list {
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
