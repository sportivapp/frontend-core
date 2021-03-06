<template>
  <v-container class="ma-0 pa-0 class-category" fluid>
    <v-spacer />
    <v-row justify="center" align="center" no-gutters>
      <v-col cols="10">
        <v-card flat class="mt-5 pt-3 pb-16 class-category__card">
          <v-card-title class="class-category__card__title">
            Detail Kategori Kelas
          </v-card-title>
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
  </v-container>
</template>
<script>
import ClassCategoryInfo from '@/components/Class/ClassCategory/ClassCategoryInfo'
import ClassCategorySession from '@/components/Class/ClassCategory/ClassCategorySession'
import ClassCategoryHistory from '@/components/Class/ClassCategory/ClassCategoryHistory'

export default {
  name: 'ClassCategoryDetail',
  components: { ClassCategoryInfo, ClassCategorySession, ClassCategoryHistory },
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tab: null,
      isTableLoading: false
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
