<template>
  <v-container class="pa-0">
    <div class="form-container form-container__form mx-auto">
      <v-row class="border-bottom mx-1">
        <p class="mt-5 ml-12 spv-heading--2 class-form__title">
          Tambah Kelas
        </p>
      </v-row>
      <form class="mx-16">
        <div>
          <v-row class="spv-heading--3 pt-7">
            Info Kelas
          </v-row>
          <v-row>
            <v-col md="8" cols="12">
              <v-row class="spv-body--1 grey--text">
                Nama Kelas <span class="red--text">*</span>
              </v-row>
              <v-row class="mr-2">
                <v-text-field
                  v-model="classData.title"
                  outlined=""
                  placeholder="Contoh: Kelas Dribble"
                  hint="nama kelas minimal 3-50 karakter."
                  dense=""
                  persistent-hint=""
                  :disabled="isEdit"
                  :error-messages="titleErrors"
                  @input="$v.classData.title.$touch()"
                  @blur="$v.classData.title.$touch()"
                />
              </v-row>
            </v-col>
            <v-col md="4" cols="12">
              <v-row class="spv-body--1 grey--text">
                Tipe Olahraga <span class="red--text">*</span>
              </v-row>
              <v-row>
                <v-select
                  v-model="classData.industryId"
                  outlined=""
                  placeholder="Pilih Tipe Olahraga"
                  dense=""
                  :items="industries"
                  item-value="eindustryid"
                  item-text="eindustryname"
                  :disabled="isEdit"
                  :error-messages="industryIdErrors"
                  @input="$v.classData.industryId.$touch()"
                  @blur="$v.classData.industryId.$touch()"
                />
              </v-row>
            </v-col>
          </v-row>
          <v-row class="spv-body--1 grey--text">
            Banner Kelas <span class="red--text">*</span>
          </v-row>
          <v-row class="mb-5">
            <upload-file
              v-model="rawFiles"
              :init-files="classData.initFiles"
            />
            <small v-if="$v.rawFiles.$error" class="red--text pl-2">
              {{ rawFilesErrors[rawFilesErrors.length-1] }}
            </small>
          </v-row>
          <v-row class="spv-body--1 grey--text">
            Deskripsi Kelas <span class="red--text">*</span>
          </v-row>
          <v-row>
            <div class="class-form__editor-container">
              <editor
                v-model="classData.description"
              />
            </div>
            <small v-if="$v.classData.description.$error" class="red--text pl-2">
              {{ descriptionErrors[descriptionErrors.length-1] }}
            </small>
          </v-row>
        </div>
        <div>
          <v-row class="spv-heading--3 pt-7">
            Lokasi Kelas
          </v-row>
          <v-row>
            <v-col class="mr-2">
              <v-row class="spv-body--1 grey--text">
                Provinsi <span class="red--text">*</span>
              </v-row>
              <v-row>
                <v-select
                  v-model="classData.stateId"
                  outlined=""
                  placeholder="Pilih Provinsi"
                  dense=""
                  :items="provinces"
                  item-value="estateid"
                  item-text="estatename"
                  :error-messages="stateIdErrors"
                  :disabled="isEdit"
                  @change="updateCities"
                  @input="$v.classData.stateId.$touch()"
                  @blur="$v.classData.stateId.$touch()"
                />
              </v-row>
            </v-col>
            <v-col class="ml-2">
              <v-row class="spv-body--1 grey--text">
                Kota/Kabupaten <span class="red--text">*</span>
              </v-row>
              <v-row>
                <v-select
                  v-model="classData.cityId"
                  outlined=""
                  placeholder="Pilih Kota/Kabupaten"
                  dense=""
                  :items="cities"
                  item-value="ecityid"
                  item-text="ecityname"
                  :disabled="isEdit"
                  :error-messages="cityIdErrors"
                  @input="$v.classData.cityId.$touch()"
                  @blur="$v.classData.cityId.$touch()"
                />
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="4" cols="12">
              <v-row class="spv-body--1 grey--text">
                Nama Alamat <span class="red--text">*</span>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="classData.addressName"
                  outlined=""
                  placeholder="Contoh: Gor Tribuana"
                  dense=""
                  :error-messages="addressNameErrors"
                  @input="$v.classData.addressName.$touch()"
                  @blur="$v.classData.addressName.$touch()"
                />
              </v-row>
            </v-col>
            <v-col md="8" cols="12">
              <v-row class="spv-body--1 grey--text ml-2">
                Alamat Pelaksanaan <span class="red--text">*</span>
              </v-row>
              <v-row class="ml-2">
                <v-text-field
                  v-model="classData.address"
                  outlined=""
                  placeholder="Ketik Alamat"
                  dense=""
                  :error-messages="addressErrors"
                  @input="$v.classData.address.$touch()"
                  @blur="$v.classData.address.$touch()"
                />
              </v-row>
            </v-col>
          </v-row>
        </div>
        <div v-if="accessFrom !== 'core'">
          <v-row class="spv-heading--3 pt-7 mb-4">
            Info Pelatih
          </v-row>
          <v-row class="spv-body--1 grey--text">
            Ketua Pelatih <span class="red--text">*</span>
          </v-row>
          <v-row>
            <div class="outlined-container">
              <coach-table
                v-model="classData.classCoachUserIds"
              />
            </div>
            <small v-if="$v.classData.classCoachUserIds.$error" class="red--text pl-2">
              {{ classCoachUserIdsErrors[classCoachUserIdsErrors.length-1] }}
            </small>
          </v-row>
          <v-row>
            <v-col class="mr-2">
              <v-row class="spv-body--1 grey--text">
                PIC <span class="red--text">*</span>
              </v-row>
              <v-row>
                <v-autocomplete
                  v-model="classData.picId"
                  outlined=""
                  placeholder="Ketik Nama PIC"
                  dense=""
                  :items="classUsers"
                  item-text="eusername"
                  item-value="euserid"
                  :search-input.sync="searchText"
                  :error-messages="picIdErrors"
                  @input="$v.classData.picId.$touch()"
                  @blur="$v.classData.picId.$touch()"
                >
                  <template v-slot:item="data">
                    <v-list-item-avatar>
                      <img :src="getUserAvatar(data.item.file)">
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ data.item.eusername }}</v-list-item-title>
                      <v-list-item-subtitle>{{ data.item.euseremail }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-row>
            </v-col>
            <v-col class="ml-2">
              <v-row class="spv-body--1 grey--text">
                Nomor Telepon PIC <span class="red--text">*</span>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="classData.picMobileNumber"
                  outlined=""
                  placeholder="No Telp"
                  dense=""
                  :error-messages="picMobileNumberErrors"
                  @change="checkFrontZero"
                  @input="$v.classData.picMobileNumber.$touch()"
                  @blur="$v.classData.picMobileNumber.$touch()"
                >
                  <template v-slot:prepend-inner>
                    <span class="spv-subtitle--2 text-field--custom__prepend">
                      +62
                    </span>
                  </template>
                </v-text-field>
              </v-row>
            </v-col>
          </v-row>
        </div>
        <div>
          <v-row v-if="!isEdit" class="spv-heading--3 pt-7 pb-3">
            Kategori Kelas
          </v-row>
          <v-row v-if="!isEdit">
            <class-landing-category-table
              v-if="accessFrom === 'core'"
              v-model="classData.categories"
              :class-coach-user-ids="classData.classCoachUserIds"
              :selected-city="classData.cityId"
            />
            <class-category-table
              v-else
              v-model="classData.categories"
              :class-coach-user-ids="classData.classCoachUserIds"
            />
            <small v-if="$v.classData.categories.$error" class="red--text pl-2">
              {{ categoriesErrors[categoriesErrors.length-1] }}
            </small>
          </v-row>
          <v-row class="mt-5 mb-0">
            Biaya Registrasi Awal (Optional)
            <v-switch
              v-model="feeSwitchOn"
              class="ma-0 ml-3 pa-0"
              hide-details=""
              inset=""
            />
          </v-row>
          <v-row class="ma-0 ml-n6" justify="start">
            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="classData.administrationFee"
                type="number"
                :disabled="!feeSwitchOn"
                :filled="!feeSwitchOn"
                outlined=""
                dense
                hide-details=""
                class="text-field--custom mb-5"
              >
                <template v-slot:prepend-inner>
                  <span class="spv-subtitle--2 text-field--custom__prepend">
                    Rp
                  </span>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </div>
      </form>
    </div>
    <v-row justify="end" class="form-container my-5 mx-0">
      <v-btn outlined="" width="200" @click="cancelCreateClass">
        Batal
      </v-btn>
      <v-btn class="ml-4 save-button" outlined="" width="200" @click="createNewClass">
        {{ isEdit?'Simpan':'Tambah Kelas' }}
      </v-btn>
    </v-row>
    <simple-prompt
      :show="showCancelModal"
      :title="$t('userClass.createClassCancelModalTitle')"
      :message="$t('userClass.createClassCancelMessage')"
      action-color="#FF3333"
      :cancel-text="$t('userClass.cancelCancel')"
      :action-text="$t('userClass.cancelAction')"
      @update:show="showCancelModal = false"
      @click:cancel="showCancelModal = false"
      @click:action="handleCancelCreateClass"
    />
    <simple-prompt
      :show="showSaveModal"
      :title="$t('userClass.createClassSaveModalTitle')"
      :message="$t('userClass.createClassSaveMessage')"
      action-color="#0AB281"
      :cancel-text="$t('userClass.cancelCancel')"
      :action-text="$t('userClass.saveAction')"
      @update:show="showSaveModal = false"
      @click:cancel="showSaveModal = false"
      @click:action="handleSaveClass"
    />
  </v-container>
</template>

<script>
import Editor from '@/components/TextEditor/Editor'
import CoachTable from '@/components/Class/CreateClass/CoachTable'
import UploadFile from '@/components/Class/CreateClass/UploadFileNew'
import ClassCategoryTable from '@/components/Class/Category/ClassCategoryTable'
import ClassLandingCategoryTable from '@/components/Class/Category/ClassLandingCategoryTable'
import { mapGetters, mapActions } from 'vuex'
import validationMixin from '@/components/Class/validation.mixin'
import { staticUrl } from '@/config/api'
import SimplePrompt from '@/components/Modal/SimplePrompt'

// const dayNumber = [
//   { code: 'MONDAY', value: 0 },
//   { code: 'TUESDAY', value: 1 },
//   { code: 'WEDNESDAY', value: 2 },
//   { code: 'THURSDAY', value: 3 },
//   { code: 'FRIDAY', value: 4 },
//   { code: 'SATURDAY', value: 5 },
//   { code: 'SUNDAY', value: 6 }
// ]

export default {
  name: 'ClassForm',
  components: {
    Editor,
    CoachTable,
    UploadFile,
    ClassCategoryTable,
    SimplePrompt,
    ClassLandingCategoryTable
  },
  mixins: [validationMixin],
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    accessFrom: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    feeSwitchOn: false,
    selectedProvince: null,
    picId: null,
    searchText: '',
    classData: {
      categories: [],
      classCoachUserIds: []
    },
    rawFiles: [],
    fileIds: [],
    showCancelModal: false,
    showSaveModal: false
  }),
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters(['industries', 'provinces', 'cities', 'user']),
    ...mapGetters('class', ['classUsers', 'userCurrentCompany'])
  },
  // eslint-disable-next-line vue/order-in-components
  watch: {
    searchText: {
      handler (value) {
        // this.handleGetUsers(value) //if use search
      }
    }
  },
  async mounted () {
    await this.getIndustries()
    await this.getUserCurrentCompany({ successCallback: this.handleGetUsers })
    const params = {
      countryId: 1,
      size: 9999
    }
    this.getProvinces({ params })
    if (this.$route.params.classId) {
      // eslint-disable-next-line no-console
      this.initClassData()
    }
  },
  methods: {
    ...mapActions('class', [
      'createClass',
      'updateClass',
      'getUsers',
      'getUserCurrentCompany',
      'uploadFile',
      'getClassDetail']),
    ...mapActions(['getIndustries', 'getProvinces', 'getCities']),
    ...mapActions('classLanding', ['createClassLanding']),
    getUserAvatar (file) {
      return file ? staticUrl + file.efilename : require('@/assets/images/logos/sportiv-logo-small.png')
    },
    async updateCities () {
      const params = {
        countryId: 1,
        stateId: this.classData.stateId,
        size: 9999
      }
      await this.getCities({ params })
    },
    async handleGetUsers (keyword = '') {
      const params = {
        page: 0,
        size: 9999,
        keyword
      }
      await this.getUsers({ params, companyId: this.userCurrentCompany.companyId })
    },
    async doUploadFiles (files) {
      for (const idx in files) {
        if (files[idx].file.fileId) {
          this.fileIds.push(files[idx].file.fileId)
        } else {
          const fileFormData = new FormData()
          fileFormData.append('file', files[idx].file)
          await this.uploadFile({
            data: fileFormData,
            successCallback: await this.successUploadFile
          })
        }
      }
    },
    successUploadFile (uploadedFile) {
      this.fileIds.push(uploadedFile.efileid)
    },
    createNewClass () {
      if (this.validateForm()) {
        this.showSaveModal = true
      }
    },
    async handleSaveClass () {
      await this.doUploadFiles(this.rawFiles)
      const classDataBody = {
        ...this.classData,
        picMobileNumber: '+62' + this.classData.picMobileNumber,
        fileIds: this.fileIds,
        administrationFee: this.feeSwitchOn ? this.classData.administrationFee || 0 : 0
      }
      if (this.accessFrom === 'core') {
        classDataBody.picId = this.user.euserid
        classDataBody.picMobileNumber = this.user.eusermobilenumber

        this.createClassLanding({ body: classDataBody, successCallback: this.successSaveClass })
      } else if (this.accessFrom !== 'core') {
        if (this.isEdit) {
          this.updateClass({ id: this.$route.params.classId, body: classDataBody, successCallback: this.successSaveClass })
        } else {
          this.createClass({ body: classDataBody, successCallback: this.successSaveClass })
        }
      }
    },
    // generateCategories (categories) {
    //   const generatedCategories = []
    //   for (let i = 0; i < categories.length; i++) {
    //     generatedCategories.push({
    //       ...categories[0],
    //       sessions: this.generateSessions(
    //         {
    //           startMonth: categories[0].startMonth,
    //           endMonth: categories[0].endMonth,
    //           schedules: categories[0].schedules
    //         })
    //     })
    //   }
    //   return generatedCategories
    // },
    // generateSessions (scheduleData) {
    //   const sessions = []
    //   for (let i = 0; i < scheduleData.schedules.length; i++) {
    //     const selectedDay = dayNumber.find(day => day.code === scheduleData.schedules[i].day)
    //     const distance = (selectedDay.value + 7 - new Date(scheduleData.startMonth).getDay()) % 7
    //     let startDate = new Date(scheduleData.startMonth)
    //     startDate.setDate(startDate.getDate() + distance)
    //     startDate = startDate.getTime()
    //     while (startDate < scheduleData.endMonth) {
    //       sessions.push({
    //         monthUtc: startDate,
    //         startDate,
    //         endDate: 1619956800000
    //       })
    //       startDate += 604800000
    //     }
    //   }
    //   return sessions
    // },
    cancelCreateClass () {
      this.showCancelModal = true
    },
    handleCancelCreateClass () {
      this.$router.push('/user/class')
    },
    successSaveClass () {
      if (this.accessFrom === 'core') {
        this.$router.push('/user/class')
      } else {
        this.$router.push('/class')
      }
    },
    async initClassData () {
      await this.getClassDetail({
        id: this.$route.params.classId,
        successCallback: this.setClassData
      })
    },
    async setClassData (classDetail) {
      // eslint-disable-next-line no-console
      if (classDetail) {
        this.classData = {
          ...classDetail,
          industryId: classDetail.industry.eindustryid,
          classCoachUserIds: this.getClassCoachUserIds(classDetail.coaches),
          picId: classDetail.pic.euserid,
          stateId: classDetail.state.estateid,
          initFiles: this.generateRawFiles(classDetail.classMedia),
          picMobileNumber: classDetail.picMobileNumber.slice(3, classDetail.picMobileNumber.length)
        }
        if (classDetail.administrationFee) {
          this.feeSwitchOn = true
        }
        await this.updateCities()
        this.classData.cityId = classDetail.city.ecityid
        delete this.classData.city
        delete this.classData.industry
        delete this.classData.state
      }
    },
    getClassCoachUserIds (coaches) {
      // eslint-disable-next-line no-console
      return coaches.map((user) => { return user.userId })
    },
    generateRawFiles (classMedia) {
      const generatedRawFiles = classMedia.map((media) => {
        return {
          name: media.file && media.file.efilename,
          size: media.file && media.file.efilesize,
          type: media.file && media.file.efiletype,
          path: media.file && media.file.efilepath,
          fileId: media.fileId
        }
      })
      return generatedRawFiles
    },
    checkFrontZero (value) {
      if (value[0] === '0') {
        this.classData.picMobileNumber = value.slice(1, value.length)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.class-form{
  &__title{
    color: $orange-text
  }
  &__editor-container{
    min-width: 100%;
  }
}
.border-bottom{
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.outlined-container{
  border: 1px solid #D5D5D5;
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
}
.text-field{
  &--custom{
    margin: 0;
    padding: 0;
    &__prepend{
      width: 100%;
    }
  }
}
.form-container{
  max-width: 1028px;
  &__form{
    background-color: white;
  border-radius: 24px;
  }
}
.save-button{
  color: white;
  background-color: $green-100 !important
}
</style>
