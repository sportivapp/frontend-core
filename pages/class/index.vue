<template>
  <under-construction-page />
</template>

<script>
import UnderConstructionPage
  from '@/components/Backgrounds/UnderConstructionPage'
export default {
  name: 'Class',
  components: { UnderConstructionPage },
  head () {
    return {
      title: this.$t('common.class')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
