<template>
  <v-container>
    <v-row v-for="account in companyBanks" :key="account.uuid">
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
    ...mapGetters('setting', ['companyBanks'])
  },
  async mounted () {
    await this.getCompanyBanks()
  },
  methods: {
    ...mapActions('setting', ['getCompanyBanks'])
  }
}
</script>

<style lang="scss" scoped>

</style>
