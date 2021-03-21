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
            {{ titleText }}
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
          ref="classForm"
          lazy-validation
          class="class-category-modal__form"
        >
          <v-container class="class-category-modal__form__container">
            <v-row
              class="class-category-modal__form__section"
            >
              <span class="class-category-modal__form__section__title spv-body--1">
                Kategori
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
            <v-row
              v-if="!isEditCategory"
              class="class-category-modal__form__section"
            >
              <span class="class-category-modal__form__section__title spv-body--1">
                Jadwal (Maks. 7 Jadwal)
                <span class="class-category-modal__form__section__title__red">*
                </span>
              </span>
              <category-schedule-list
                v-model="categorySchedules"
                @input="$v.categorySchedules.$touch()"
              />
              <small v-if="$v.categorySchedules.$error" class="red--text pl-2">
                {{ categorySchedulesErrors[categorySchedulesErrors.length-1] }}
              </small>
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
              class="class-category-modal__form__section"
            >
              <span class="class-category-modal__form__section__title spv-body--1">
                Deskripsi
                <span class="class-category-modal__form__section__title__red">*
                </span>
              </span>
              <v-textarea
                v-model="categoryDescription"
                outlined
                dense
                placeholder="Contoh: Deskripsi atau materi sesi"
                class="class-category-modal__form__text-field"
                :error-messages="categoryDescriptionErrors"
                @input="$v.categoryDescription.$touch()"
                @blur="$v.categoryDescription.$touch()"
              />
            </v-row>
            <v-row
              class="class-category-modal__form__section"
            >
              <span class="class-category-modal__form__section__title spv-body--1">
                Pelatih
                <span class="class-category-modal__form__section__title__red">*
                </span>
              </span>
              <category-coach-list
                v-model="categoryCoachUserIds"
                :class-coach-user-ids="classCoachUserIds"
              />
              <small v-if="$v.categoryCoachUserIds.$dirty" class="red--text pl-2">
                {{ categoryCoachUserIdsErrors[categoryCoachUserIdsErrors.length-1] }}
              </small>
            </v-row>
            <v-row
              class="class-category-modal__form__section"
            >
              <span class="class-category-modal__form__section__title spv-body--1">
                Harga
                <span class="class-category-modal__form__section__title__red">*
                </span>
              </span>
              <v-row no-gutters>
                <v-col cols="auto">
                  <v-radio-group
                    v-model="priceOption"
                    mandatory
                    hide-details
                    row
                  >
                    <v-radio :value="1">
                      <template v-slot:label>
                        Gratis
                      </template>
                    </v-radio>
                    <v-radio :value="2">
                      <template v-slot:label>
                        Berbayar
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="auto">
                  <v-text-field
                    v-model="categoryPrice"
                    :disabled="disableCategoryPrice"
                    type="number"
                    outlined
                    hide-details
                    class="class-category-modal__form__text-field--custom"
                  >
                    <template v-slot:prepend>
                      <span
                        class="class-category-modal__form__text-field--custom__prepend spv-subtitle--2"
                      >
                        Rp
                      </span>
                    </template>
                    <template v-slot:append>
                      <span
                        class="class-category-modal__form__text-field--custom__append spv-body--1"
                      >
                        / Bulan
                      </span>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-row>
            <v-row
              class="class-category-modal__form__section"
            >
              <span class="class-category-modal__form__section__title spv-body--1">
                Persyaratan (Opsional)
              </span>
              <v-textarea
                v-model="categoryRequirement"
                outlined
                dense
                hide-details
                placeholder="Contoh: Dilarang merokok"
                class="class-category-modal__form__text-field"
              />
            </v-row>
          </v-container>
        </v-form>
        <v-row
          justify="end"
          align="center"
          class="class-category-modal__actions"
        >
          <v-col class="pa-0" cols="auto">
            <v-btn
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
              text
              class="class-category-modal__actions__btn class-category-modal__actions--save"
              @click="handleClickSave"
            >
              <span>
                Simpan
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>

<script>
import CategoryScheduleList
  from '@/components/Class/Category/CategoryScheduleList'
import { dateToMonthAndYear } from '@/utils/date'
import { duplicateObject } from '@/utils/object'
import { convertToPrice } from '@/utils/price'
import validationMixin from '@/components/Class/validationCategory.mixin'
import { mapGetters } from 'vuex'

export default {
  name: 'ClassCategoryModal',
  components: {
    CategoryScheduleList
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
    }
    // classCoachUserIds: {
    //   type: Array,
    //   default: () => ([])
    // }
  },
  data () {
    return {
      categoryTitle: '',
      categoryDescription: '',
      categoryRequirement: '',
      priceOption: 1,
      categorySchedules: [
        {
          day: 'MONDAY',
          startHour: 10,
          startMinute: 0,
          endHour: 12,
          endMinute: 0
        }
      ],
      categoryPrice: 0,
      periodMenu: null,
      categoryPeriod: [],
      categoryCoachUserIds: [null],
      todayDate: new Date().toISOString().slice(0, 10)
    }
  },
  computed: {
    ...mapGetters('class', ['classUsers']),
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
      console.log(new Date(date.getFullYear(), date.getMonth() + 1, 0))
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
    }
  },
  created () {
    this.init()
  },
  methods: {
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
    handleClickSave () {
      if (this.validateForm()) {
        if (this.isEdit) {
          this.$emit('edit', {
            index: this.index,
            data: this.constructCategoryObject()
          })
        } else {
          this.$emit('save', this.constructCategoryObject())
        }
      }
    },
    init () {
      if (this.initialData) {
        this.initDataFromProps()
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
</style>
