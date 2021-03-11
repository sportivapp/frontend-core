<template>
  <v-container class="ma-0 pa-0 class-category" fluid>
    <v-spacer />
    <v-row justify="center" align="center" no-gutters>
      <v-col cols="10">
        <v-card flat class="mt-5 pt-3 pb-16 class-category__card">
          <v-row class="mr-5 ml-0 py-5">
            <span class="px-17 class-category__card__title">
              Detail Kategori Kelas
            </span>
            <v-spacer />
            <v-btn
              icon=""
              @click="handleClickEdit"
            >
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn
              class="ml-5"
              icon=""
              @click="show = true"
            >
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </v-row>
          <v-divider />
          <v-card-subtitle class="class-category__card__subtitle pt-7">
            {{ category.title }}
          </v-card-subtitle>
          <div
            class="justify-center align-start"
          >
            <div class="mx-auto">
              <v-tabs v-model="tab" width="100" color="#FF7041" grow class="class-category__content">
                <v-tabs-slider color="#FF7041" />
                <v-tab href="#info">
                  Info
                </v-tab>
                <v-tab href="#session">
                  Sesi
                </v-tab>
                <v-tab href="#history">
                  Riwayat
                </v-tab>
              </v-tabs>
              <v-divider />
            </div>

            <div class="mx-auto">
              <v-tabs-items v-model="tab" class="class-category mx-auto">
                <v-tab-item
                  :key="1"
                  value="info"
                  eager
                  class="class-category__content pt-5"
                >
                  <class-category-info
                    :info="category"
                  />
                </v-tab-item>
                <v-tab-item
                  :key="2"
                  value="session"
                  class="pt-3"
                >
                  <class-category-session
                    :session="category"
                  />
                </v-tab-item>
                <v-tab-item
                  :key="3"
                  value="history"
                  class="pt-3"
                >
                  <class-category-history
                    :history="category"
                  />
                </v-tab-item>
              </v-tabs-items>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <class-category-modal
      :show="showEditCategoryModal"
      :initial-data="category"
      :is-edit-category="true"
      @close="handleCloseCategoryModal"
      @save="handleEdit"
    />
    <simple-prompt
      :show="show"
      :title="$t('cmsClass.categoryDeleteModalTitle')"
      :message="$t('cmsClass.categoryDeleteMessage')"
      action-color="#FF3333"
      :cancel-text="$t('cmsClass.deleteCancel')"
      :action-text="$t('cmsClass.deleteAction')"
      @update:show="show = false"
      @click:cancel="show = false"
      @click:action="handleDeleteClassCategory"
    />
  </v-container>
</template>
<script>
import ClassCategoryModal from '@/components/Class/Category/ClassCategoryModal'
import ClassCategoryInfo from '@/components/Class/ClassCategory/ClassCategoryInfo'
import ClassCategorySession from '@/components/Class/ClassCategory/ClassCategorySession'
import ClassCategoryHistory from '@/components/Class/ClassCategory/ClassCategoryHistory'
import SimplePrompt from '@/components/Modal/SimplePrompt'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ClassCategoryDetail',
  components: { ClassCategoryModal, ClassCategoryInfo, ClassCategorySession, ClassCategoryHistory, SimplePrompt },
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showEditCategoryModal: false,
      isEditCategory: false,
      tab: null,
      isTableLoading: false,
      show: false
    }
  },
  computed: {
    ...mapGetters(['industries', 'provinces', 'cities']),
    ...mapGetters('class', ['userCurrentCompany', 'classCategoryDetail'])
  },
  async mounted () {
    await this.getIndustries()
    const params = {
      countryId: 1,
      size: 9999
    }
    this.getProvinces({ params })
    await this.getUserCurrentCompany({ successCallback: this.handleGetUsers })
  },
  methods: {
    ...mapActions('class', ['updateClassCategory', 'deleteClassCategory', 'getUserCurrentCompany', 'getUsers', 'setSnackBar']),
    ...mapActions(['getIndustries', 'getProvinces', 'getCities']),
    async handleGetUsers (keyword = '') {
      const params = {
        page: 0,
        size: 9999,
        keyword
      }
      await this.getUsers({ params, companyId: this.userCurrentCompany.companyId })
    },
    async handleEdit (newCategory) {
      const body = {
        categoryCoachUserIds: newCategory.categoryCoachUserIds,
        description: newCategory.description,
        price: newCategory.price,
        requirements: newCategory.requirements,
        title: newCategory.title
      }
      await this.updateClassCategory({
        classId: this.$route.params.classId,
        classCategoryId: this.$route.params.classCategoryId,
        body,
        successCallback: this.successCallbackEdit
      })
      this.showEditCategoryModal = false
    },
    successCallbackEdit () {
      const data = {
        value: true,
        message: 'Kategori kelas berhasil diedit'
      }
      this.setSnackBar(data)
      setTimeout(function () { location.reload() }, 2000)
    },
    handleClickEdit () {
      this.isEditCategory = true
      this.showEditCategoryModal = true
    },
    handleCloseCategoryModal () {
      this.showEditCategoryModal = false
    },
    async handleDeleteClassCategory () {
      await this.deleteClassCategory({
        classId: this.$route.params.classId,
        classCategoryId: this.$route.params.classCategoryId,
        successCallback: this.successCallbackDelete,
        errHandler: this.errHandlerDelete
      })
    },
    successCallbackDelete () {
      const data = {
        value: true,
        message: this.$t('cmsClass.categoryDeleteSuccess')
      }
      this.setSnackBar(data)
      this.$router.push('/class/' + this.$route.params.classId)
    },
    errHandlerDelete () {
      const data = {
        value: true,
        message: 'Participant Existed'
      }
      this.setSnackBar(data)
    }
  }
}
</script>

<style lang="scss" scoped>

.v-tabs {
  width: 50% !important;
}

.class-category {

  &__content {
    padding-left: 64px;
    max-width: 1120px;
  }

  &__card {
    border-radius: 24px;

    &__title {
      padding-left: 64px;
      font-size: 28px;
      font-weight: 600;
      line-height: 42px;
      color: $orange-100;
    }

    &__subtitle {
      padding-left: 64px;
      font-size: 24px;
      font-weight: 700;
      line-height: 28px;
      color: $neutral-black !important;
    }
  }

  &__table-item {
    border-radius: 0px 0px 0px 0px !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &__title {
      padding-left: 10px;
      vertical-align: middle;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      align-self: center;
    }

    &__price {
      color: #FF7041;
      font-weight: 600;

      &--free {
        font-weight: 600;
        color: #0AB281;
      }
    }
  }
}
</style>
