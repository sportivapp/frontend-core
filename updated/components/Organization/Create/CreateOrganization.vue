<template>
  <v-dialog
    v-model="sync"
    max-width="400"
    @click:outside="handleClickOutside"
  >
    <v-card class="scroll-card">
      <v-card-title>
        <v-row justify="center" align="center">
          {{ $t('common.createOrganization') }}
        </v-row>
      </v-card-title>
      <v-container>
        <v-form
          ref="createForm"
          v-model="isValidForm"
          lazy-validation
          class="create-form px-12"
          @submit.prevent=""
        >
          <v-row class="py-0">
            <v-col class="py-0">
              <v-row>
                <span class="create-form__header">{{
                  $t("createOrganization.name")
                }}</span>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="name"
                  :rules="rules.name"
                  dense
                  rounded
                  validate-on-blur
                  class="form-input"
                />
              </v-row>
            </v-col>
          </v-row>
          <v-row class="py-0">
            <v-col class="py-0">
              <v-row>
                <span class="create-form__header">{{
                  $t("createOrganization.email")
                }}</span>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="email"
                  :rules="rules.email"
                  dense
                  rounded
                  validate-on-blur
                  class="form-input"
                />
              </v-row>
            </v-col>
          </v-row>
          <v-row class="py-0">
            <v-col class="py-0">
              <v-row>
                <span class="create-form__header">{{
                  $t("createOrganization.phone")
                }}</span>
              </v-row>
              <v-row class="pb-2">
                <v-col class="pa-0 ma-0">
                  <client-only>
                    <vue-tel-input
                      v-model="phone"
                      :preferred-countries="['ID']"
                      :input-options="{showDialCode: true}"
                      placeholder=" "
                      mode="international"
                      required
                      valid-characters-only
                      @validate="handlePhoneValidation"
                    />
                  </client-only>
                  <div
                    v-if="!isValidPhone"
                    class="v-messages theme--light error--text pt-1"
                    role="alert"
                  >
                    <div class="v-messages__wrapper">
                      <div class="v-messages__message">
                        {{ error.phone }}
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="py-0">
            <v-col class="py-0">
              <v-row>
                <span class="create-form__header">{{
                  $t("createOrganization.industry")
                }}</span>
              </v-row>
              <v-row>
                <v-select
                  v-model="industry"
                  :items="industries"
                  :rules="rules.industry"
                  :placeholder="`${$t('common.select')} ${$t('createOrganization.industry')}`"
                  item-value="eindustryid"
                  item-text="eindustryname"
                  filled
                  multiple
                />
              </v-row>
            </v-col>
          </v-row>
          <v-row class="py-0">
            <v-col class="py-0">
              <v-row>
                <span class="create-form__header">{{
                  $t("createOrganization.country")
                }}</span>
              </v-row>
              <v-row>
                <v-select
                  v-model="country"
                  :items="countries"
                  :rules="rules.country"
                  :placeholder="`${$t('common.select')} ${$t('createOrganization.country')}`"
                  item-value="ecountryid"
                  item-text="ecountryname"
                  filled
                />
              </v-row>
            </v-col>
          </v-row>
          <v-row class="py-0">
            <v-col class="py-0">
              <v-row>
                <span class="create-form__header">{{
                  $t("createOrganization.state")
                }}</span>
              </v-row>
              <v-row>
                <v-select
                  v-model="province"
                  :items="provinces"
                  :rules="rules.province"
                  :placeholder="`${$t('common.select')} ${$t('createOrganization.state')}`"
                  item-value="estateid"
                  item-text="estatename"
                  filled
                />
              </v-row>
            </v-col>
          </v-row>
          <v-row class="py-0">
            <v-col class="py-0">
              <v-row>
                <span class="create-form__header">{{
                  $t("createOrganization.address")
                }}</span>
              </v-row>
              <v-row>
                <v-textarea
                  v-model="address"
                  :rules="rules.address"
                  filled
                />
              </v-row>
            </v-col>
          </v-row>
          <v-row
            v-if="errorMessage"
            justify="center"
            align="center"
            class="pa-0"
          >
            <v-col class="pt-0">
              <div
                class="v-messages theme--light error--text pt-1 create-form__error"
                role="alert"
              >
                <div class="v-messages__wrapper">
                  <div class="v-messages__message">
                    {{ errorMessage }}
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <sportiv-button
              class="mb-7"
              type="submit"
              @click="handleClickCreateButton"
            >
              <moon-loader
                v-if="isSendingRequest"
                size="28px"
                color="white"
              />
              <span
                v-else
                class="text-capitalize"
              >
                {{ $t('createOrganization.register') }}
              </span>
            </sportiv-button>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import SportivButton from '@/components/inputs/SportivButton/SportivButton'
import { VueTelInput } from 'vue-tel-input'
import { isValidEmail, isValidPhoneNumber } from '@/utils/validation'
import { errorToText } from '@/utils/error'

export default {
  name: 'CreateOrganization',
  components: {
    SportivButton,
    MoonLoader,
    VueTelInput
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
      isValidForm: false,
      isValidPhone: false,
      error: {
        phone: ''
      },
      errorMessage: '',
      name: '',
      email: '',
      phone: '',
      industry: [],
      country: '',
      province: '',
      address: '',
      rules: {
        name: [
          v => !!v || 'Name can not be empty'
        ],
        email: [
          v => !!v || 'Email can not be empty',
          v => isValidEmail(v) || 'Email must be valid'
        ],
        industry: [
          v => v.length > 0 || 'Industry must be selected'
        ],
        country: [
          v => !!v || 'Country must be selected'
        ],
        province: [
          v => !!v || 'Province must be selected'
        ],
        address: [
          v => !!v || 'Address can not be empty'
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'industries',
      'countries',
      'provinces'
    ]),
    allIndustries () {
      return []
    },
    createOrgForm () {
      return this.$refs.createForm
    },
    formattedPhoneNumber () {
      return this.phone
        .replaceAll(' ', '')
        .replaceAll('-', '')
    }
  },
  watch: {
    country: {
      deep: true,
      handler (value) {
        if (value === '') { return }
        this.sendGetProvince(value)
      }
    }
  },
  created () {
    this.getIndustries()
    this.getCountries()
  },
  methods: {
    ...mapActions([
      'getIndustries',
      'getCountries',
      'getProvinces'
    ]),
    ...mapActions('organization', [
      'getMyOrganizations',
      'createOrganization'
    ]),
    handlePhoneValidation (validationObject) {
      this.isValidPhone = validationObject.isValid
      this.error.phone = validationObject.isValid
        ? ''
        : 'Phone number must be valid'
    },
    validatePhoneNumber () {
      if (isValidPhoneNumber(this.formattedPhoneNumber)) {
        this.isValidPhone = true
        this.error.phone = ''
      } else {
        this.isValidPhone = false
        this.error.phone = 'Phone number must be valid'
      }
      return this.isValidPhone
    },
    validateInput () {
      return this.createOrgForm.validate() && this.isValidPhone
    },
    handleClickOutside () {
      this.$emit('clickOutside')
    },
    handleClickCreateButton () {
      if (this.isSendingRequest) { return }
      if (this.validateInput()) {
        this.isSendingRequest = true
        this.error.phone = ''
        this.errorMessage = ''
        this.sendCreateOrg()
      }
    },
    sendGetProvince (countryId) {
      const params = {
        countryId,
        size: 9999
      }
      this.getProvinces({ params })
    },
    sendCreateOrg () {
      const data = {
        companyName: this.name,
        companyEmail: this.email,
        companyParentId: null,
        street: this.address,
        industryIds: [...this.industry],
        companyPhoneNumber: this.formattedPhoneNumber,
        countryId: this.country,
        stateId: this.province
      }
      this.createOrganization({
        data,
        successCallback: this.successCreateOrganization,
        errHandler: this.failCreateOrganization
      })
    },
    resetData () {
      this.name = ''
      this.email = ''
      this.phone = ''
      this.industry = []
      this.country = ''
      this.province = ''
      this.address = ''
    },
    successCreateOrganization () {
      this.isSendingRequest = false
      this.resetData()
      this.sendGetMyOrganization()
      this.$swal({
        icon: 'success',
        title: 'Success',
        allowOutsideClick: false,
        text: 'Organization created'
      }).then((value) => {
        if (value) {
          this.handleClickOutside()
        }
      })
    },
    failCreateOrganization (error) {
      this.isSendingRequest = false
      this.errorMessage = errorToText({
        defaultErrorText: 'Something went wrong when creating organization, please try again',
        errorMapping: this.$t('createOrganization.error'),
        error: error.response.data.errorMessage
      })
    },
    sendGetMyOrganization () {
      const params = {
        page: 0,
        size: 9999,
        keyword: ''
      }
      this.getMyOrganizations({
        params
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "assets/input-override";
@import "assets/vendors/vue-tel-input";

::v-deep .v-card {
  border-radius: 25px !important;

  &__title {
    font-weight: 600;
    font-size: 24px;
    color: black;
    text-align: center;
  }
}

.create-form {
  max-height: 70vh;
  border-radius: 12px;
  font-size: 13px;
  overflow-y: scroll;

  &__title {
    color: black;
    font-size: 24px;
    font-weight: 600;
  }

  &__header {
    color: $grey-3;
    font-size: 13px;
    font-weight: 500;
  }

  &__error {
    text-align: center;
  }
}
</style>
