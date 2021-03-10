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
  </v-container>
</template>
<script>
import ClassCategoryModal from '@/components/Class/Category/ClassCategoryModal'
import ClassCategoryInfo from '@/components/Class/ClassCategory/ClassCategoryInfo'
import ClassCategorySession from '@/components/Class/ClassCategory/ClassCategorySession'
import ClassCategoryHistory from '@/components/Class/ClassCategory/ClassCategoryHistory'
import { mapActions } from 'vuex'

export default {
  name: 'ClassCategoryDetail',
  components: { ClassCategoryModal, ClassCategoryInfo, ClassCategorySession, ClassCategoryHistory },
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
      coachesId: []
    }
  },
  // created () {
  //   this.getClassCoachesDetail()
  // },
  methods: {
    ...mapActions('class', [
      'updateClassCategory'
    ]),
    // getClassCoachesDetail () {
    //   if (!this.category.coaches) {
    //     for (let i = 0; i < this.category.coaches.length; i++) {
    //       this.coachesId.push(this.category.coaches[i].user.euserid)
    //     }
    //     // this.updateSelectedCoaches(this.coachesDetail)
    //   }
    // },
    handleEdit (newCategory) {
      this.showEditCategoryModal = false
      this.updateClassCategory({
        classId: this.$route.params.classId,
        classCategoryId: this.$route.params.classCategoryId,
        body: newCategory,
        successCallback: location.reload()
      })
    },
    handleClickEdit () {
      console.log(this.category)
      this.isEditCategory = true
      this.showEditCategoryModal = true
    },
    handleCloseCategoryModal () {
      this.showEditCategoryModal = false
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
