<template>
  <v-row v-if="!isSmallDevice" justify="center" align="center">
    <v-col align="end" class="pr-0">
      <v-avatar class="user-avatar" size="40">
        <img
          v-if="hasImage"
          alt="username.slice(0,1)"
          :src="imageUrl"
        >
        <img
          v-else
          src="@/assets/images/logos/sportiv-logo-small.png"
          :alt="username.slice(0,1)"
        >
      </v-avatar>
    </v-col>
    <v-col cols="auto" class="pl-0">
      <v-menu
        v-model="open"
        :close-on-content-click="open = false"
        bottom
        class="user-setting"
        offset-y
        open-on-hover
        transition="slide-y-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            class="user-menu"
            color="#FF7041"
            text
            v-on="on"
            @mouseover.native.stop="handleMouseOver"
            @mouseleave.native.stop="handleMouseLeave"
          >
            <span class="text-capitalize">
              {{ username }}
            </span>
            <v-icon>
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </template>
        <v-list
          class="user-menu__list pa-0"
          @mouseover.native.stop="handleMouseOver"
          @mouseleave.native.stop="handleMouseLeave"
        >
          <v-list-item class="user-menu__users">
            <v-avatar class="user-avatar" size="30">
              <img
                v-if="hasImage"
                alt="username.slice(0,1)"
                :src="imageUrl"
              >
              <img
                v-else
                src="@/assets/images/logos/sportiv-logo-small.png"
                :alt="username.slice(0,1)"
              >
            </v-avatar>
            <span class="user-menu__username text-capitalize pl-2">
              {{ username }}
            </span>
          </v-list-item>
          <v-divider class="user-menu__divider" />
          <v-list-item link class="user-menu__item" @click="handleClickSignOut">
            <span>
              <v-icon color="##AAAAAA" class="mr-2">
                mdi-logout
              </v-icon>
            </span>
            {{ $t('common.signOut') }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
  <v-list v-else>
    <v-list-item>
      <v-avatar class="user-avatar" size="40">
        <img
          src="@/assets/images/logos/sportiv-logo-small.png"
          :alt="username.slice(0,1)"
        >
      </v-avatar>
    </v-list-item>
    <v-list-group>
      <v-list-item slot="activator">
        <v-list-item-title>
          {{ username }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item color="#FF7041" @click="handleClickSignOut">
        <v-list-item-title>
          {{ $t('common.signOut') }}
        </v-list-item-title>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { staticUrl } from '@/config/api'

export default {
  name: 'UserMenu',
  computed: {
    ...mapGetters([
      'user'
    ]),
    username () {
      return this.user.eusername || ''
    },
    hasImage () {
      return this.user.file
    },
    imageUrl () {
      return staticUrl + this.user.file.efilename
    },
    isSmallDevice () {
      return this.$vuetify.breakpoint.name === 'xs'
    }
  },
  created () {
    if (!this.user.init) {
      this.getProfile()
    }
  },
  methods: {
    ...mapActions([
      'getProfile',
      'logout'
    ]),
    handleClickSignOut () {
      this.open = false
      this.logout({
        successCallback: this.handleMouseLeave,
        errHandler: this.handleMouseLeave
      })
    },
    handleMouseOver () {
      this.$emit('mouseover')
    },
    handleMouseLeave () {
      this.$emit('mouseleave')
    }
  }
}
</script>

<style lang="scss" scoped>
.user-menu {
  padding-right: 10px !important;

  &__item {
    color: $grey-3;
    font-size: 14px;

    &:hover {
      background-color: $white-neutral;
    }
  }

  &__users{
    &:hover{
      background-color: transparent;
    }
  }

  &__username{
    font-weight: 600;
  }

  &__divider{
    width: 80%;
    margin: auto;
}
}
</style>
