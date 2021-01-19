<template>
  <v-container
    :class="[
      'home-footer pa-0',
      {'home-footer--small': $vuetify.breakpoint.smAndDown}
    ]"
    no-gutters
    fluid
  >
    <div class="home-footer__ellipse hidden-sm-and-down" />
    <v-row
      no-gutters
      justify="center"
      align="center"
    >
      <v-col align="center" cols="12" md="8">
        <v-row
          no-gutters
          justify="center"
          align="center"
          class="home-footer__banner"
        >
          <v-col align="start" cols="11" md="10">
            <v-row no-gutters justify="center" align="center">
              <v-col cols="12" md="7">
                <v-row no-gutters class="home-footer__banner__title">
                  {{ $t('homeFooter.title') }}
                </v-row>
                <v-row no-gutters class="home-footer__banner__sub-title">
                  {{ $t('homeFooter.subTitle') }}
                </v-row>
                <v-row no-gutters class="home-footer__banner__download">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.sportiv"
                    target="_blank"
                  >
                    <img src="../../assets/images/icons/google_play.png">
                  </a>
                </v-row>
              </v-col>
              <v-col
                class="hidden-sm-and-down home-footer__banner__logo__container"
                cols="12"
                md="5"
              >
                <img
                  class="home-footer__banner__logo"
                  src="../../assets/images/icons/iphone_1.png"
                >
              </v-col>
              <v-spacer />
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      align="center"
      class="home-footer__texts"
      no-gutters
    >
      <v-col cols="11" md="8">
        <v-row no-gutters>
          <img
            class="home-footer__texts__sportiv-logo"
            src="../../assets/images/logos/sportiv-white.png"
          >
        </v-row>
        <v-row no-gutters justify="start" align="start">
          <v-col cols="12" md="auto">
            <v-row no-gutters class="home-footer__texts__header">
              {{ $t('homeFooter.product') }}
            </v-row>
            <v-row no-gutters class="home-footer__texts__item">
              <v-col>
                <nuxt-link to="/organization">
                  {{ $t('homeFooter.organization') }}
                </nuxt-link>
                <br>
                <nuxt-link to="/team">
                  {{ $t('homeFooter.team') }}
                </nuxt-link>
                <br>
                <nuxt-link to="/forum">
                  {{ $t('homeFooter.forum') }}
                </nuxt-link>
              </v-col>
              <v-col class="pl-11">
                <nuxt-link to="/class">
                  {{ $t('homeFooter.class') }}
                </nuxt-link>
                <br>
                <nuxt-link to="/tournament">
                  {{ $t('homeFooter.tournament') }}
                </nuxt-link>
                <br>
                <nuxt-link to="/booking">
                  {{ $t('homeFooter.booking') }}
                </nuxt-link>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer />
          <v-col cols="12" md="auto">
            <v-row
              no-gutters
              class="home-footer__texts__header"
            >
              {{ $t('homeFooter.company') }}
            </v-row>
            <v-row no-gutters class="home-footer__texts__item">
              <v-col>
                <nuxt-link to="/about">
                  {{ $t('homeFooter.aboutUs') }}
                </nuxt-link>
                <br>
                <nuxt-link to="/contact">
                  {{ $t('homeFooter.contactUs') }}
                </nuxt-link>
                <br>
                <nuxt-link to="/legal/term-of-services">
                  {{ $t('homeFooter.termOfServices') }}
                </nuxt-link>
                <br>
                <nuxt-link to="/legal/privacy-policy">
                  {{ $t('homeFooter.privacyPolicy') }}
                </nuxt-link>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer />
          <v-col cols="12" md="auto">
            <v-row no-gutters class="home-footer__texts__header">
              {{ $t('homeFooter.followUs') }}
            </v-row>
            <v-row no-gutters class="home-footer__texts__item">
              <v-col>
                <a
                  class="home-footer__texts__item--social"
                  href="https://www.facebook.com/SportivApps/"
                  target="_blank"
                >
                  <img
                    class="icon-facebook"
                    src="../../assets/images/icons/facebook.png"
                  >
                </a>
                <a
                  class="home-footer__texts__item--social"
                  href="https://twitter.com/Sportivapp"
                  target="_blank"
                >
                  <img
                    class="icon-twitter"
                    src="../../assets/images/icons/twitter.png"
                  >
                </a>
                <a
                  class="home-footer__texts__item--social"
                  href="https://www.instagram.com/sportivapp/"
                  target="_blank"
                >
                  <img
                    class="icon-instagram"
                    src="../../assets/images/icons/instagram.png"
                  >
                </a>
                <a
                  class="home-footer__texts__item--social"
                  href="https://www.linkedin.com/company/sportivapp"
                  target="_blank"
                >
                  <img
                    class="icon-linkedIn"
                    src="../../assets/images/icons/linkedIn.png"
                  >
                </a>
              </v-col>
            </v-row>
            <v-row no-gutters class="home-footer__texts__motto">
              {{ $t('homeFooter.motto') }}
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HomeFooter'
}
</script>

<style lang="scss" scoped>
$footer-top-margin: 150px;
$banner-logo-offset: 177px;
$organization-margin: 100px;
$ellipse-height: 200px;

.home-footer {
  margin-top: $footer-top-margin + $banner-logo-offset + $organization-margin
   + ($ellipse-height / 2);
  background-color: $black-neutral;
  position: relative;

  &--small {
    margin-top: $footer-top-margin + ($organization-margin * 2);
  }

  &__ellipse {
    background-color: $black-neutral;
    top: -($ellipse-height/2);
    position: absolute;
    height: $ellipse-height;
    left: -10%;
    width: 120%;
    border-radius: 100%;
  }

  &__banner {
    margin-top: -$footer-top-margin - ($ellipse-height / 2);
    width: 100%;
    background: url("../../assets/images/bg/orange-background.png") no-repeat;
    background-size: cover;
    border-radius: 20px;
    position: relative;

    &__title {
      color: $white-2;
      font-size: 33px;
      font-weight: 700;
      margin-top: 44px;
    }

    &__sub-title {
      color: $white-2;
      font-size: 20px;
      margin-top: 24px;
    }

    &__download {
      width: 147px;
      height: 44px;
      object-fit: contain;
      margin-top: 41px;
      margin-bottom: 57px;
    }

    &__logo {
      width: 40%;
      height: auto;
      max-height: 517px;
      object-fit: contain;
      position: absolute;
      bottom: 0;
    }
  }

  &__texts {
    margin-top: 106px;
    margin-bottom: 88px;
    &__sportiv-logo {
      width: 188px;
      height: 60px;
      object-fit: contain;
      margin-left: -14px;
    }

    &__header {
      font-size: 20px;
      font-weight: 600;
      color: $white-neutral;
      margin-top: 24px;
      margin-bottom: 24px;
    }

    &__item {
      font-size: 16px;
      line-height: 2;
      color: $light-grey-1;

      a {
        text-decoration: none;
        font-size: 16px;
        line-height: 2;
        color: $light-grey-1;
      }

      &--social {
        img {
          height: 40px;
          width: 40px;
          object-fit: contain;
          margin-right: 6px;
        }
      }
    }

    &__motto {
      margin-top: 80px;
      font-size: 28px;
      font-weight: 700;
      color: $white-2;
    }
  }
}
</style>
