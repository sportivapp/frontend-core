import { required } from 'vuelidate/lib/validators'
export default {
  validations () {
    return {
      categorySchedules: {
        required,
        hourValid: (v) => {
          for (let i = 0; i < v.length; i++) {
            if (v[i].endHour < v[i].startHour) {
              return false
            } else if (v[i].endHour === v[i].startHour) {
              if (v[i].endMinute <= v[i].startMinute) {
                return false
              }
            }
          }
          return true
        },
        timeValid: (v) => {
          for (let i = 0; i < v.length - 1; i++) {
            for (let j = i + 1; j < v.length; j++) {
              if (v[i].day === v[j].day) {
                if (!(Number(v[j].startHour) < Number(v[i].startHour) ||
                Number(v[j].startHour) > Number(v[i].endHour)) ||
                !(Number(v[j].endHour) < Number(v[i].startHour) ||
                Number(v[j].endHour) > Number(v[i].endHour))) {
                  return false
                }
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
      !this.$v.categorySchedules.hourValid && errors.push('Jam mulai harus lebih kecil dari jam berakhir')

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
