<template>
  <v-card
    class="member-card py-2 px-2"
    elevation="0"
    @mouseover="showBtn = true"
    @mouseleave="showBtn=false"
  >
    <v-row v-if="isPositionRight" no-gutters>
      <v-col align-self="center">
        <v-tooltip
          v-if="enableShowStatistic && showBtn"
          bottom
        >
          <template v-slot:activator="{on, attrs}">
            <v-btn
              icon
              tile
              class="member-card__btn member-card__btn--orange mr-2 float-left"
              v-bind="attrs"
              v-on="on"
              @click="$emit('clickStatistic', member.id)"
            >
              <v-icon color="#FF7041">
                mdi-trending-up
              </v-icon>
            </v-btn>
          </template>
          <span class="spv-subtitle--3">Lihat Statistik</span>
        </v-tooltip>

        <v-tooltip
          v-if="showBtn && !disableBtnProfile"
          bottom
        >
          <template v-slot:activator="{on, attrs}">
            <v-btn
              icon
              tile
              class="member-card__btn float-left"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-account-outline
              </v-icon>
            </v-btn>
          </template>
          <span class="spv-subtitle--3">Lihat Profil</span>
        </v-tooltip>
      </v-col>
      <v-col cols="6" align-self="center">
        <v-row class="spv-subtitle--2" justify="end">
          {{ member && member.name }}&nbsp;<span class="spv-special--1 grey--text float-right">{{ member && member.backNumber }}</span>
        </v-row>
        <v-row v-if="!single" class="spv-body--3 grey--text d-flex" justify="end">
          {{ member && member.position || 'Position' }}
        </v-row>
      </v-col>
      <v-col align-self="center" cols="2">
        <v-avatar size="40" class="float-right">
          <img :src="memberLogo" alt="">
        </v-avatar>
      </v-col>
    </v-row>

    <v-row v-else no-gutters>
      <v-col align-self="center" cols="2">
        <v-avatar size="40">
          <img :src="memberLogo" alt="">
        </v-avatar>
      </v-col>
      <v-col cols="6" align-self="center">
        <v-row class="spv-subtitle--2">
          <span class="spv-special--1 grey--text">{{ member && member.backNumber }}</span>&nbsp;{{ member && member.name }}
        </v-row>
        <v-row v-if="!single" class="spv-body--3 grey--text">
          {{ member && member.position || 'Position' }}
        </v-row>
      </v-col>
      <v-col align-self="center">
        <v-tooltip
          v-if="enableShowStatistic && showBtn"
          bottom
        >
          <template v-slot:activator="{on, attrs}">
            <v-btn
              icon
              tile
              class="member-card__btn member-card__btn--orange ml-2 float-right"
              v-bind="attrs"
              v-on="on"
              @click="$emit('clickStatistic', member.id)"
            >
              <v-icon color="#FF7041">
                mdi-trending-up
              </v-icon>
            </v-btn>
          </template>
          <span class="spv-subtitle--3">Lihat Statistik</span>
        </v-tooltip>
        <v-tooltip
          v-if="!disableBtnProfile && showBtn"
          bottom
        >
          <template v-slot:activator="{on, attrs}">
            <v-btn
              v-if="showBtn"
              icon
              tile
              class="member-card__btn float-right"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-account-outline
              </v-icon>
            </v-btn>
          </template>
          <span class="spv-subtitle--3">Lihat Profil</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'LineupMemberCard',
  props: {
    isPositionRight: {
      type: Boolean,
      default: false
    },
    enableShowStatistic: {
      type: Boolean,
      default: false
    },
    member: {
      type: Object,
      default: () => {}
    },
    single: {
      type: Boolean,
      default: false
    },
    disableBtnProfile: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    showBtn: false
  }),
  computed: {
    memberLogo () {
      return this.member.user.logo ? '/src' + this.member.user.logo.name : require('@/assets/images/logos/sportiv-logo-small.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.member-card{
  height: 56px;
  width: 400px;
  border-radius: 8px;

  &__btn{
    width: 32px;
    height: 32px;
    border: 1px solid #AAAAAA;
    box-sizing: border-box;
    border-radius: 8px;
    &--orange{
      color: #FF7041;
      border-color: #FF7041;
    }
  }
}

.member-card:hover{
  background: #F4F4F4;

  }
</style>
