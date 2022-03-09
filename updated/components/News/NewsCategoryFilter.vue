<template>
  <v-chip-group
    v-model="input"
    active-class="selected-category"
    mandatory
    @change="handleChangeCategory"
  >
    <v-chip v-for="cat in categories" :key="cat.name" outlined>
      {{ cat.name }}
    </v-chip>
  </v-chip-group>
</template>

<script>
export default {
  name: 'NewsCategoryFilter',
  props: {
    value: {
      type: Number,
      required: true
    },
    categories: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      input: {}
    }
  },
  created () {
    this.input = this.value
  },
  methods: {
    handleChangeCategory () {
      this.$emit('input', this.input)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-chip {
  color: $grey-9;
}

.selected-category {
  opacity: 1;
  color: $orange-4;
  border: 1px solid $orange-4;
}
</style>
