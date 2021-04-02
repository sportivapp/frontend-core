<template>
  <v-container>
    <v-row v-for="(account,index) in accountList" :key="index">
      <bank-account-card :bank-account="account" />
    </v-row>
  </v-container>
</template>

<script>
import BankAccountCard from '@/components/BankAccount/BankAccountCard.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'BankAccountList',
  components: {
    BankAccountCard
  },
  props: {
    accountList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters('setting', 'companyBanks')
  },
  created () {
    this.getCompanyBanks()
  },
  methods: {
    ...mapActions('setting', ['getCompanyBanks'])
  }
}
</script>

<style lang="scss" scoped>

</style>
