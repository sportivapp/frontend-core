<template>
  <tr
    class="class-category-row"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <td>
      <span class="spv-body--2 class-category-row__text--black">
        {{ category.title }}
      </span>
    </td>
    <td>
      <span class="spv-body--2 class-category-row__text--black">
        <span class="link-preview-schedule" @click="setPreviewModal">Lihat semua jadwal</span>
      </span>
    </td>
    <td>
      <v-row no-gutters justify="start" align="center">
        <v-col class="pa-0">
          <span
            v-if="isFree"
            class="spv-subtitle--2 class-category-row__price--free"
          >
            Gratis
          </span>
          <span v-else class="spv-subtitle--2 class-category-row__price--paid">
            {{ category.price | convertToPrice }}
          </span>
        </v-col>
        <v-spacer />
        <v-col cols="auto" class="pa-0">
          <div
            :class="[
              'class-category-row__actions__container',
              {'class-category-row__actions__container--hidden': !isHover}
            ]"
          >
            <v-btn
              icon
              @click="handleClickEdit"
            >
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn
              icon
              @click="handleClickDelete"
            >
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </td>
  </tr>
</template>

<script>
import { convertToPrice } from '@/utils/price'
import { mapGetters } from 'vuex'

export default {
  name: 'ClassLandingCategoryRow',
  filters: {
    convertToPrice
  },
  props: {
    category: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isHover: false
    }
  },
  computed: {
    ...mapGetters('class', [
      'selectedCoaches',
      'classUsers'
    ]),
    isFree () {
      return this.category.price === 0 || this.category.price === null
    }
  },
  methods: {
    handleClickEdit () {
      this.$emit('edit')
    },
    handleClickDelete () {
      this.$emit('delete')
    },
    setPreviewModal () {
      this.$emit('preview', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
.class-category-row {
  &:hover {
    background-color: $neutral-almost-white !important;

    td {
      background-color: $neutral-almost-white !important;
    }
  }

  &__text {
    &--black {
      color: $neutral-black;
    }

    &--grey {
      color: $neutral-neutral;
    }
  }

  &__price {
    &--free {
      color: $green-100;
    }

    &--paid {
      white-space: nowrap;
      color: $orange-100;
    }
  }

  &__actions {
    &__container {
      &--hidden {
        visibility: hidden;
      }
    }
  }
}
.link-preview-schedule{
  border-bottom: 1px solid black;
  cursor: pointer;
}
</style>
