<template>
  <div
    v-if="hasReadPermission"
    class="class-index"
  >
    <class-list class="ma-auto pt-5" />
    <home-footer />
    <simple-snack-bar
      v-model="showSuccessSnackBar"
      :message="snackBarData && snackBarData.message"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { permissions } from '@/config/permission'
import ClassList from '@/components/Class/ClassList'
import HomeFooter from '@/components/Footer/HomeFooter.vue'
import SimpleSnackBar from '@/components/SnackBar/SimpleSnackBar'

export default {
  name: 'ClassIndexPage',
  layout: 'class',
  components: { ClassList, HomeFooter, SimpleSnackBar },
  computed: {
    ...mapGetters('class', [
      'hasClassPermission',
      'snackBarData'
    ]),
    hasReadPermission () {
      return this.hasClassPermission(permissions.read)
    },
    showSuccessSnackBar: {
      get () {
        return this.snackBarData.value
      },
      set () {}
    }
  },
  head () {
    return {
      title: this.$t('common.class')
    }
  }
}
</script>

<style lang="scss" scoped>
.class-index {
  background-color: $grey-10;
}
</style>
