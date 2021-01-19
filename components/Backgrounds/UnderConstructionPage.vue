<template>
  <v-container class="under-construction-page" fluid fill-height>
    <under-construction />
  </v-container>
</template>

<script>
import UnderConstruction from '@/components/Backgrounds/UnderConstruction'
export default {
  name: 'UnderConstructionPage',
  components: { UnderConstruction }
}
</script>

<style lang="scss" scoped>
.under-construction-page{
  background-color: $grey-10;
}
</style>
