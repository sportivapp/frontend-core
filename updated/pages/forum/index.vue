<template>
  <under-construction-page />
</template>

<script>
import UnderConstructionPage
  from '@/components/Backgrounds/UnderConstructionPage'
export default {
  name: 'Forum',
  components: { UnderConstructionPage },
  head () {
    return {
      title: this.$t('common.forum')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
