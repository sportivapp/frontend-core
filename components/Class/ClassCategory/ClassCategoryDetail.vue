<template>
  <v-container class="ma-0 pa-0 class-category" fluid>
    <update-schedule-modal
      v-model="showModal"
      :category-sessions="category.categorySessions"
      :schedules="categorySchedules"
    />
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
                  <v-row class="border-bottom mx-0">
                    <v-col class="text-right pr-10 ma-0 pt-0">
                      <v-btn
                        class="white--text"
                        color="#FF7041"
                        @click="showModal = true"
                      >
                        Perbarui Jadwal
                      </v-btn>
                    </v-col>
                  </v-row>
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
import UpdateScheduleModal from '@/components/Class/ClassCategory/Modal/UpdateScheduleModal'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ClassCategoryDetail',
  components: { ClassCategoryInfo, ClassCategorySession, ClassCategoryHistory, UpdateScheduleModal },
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tab: null,
      isTableLoading: false,
      showModal: false
    }
  },
  mounted () {
    this.getSchedule({ categoryId: this.$route.params.classCategoryId })
  },
  computed: {
    ...mapGetters('class', ['categorySchedules'])
  },
  watch: {
    category: {
      handler (value) {
        console.log(value)
      }
    }
  },
  methods: {
    ...mapActions('class', ['getSchedule'])
  }
}
</script>

<style lang="scss" scoped>

.v-tabs {
  width: 50% !important;
}
.border-bottom{
  border-bottom: 1px solid #D5D5D5;
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
