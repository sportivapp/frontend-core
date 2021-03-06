<template>
  <v-row
    justify="center"
    align="center"
    class="coach-tile"
    @mouseover="isRowHover=true"
    @mouseleave="isRowHover=false"
  >
    <v-col cols="1">
      <v-avatar size="40">
        <img :src="coachLogo" alt="">
      </v-avatar>
    </v-col>
    <v-col cols="10" class="pl-0 spv-body--2">
      {{ coachData.eusername }}
    </v-col>
    <v-col>
      <v-icon v-if="isRowHover" @click="$emit('deleteRow',coachData.euserid)">
        mdi-delete
      </v-icon>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CoachTile',
  props: {
    coachData: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    isRowHover: false
  }),
  computed: {
    coachLogo () {
      return this.coachData.file ? '/src/' + this.coachData.file.efilename : require('@/assets/images/logos/sportiv-logo-small.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.coach-tile:hover{
  background: #F4F4F4;
}
</style>
