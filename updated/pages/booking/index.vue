<template>
  <under-construction-page />
</template>

<script>
import UnderConstructionPage
  from '@/components/Backgrounds/UnderConstructionPage'
export default {
  name: 'Booking',
  components: { UnderConstructionPage },
  head () {
    return {
      title: this.$t('common.booking')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
