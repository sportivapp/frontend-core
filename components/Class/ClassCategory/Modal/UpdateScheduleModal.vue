<template>
  <v-dialog
    v-model="value"
    max-width="663"
    persistent=""
    class="class-category-modal"
  >
    <v-card class="px-5" height="100%">
      <v-row class="border-bottom">
        <v-card-title class="spv-heading--2">
          Perbarui Jadwal
        </v-card-title>
        <v-spacer />
        <v-card-actions>
          <v-btn icon @click="$emit('input', false)">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-row>
      <v-row>
        <v-col>
          <v-row class="mx-1 spv-body--1 grey--text">
            Jadwal (Maks. 7 Jadwal)<span class="red--text">*</span>
            <category-schedule-list
              v-model="categorySchedules"
              class="black--text"
              @input="$v.categorySchedules.$touch()"
            />
            <small v-if="$v.categorySchedules.$error" class="red--text pl-2">
              {{ categorySchedulesErrors[categorySchedulesErrors.length-1] }}
            </small>
          </v-row>
          <v-row class="mx-1 spv-body--1 grey--text">
            Masa Berlangsung Jadwal (Maks. 3 bulan)<span class="red--text">*</span>
          </v-row>
          <v-row class="mx-1 class-category-modal__form__section class-category-modal__form__section--date">
            <v-menu
              v-model="periodMenu"
              content-class="class-category-modal__form__section--date__menu-content"
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
            justify="end"
            align="center"
            class="class-category-modal__actions"
          >
            <v-col>
              <small class="red--text">{{ errorMessage }}</small>
            </v-col>
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
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import CategoryScheduleList from '@/components/Class/Category/CategoryScheduleList'
import { dateToMonthAndYear } from '@/utils/date'
import { mapActions } from 'vuex'
import validationExtend from '@/components/Class/validationExtend.mixin'

export default {
  name: 'UpdateScheduleModal',
  components: {
    CategoryScheduleList
  },
  mixins: [validationExtend],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    categorySessions: {
      type: Array,
      default: () => []
    },
    schedules: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    periodMenu: null,
    categoryPeriod: [],
    categorySchedules: [
      {
        day: 'MONDAY',
        startHour: 10,
        startMinute: 0,
        endHour: 12,
        endMinute: 0
      }
    ],
    errorMessage: '',
    todayDate: new Date().toISOString().slice(0, 10)
  }),
  computed: {
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
      return new Date(this.categoryPeriod[endIndex])
    },
    periodTextMonth () {
      return dateToMonthAndYear(this.startMonthDate) + ' - ' +
        dateToMonthAndYear(this.endMonthDate)
    },
    periodText () {
      return this.categoryPeriod.length > 1
        ? this.periodTextMonth
        : ''
    }
  },
  watch: {
    schedules: {
      handler (value) {
        this.generateCategorySessions()
      }
    }
  },
  methods: {
    ...mapActions('class', ['extendCategorySession']),
    handleClickResetPeriod () {
      this.categoryPeriod = []
    },
    generateCategorySessions () {
      if (this.schedules) {
        this.categorySchedules = [...this.schedules]
      }
    },
    handleClickSave () {
      if (this.validateForm()) {
        const body = {
          startMonth: this.startMonthDate.getTime(),
          endMonth: this.endMonthDate.getTime(),
          schedules: [...this.categorySchedules]
        }
        this.extendCategorySession({
          categoryId: this.$route.params.classCategoryId,
          body,
          successCallback: this.updateScheduleSuccess,
          errHandler: this.updateScheduleFail
        })
      }
    },
    updateScheduleSuccess () {
      this.$emit('input', false)
      this.$router.go(0)
    },
    updateScheduleFail (err) {
      if (err === 'NO_SESSIONS') {
        this.errorMessage = '*Sesi tidak tersedia'
      } else if (err === 'SCHEDULE_CONFLICT') {
        this.errorMessage = '*Terdapat sesi yang konflik'
      }
    },
    handleCloseModal () {
      this.$emit('input', false)
    },
    setCategoryPeriod (startms, endms) {
      const startDate = new Date(startms * 1000)
      const endDate = new Date(endms * 1000)
      this.categoryPeriod = [startDate, endDate]
    }

  }
}
</script>

<style lang="scss" scoped>
.border-bottom{
  border-bottom: 1px solid #D5D5D5;
}

.absolute-card{
  z-index: 99999;
}

.class-category-modal {
  color: white;
  background-color: white;
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
          z-index: 999;
          position: absolute;
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
    bottom: 0;
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
