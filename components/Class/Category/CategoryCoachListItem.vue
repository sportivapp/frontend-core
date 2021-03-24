<template>
  <v-row class="category-coach-item">
    <v-col class="category-coach-item__content">
      <v-row
        :class="[
          'category-coach-item__content__wrapper',
          `category-coach-item__content__wrapper-${index}`
        ]"
        justify="start"
        align="center"
      >
        <v-menu
          :disabled="classCoachUserIds.length === 0"
          bottom
          offset-y
          open-on-click
          close-on-content-click
          :attach="`.category-coach-item__content__wrapper-${index}`"
          content-class="select-menu__content"
          nudge-bottom="4"
          class="select-menu"
        >
          <template v-slot:activator="slotProps">
            <v-row
              class="select-menu__activator select-menu__activator__name"
              v-bind="slotProps.attrs"
              align="center"
              justify="space-between"
              no-gutters
              v-on="slotProps.on"
            >
              <v-col cols="auto">
                <span
                  v-if="coach"
                  class="select-menu__activator__name--has-data"
                >
                  {{ getSelectedCoach(coach).eusername }}
                </span>
                <span
                  v-else
                  class="select-menu__activator__name--no-data"
                >
                  Pilih pelatih
                </span>
              </v-col>
              <v-col cols="auto">
                <v-icon v-if="slotProps.value" right>
                  mdi-menu-up
                </v-icon>
                <v-icon v-else right>
                  mdi-menu-down
                </v-icon>
              </v-col>
            </v-row>
          </template>
          <template v-slot:default>
            <v-list class="select-menu__select__sheet">
              <v-list-item
                v-for="classCoach in classCoachUserIds"
                :key="classCoach"
                :class="[
                  'select-menu__select__item',
                  { 'select-menu__select__item--selected': coach === classCoach }
                ]"
                @click="handleClickClassCoach(classCoach)"
              >
                <v-row no-gutters class="select-menu__select__item__container">
                  <v-col cols="auto" class="select-menu__select__item__image">
                    <v-avatar size="32">
                      <v-img :src="getSelectedCoachImage(classCoach)" />
                    </v-avatar>
                  </v-col>
                  <v-col class="select-menu__item__info">
                    <v-row
                      no-gutters
                      class="select-menu__select__item__name spv-subtitle--2"
                    >
                      {{ getSelectedCoach(classCoach).eusername }}
                    </v-row>
                    <v-row no-gutters class="select-menu__select__item__email">
                      {{ getSelectedCoach(classCoach).euseremail }}
                    </v-row>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list>
          </template>
        </v-menu>
      </v-row>
    </v-col>
    <v-col cols="auto" class="category-coach-item__delete">
      <v-btn
        icon
        :disabled="totalData<=1"
        @click="handleClickDelete"
      >
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { staticUrl } from '@/config/api'

export default {
  name: 'CategoryScheduleListItem',
  props: {
    coach: {
      type: [Number, null, undefined],
      default: null
    },
    categoryCoachIds: {
      type: Array,
      default: () => ([])
    },
    classCoachUserIds: {
      type: Array,
      default: () => ([])
    },
    index: {
      type: Number,
      default: 0
    },
    totalData: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters('class', [
      'selectedCoaches',
      'classUsers'
    ])
  },
  methods: {
    handleClickDelete () {
      this.$emit('delete', this.index)
    },
    getSelectedCoach (coachUserId) {
      return this.classUsers.find(coach => coach.euserid === coachUserId)
    },
    getSelectedCoachImage (coachUserId) {
      const imageUrl = this.getSelectedCoach(coachUserId).file &&
        this.getSelectedCoach(coachUserId).file.efilename
      return imageUrl
        ? staticUrl + imageUrl
        : require('@/assets/images/logos/sportiv-logo-small.png')
    },
    handleClickClassCoach (coachId) {
      this.$emit('change', this.index, coachId)
    }
  }
}
</script>

<style lang="scss" scoped>
.category-coach-item {
  margin: 0;
  height: 40px;

  &__content, &__delete {
    padding: 0;
  }

  &__content {
    &__wrapper {
      position: relative;
      margin: 0;
      height: 100%;
      border: 1px solid $neutral-light-grey;
      border-radius: 8px;
    }

    &__dash-divider {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 8px;
    }
  }

  &__delete {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

.select-menu {
  &__content {
    min-width: 174px;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.15) !important;
  }

  &__activator {
    padding: 9px 12px;
    border-radius: 4px;

    &__name {
      &--no-data {
        color: $neutral-light-grey;
      }

      &--has-data {
        color: $neutral-black;
      }
    }
  }

  &__select {
    &__item {
      &:hover {
        cursor: pointer;
        background-color: $neutral-almost-white !important;
      }

      &--selected {
        background-color: $neutral-almost-white;
      }

      &__image {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 12px;
      }

      &__name {
        color: $neutral-black;
      }

      &__email {
        color: $neutral-neutral;
        font-size: 14px;
        line-height: 26px;
      }
    }
  }
}
</style>
