<template>
  <under-construction-page />
</template>

<script>
import UnderConstructionPage
  from '@/components/Backgrounds/UnderConstructionPage'
export default {
  name: 'FAQ',
  components: { UnderConstructionPage },
  head () {
    return {
      title: this.$t('common.faq')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
