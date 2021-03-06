<template>
  <v-data-table
    class="class-category-session"
    :items="session.categorySessions"
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
      />
    </template>
  </v-data-table>
</template>

<script>
import ClassCategorySessionRow from '@/components/Class/ClassCategory/ClassCategorySessionRow'

export default {
  name: 'ClassCategorySession',
  components: { ClassCategorySessionRow },
  props: {
    session: {
      type: Object,
      required: true
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
