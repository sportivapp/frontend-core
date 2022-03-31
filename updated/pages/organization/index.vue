<template>
  <under-construction-page />
</template>

<script>
import UnderConstructionPage
  from '@/components/Backgrounds/UnderConstructionPage'
export default {
  name: 'Organization',
  components: { UnderConstructionPage },
  head () {
    return {
      title: this.$t('common.organization')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
