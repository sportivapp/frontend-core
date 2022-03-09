<template>
  <v-btn
    :disabled="disabled"
    :type="type"
    :class="[
      'sportiv-btn',
      {'sportiv-btn--disabled': disabled}
    ]"
    @click="handleClick"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: 'SportivButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'normal'
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.sportiv-btn {
  width: 100%;
  background-color: $green-1 !important;
  ::v-deep span {
    color: white;
  }

  &--disabled {
    background-color: $grey-1 !important;
    ::v-deep span {
      color: $grey-2 !important;
    }
  }

  border-radius: 10px;
}
</style>
