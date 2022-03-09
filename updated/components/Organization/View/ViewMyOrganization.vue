<template>
  <v-dialog
    v-model="sync"
    max-width="550"
    @click:outside="handleClickOutside"
  >
    <v-card class="scroll-card">
      <v-card-title>
        <v-row justify="center" align="center">
          {{ $t('common.followedOrganization') }}
        </v-row>
      </v-card-title>
      <v-container class="px-10 pb-4">
        <v-row
          v-if="isSendingRequest"
          justify="center"
          align="center"
          class="py-5"
        >
          <moon-loader
            size="28px"
            color="green"
          />
        </v-row>
        <v-list v-else-if="hasOrganization" class="view-my-org mb-8">
          <v-list-item
            v-for="(organization, index) in myOrganizations"
            :key="index"
            :title="organization.ecompanyname"
            class="view-my-org__item"
            link
            @click="handleLoginOrganization(organization)"
          >
            <v-list-item-title>
              {{ organization.ecompanyname }}
            </v-list-item-title>
            <v-icon
              large
            >
              mdi-chevron-right
            </v-icon>
          </v-list-item>
        </v-list>
        <v-row v-else justify="center" align="center">
          {{
            $t('common.noOrganizationJoined')
          }}
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'

export default {
  name: 'ViewMyOrganization',
  components: {
    MoonLoader
  },
  props: {
    sync: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isSendingRequest: false,
      alreadyInit: false
    }
  },
  computed: {
    ...mapGetters('organization', [
      'myOrganizations'
    ]),
    hasOrganization () {
      return this.myOrganizations.length > 0
    }
  },
  created () {
    if (!this.alreadyInit) {
      this.sendGetMyOrganization()
    }
  },
  methods: {
    ...mapActions('organization', [
      'getMyOrganizations',
      'loginOrganization'
    ]),
    handleClickOutside () {
      this.$emit('clickOutside')
    },
    handleLoginOrganization (organization) {
      if (this.isSendingRequest) { return }
      this.isSendingRequest = false

      const data = {
        companyId: organization.ecompanyid
      }
      this.loginOrganization({
        data,
        successCallback: this.successLoginOrganization,
        errHandler: this.failLoginOrganization
      })
    },
    successLoginOrganization (res) {
      this.isSendingRequest = true
      window.location.href = res.data.data
    },
    failLoginOrganization (error) {
      this.isSendingRequest = false
      this.$swal({
        icon: 'error',
        text: `Something went wrong: ${error.response.data.errorMessage}`
      })
    },
    sendGetMyOrganization () {
      const params = {
        page: 0,
        size: 9999,
        keyword: ''
      }
      this.getMyOrganizations({
        params,
        successCallback: this.getMyOrganizationCallback,
        errHandler: this.getMyOrganizationCallback
      })
    },
    getMyOrganizationCallback () {
      this.isSendingRequest = false
      this.alreadyInit = true
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-card {
  border-radius: 25px !important;

  &__title {
    font-weight: 500;
    font-size: 20px;
    color: black;
    text-align: center;
  }
}

.view-my-org {
  max-height: 375px;
  overflow-y: scroll;

  &__item {
    border: 1px solid $grey-8;

    ::v-deep .v-list-item__title {
      font-weight: 600;
      color: $grey-7;
      font-size: 16px;
    }
  }
}
</style>
