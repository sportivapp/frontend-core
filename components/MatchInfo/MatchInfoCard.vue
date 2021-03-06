<template>
  <v-card>
    <v-row class="match-card__padding">
      <v-col>
        <v-row justify="start" class="px-2">
          <v-chip small color="#D5D5D5">
            <span class="spv-caption--2">Home</span>
          </v-chip>
        </v-row>
        <v-row justify="start" class="mt-2">
          <v-col class="pa-0 d-flex">
            <v-avatar class="mx-auto my-2" size="64" color="primary">
              <img :src="homeLogo" alt="">
            </v-avatar>
          </v-col>
          <v-col class="px-0" align-self="center" cols="9">
            <div class="spv-heading--4">
              {{ matchInfo.homeTeam && matchInfo.homeTeam.name }}
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row justify="center">
          <div class="text-center spv-subtitle--3 match-card__tournament-info">
            {{ matchStartDate && matchStartDate.matchDate }} &bull;
            {{ matchStartDate && matchStartDate.matchTime }}<br>{{ matchLocation }}
          </div>
        </v-row>
        <v-row justify="center" class="my-5">
          <div class="match-card__point-card special-style--strip text-center">
            {{ matchInfo.homeScore }}
          </div>
          <span class="mx-2 special-style--strip">-</span>
          <div class="match-card__point-card special-style--strip text-center">
            {{ matchInfo.awayScore }}
          </div>
        </v-row>
        <v-row class="spv-subtitle--3 orange-text" justify="center">
          {{ matchStatusValue }}
        </v-row>
      </v-col>
      <v-col>
        <v-row justify="end" class="px-2">
          <v-chip small color="#D5D5D5">
            <span class="spv-caption--2">Away</span>
          </v-chip>
        </v-row>
        <v-row justify="end" class="mt-2">
          <v-col class="px-0" align-self="center" cols="9">
            <div class="spv-heading--4 float-right">
              {{ matchInfo.awayTeam && matchInfo.awayTeam.name }}
            </div>
          </v-col>
          <v-col class="pa-0 d-flex">
            <v-avatar class="mx-auto my-2" size="64" color="primary">
              <img :src="awayLogo" alt="">
            </v-avatar>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { matchStatus } from '@/config/tournamentStatus.js'
import moment from 'moment'
export default {
  name: 'MatchInfoCard',
  computed: {
    ...mapGetters('match', ['matchInfo']),
    ...mapGetters(['provinces']),
    matchStatusValue () {
      if (this.matchInfo.status) {
        if (this.matchInfo.status === matchStatus.onProgress) { return 'Sedang Berlangsung' } else if (this.matchInfo.status === matchStatus.delay) { return 'Ditunda' } else if (this.matchInfo.status === matchStatus.done) { return 'Selesai' } else if (this.matchInfo.status === matchStatus.upComming) { return 'Akan Datang' }
      }
      return ''
    },
    homeLogo () {
      return this.matchInfo.homeTeam && this.matchInfo.homeTeam.logo.name ? '/src' + this.matchInfo.homeTeam.logo.name : require('@/assets/images/logos/sportiv-logo-small.png')
    },
    awayLogo () {
      return this.matchInfo.awayTeam && this.matchInfo.awayTeam.logo.name ? '/src' + this.matchInfo.awayTeam.logo.name : require('@/assets/images/logos/sportiv-logo-small.png')
    },
    matchStartDate () {
      if (this.matchInfo.startDate) {
        const matchDate = moment(this.matchInfo.startDate).locale('id').format('LL')
        const matchTime = moment(this.matchInfo.startDate).format('HH:mm')
        return { matchDate, matchTime }
      }
      return null
    },
    matchLocation () {
      if (this.matchInfo.tournamentLocation) {
        let province = ''
        if (this.provinces) {
          province = this.provinces.find(pro => pro.estateid === this.matchInfo.tournamentLocation.provinceId)
        }
        return `${this.matchInfo.tournamentLocation.address}, ${province ? province.estatename : ''}`
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
v-card{
  width: 100%;
}

.match-card{
  &__padding{
    padding: 16px 56px;
  }
  &__tournament-info{
    color: #AAAAAA;
  }
  &__point-card{
    background-color: #AAAAAA;
    color: white;
    width: 36px;
    height: 36px;
    border-radius: 5px;
    outline: none;
  }
}
.special-style{
  &--strip{
    font-weight: 600;
    size: 24px;
    line-height: 36px;
  }
}
.orange-text{
  color:#FF7041;
}

</style>
