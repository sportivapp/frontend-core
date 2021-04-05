import { required, numeric } from 'vuelidate/lib/validators'

export default {
  validations () {
    return {
      bankAccount: {
        masterBankId: { required },
        accountNumber: { required, numeric },
        accountName: { required }
      }
    }
  },
  computed: {
    masterBankIdError () {
      const errors = []
      if (!this.$v.bankAccount.masterBankId.$dirty) { return errors }
      !this.$v.bankAccount.masterBankId.required && errors.push('Nama bank harus dipilih.')
      return errors
    },
    accountNumberError () {
      const errors = []
      if (!this.$v.bankAccount.accountNumber.$dirty) { return errors }
      !this.$v.bankAccount.accountNumber.required && errors.push('Nomor rekening harus dipilih.')
      !this.$v.bankAccount.accountNumber.numeric && errors.push('Nomor rekening harus numerik.')

      return errors
    },
    accountNameError () {
      const errors = []
      if (!this.$v.bankAccount.accountName.$dirty) { return errors }
      !this.$v.bankAccount.accountName.required && errors.push('Nama pemilik rekening harus dipilih.')
      return errors
    }
  },
  methods: {
    scrollToErrorPosition () {
      this.$nextTick(() => {
        const el = this.$el.getElementsByClassName('error--text')[0]

        if (el) {
          el.scrollIntoView({
            behaviour: 'smooth',
            block: 'center',
            inline: 'center'
          })
        }
      })
    },
    validateForm () {
      this.$v.$touch()
      this.scrollToErrorPosition()
      return !this.$v.$invalid
    },
    resetValidationForm () {
      this.$v.$reset()
    }
  }
}
