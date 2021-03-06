import { required } from 'vuelidate/lib/validators'
export default {
  validations () {
    return {
      categoryTitle: { required },
      categoryDescription: { required },
      categorySchedules: { required },
      categoryPeriod: {
        required,
        validPeriodRange: (v) => {
          if (v.length === 2) {
            const totalMonths = Number(v[1].substr(5, 2)) - Number(v[0].substr(5, 2))
            const positifTotalMonth = totalMonths > 0 ? totalMonths : totalMonths * -1
            return positifTotalMonth < 3
          }
          return false
        }
      },
      categoryCoachUserIds: {
        required,
        firstArrayIsFilled: (v) => {
          return v[0] !== null
        }
      }
    }
  },
  computed: {
    categoryTitleErrors () {
      const errors = []
      if (!this.$v.categoryTitle.$dirty) { return errors }
      !this.$v.categoryTitle.required && errors.push('Judul Kategori harus di isi')
      return errors
    },
    categoryDescriptionErrors () {
      const errors = []
      if (!this.$v.categoryDescription.$dirty) { return errors }
      !this.$v.categoryDescription.required && errors.push('Deskripsi kategori harus di isi')
      return errors
    },
    categorySchedulesErrors () {
      const errors = []
      if (!this.$v.categorySchedules.$dirty) { return errors }
      !this.$v.categorySchedules.required && errors.push('Jadwal Kategori harus di isi minimal 1')
      return errors
    },
    categoryPeriodErrors () {
      const errors = []

      if (!this.$v.categoryPeriod.$dirty) { return errors }
      !this.$v.categoryPeriod.required && errors.push('Masa Berlangsung jadwal harus di isi')
      !this.$v.categoryPeriod.validPeriodRange && errors.push('Masa Berlangsung maksimal 3 bulan')
      return errors
    },
    categoryCoachUserIdsErrors () {
      const errors = []
      if (!this.$v.categoryCoachUserIds.$dirty) { return errors }
      !this.$v.categoryCoachUserIds.required && errors.push('Pelatih harus di isi')
      !this.$v.categoryCoachUserIds.firstArrayIsFilled && errors.push('Nama pelatih harus di isi')
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
