<template>
  <v-container>
    <v-row v-for="(account,index) in accountList" :key="index">
      <bank-account-card :bank-account="account" />
    </v-row>
  </v-container>
</template>

<script>
import BankAccountCard from '@/components/BankAccount/BankAccountCard.vue'
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
  }
}
</script>

<style lang="scss" scoped>

</style>
