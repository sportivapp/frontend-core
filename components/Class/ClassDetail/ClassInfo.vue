<template>
  <v-container class="ma-0 pa-0" fluid>
    <v-row no-gutters>
      <v-col cols="7">
        <template v-if="classDetail.classMedia && classDetail.classMedia.length > 0">
          <v-carousel
            hide-delimiter-background
            :hide-delimiters="isSingleBanner"
            :show-arrows="!isSingleBanner"
            height="253"
            class="class-info__carousel"
          >
            <v-carousel-item
              v-for="(item,i) in classDetail.classMedia"
              :key="i"
              :src="`${staticUrl}/${item.file.efilename}`"
            />
          </v-carousel>
        </template>
        <p class="pt-7 class-info__description">
          {{ $t('common.description') }}
        </p>
        <!-- eslint-disable vue/no-v-html -->
        <p class="class-info__description__content" v-html="classDetail.description" />
        <!--eslint-enable-->
        <v-divider />
        <p class="pt-8 class-info__description">
          {{ $t('cmsClass.classCategory') }}
        </p>
        <v-card
          v-for="(classCategory, index) in classDetail.classCategories"
          :key="index"
          class="mb-4 class-info__class-category"
        >
          <nuxt-link
            :to="`/class/${classDetail.uuid}/class-category/${classCategory.uuid}`"
            :title="classCategory.title"
          >
            <v-card-title class="spv-subtitle--1 pb-2">
              <span>
                {{ classCategory.title }}
              </span>
              <v-spacer />
              <span
                :class="classCategory.price==='0'
                  ?'class-info__class-category__price--free'
                  :'class-info__class-category__price'
                "
              >
                {{ getClassCategoryPrice(classCategory.price) }}
              </span>
            </v-card-title>
            <v-card-text class="pt-0">
              <span class="spv-body--2 text--primary">
                {{ classCategory.totalParticipants }} peserta
              </span>
            </v-card-text>
          </nuxt-link>
        </v-card>
        <span
          class="class-info__class-category__orange"
          @click="handleClickAddCategory"
        >
          <v-icon color="#FF7041">
            mdi-plus-circle
          </v-icon>
          Tambah Kategori
        </span>
      </v-col>
      <v-col cols="5" class="pl-10">
        <p class="class-info__title">
          {{ classDetail && classDetail.title }}
        </p>
        <v-simple-table class="class-info__detail-table">
          <template v-slot:default>
            <tbody>
              <tr>
                <td>
                  {{ $t('cmsClass.classFee') }}
                </td>
                <td>
                  <div
                    :class="classDetail && classDetail.administrationFee === '0'
                      ?'class-info__detail-table__price--free'
                      :'class-info__detail-table__price'
                    "
                  >
                    {{ getClassFee }}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  {{ $t('cmsClass.sportType') }}
                </td>
                <td>
                  {{ classDetail.industry && classDetail.industry.eindustryname }}
                </td>
              </tr>
              <tr>
                <td>
                  {{ $t('cmsClass.participants') }}
                </td>
                <td>
                  {{ classDetail && classDetail.totalParticipants }} orang
                </td>
              </tr>
              <tr>
                <td>
                  {{ $t('cmsClass.personInCharge') }}
                </td>
                <td class="text-capitalize">
                  <v-avatar size="24">
                    <v-img :src="picImageUrl" />
                  </v-avatar>
                  {{ classDetail.pic && classDetail.pic.eusername }}
                </td>
              </tr>
              <tr>
                <td>
                  {{ $t('cmsClass.personInChargePhone') }}
                </td>
                <td>
                  {{ classPicContact }}
                </td>
              </tr>
              <tr>
                <td>
                  {{ $t('cmsClass.coach') }}
                </td>
                <td class="text-capitalize">
                  {{ classCoaches }}
                  <p
                    v-if="!showMoreCoach && haveManyCoach"
                    class="class-info__detail-table__show-more"
                    @click="showMoreCoach = true"
                  >
                    {{ $t('cmsClass.showMore') }}
                    <v-icon size="15" color="#FF7041">
                      mdi-chevron-down
                    </v-icon>
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  {{ $t('cmsClass.location') }}
                </td>
                <td>
                  {{ classDetail && classDetail.address }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <class-category-modal
      :show="showAddCategoryModal"
      :class-coach-user-ids="coachesId"
      @close="handleCloseCategoryModal"
      @save="handleAddClassCategory"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { staticUrl } from '@/config/api'
import { convertToPrice } from '@/utils/price'
import ClassCategoryModal from '@/components/Class/Category/ClassCategoryModal'

export default {
  name: 'ClassInfo',
  components: {
    ClassCategoryModal
  },
  data () {
    return {
      staticUrl,
      showMoreCoach: false,
      showAddCategoryModal: false,
      coachesId: [],
      coachesDetail: [],
      selectedIndex: 0
    }
  },
  computed: {
    ...mapGetters('class', [
      'classDetail'
    ]),
    isSingleBanner () {
      return this.classDetail.classMedia && this.classDetail.classMedia.length === 1
    },
    picImageUrl () {
      return this.classDetail && this.classDetail.pic &&
        this.classDetail.pic.file
        ? staticUrl + this.classDetail.pic.file.efilename
        : require('../../../assets/images/logos/sportiv-logo-small.png')
    },
    getClassFee () {
      return this.classDetail && this.classDetail.administrationFee === '0'
        ? this.$t('tournament.priceFree')
        : convertToPrice(this.classDetail.administrationFee)
    },
    classPicContact () {
      const userMobileNumber = this.classDetail && this.classDetail.pic
        ? this.classDetail.pic.eusermobilenumber
        : '-'
      const picMobileNumber = this.classDetail && this.classDetail.picMobileNumber
        ? this.classDetail.picMobileNumber
        : '-'
      return picMobileNumber === '-'
        ? userMobileNumber
        : picMobileNumber
    },
    classCoaches () {
      let coaches = ''
      if (this.classDetail.coaches) {
        for (let i = 0; i < this.classDetail.coaches.length; i++) {
          if (coaches) { coaches += ', ' }
          coaches = coaches + this.classDetail.coaches[i].user.eusername
          if (!this.showMoreCoach && i === 2) {
            break
          }
        }
      }
      return coaches
    },
    haveManyCoach () {
      return this.classDetail && this.classDetail.coaches && this.classDetail.coaches.length > 3
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions('class', [
      'getClassDetail', 'updateSelectedCoaches', 'addClassCategory'
    ]),
    initPage () {
      this.getClassDetail({
        id: this.$route.params.classId,
        successCallback: this.getClassCoachesDetail
      })
    },
    getClassCategoryPrice (originalPrice) {
      return originalPrice === '0'
        ? this.$t('tournament.priceFree')
        : convertToPrice(originalPrice) + `/${this.$t('common.month')}`
    },
    getClassCoachesDetail () {
      if (!this.classDetail.coaches) { return this.coachesDetail }
      for (let i = 0; i < this.classDetail.coaches.length; i++) {
        this.coachesDetail.push(this.classDetail.coaches[i].user)
        this.coachesId.push(this.classDetail.coaches[i].user.euserid)
      }
      this.updateSelectedCoaches(this.coachesDetail)
    },
    handleClickAddCategory () {
      this.showAddCategoryModal = true
    },
    handleCloseCategoryModal () {
      this.showAddCategoryModal = false
    },
    handleAddClassCategory (newCategory) {
      this.showAddCategoryModal = false
      this.addClassCategory({
        id: this.$route.params.classId,
        body: newCategory,
        successCallback: location.reload()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.class-info {

  &__carousel {
    border: 1px solid #D5D5D5;
    border-radius: 12px;
  }

  &__description {
    font-weight: bold;
    font-size: 20px;
    line-height: 26px;
    letter-spacing: -0.001em;
    color: #303030;

    &__content {
      font-size: 14px;
      line-height: 26px;
      color: #303030;
    }
  }

  &__title {
    font-weight: 600;
    font-size: 24px;
    line-height: 34px;
    letter-spacing: -0.002em
  }

  &__detail-table {
    td {
      line-height: 21px;
      font-size: 14px;
      vertical-align: text-top !important;
      padding-bottom: 5px !important;
    }

    td:first-child {
      width: 40%;
      padding-left: 0;
      color: $grey-3;
    }
    td:nth-child(2) {
      font-weight: 400;
      color: $black-neutral;
    }

    &__show-more {
      color: $orange-4;
      font-size: 12px;
      line-height: 18px;
      cursor: pointer;
    }

    &__price {
      font-weight: 600;
      color: #FF7D43;

      &--free {
        font-weight: 600;
        color: #0AB281;
      }
    }
  }

  &__class-category a {
    text-decoration: none !important;
  }

  &__class-category {
    box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.15) !important;
    border-radius: 8px;

    &__orange {
      font-weight: 600;
      font-size: 14px;
      line-height: 28px;
      color: $orange-100;
      cursor: pointer;
    }

    &__price {
      color: #FF7D43;

      &--free {
        color: #0AB281;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
::v-deep .class-info__detail-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
  border-bottom: none;
}

::v-deep .class-info__detail-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:last-child, .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:last-child {
  border-bottom: none;
}

// ------------------------------------------------------------------------
// change carousel button style -------------------------------------------

::v-deep .class-info__carousel.v-window > .v-window__container > .v-window__prev {
  border: none;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0px rgba(0, 0, 0, 0.14), 0 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
}

::v-deep .class-info__carousel.v-window > .v-window__container > .v-window__prev > .v-btn {
  background-color: white;
  color: #FF7041;
}

::v-deep .class-info__carousel.v-window > .v-window__container > .v-window__next {
  border: none;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0px rgba(0, 0, 0, 0.14), 0 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
}

::v-deep .class-info__carousel.v-window > .v-window__container > .v-window__next > .v-btn {
  background-color: white;
  color: #FF7041;
}
// done change carousel button---------------------------------------------
// ------------------------------------------------------------------------

//-------------------------------------------------------------------------
// change carousel controls style -----------------------------------------
::v-deep .v-carousel__controls__item.v-btn {
  color: $light-grey-1;
  opacity: 1;
  &:hover {
    &:before {
      opacity: 0.5 !important;
    }
  }
}

::v-deep .v-carousel__controls__item.v-btn.v-btn--active {
  color: $orange-4;
  &:before {
    opacity: 0;
  }
}

::v-deep .v-carousel__controls__item > .v-btn__content > .v-icon{
  opacity: 1;
}

// done change carousel control style -------------------------------------
//-------------------------------------------------------------------------
</style>
