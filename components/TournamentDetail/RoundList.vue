<template>
  <v-row class="match-group-list" no-gutters>
    <v-col
      v-for="(round, index) in groups"
      :key="index"
      cols="12"
      class="match-group-list__item"
    >
      <match-group
        :identifier="identifier"
        :match-group="round"
        :match-groups-length="groups.length"
        :knockout-stage="isKnockoutStage"
      >
        <template v-slot:item="{ group }">
          <slot name="item" :item="group" />
        </template>
      </match-group>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'RoundList',
  props: {
    identifier: {
      type: String,
      default: ''
    },
    isKnockoutStage: {
      type: Boolean,
      default: false
    },
    groups: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>
.match-group-list {
  width: 100%;
  padding-bottom: 22px;

  &__item {
    margin-bottom: 28px;
  }
}

</style>
