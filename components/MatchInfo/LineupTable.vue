<template>
  <v-col>
    <v-row class="spv-subtitle--2" :justify="isPositionRight?'end':'start'">
      {{ title }}
    </v-row>

    <v-row v-for="member in arrData" :key="member.id" :justify="isPositionRight?'end':'start'">
      <lineup-member-card
        :member="member"
        :is-position-right="isPositionRight"
        :enable-show-statistic="enableShowStatistic"
        :single="single"
        @clickStatistic="handleClickStatistic"
      />
    </v-row>
  </v-col>
</template>

<script>
import LineupMemberCard from '@/components/MatchInfo/LineupMemberCard.vue'
export default {
  name: 'LineupTable',
  components: {
    LineupMemberCard
  },
  props: {
    title: {
      type: String,
      default: 'Pemain'
    },
    isPositionRight: {
      type: Boolean,
      default: false
    },
    enableShowStatistic: {
      type: Boolean,
      default: true
    },
    arrData: {
      type: Array,
      default: () => []
    },
    single: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClickStatistic (memberId) {
      const selectedMember = this.arrData.find(member => member.id === memberId)
      this.$emit('clickStatistic', selectedMember)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
