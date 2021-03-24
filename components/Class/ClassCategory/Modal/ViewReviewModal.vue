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
      <v-row class="spv-body--1 px-4">
        <v-col v-if="!isAttend" class="ma-0 mt-4">
          <p>
            {{ review.reason }}
          </p>
        </v-col>
        <v-col v-else>
          <v-sheet color="#F4F4F4" rounded max-width="480">
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
          <v-row class="px-2">
            <p class="spv-body--1 mt-3">
              {{ review.review }}
            </p>
          </v-row>
          <v-row class="px-2">
            <p class="spv-body--1 mt-3">
              Yang perlu ditingkatkan: <span class="spv-subtitle--1">{{ improvementWord }}</span>
            </p>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="pb-4">
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
            {{ review.createTime }}
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { staticUrl } from '@/config/api'

const improvementStatus = {
  learnTime: 'LEARN_TIME',
  coach: 'COACH',
  learnMaterial: 'LEARN_MATERIAL',
  location: 'LOCATION'
}

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
    improvementWord () {
      let improvement = ''
      for (let i = 0; i < this.review.improvements.length; i++) {
        switch (this.review.improvements[i].code) {
          case improvementStatus.learnTime:
            improvement += 'Waktu Belajar'
            if (i !== this.review.improvements.length - 1) { improvement += ', ' }
            break
          case improvementStatus.coach:
            improvement += 'Pengajar'
            if (i !== this.review.improvements.length - 1) { improvement += ', ' }
            break
          case improvementStatus.learnMaterial:
            improvement += 'Bahan Pembelajaran'
            if (i !== this.review.improvements.length - 1) { improvement += ', ' }
            break
          case improvementStatus.location:
            improvement += 'Lokasi'
            if (i !== this.review.improvements.length - 1) { improvement += ', ' }
            break
          default: break
        }
      }
      return improvement
    },
    profilePic () {
      return this.review.user && this.review.user.file ? staticUrl + this.review.user.file.efilename : require('@/assets/images/logos/sportiv-logo-small.png')
    },
    rateText () {
      let rate = ''
      if (this.review.rating <= 1) {
        rate = 'Mengecewakan'
      } else if (this.review.rating <= 2) {
        rate = 'Kurang Memuaskan'
      } else if (this.review.rating <= 3) {
        rate = 'Cukup Baik'
      } else if (this.review.rating <= 4) {
        rate = 'Memuaskan'
      } else if (this.review.rating <= 5) {
        rate = 'Sangat Memuaskan'
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
