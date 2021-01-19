<template>
  <under-construction-page />
</template>

<script>
import UnderConstructionPage
  from '@/components/Backgrounds/UnderConstructionPage'
export default {
  name: 'Tournament',
  components: { UnderConstructionPage },
  head () {
    return {
      title: this.$t('common.tournament')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
