<template>
  <under-construction-page />
</template>

<script>
import UnderConstructionPage
  from '@/components/Backgrounds/UnderConstructionPage'
export default {
  name: 'Contact',
  components: { UnderConstructionPage },
  head () {
    return {
      title: this.$t('common.contact')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
