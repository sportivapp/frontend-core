<template>
  <v-btn class="show-more-btn" color="#0AB28A" outlined @click="handleClick">
    {{ $t('common.showMore') }}
  </v-btn>
</template>

<script>
export default {
  name: 'ShowMoreButton',
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.show-more-btn {
  width: 100%;
  color: $green-1;
  border-radius: 8px;
}
</style>
