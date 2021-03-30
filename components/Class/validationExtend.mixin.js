import { required } from 'vuelidate/lib/validators'
export default {
  validations () {
    return {
      categorySchedules: {
        required,
        timeValid: (v) => {
          for (let i = 1; i < v.length; i++) {
            if (v[i].day === v[i - 1].day) {
              if (!((v[i].startHour < v[i - 1].startHour &&
                v[i].endHour > v[i - 1].startHour)) && (v[i].startHour < v[i - 1].endHour ||
                  v[i].endHour > v[i - 1].endHour)) {
                return false
              }
            }
          }
          return true
        }
      },
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
      }
    }
  },
  computed: {
    categorySchedulesErrors () {
      const errors = []
      if (!this.$v.categorySchedules.$dirty) { return errors }
      !this.$v.categorySchedules.required && errors.push('Jadwal Kategori harus di isi minimal 1')
      !this.$v.categorySchedules.timeValid && errors.push('Jadwal tidak boleh berlangsung bersamaan')
      return errors
    },
    categoryPeriodErrors () {
      const errors = []

      if (!this.$v.categoryPeriod.$dirty) { return errors }
      !this.$v.categoryPeriod.required && errors.push('Masa Berlangsung jadwal harus di isi')
      !this.$v.categoryPeriod.validPeriodRange && errors.push('Masa Berlangsung maksimal 3 bulan')
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
