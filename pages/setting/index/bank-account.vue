<template>
  <v-container class="px-0">
    <add-bank-account-modal v-model="showModal" :bank-list="allBanks" @saveAccount="handleSaveBankAccount" />
    <v-row class="mx-0 pa-0">
      <v-col>
        <v-row class="px-0">
          <h1>Daftar Rekening Bank</h1>
        </v-row>
        <v-row class="px-0">
          <p class="spv-body--2 grey--text">
            Rekening bank boleh lebih dari satu.
          </p>
        </v-row>
      </v-col>
      <v-col>
        <v-row justify="end" align="center" class="px-0">
          <v-btn class="white--text" color="primary" @click="showModal = true">
            <v-icon>
              mdi-plus-circle
            </v-icon>
            &nbsp; Tambah Rekening
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mx-0 pa-0">
      <bank-account-list :account-list="bankAccountList" />
    </v-row>
  </v-container>
</template>

<script>
import AddBankAccountModal from '@/components/BankAccount/AddBankAccountModal'
import BankAccountList from '@/components/BankAccount/BankAccountList'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'BankAccountPage',
  components: {
    AddBankAccountModal,
    BankAccountList
  },
  data: () => ({
    showModal: false,
    bankAccountList: []
  }),
  computed: {
    ...mapGetters('setting', ['allBanks'])
  },
  created () {
    this.getAllBanks()
  },
  methods: {
    ...mapActions('setting', ['getAllBanks']),
    handleSaveBankAccount (account) {
      this.bankAccountList.push(account)
    }
  }
}
</script>

<style lang="scss" scoped>
h1{
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
}
</style>
