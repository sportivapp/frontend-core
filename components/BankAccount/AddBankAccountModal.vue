<template>
  <v-dialog v-model="value" max-width="456px" persistent="">
    <v-card>
      <v-container class="px-5 pt-6">
        <v-row>
          <v-col>
            <p class="spv-heading--2">
              Tambah Rekening
            </p>
          </v-col>
          <v-col align-self="start" cols="1" class="pt-1">
            <v-btn icon="" class="float-right" @click="$emit('input',false)">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mx-1">
          <p class="spv-body--1 grey--text mb-1">
            Nama Bank<span class="red--text">*</span>
          </p>
        </v-row>
        <v-row class="mx-1">
          <v-select
            v-model="bankAccount.masterBankId"
            outlined=""
            :items="bankList"
            item-value="id"
            item-text="name"
            placeholder="Pilih nama bank"
            dense=""
          />
        </v-row>
        <v-row>
          <v-col class="px-7 py-0">
            <v-row class="pa-0" align="center">
              <p class="spv-body--1 grey--text mb-1 pr-2">
                Nomor Rekening<span class="red--text">*</span>
              </p>
              <v-tooltip
                v-model="show"
                bottom=""
              >
                <template v-slot:activator="{on, attrs}">
                  <v-icon
                    class="mb-1"
                    size="18"
                    v-bind="attrs"
                    color="grey"
                    v-on="on"
                  >
                    mdi-information
                  </v-icon>
                </template>
                <span>Bukan no Virtual Account atau E-wallet</span>
              </v-tooltip>
            </v-row>
            <v-row>
              <v-text-field v-model="bankAccount.accountNumber" outlined="" dense />
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="px-7 py-0">
            <v-row>
              <p class="spv-body--1 grey--text mb-1 pr-2">
                Nama Pemilik Rekening<span class="red--text">*</span>
              </p>
              <v-tooltip
                v-model="show"
                bottom=""
              >
                <template v-slot:activator="{on, attrs}">
                  <v-icon
                    class="mb-1"
                    size="18"
                    v-bind="attrs"
                    color="grey"
                    v-on="on"
                  >
                    mdi-information
                  </v-icon>
                </template>
                <span>Nama harus ditulis lengkap sesuai yang tertera di rekening.</span>
              </v-tooltip>
            </v-row>
            <v-row>
              <v-text-field v-model="bankAccount.accountName" outlined="" dense />
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-card height="72px" class="mt-10">
        <v-row justify="end" class="mx-6">
          <v-btn width="140px" class="mt-4 white--text" color="#0AB281" @click="handleSaveBankAccount">
            Simpan
          </v-btn>
        </v-row>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddBankAccountModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    bankList: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    bankAccount: {}
  }),
  methods: {
    ...mapActions('setting', ['createCompanyBank']),
    handleSaveBankAccount () {
      const body = {
        ...this.bankAccount,
        accountNumber: this.bankAccountNumber(this.bankAccount.accountNumber)
      }
      this.createCompanyBank({ body, successCallback: this.successCallback })
    },
    successCallback () {
      this.$emit('input', false)
      this.$router.go(0)
    },
    bankAccountNumber (num) {
      let accNum = ''
      for (let i = 0; i < num.length; i += 4) {
        accNum += num.substring(i, i + 4)
        if (!(i + 4 >= num.length)) { accNum += '-' }
      }
      return accNum
    }
  }
}
</script>
