<template>
  <v-card outlined rounded="" width="990px">
    <v-row justify="center">
      <v-col align-self="center" cols="1">
        <v-avatar class="ml-4" rounded color="grey" />
      </v-col>
      <v-col align-self="center" cols="3">
        <v-row>
          <p class="spv-caption--3 ma-0">
            PT. {{ bankAccount.bank }}
          </p>
        </v-row>
        <v-row>
          <p class="spv-body--2 ma-0">
            <span class="grey--text">Nama Pemilik: </span>{{ bankAccount.owner }}
          </p>
        </v-row>
      </v-col>
      <v-col align-self="center" cols="5">
        <p class="spv-special--3 ma-0">
          {{ bankAccountNumber }}
        </p>
      </v-col>
      <v-col align-self="center">
        <v-btn class="spv-special--1 grey--text" text>
          Lihat Info
          <v-icon>
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </v-col>
      <v-col align-self="center">
        <v-btn class="spv-special--1 grey--text" icon>
          <v-icon>
            mdi-dots-horizontal
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'BankAccountCard',
  props: {
    bankAccount: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    bankAccountNumber () {
      let num = ''
      for (let i = 0; i < this.bankAccount.number.length; i += 4) {
        num += this.bankAccount.number.substring(i, i + 4)
        if (!(i + 4 >= this.bankAccount.number.length)) { num += '-' }
      }
      return num
    }
  }
}
</script>
