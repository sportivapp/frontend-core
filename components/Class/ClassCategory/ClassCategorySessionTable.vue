<template>
  <v-data-table
    class="class-category-session"
    :items="categorySession"
  >
    <template v-slot:header>
      <thead class="class-category-session__header-container">
        <tr class="class-category-session__header--background">
          <th class="class-category-session__header--left pl-10">
            <span class="class-category-session__header--left">
              Hari
            </span>
          </th>
          <th class="class-category-session__header--left">
            <span class="class-category-session__header--left">
              Tanggal
            </span>
          </th>
          <th class="class-category-session__header--date">
            <span class="class-category-session__header--date">
              Tahun
            </span>
          </th>
          <th class="class-category-session__header--left">
            <span class="class-category-session__header--left">
              Jam
            </span>
          </th>
          <th class="class-category-session__header--left">
            <span class="class-category-session__header--left">
              Status
            </span>
          </th>
          <th class="class-category-session__header" />
        </tr>
      </thead>
    </template>
    <template v-slot:item="{ item }">
      <class-category-session-row
        :session="item"
        :category="session"
        :value="value"
      />
    </template>
  </v-data-table>
</template>

<script>
import ClassCategorySessionRow from '@/components/Class/ClassCategory/ClassCategorySessionRow'

export default {
  name: 'ClassCategorySessionTable',
  components: { ClassCategorySessionRow },
  props: {
    value: {
      type: Array,
      required: true
    },
    session: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      categorySession: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.categorySession = this.value
    }
  }
}
</script>

<style lang="scss" scoped>
.class-category-session {
  width: 100%;

  &__header {
    color: $neutral-grey;
    margin: 0;
    padding: 0;

    &--left {
      width: 160px;
    }

    &--date {
      width: 100px;
    }

    &--background {
      height: 52px;
    }
  }
}

// ::v-deep .v-tooltip__content {
//   border-radius: 8px !important;
// }
</style>
