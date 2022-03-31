<template>
  <v-text-field
    v-model="search"
    solo
    hide-details=""
    :label="label"
    prepend-inner-icon="mdi-magnify"
    clearable
    class="search-bar rounded-lg ma-0"
    @change="onChange"
  />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    onChange () {
      if (this.search === null) {
        this.$emit('search', '')
      } else {
        this.$emit('search', this.search)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-input__slot {
  box-shadow: none !important;
  border: 1px solid $light-grey-1;
  border-radius: 8px;
  height: 40px;
}
</style>
