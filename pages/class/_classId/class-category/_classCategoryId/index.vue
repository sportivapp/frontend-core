<template>
  <v-container v-if="hasReadPermission" class="ma-0 pa-0 class-category-detail" fluid>
    <v-row align-content="center" justify="center" align="center" no-gutters>
      <v-col align-items="center" class="class-category-detail__width pl-5">
        <simple-breadcrumb class="pb-0" :items="breadcrumbs" />
      </v-col>
    </v-row>
    <div
      class="class-index"
    >
      <class-category-detail
        :category="classCategoryDetail"
        class="ma-auto"
      />
      <home-footer />
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { permissions } from '@/config/permission'
import ClassCategoryDetail from '@/components/Class/ClassCategory/ClassCategoryDetail'
import SimpleBreadcrumb from '@/components/Breadcrumb/SimpleBreadcrumb.vue'
import HomeFooter from '@/components/Footer/HomeFooter.vue'

export default {
  name: 'ClassCategoryDetailPage',
  layout: 'class',
  components: { ClassCategoryDetail, HomeFooter, SimpleBreadcrumb },
  computed: {
    ...mapGetters('class', [
      'hasClassPermission',
      'classCategoryDetail'
    ]),
    hasReadPermission () {
      return this.hasClassPermission(permissions.read)
    },
    breadcrumbs () {
      return [
        {
          text: this.$t('common.class'),
          disabled: false,
          to: '/class'
        },
        {
          text: this.$t('cmsClass.classDetail'),
          disabled: false,
          to: '/class/' + this.$route.params.classId
        },
        {
          text: this.classCategoryDetail.title ? this.classCategoryDetail.title : 'Class Category Detail',
          disabled: true,
          to: '/class/' + this.$route.params.classId + '/class-category/' + this.$route.params.classCategoryId
        }
      ]
    }
  },
  created () {
    this.initData()
  },
  methods: {
    ...mapActions('class', [
      'getClassCategoryDetail'
    ]),
    initData () {
      this.getClassCategoryDetail({
        classId: this.$route.params.classId,
        classCategoryId: this.$route.params.classCategoryId
      })
    }
  },
  head () {
    return {
      title: 'Class Category Detail'
    }
  }
}
</script>

<style lang="scss" scoped>
.class-category-detail {
  background-color: $grey-10;

  &__width {
    width: 80%;
    max-width: 1120px;
  }
}
</style>
