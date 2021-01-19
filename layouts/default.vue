<template>
  <v-app>
    <v-app-bar
      v-if="!isSmallDevice"
      app
      class="app-bar hidden-sm-and-down"
      color="white"
      elevation="0"
    >
      <v-spacer />
      <nuxt-link class="app-bar__home" to="/">
        <img :src="require('~/assets/images/logos/sportiv-orange.svg')">
      </nuxt-link>
      <v-row class="pl-3">
        <v-menu
          bottom
          offset-y
          open-on-hover
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              class="app-bar__menu"
              elevation="0"
              text
              v-on="on"
              @mouseover.native.stop="showOverlay"
              @mouseleave.native.stop="hideOverlay"
            >
              {{ $t('common.organization') }}
              <v-icon right>
                mdi-chevron-down
              </v-icon>
            </v-btn>
          </template>
          <v-list
            class="app-bar__menu__list"
            @mouseover.native.stop="showOverlay"
            @mouseleave.native.stop="hideOverlay"
          >
            <v-list-item
              class="app-bar__menu__item"
              @click="toggleShowMyOrganization"
            >
              {{ $t('common.myOrganization') }}
            </v-list-item>
            <v-list-item
              class="app-bar__menu__item"
              @click="toggleShowCreateOrganization"
            >
              {{ $t('common.createOrganization') }}
            </v-list-item>
          </v-list>
        </v-menu>
        <!--        <v-menu-->
        <!--          bottom-->
        <!--          offset-y-->
        <!--          open-on-hover-->
        <!--        >-->
        <!--          <template v-slot:activator="{ on, attrs }">-->
        <!--            <v-btn-->
        <!--              v-bind="attrs"-->
        <!--              class="app-bar__menu"-->
        <!--              elevation="0"-->
        <!--              text-->
        <!--              v-on="on"-->
        <!--            >-->
        <!--              Tim-->
        <!--              <v-icon right>-->
        <!--                mdi-chevron-down-->
        <!--              </v-icon>-->
        <!--            </v-btn>-->
        <!--          </template>-->
        <!--          <v-list>-->
        <!--            <v-list-item>-->
        <!--              <v-list-item-title>List of Teams</v-list-item-title>-->
        <!--            </v-list-item>-->
        <!--          </v-list>-->
        <!--        </v-menu>-->
        <!--        <nuxt-link class="app-bar__menu&#45;&#45;link" to="/forum">-->
        <!--          <v-btn-->
        <!--            class="app-bar__menu"-->
        <!--            elevation="0"-->
        <!--            text-->
        <!--          >-->
        <!--            Forum-->
        <!--          </v-btn>-->
        <!--        </nuxt-link>-->
        <!--        <nuxt-link class="app-bar__menu&#45;&#45;link" to="/class">-->
        <!--          <v-btn-->
        <!--            class="app-bar__menu"-->
        <!--            elevation="0"-->
        <!--            text-->
        <!--          >-->
        <!--            Kelas-->
        <!--          </v-btn>-->
        <!--        </nuxt-link>-->
        <v-menu
          bottom
          offset-y
          open-on-hover
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              class="app-bar__menu"
              elevation="0"
              text
              v-on="on"
              @mouseover.native.stop="showOverlay"
              @mouseleave.native.stop="hideOverlay"
            >
              {{ $t('tournament.title') }}
              <v-icon right>
                mdi-chevron-down
              </v-icon>
            </v-btn>
          </template>
          <v-list
            class="tournament-menu px-5 pb-5 pt-2"
            @mouseover.native.stop="showOverlay"
            @mouseleave.native.stop="hideOverlay"
          >
            <v-list-item class="pa-0">
              <v-row justify="space-between" align="center" no-gutters>
                <v-col class="tournament-menu__title">
                  {{ $t('tournament.title') }}
                </v-col>
                <v-col align="end">
                  <a
                    :href="$config.tournamentSeeAll"
                    class="tournament-menu__see-all"
                  >
                    {{ $t('common.seeAll') }}
                  </a>
                </v-col>
              </v-row>
            </v-list-item>
            <v-divider />
            <v-list-item class="pa-0">
              <v-container class="pa-0">
                <v-row no-gutters class="tournament-menu__sportiv-title pt-3">
                  {{ $t('tournament.sportivTournament') }}
                </v-row>
                <v-row no-gutters class="tournament-menu__sub-title pt-2">
                  {{ $t('tournament.appBarSubtitle') }}
                </v-row>
                <v-row no-gutters class="pt-5">
                  <v-btn
                    color="#FF7041"
                    class="tournament-menu__button tournament-menu__button--create"
                    @click="handleClickCreateTournament"
                  >
                    {{ $t('tournament.createTournament') }}
                  </v-btn>
                </v-row>
                <v-row v-if="isLoggedIn" no-gutters class="pt-2">
                  <v-btn
                    outlined
                    color="#FF7041"
                    class="tournament-menu__button tournament-menu__button--manage"
                    @click="handleClickManageTournament"
                  >
                    {{ $t('tournament.manageTournament') }}
                  </v-btn>
                </v-row>
              </v-container>
            </v-list-item>
          </v-list>
        </v-menu>
        <!--        <nuxt-link class="app-bar__menu&#45;&#45;link" to="/booking">-->
        <!--          <v-btn-->
        <!--            class="app-bar__menu"-->
        <!--            elevation="0"-->
        <!--            text-->
        <!--          >-->
        <!--            Booking Lapangan-->
        <!--          </v-btn>-->
        <!--        </nuxt-link>-->
        <!--        <nuxt-link class="app-bar__menu&#45;&#45;link" to="/shop">-->
        <!--          <v-btn-->
        <!--            class="app-bar__menu"-->
        <!--            elevation="0"-->
        <!--            text-->
        <!--          >-->
        <!--            Shop-->
        <!--          </v-btn>-->
        <!--        </nuxt-link>-->
        <!--        <nuxt-link class="app-bar__menu&#45;&#45;link" to="/coming-soon">-->
        <!--          <v-btn-->
        <!--            class="app-bar__menu"-->
        <!--            elevation="0"-->
        <!--            text-->
        <!--          >-->
        <!--            Coming Soon-->
        <!--          </v-btn>-->
        <!--        </nuxt-link>-->
      </v-row>
      <v-spacer />
      <v-row
        justify="center"
        align="center"
      >
        <nuxt-link to="/login">
          <v-btn
            v-if="!isLoggedIn"
            class="app-bar__button"
            color="#FF7041"
            elevation="0"
            text
          >
            {{ $t('common.login') }}
          </v-btn>
        </nuxt-link>
        <nuxt-link to="/register">
          <v-btn
            v-if="!isLoggedIn"
            class="app-bar__button app-bar__button--register"
            color="#FF7041"
            elevation="0"
          >
            {{ $t('common.register') }}
          </v-btn>
        </nuxt-link>
        <user-menu
          v-if="isLoggedIn"
          class="pr-3"
          @mouseover="showOverlay"
          @mouseleave="hideOverlay"
        />
      </v-row>
      <v-spacer />
    </v-app-bar>
    <v-app-bar
      v-if="isSmallDevice"
      app
      color="white"
      elevation="0"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link class="app-bar__home" to="/">
        <img :src="require('~/assets/images/logos/sportiv-orange.svg')">
      </nuxt-link>
    </v-app-bar>
    <v-navigation-drawer
      v-if="isSmallDevice"
      v-model="drawer"
      app
    >
      <v-list
        nav
        dense
      >
        <user-menu v-if="isLoggedIn" />
        <v-list-item-group v-else>
          <v-list-item>
            <nuxt-link to="/login" class="drawer__button">
              {{ $t('common.login') }}
            </nuxt-link>
          </v-list-item>
          <v-list-item>
            <nuxt-link to="/register" class="drawer__button">
              {{ $t('common.register') }}
            </nuxt-link>
          </v-list-item>
        </v-list-item-group>

        <v-divider class="py-1" />

        <v-list-group
          prepend-icon="mdi-account-group"
          no-action
        >
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('common.organization') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            class="drawer__list__item"
            ripple
            @click="toggleShowCreateOrganization"
          >
            {{ $t('common.createOrganization') }}
          </v-list-item>
          <v-list-item
            class="drawer__list__item"
            ripple
            @click="toggleShowMyOrganization"
          >
            {{ $t('common.myOrganization') }}
          </v-list-item>
        </v-list-group>
        <v-list-group
          prepend-icon="mdi-trophy-variant"
          no-action
        >
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('tournament.title') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            ripple
            class="drawer__list__item"
            @click="handleClickCreateTournament"
          >
            {{ $t('tournament.createTournament') }}
          </v-list-item>
          <v-list-item
            v-if="isLoggedIn"
            ripple
            class="drawer__list__item"
            @click="handleClickManageTournament"
          >
            {{ $t('tournament.manageTournament') }}
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-overlay v-model="overlay" z-index="4" absolute />
      <nuxt />
    </v-main>
    <v-footer
      class="footer__fixed justify-center align-center"
      color="#F27045"
    >
      <span> Copyright &copy; 2020 Sportiv</span>
    </v-footer>

    <view-my-organization
      v-if="isLoggedIn"
      :sync="showMyOrganization"
      keep-alive
      @clickOutside="toggleShowMyOrganization"
    />
    <create-organization
      v-if="isLoggedIn"
      :sync="showCreateOrganization"
      keep-alive
      @clickOutside="toggleShowCreateOrganization"
    />
  </v-app>
</template>

<script>

import ViewMyOrganization
  from '@/components/Organization/View/ViewMyOrganization'
import CreateOrganization
  from '@/components/Organization/Create/CreateOrganization'
import { mapGetters } from 'vuex'
import UserMenu from '@/components/Navigation/UserMenu'

export default {
  components: { UserMenu, CreateOrganization, ViewMyOrganization },
  data () {
    return {
      open: false,
      clipped: true,
      fixed: true,
      showCreateOrganization: false,
      showMyOrganization: false,
      drawer: false,
      overlay: false
    }
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ]),
    username () {
      return this.user.eusername || ''
    },
    isSmallDevice () {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  watch: {
    hoverTournamentMenu: {
      handler (value) {
        this.overlay = value
      }
    }
  },
  methods: {
    toggleShowCreateOrganization () {
      this.drawer = false
      if (!this.isLoggedIn) {
        this.$router.push('/login')
      } else {
        this.showCreateOrganization = !this.showCreateOrganization
      }
    },
    toggleShowMyOrganization () {
      this.drawer = false
      if (!this.isLoggedIn) {
        this.$router.push('/login')
      } else {
        this.showMyOrganization = !this.showMyOrganization
      }
    },
    handleClickCreateTournament () {
      if (!this.isLoggedIn) {
        this.$router.push({
          path: '/login',
          query: { redirectOutside: this.$config.tournamentCreateUrl }
        })
      } else {
        window.location.href = this.$config.tournamentCreateUrl
      }
    },
    handleClickManageTournament () {
      window.location.href = this.$config.tournamentUrl
    },
    showOverlay () {
      this.overlay = true
    },
    hideOverlay () {
      this.overlay = false
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-menu__content{
  border-radius: 20px;
}

.app-bar {
  &::v-deep a {
    text-decoration: none;
    text-transform: none;
  }

  &__home {
    img {
      height: 50px;
      width: auto;
      object-fit: contain;
    }
  }

  &__menu {
    color: #4F4848;
    font-weight: 600;
    font-size: 14px;

    &__list {
      padding: 0;
    }

    &__item {
      color: $grey-3;
      font-size: 14px;

      &:hover {
        background-color: $white-neutral;
      }
    }

    &:hover {
      color: #FF7041;
    }
  }

  &__button {
    font-weight: 600;
    font-size: 14px;
    margin-right: 8px;
    &--register {
      color: white;
      border-radius: 8px;
    }
  }
}

.drawer {

  &__button {
    width: 100%;
    text-decoration: none;
    color: $orange-4;
  }

  &__list__item {
    font-size: 12px;
    font-weight: 500;
  }
}

.footer {
  &__fixed {
    font-size: 18px;
    font-weight: 600;
    span {
      color: white;
    }
  }
}

.nuxt-link-active {
  ::v-deep span {
    color: #FF7041;
  }
}

.tournament-menu {
  max-width: 260px;
  overflow: hidden;
  border-radius: 20px;

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: $black-neutral;
  }

  &__see-all {
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    color: $green-2;
  }

  &__sportiv-title {
    font-size: 14px;
    font-weight: 600;
    color: $black-neutral;
  }

  &__sub-title {
    text-wrap: normal;
    word-break: break-word;
    font-size: 12px;
    color: $grey-neutral;
  }

  &__button {
    width: 100%;
    border-radius: 8px;

    &--create {
      color: white;
    }
  }
}
</style>
