<template>
  <v-card outlined rounded="" width="990px" class="mb-5">
    <v-row justify="center" class="my-2">
      <v-col align-self="center" cols="1">
        <v-avatar class="ml-4" rounded color="grey" />
      </v-col>
      <v-col align-self="center" cols="3">
        <v-row>
          <p class="spv-caption--3 ma-0">
            PT. {{ bankAccount.masterBank.name }}
          </p>
        </v-row>
        <v-row>
          <p class="spv-body--2 ma-0">
            <span class="grey--text">Nama Pemilik: </span>{{ bankAccount.accountName }}
          </p>
        </v-row>
      </v-col>
      <v-col align-self="center" cols="5">
        <p class="spv-special--3 ma-0">
          {{ bankAccount.accountNumber }}
        </p>
      </v-col>
      <v-col align-self="center">
        <v-btn v-show="false" class="spv-special--1 grey--text" text>
          Lihat Info
          <v-icon>
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </v-col>
      <v-col align-self="center">
        <v-menu
          offset-y=""
        >
          <template v-slot:activator="{on,attrs}">
            <v-btn
              class="spv-special--1 grey--text float-right mr-4"
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-dots-horizontal
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item dense="" @click="handleDeleteBank">
              Hapus Rekening
            </v-list-item>
            <v-list-item dense="" @click="handlePrimaryBank">
              Jadikan rekening utama
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'BankAccountCard',
  props: {
    bankAccount: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    show: false
  }),
  computed: {
    bankAccountNumber () {
      let num = ''
      for (let i = 0; i < this.bankAccount.number.length; i += 4) {
        num += this.bankAccount.number.substring(i, i + 4)
        if (!(i + 4 >= this.bankAccount.number.length)) { num += '-' }
      }
      return num
    }
  },
  methods: {
    ...mapActions('setting', ['deleteBank']),
    handleDeleteBank () {
      const params = { bankUuid: this.bankAccount.uuid }
      this.deleteBank({ params, successCallback: this.reloadPage() })
    },
    handlePrimaryBank () {

    },
    reloadPage () {
      this.$router.go(0)
    }
  }
}
</script>
