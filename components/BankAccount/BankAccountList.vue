<template>
  <v-container>
<<<<<<< HEAD
    <v-row v-for="(account,index) in accountList" :key="index">
=======
    <v-row v-for="account in companyBanks" :key="account.uuid">
>>>>>>> development
      <bank-account-card :bank-account="account" />
    </v-row>
  </v-container>
</template>

<script>
import BankAccountCard from '@/components/BankAccount/BankAccountCard.vue'
<<<<<<< HEAD
=======
import { mapActions, mapGetters } from 'vuex'
>>>>>>> development
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
<<<<<<< HEAD
=======
  },
  computed: {
    ...mapGetters('setting', ['companyBanks'])
  },
  async mounted () {
    await this.getCompanyBanks()
  },
  methods: {
    ...mapActions('setting', ['getCompanyBanks'])
>>>>>>> development
  }
}
</script>

<style lang="scss" scoped>

</style>
