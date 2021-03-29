<template>
  <div
    v-if="hasReadPermission"
    class="class-index"
  >
    <div class="bank-account-container">
      <v-row>
        <p>Nama Organisasi: PT. Indo</p>
      </v-row>
      <v-row>
        <v-sheet rounded="" width="1120px">
          <div class="mx-16 mt-3">
            <v-row>
              <p class="title-text">
                Pengaturan
              </p>
            </v-row>
            <v-row>
              <v-tabs>
                <v-tab class="submenu" to="/setting/bank-account">
                  REKENING BANK
                </v-tab>
              </v-tabs>
              <nuxt-child />
            </v-row>
          </div>
        </v-sheet>
      </v-row>
    </div>
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
import HomeFooter from '@/components/Footer/HomeFooter.vue'
import SimpleSnackBar from '@/components/SnackBar/SimpleSnackBar'

export default {
  name: 'SettingIndexPage',
  layout: 'class',
  components: { HomeFooter, SimpleSnackBar },
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
.bank-account-container{
  margin: 0 12%;
  padding-top: 5%;
}
.title-text{
  font-weight: 600;
  font-size: 28px;
  line-height: 42px;
  color: #FF7D43;
}
.submenu{
  text-align: left;
}
</style>
