<template>
  <v-container
    class="contact pa-0 ma-0 justify-start align-start"
    fill-height
    fluid
  >
    <v-img class="background__top" :src="require('@/assets/images/bg/headset_mic.png')" width="473" height="578" contain />
    <v-img class="background__bottom" :src="require('@/assets/images/bg/headset_mic.png')" width="792" height="968" contain />
    <v-row class="mt-10 pt-10" justify="center" align="center" no-gutters>
      <v-col cols="8">
        <v-row>
          <v-col class="contact__left" cols="auto" md="5">
            <text-info-header
              :title="$t('contactUs.title')"
              :headings="$t('contactUs.headings')"
              :subtitle="$t('contactUs.subTitle')"
            />
          </v-col>
          <v-col cols="auto" md="7">
            <contact-list />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <home-footer />
  </v-container>
</template>

<script>
import TextInfoHeader from '@/components/Card/TextInfoHeader'
import contactList from '@/components/ContactUs/contactList'
import HomeFooter from '@/components/Footer/HomeFooter'

export default {
  name: 'Contact',
  components: { HomeFooter, contactList, TextInfoHeader },
  head () {
    return {
      title: this.$t('common.contact')
    }
  }
}
</script>

<style lang="scss" scoped>
.contact{
  overflow: hidden;

  &__header{
    font-size: 20px;
    font-weight: 600;
  }

  &__title{
    font-size: 46px;
    font-weight: 700;
    color: $orange-4;
  }
}

.background{
  &__top{
    position: absolute;
    transform: rotate(135deg);
    margin-top: -400px;
    margin-left:-200px;
  }

  &__bottom{
    position: absolute;
    top: 520px;
    right: -40px;
  }
}
</style>
