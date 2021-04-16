<template>
  <v-dialog
    :value="show"
    persistent
    width="978"
    class="class-category-modal"
  >
    <v-sheet>
      <v-container class="class-category-modal__container">
        <v-row
          class="class-category-modal__top"
          justify="space-between"
          align="center"
        >
          <v-col
            cols="auto"
            class="class-category-modal__top__item class-category-modal__title spv-heading--2"
          >
            {{ isPreview? "Preview Jadwal Kelas": titleText }}
          </v-col>
          <v-col class="class-category-modal__top__item" cols="auto">
            <v-btn
              icon
              color="#707070"
              @click="handleCloseModal"
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-form
          v-if="!isPreview"
          ref="classForm"
          lazy-validation
          class="class-category-modal__form"
        >
          <v-container class="class-category-modal__form__container">
            <v-row
              class="class-category-modal__form__section"
            >
              <span class="class-category-modal__form__section__title spv-body--1">
                Judul Kategori
                <span class="class-category-modal__form__section__title__red">*
                </span>
              </span>
              <v-text-field
                v-model="categoryTitle"
                outlined
                dense
                :hide-details="!$v.categoryTitle.$dirty"
                placeholder="Contoh: Kelompok Umur 12"
                class="class-category-modal__form__text-field"
                :error-messages="categoryTitleErrors"
                @input="$v.categoryTitle.$touch()"
                @blur="$v.categoryTitle.$touch()"
              />
            </v-row>
            <v-row>
              <v-col md="6" class="pl-0">
                <span class="class-category-modal__form__section__title spv-body--1">
                  Minimal Partisipan
                  <span class="class-category-modal__form__section__title__red">*
                  </span>
                </span>
                <v-text-field
                  v-model.number="minParticipant"
                  type="number"
                  outlined
                  dense
                  :hide-details="!$v.minParticipant.$dirty"
                  placeholder="0"
                  :error-messages="minParticipantErrors"
                  @input="$v.minParticipant.$touch()"
                  @blur="$v.minParticipant.$touch()"
                />
              </v-col>
              <v-col md="6" class="pr-0">
                <span class="class-category-modal__form__section__title spv-body--1">
                  Maksimal Partisipan
                  <span class="class-category-modal__form__section__title__red">*
                  </span>
                </span>
                <v-text-field
                  v-model.number="maxParticipant"
                  type="number"
                  outlined
                  dense
                  :hide-details="!$v.maxParticipant.$dirty"
                  placeholder="0"
                  :error-messages="maxParticipantErrors"
                  @input="$v.maxParticipant.$touch()"
                  @blur="$v.maxParticipant.$touch()"
                />
              </v-col>
            </v-row>
            <v-row>
              <span class="class-category-modal__form__section__title spv-body--1">
                Pembayaran
                <span class="class-category-modal__form__section__title__red">*
                </span>
              </span>
            </v-row>
            <v-row align="center">
              <v-radio-group v-model="feeType" class="ma-0 ml-2" row="">
                <v-col md="1" align-self="center" class="pa-0 mr-4">
                  <v-radio
                    label="Gratis"
                  >
                    <template v-slot:label>
                      <span class="spv-subtitle--2">Gratis</span>
                    </template>
                  </v-radio>
                </v-col>
                <v-col align-self="center" class="pa-0">
                  <v-radio
                    label="Per sesi"
                  >
                    <template v-slot:label>
                      <span class="pr-1 spv-subtitle--2">Per Sesi </span>
                      <v-tooltip
                        bottom=""
                      >
                        <template v-slot:activator="{on, attrs}">
                          <v-icon
                            class=""
                            size="18"
                            v-bind="attrs"
                            color="grey"
                            v-on="on"
                          >
                            mdi-information
                          </v-icon>
                        </template>
                        <span>Partisipan hanya membayar berdasarkan sesi yang dipilih.</span>
                      </v-tooltip>
                      <v-text-field
                        v-model.number="sessionFee"
                        type="number"
                        outlined=""
                        dense
                        :disabled="feeType !== 1 || isFeePerSession"
                        :filled="feeType !== 1 || isFeePerSession"
                        hide-details=""
                        class="ml-2"
                        placeholder="0"
                      >
                        <template v-slot:prepend-inner>
                          <span class="spv-subtitle--2 text-field--custom__prepend">
                            Rp
                          </span>
                        </template>
                      </v-text-field>
                    </template>
                  </v-radio>
                </v-col>
                <v-col class="pa-0" md="6">
                  <v-radio
                    label="Per Paket"
                    class="ma-0"
                  >
                    <template v-slot:label>
                      <span class="pr-2 spv-subtitle--2">Per Paket</span>
                      <v-tooltip
                        bottom=""
                        class="pr-2"
                      >
                        <template v-slot:activator="{on, attrs}">
                          <v-icon
                            class=""
                            size="18"
                            v-bind="attrs"
                            color="grey"
                            v-on="on"
                          >
                            mdi-information
                          </v-icon>
                        </template>
                        <span>Partisipan diwajibkan membayar paket sesi per bulan.</span>
                      </v-tooltip>
                      <v-text-field
                        v-model.number="packetFee"
                        class="ml-2"
                        type="number"
                        outlined=""
                        :disabled="feeType !== 2"
                        :filled="feeType !== 2"
                        dense
                        hide-details=""
                        placeholder="0"
                      >
                        <template v-slot:prepend-inner>
                          <span class="spv-subtitle--2 text-field--custom__prepend">
                            Rp
                          </span>
                        </template>
                        <template v-slot:append>
                          <span class="spv-subtitle--2 text-field--custom__prepend">
                            | Per bulan
                          </span>
                        </template>
                      </v-text-field>
                    </template>
                  </v-radio>
                </v-col>
              </v-radio-group>
            </v-row>
            <v-row v-if="feeType===1" class="mt-0 pt-0">
              <v-col class="mt-0 pt-0" md="1" />
              <v-col class="mt-0 pt-0">
                <v-switch
                  v-model="isFeePerSession"
                  class="pt-0 mt-0 ml-4"
                  inset=""
                  dense=""
                  hide-details=""
                >
                  <template v-slot:label>
                    <span class="spv-body--2">Bedakan tiap sesi</span>
                  </template>
                </v-switch>
              </v-col>
              <v-col class="mt-0 pt-0" md="6" />
            </v-row>
            <v-row
              v-if="!isEditCategory"
              class="class-category-modal__form__section class-category-modal__form__section--date"
            >
              <span class="class-category-modal__form__section__title spv-body--1">
                Masa Berlangsung Jadwal (Maks. 3 bulan)
                <span class="class-category-modal__form__section__title__red">*
                </span>
              </span>
              <v-menu
                v-model="periodMenu"
                content-class="class-category-modal__form__section--date__menu-content"
                attach=".class-category-modal__form__section--date"
                open-on-click
                offset-y
                min-width="300"
                nudge-bottom="4"
                :close-on-content-click="false"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    id="testing"
                    v-model="periodText"
                    v-bind="attrs"
                    outlined
                    dense
                    readonly
                    placeholder="Pilih waktu"
                    class="class-category-modal__form__text-field"
                    :error-messages="categoryPeriodErrors"
                    v-on="on"
                    @input="$v.categoryPeriod.$touch()"
                    @blur="$v.categoryPeriod.$touch()"
                  />
                </template>
                <v-card>
                  <v-container>
                    <v-row>
                      <v-date-picker
                        v-model="categoryPeriod"
                        color="#FF7041"
                        type="month"
                        range
                        no-title
                        :min="todayDate"
                        @input="$v.categoryPeriod.$touch()"
                        @blur="$v.categoryPeriod.$touch()"
                        @change="print"
                      />
                    </v-row>
                    <v-row
                      class="class-category-modal__form__section--date__reset"
                    >
                      <v-btn
                        text
                        color="#FF7041"
                        @click="handleClickResetPeriod"
                      >
                        <span class="spv-subtitle--2">
                          Reset
                        </span>
                      </v-btn>
                    </v-row>
                  </v-container>
                </v-card>
              </v-menu>
            </v-row>
            <v-row
              v-if="!isEditCategory"
              class="class-category-modal__form__section"
            >
              <span class="class-category-modal__form__section__title spv-body--1">
                Jadwal
                <span class="class-category-modal__form__section__title__red">*
                </span>
              </span>
              <category-landing-schedule-list
                v-model="categorySchedules"
                :access-from="accessFrom"
                :is-fee-per-session="isFeePerSession"
                :session-fee="sessionFee"
                :category-period="categoryPeriodConvert"
                @input="$v.categorySchedules.$touch()"
                @validate="$v.categorySchedules.$touch()"
              />
              <small v-if="$v.categorySchedules.$error" class="red--text pl-2">
                {{ categorySchedulesErrors[categorySchedulesErrors.length-1] }}
              </small>
            </v-row>
            <v-row
              class="class-category-modal__form__section"
            >
              <span class="class-category-modal__form__section__title spv-body--1">
                Deskripsi (Opsional)
              </span>
              <v-textarea
                v-model="categoryDescription"
                outlined
                dense
                placeholder="Contoh: Deskripsi atau materi sesi"
                class="class-category-modal__form__text-field"
              />
            </v-row>
          </v-container>
        </v-form>
        <preview-session-list
          v-else
          :sessions="generatedSessions"
        />
        <v-row
          justify="end"
          align="center"
          class="class-category-modal__actions"
        >
          <v-col class="pa-0" cols="auto">
            <v-btn
              v-if="isPreview"
              max-width="170px"
              outlined
              class="class-category-modal__actions__btn class-category-modal__actions--cancel"
              @click="handleBack"
            >
              <span>
                Kembali
              </span>
            </v-btn>
            <v-btn
              v-else
              max-width="170px"
              outlined
              class="class-category-modal__actions__btn class-category-modal__actions--cancel"
              @click="handleCloseModal"
            >
              <span>
                Batal
              </span>
            </v-btn>
          </v-col>
          <v-col class="pa-0" cols="auto">
            <v-btn
              v-if="isPreview"
              max-width="170px"
              text
              class="class-category-modal__actions__btn class-category-modal__actions--save"
              @click="handleClickSave"
            >
              <span>
                Simpan
              </span>
            </v-btn>
            <v-btn
              v-else
              max-width="170px"
              text
              class="class-category-modal__actions__btn class-category-modal__actions--save"
              @click="handleClickNext"
            >
              <span>
                Selanjutnya
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>

<script>
import CategoryLandingScheduleList
  from '@/components/Class/Category/CategoryLandingScheduleList'
import { dateToMonthAndYear } from '@/utils/date'
import { duplicateObject } from '@/utils/object'
import { convertToPrice } from '@/utils/price'
import validationMixin from '@/components/Class/validationCategory.mixin'
import { mapGetters, mapActions } from 'vuex'
import PreviewSessionList from '@/components/Class/Category/PreviewSessionList'

export default {
  name: 'ClassCategoryModal',
  components: {
    CategoryLandingScheduleList,
    PreviewSessionList
  },
  filters: {
    convertToPrice
  },
  mixins: [validationMixin],
  props: {
    initialData: {
      type: Object,
      default: null
    },
    isEditCategory: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
    titleText: {
      type: String,
      required: true
    },
    accessFrom: {
      type: String,
      default: 'core'
    },
    selectedCity: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      categoryTitle: '',
      categoryDescription: '',
      categoryRequirement: '',
      priceOption: 1,
      categorySchedules: [],
      categoryPrice: 0,
      periodMenu: null,
      categoryPeriod: [],
      categoryCoachUserIds: [null],
      todayDate: new Date().toISOString().slice(0, 10),
      packetFee: null,
      sessionFee: null,
      maxParticipant: null,
      minParticipant: null,
      isFeePerSession: false,
      feeType: 0,
      isPreview: false
    }
  },

  computed: {
    ...mapGetters('class', ['classUsers']),
    ...mapGetters('classLanding', ['generatedSessions']),

    classForm () {
      return this.$refs.classForm
    },
    disableCategoryPrice () {
      return this.priceOption !== 2
    },
    startMonthDate () {
      let startIndex = 0
      if (new Date(this.categoryPeriod[0]) > new Date(this.categoryPeriod[1])) {
        startIndex = 1
      }
      return new Date(this.categoryPeriod[startIndex])
    },
    endMonthDate () {
      let endIndex = 1
      if (new Date(this.categoryPeriod[0]) > new Date(this.categoryPeriod[1])) {
        endIndex = 0
      }
      const date = new Date(this.categoryPeriod[endIndex])
      return new Date(date.getFullYear(), date.getMonth() + 1, 0)
    },
    periodTextMonth () {
      return dateToMonthAndYear(this.startMonthDate) + ' - ' +
        dateToMonthAndYear(this.endMonthDate)
    },
    periodText () {
      return this.categoryPeriod.length > 1
        ? this.periodTextMonth
        : ''
    },
    classCoachUserIds () {
      const classUsersIds = this.classUsers.map((user) => { return user.euserid })
      return classUsersIds
    },
    categoryPeriodConvert () {
      let conPeriod = []
      if (new Date(this.categoryPeriod[0]) > new Date(this.categoryPeriod[1])) {
        conPeriod = [this.categoryPeriod[1], this.categoryPeriod[0]]
      } else {
        conPeriod = [...this.categoryPeriod]
      }
      if (conPeriod[1]) {
        const lastMonth = conPeriod[1].split('-')
        if (Number(lastMonth[1]) < 12) {
          lastMonth[1] = Number(lastMonth[1]) + 1
          if (Number(lastMonth[1]) < 10) {
            lastMonth[1] = '0' + lastMonth[1]
          }
        } else {
          lastMonth[0] = String(Number(lastMonth[0]) + 1)
          lastMonth[1] = '01'
        }
        return [conPeriod[0], lastMonth.join('-')]
      }
      return this.categoryPeriod
    }
  },
  watch: {
    feeType: {
      handler (value) {
        if (value !== 1) {
          this.isFeePerSession = false
          this.sessionFee = null
        } else if (value !== 2) {
          this.packetFee = null
        }
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions('classLanding', ['generateSessions']),
    print () {
      console.log(this.categoryPeriod)
    },
    constructCategoryObject () {
      return {
        startMonth: this.startMonthDate.getTime(),
        endMonth: this.endMonthDate.getTime(),
        title: this.categoryTitle,
        description: this.categoryDescription,
        price: this.priceOption === 1 ? 0 : parseInt(this.categoryPrice, 10),
        requirements: this.categoryRequirement,
        categoryCoachUserIds: [...this.categoryCoachUserIds],
        schedules: duplicateObject(this.categorySchedules),
        isRecurring: true
      }
    },
    handleCloseModal () {
      this.$emit('close')
    },
    handleBack () {
      this.isPreview = false
    },
    handleClickNext () {
      const body = {
        cityId: this.selectedCity,
        start: this.startMonthDate.getTime(),
        end: this.endMonthDate.getTime(),
        schedules: this.convertSchedule()
      }
      this.generateSessions({ body })
      this.isPreview = true
    },
    convertSchedule () {
      console.log(this.categorySchedules)
      const schedules = this.categorySchedules.map((schedule) => {
        return {
          start: schedule.startTimeDate,
          end: schedule.endTimeDate,
          isWeekly: schedule.isRecurring
        }
      })
      return schedules
    },
    handleClickSave () {
      // if (this.validateForm()) {
      //   if (this.isEdit) {
      //     this.$emit('edit', {
      //       index: this.index,
      //       data: this.constructCategoryObject()
      //     })
      //   } else {
      //     this.$emit('save', this.constructCategoryObject())
      //   }
      // }
    },
    init () {
      if (this.initialData) {
        // this.initDataFromProps()
      }
    },
    initDataFromProps () {
      this.categoryTitle = this.initialData.title
      this.categoryDescription = this.initialData.description
      this.priceOption = this.initialData.price > 0 ? 2 : 1
      this.categoryPrice = this.initialData.price
      this.categoryRequirement = this.initialData.requirements

      if (this.isEditCategory) {
        const schedule = []
        schedule.push({
          day: 'MONDAY',
          endHour: 12,
          endMinute: 0,
          startHour: 10,
          startMinute: 0
        })
        this.categorySchedules = duplicateObject(schedule)
        const coachUserId = []
        if (this.initialData && this.initialData.coaches) {
          for (let i = 0; i < this.initialData.coaches.length; i++) {
            coachUserId.push(this.initialData.coaches[i].userId)
          }
        }
        this.categoryCoachUserIds = [...coachUserId]
        this.categoryPeriod = [
          new Date().toISOString(),
          new Date().toISOString()
        ]
      } else {
        this.categorySchedules = duplicateObject(this.initialData.schedules)
        this.categoryCoachUserIds = [...this.initialData.categoryCoachUserIds]

        if (this.initialData.startMonth && this.initialData.endMonth) {
          this.categoryPeriod = [
            new Date(this.initialData.startMonth).toISOString(),
            new Date(this.initialData.endMonth).toISOString()
          ]
        }
      }
    },
    handleClickResetPeriod () {
      this.categoryPeriod = []
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .v-dialog {
  box-shadow: none !important;
}

::v-deep .v-sheet.v-card {
  border-radius: 12px !important;
}

.class-category-modal {
  &__container {
    padding: 0 40px;
  }

  &__top {
    padding-top: 18px;
    padding-bottom: 20px;
    &__item {
      padding: 0;
      margin: 0;
    }
  }

  &__title {
    color: $neutral-black;
  }

  &__form {
    &__container {
      width: 100%;
      max-height: 500px;
      overflow-y: scroll;
    }

    &__section {
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;

      &__title {
        color: $neutral-neutral;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        padding-bottom: 8px;

        &__red {
          color: $red-100;
        }
      }

      &--date {
        position: relative;

        &__menu-content {
          box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15) !important;
        }

        &__reset {
          border-top: 1px solid $neutral-light-grey;
          padding-left: 12px;
          padding-top: 8px;
          color: $orange-100 !important;
        }
      }
    }

    &__text-field {
      &--custom {
        &__prepend {
          color: $neutral-grey;
        }

        &__append {
          color: $neutral-neutral !important;
        }

        ::v-deep .v-input__slot{
          border-radius: 0 8px 8px 0 !important;
        }

        ::v-deep .v-input__prepend-outer {
          display: flex !important;
          justify-content: center;
          align-items: center;
          margin: 0;
          height: 56px !important;
          width: 40px;
          background-color: $neutral-almost-white;
          border-top: 1px solid $neutral-light-grey;
          border-bottom: 1px solid $neutral-light-grey;
          border-left: 1px solid $neutral-light-grey;
          border-right: none;
          border-radius: 8px 0 0 8px !important;
        }
      }
    }
  }

  &__actions {
    padding: 16px 28px;
    margin: 8px -40px 0 !important;
    box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);

    &__btn {
      width: 120px;
      height: 40px;
      border-radius: 8px;
      span {
        font-weight: 600;
        font-size: 16px;
        line-height: 28px;
      }
    }

    &--cancel {
      color: $neutral-grey;
      border: 1px solid $neutral-neutral;
    }
    &--save {
      margin-left: 8px;
      background-color: $green-100;
      color: white;
    }
  }
}
.text-field{
  &--custom{
    margin: 0;
    padding: 0;
    &__prepend{
      width: 100%;
      color: grey;
    }
  }
}
</style>
