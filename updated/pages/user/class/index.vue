<template>
  <div
    class="class-index"
  >
    <div class="tab-container">
      <v-tabs
        v-model="selectedTab"
        grow=""
      >
        <v-tab>
          <v-icon>
            mdi-compass
          </v-icon>
          Cari Kelas
        </v-tab>
        <v-tab>
          <v-icon>
            mdi-star
          </v-icon>
          Kelas Saya
        </v-tab>
      </v-tabs>
    </div>
    <span v-if="selectedTab===0">
      <class-list class="ma-auto pt-5" access-from="core" />
    </span>
    <span v-else>
      <class-list class="ma-auto pt-5" access-from="saya" />
      <!-- <class-list class="ma-auto pt-5" kelass-access-from="core" :is-kelas-saya="true" /> -->
    </span>
    <home-footer />
    <simple-snack-bar
      v-model="showSuccessSnackBar"
      :message="snackBarData && snackBarData.message"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ClassList from '@/components/Class/ClassList'
import HomeFooter from '@/components/Footer/HomeFooter.vue'
import SimpleSnackBar from '@/components/SnackBar/SimpleSnackBar'

export default {
  name: 'ClassLandingIndexPage',
  components: { ClassList, HomeFooter, SimpleSnackBar },
  data: () => ({
    selectedTab: 0
  }),
  computed: {
    ...mapGetters('class', [
      'hasClassPermission',
      'snackBarData'
    ]),
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
.tab-container{
  background: white;
  padding: 0 10%;
}
</style>
