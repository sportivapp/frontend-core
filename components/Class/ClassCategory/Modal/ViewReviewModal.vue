<template>
  <v-dialog
    v-model="value"
    max-width="544"
  >
    <v-card class="px-3">
      <v-row justify="center" class="bottom-border">
        <v-col md="10">
          <v-card-title class="spv-subtitle--1 ma-0 pt-2">
            {{ review.categoryTitle }} &nbsp; <span class="grey--text">&bull; {{ review.startTime }}</span>
          </v-card-title>
        </v-col>
        <v-col md="2">
          <v-btn icon="" class="float-right" @click="$emit('input',false)">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="spv-body--1 px-5">
        <v-col v-if="!isAttend">
          <p>
            {{ review.classReason }}
          </p>
        </v-col>
        <v-col v-else>
          <v-sheet color="#F4F4F4" rounded="" max-width="480">
            <v-row justify="center" align="center" class="spv-special--2 pt-5">
              <p>{{ rateText }}</p>
            </v-row>
            <v-row justify="center">
              <v-rating
                :value="review.rating"
                size="34"
                color="#F4B718"
                background-color="#D5D5D5"
                readonly=""
              />
            </v-row>
          </v-sheet>
          <p class="mt-3">
            {{ review.review }}
          </p>
        </v-col>
      </v-row>
      <v-row class="pb-2">
        <v-col class="mx-4" md="1">
          <v-avatar size="45" class="grey">
            <img :src="profilePic" alt="">
          </v-avatar>
        </v-col>
        <v-col class="pl-5">
          <v-row class="spv-subtitle--1">
            {{ review.user && review.user.eusername }}
          </v-row>
          <v-row class="spv-body--1 grey--text">
            tgl review
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { staticUrl } from '@/config/api'

export default {
  name: 'ViewReviewModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    isAttend: {
      type: Boolean,
      default: false
    },
    review: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    profilePic () {
      return this.review.user && this.review.user.file ? staticUrl + this.review.user.file.efilename : require('@/assets/images/logos/sportiv-logo-small.png')
    },
    rateText () {
      let rate = ''
      if (this.review.rating <= 1) {
        rate = 'Yuk Tingkatkan Lagi!'
      } else if (this.review.rating <= 2) {
        rate = 'Yuk Tingkatkan Lagi!'
      } else if (this.review.rating <= 3) {
        rate = 'Keren!'
      } else if (this.review.rating <= 4) {
        rate = 'Anda Hebat!'
      } else if (this.review.rating <= 5) {
        rate = 'Luar Biasa!'
      }
      return rate
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-border {
  border-bottom: 1px solid #D5D5D5;
}
</style>
