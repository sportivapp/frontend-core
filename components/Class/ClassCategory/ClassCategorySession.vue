<template>
  <div>
    <div
      v-for="(item, index) in categorySessions"
      :key="index"
      class="class-category-session-table"
    >
      <v-divider v-if="index > 0" />
      <h1 class="class-category-session-table__title">
        {{ convertMonthToIndonesia(item.name) }}
      </h1>
      <class-category-session-table
        :value="mergeSessions(index)"
        :session="session"
        :category="session"
      />
    </div>
  </div>
</template>

<script>
import ClassCategorySessionTable from '@/components/Class/ClassCategory/ClassCategorySessionTable'
import { toIndonesiaMonthText } from '@/utils/date'
export default {
  name: 'ClassCategorySession',
  components: { ClassCategorySessionTable },
  props: {
    session: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      categorySessions: [],
      allSessionsInMonth: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.categorySessions = this.session.categorySessions
    },
    mergeSessions (index) {
      const sessionsPerMonth = []
      const currentSession = this.session.categorySessions[index]
      for (let i = 0; i < currentSession.days.length; i++) {
        currentSession.days[i].sessions.forEach((item) => {
          sessionsPerMonth.push(item)
        })
      }
      return sessionsPerMonth
    },
    convertMonthToIndonesia (text) {
      const month = toIndonesiaMonthText(text.toLowerCase())
      return month.toUpperCase()
    }
  }
}
</script>

<style lang="scss" scoped>
.class-category-session-table {
  width: 100%;

  &__title {
    color: $neutral-black;
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    padding: 60px 0 0 40px;
  }
}

// ::v-deep .v-tooltip__content {
//   border-radius: 8px !important;
// }
</style>
