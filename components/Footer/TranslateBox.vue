<template>
  <v-select
    v-model="$root.$i18n.locale"
    prepend-icon="mdi-web"
    :items="langs"
    class="translate-box"
    background-color="transparent"
    dark
    dense
    solo
    flat
    hide-details="true"
  >
    {{ langs.text }}
  </v-select>
</template>

<script>
export default {
  data () {
    return {
      langs: [
        {
          value: 'en',
          text: 'English'
        },
        {
          value: 'id',
          text: 'Bahasa Indonesia'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.translate-box {
  width: 185px;
  padding: 5px 0 5px 20px;
  background-color: #333639;
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 12px;
  font-weight: normal;
  position: relative;
}
select {
  width: 170px;
  height: 25px;
  color: $light-grey-1;
  font-size: 14px;
  margin-left: 5px;
}
</style>
