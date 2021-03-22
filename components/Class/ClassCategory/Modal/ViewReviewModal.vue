<template>
  <v-dialog
    v-model="value"
    max-width="544"
  >
    <v-card class="px-3">
      <v-row justify="middle" class="bottom-border">
        <v-col md="10">
          <v-card-title class="spv-subtitle--1 ma-0 pt-2">
            {{ review.categoryTitle }} &nbsp; <span class="grey--text">&bull; {{ review.startTime }}</span>
          </v-card-title>
        </v-col>
        <v-col md="2">
          <v-btn icon="" class="float-right" @click="value = false">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="spv-body--1 px-5">
        <v-col v-if="!isAttend">
          <p>
            {{ review.reason }}
          </p>
        </v-col>
        <v-col v-else>
          <v-sheet color="#F4F4F4" rounded="" max-width="480">
            <v-row justify="center" align="middle" class="spv-special--2 pt-5">
              <p>{{ rateText }}</p>
            </v-row>
            <v-row justify="center">
              <v-rating :value="review.rating" size="34" color="primary" background-color="primary" />
            </v-row>
          </v-sheet>
          <p class="mt-3">
            {{ review.review }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="mx-4" md="1">
          <v-avatar size="45" class="grey" />
        </v-col>
        <v-col class="pl-5">
          <v-row class="spv-subtitle--1">
            {{ review.user.name }}
          </v-row>
          <v-row class="spv-body--1 grey--text">
            {{ review.reviewTime }}
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
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
      default: () => ({
        categoryTitle: 'Hello World',
        startTime: 'Sabtu, 12 Desember 2020',
        review: 'Keren tapi baik lsjhdfvjlasdvfhjs bfjdbjf vasdjhgvjasd vjhasvfljhas jasd gjhsad j sjgh sjgdgjsgjsj',
        reason: 'Karna bangun kesiangan',
        reviewTime: 'Senin, 4 Oktober 2021',
        rating: 3,
        user: {
          name: 'Bambang'
        }
      })
    }
  },
  computed: {
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
