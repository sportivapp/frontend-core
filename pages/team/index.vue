<template>
  <under-construction-page />
</template>

<script>
import UnderConstructionPage
  from '@/components/Backgrounds/UnderConstructionPage'
export default {
  name: 'Team',
  components: { UnderConstructionPage },
  head () {
    return {
      title: this.$t('common.team')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
