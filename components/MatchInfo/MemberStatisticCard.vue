<template>
  <v-card class="statistic-card">
    <div class="statistic-card__member-info">
      <v-row justify="end" class="ma-0 pa-0 pt-2 pr-2">
        <v-btn
          class="ma-0 statistic-card__close-button"
          icon
          rounded
          @click="$emit('closeCard')"
        >
          <v-icon color="rgba(0, 0, 0, 0.54)">
            mdi-close
          </v-icon>
        </v-btn>
      </v-row>
      <v-row class="ma-0 pa-0">
        <v-col align-self="center">
          <v-row justify="center">
            <v-avatar size="80">
              <img src="@/assets/images/logos/sportiv-logo-small.png" alt="">
            </v-avatar>
          </v-row>
        </v-col>
        <v-col cols="6" align-self="center">
          <v-row class="spv-heading--3 white--text">
            {{ member.name }}
          </v-row>
          <v-row class="spv-subtitle--1 white--text mt-3">
            {{ member.position || 'position' }}
          </v-row>
        </v-col>
        <v-col cols="4" align-self="center">
          <v-row class="statistic-card__back-number" justify="center">
            {{ member.backNumber }}
          </v-row>
          <v-row class="spv-subtitle--3 white--text mt-3" justify="center">
            Nomor Punggung
          </v-row>
        </v-col>
      </v-row>
    </div>
    <div class="pa-4">
      <v-row class="pl-6 spv-heading--4">
        Statistik Pemain
      </v-row>
      <v-row class="px-6">
        <v-col v-for="statistic in member.statisticData" :key="statistic.title" class="border-bottom pl-0 spv-body--2" cols="6">
          {{ statistic.title }}<span class="spv-subtitle--1 float-right pr-11">{{ statistic.score }}</span>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'MemberStatisticCard',
  props: {
    member: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
.statistic-card{
  width: 100%;
  &__member-info {
    background:url("~@/assets/images/bg/member-statistic-bg.png") no-repeat ;
    background-size: 100%;
    height: 160px;
  }
  &__back-number{
    font-weight: bold;
    font-size: 60px;
    line-height: 42px;
    color: white;
  }
  &__close-button{
    background-color: #D5D5D5;
  }
}

.border-bottom{
  border-bottom: 1px solid #D5D5D5;
}
</style>
