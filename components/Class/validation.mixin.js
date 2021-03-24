import { required, maxLength, minLength, numeric, requiredIf } from 'vuelidate/lib/validators'
import { isValidPhoneNumber } from '@/utils/validation.js'
export default {
  validations () {
    return {
      classData: {
        title: { required, maxLength: maxLength(50), minLength: minLength(3) },
        industryId: { required },
        description: { required, minLength: minLength(8) },
        stateId: { required },
        cityId: { required },
        addressName: { required },
        address: { required },
        classCoachUserIds: { required },
        picId: { required },
        picMobileNumber: {
          required,
          numeric,
          isValid: v => isValidPhoneNumber(v)
        },
        categories: { required: requiredIf(() => { return !this.isEdit }) }
      },
      rawFiles: { required }
    }
  },
  computed: {
    titleErrors () {
      const errors = []
      if (!this.$v.classData.title.$dirty) { return errors }

      !this.$v.classData.title.required && errors.push('Nama kelas harus di isi')
      !this.$v.classData.title.minLength && errors.push('Nama kelas harus antara 3-50 karakter')
      !this.$v.classData.title.maxLength && errors.push('Nama kelas harus antara 3-50 karakter')

      return errors
    },
    industryIdErrors () {
      const errors = []
      if (!this.$v.classData.industryId.$dirty) { return errors }
      !this.$v.classData.industryId.required && errors.push('Tipe Olahraga harus di isi')
      return errors
    },
    rawFilesErrors () {
      const errors = []
      if (!this.$v.rawFiles.$dirty) { return errors }
      !this.$v.rawFiles.required && errors.push('Minimal 1 Banner')
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.classData.description.$dirty) { return errors }

      !this.$v.classData.description.required && errors.push('Deskripsi harus di isi')
      !this.$v.classData.description.minLength && errors.push('Deskripsi harus di isi')
      return errors
    },
    stateIdErrors () {
      const errors = []
      if (!this.$v.classData.stateId.$dirty) { return errors }

      !this.$v.classData.stateId.required && errors.push('Provinsi harus di isi')
      return errors
    },
    cityIdErrors () {
      const errors = []
      if (!this.$v.classData.cityId.$dirty) { return errors }

      !this.$v.classData.cityId.required && errors.push('Kabupaten/kota harus di isi')
      return errors
    },
    addressNameErrors () {
      const errors = []
      if (!this.$v.classData.addressName.$dirty) { return errors }

      !this.$v.classData.addressName.required && errors.push('Nama Alamat harus di isi')
      return errors
    },
    addressErrors () {
      const errors = []
      if (!this.$v.classData.address.$dirty) { return errors }

      !this.$v.classData.address.required && errors.push('Alamat harus di isi')
      return errors
    },
    classCoachUserIdsErrors () {
      const errors = []
      if (!this.$v.classData.classCoachUserIds.$dirty) { return errors }
      !this.$v.classData.classCoachUserIds.required && errors.push('Pelatih harus di isi')
      return errors
    },
    picIdErrors () {
      const errors = []
      if (!this.$v.classData.picId.$dirty) { return errors }

      !this.$v.classData.picId.required && errors.push('PIC harus di isi')
      return errors
    },
    picMobileNumberErrors () {
      const errors = []
      if (!this.$v.classData.picMobileNumber.$dirty) { return errors }

      !this.$v.classData.picMobileNumber.required && errors.push('No PIC harus di isi')
      !this.$v.classData.picMobileNumber.numeric && errors.push('No PIC harus di isi dengan numerik')
      !this.$v.classData.picMobileNumber.isValid && errors.push('No PIC tidak valid')

      return errors
    },
    categoriesErrors () {
      const errors = []
      if (!this.$v.classData.categories.$dirty) { return errors }

      !this.$v.classData.categories.required && errors.push('Kategori Kelas harus di isi')
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
