<template>
  <div class="class-category-table__container">
    <v-data-table
      class="class-category-table"
      :headers="headers"
      :items="value"
      hide-default-header
      hide-default-footer
      disable-sort
    >
      <template v-slot:header>
        <thead class="class-category-table__header spv-subtitle--2">
          <tr>
            <th v-for="header in headers" :key="header">
              <span class="class-category-table__header__text">
                {{ header }}
              </span>
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:body.append>
        <tr class="class-category-table__row--no-hover">
          <td :colspan="headers.length" class="class-category-table__row--no-hover">
            <div class="class-category-table__append">
              <v-btn
                text
                class="class-category-table__add-btn"
                @click="handleClickAddCategory"
              >
                <v-row justify="center" align="center">
                  <v-col cols="auto" class="px-0">
                    <v-icon>
                      mdi-plus-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="auto">
                    Tambah Kategori
                  </v-col>
                </v-row>
              </v-btn>
            </div>
          </td>
        </tr>
      </template>
      <template v-slot:no-data>
        <tr>
          <td :colspan="headers.length">
            &nbsp;
          </td>
        </tr>
      </template>
      <template v-slot:item="{ item, index }">
        <class-category-table-row
          :category="item"
          @edit="handleClickEdit(index)"
          @delete="handleClickDelete(index)"
        />
      </template>
    </v-data-table>

    <class-landing-category-modal
      v-if="showAddCategoryModal"
      :title-text="'Tambah Kategori Kelas'"
      :show="showAddCategoryModal"
      :is-edit="isEditing"
      :index="selectedIndex"
      :initial-data="selectedCategory"
      :class-coach-user-ids="classCoachUserIds"
      @close="handleCloseCategoryModal"
      @save="handleSave"
      @edit="handleEdit"
    />
  </div>
</template>

<script>
import ClassLandingCategoryModal from '@/components/Class/Category/ClassLandingCategoryModal'
import { duplicateObject } from '@/utils/object'

const headers = [
  'Kategori',
  'Jadwal',
  'Harga'
]

export default {
  name: 'ClassLandingCategoryTable',
  components: {
    ClassLandingCategoryModal
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
  data () {
    return {
      headers,
      showAddCategoryModal: false,
      selectedCategory: null,
      isEditing: false,
      selectedIndex: 0
    }
  },
  methods: {
    resetSelection () {
      this.selectedCategory = null
      this.isEditing = false
      this.selectedIndex = 0
    },
    handleCloseCategoryModal () {
      this.showAddCategoryModal = false
    },
    handleClickAddCategory () {
      this.showAddCategoryModal = true
      this.resetSelection()
    },
    handleSave (newCategory) {
      this.showAddCategoryModal = false
      const newArray = duplicateObject(this.value)
      newArray.push(newCategory)
      this.$emit('input', newArray)
    },
    handleEdit ({ index, data }) {
      this.showAddCategoryModal = false
      const newArray = duplicateObject(this.value)
      newArray[index] = duplicateObject(data)
      this.$emit('input', newArray)
    },
    handleClickEdit (index) {
      this.isEditing = true
      this.selectedIndex = index
      this.selectedCategory = duplicateObject(this.value[index])
      this.showAddCategoryModal = true
    },
    handleClickDelete (index) {
      const newArray = duplicateObject(this.value)
      newArray.splice(index, 1)
      this.$emit('input', newArray)
    }
  }
}
</script>

<style lang="scss" scoped>
.class-category-table {
  width: 100%;
  border: 1px solid #D5D5D5;
  border-radius: 8px;

  &__container {
    width: 100%;
  }
  &__header {
    &__text {
      color: $neutral-neutral !important;
    }
  }
  &__append {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__row {
    &--no-hover {
      padding: 0;
      &:hover {
        background: inherit !important;
      }
    }
  }
  &__add-btn {
    color: $orange-100 !important;
    width: 100%;
    height: 100%;
  }
}
</style>
