<template>
  <v-container v-if="hasReadPermission" class="ma-0 pa-0 class-detail" fluid>
    <simple-prompt
      :show="show"
      :title="$t('cmsClass.deleteModalTitle')"
      :message="$t('cmsClass.deleteMessage')"
      action-color="#FF3333"
      :cancel-text="$t('cmsClass.deleteCancel')"
      :action-text="$t('cmsClass.deleteAction')"
      @update:show="show = false"
      @click:cancel="show = false"
      @click:action="handleDeleteClass"
    />
    <v-row align-content="center" justify="center" align="center" no-gutters>
      <v-col align-items="center" class="class-detail__width">
        <simple-breadcrumb :items="breadcrumbs" />
      </v-col>
    </v-row>
    <v-row align-content="center" justify="center" align="center" no-gutters>
      <v-col align-items="center" class="class-detail__width class-detail__card py-7">
        <v-row class="mr-5">
          <span class="px-16 class-detail__card__title">
            {{ $t('cmsClass.classDetail') }}
          </span>
          <v-spacer />
          <v-btn
            icon=""
            @click="$router.push($route.params.classId+'/class-edit')"
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

        <v-tabs v-model="tab" class="pt-7 px-16 class-detail__card__tabs">
          <v-tab>Info</v-tab>
          <v-tab>{{ $t('cmsClass.participants') }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="py-7">
          <v-tab-item class="px-16">
            <class-info />
          </v-tab-item>
          <v-tab-item>
            <class-participants />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
    <home-footer />
    <simple-snack-bar
      v-model="showSuccessSnackBar"
      :message="snackBarData && snackBarData.message"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { permissions } from '@/config/permission'
import ClassInfo from '@/components/Class/ClassDetail/ClassInfo'
import ClassParticipants from '@/components/Class/ClassDetail/ClassParticipants'
import HomeFooter from '@/components/Footer/HomeFooter.vue'
import SimplePrompt from '@/components/Modal/SimplePrompt'
import SimpleSnackBar from '@/components/SnackBar/SimpleSnackBar'
import SimpleBreadcrumb from '../../../components/Breadcrumb/SimpleBreadcrumb.vue'

export default {
  name: 'ClassDetail',
  layout: 'class',
  components: { ClassInfo, ClassParticipants, SimpleBreadcrumb, HomeFooter, SimplePrompt, SimpleSnackBar },
  data () {
    return {
      tab: null,
      show: false
    }
  },
  computed: {
    ...mapGetters('class', [
      'hasClassPermission',
      'classDetail',
      'snackBarData'
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
          text: this.classDetail.title || this.$t('cmsClass.classDetail'),
          disabled: true,
          to: '/class/' + this.$route.params.classId
        }
      ]
    },
    showSuccessSnackBar: {
      get () {
        return this.snackBarData.value
      },
      set () {}
    }
  },
  methods: {
    ...mapActions('class', ['deleteClass', 'setSnackBar']),
    async handleDeleteClass () {
      await this.deleteClass({ id: this.$route.params.classId, successCallback: this.successCallbackDelete })
    },
    successCallbackDelete () {
      const data = {
        value: true,
        message: this.$t('cmsClass.deleteSuccess')
      }
      this.setSnackBar(data)
      this.$router.push('/class')
    }
  },
  head () {
    return {
      title: this.$t('common.class')
    }
  }
}
</script>

<style lang="scss" scoped>
.class-detail {
  background-color: $grey-10;

  &__width {
    width: 80%;
    max-width: 1120px;
  }

  &__card {
    background: #FFFFFF;
    border-radius: 24px;

    &__title {
      font-weight: 600;
      font-size: 28px;
      line-height: 42px;
      color: #FF7D43;
    }

    &__tabs {
      border-bottom: 1px solid #D5D5D5;
    }
  }
}
</style>
