<template>
  <v-row v-if="!isSmallDevice" justify="center" align="center">
    <v-col align="end" class="pr-0">
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
          <v-list-item link class="user-menu__item" @click="handleClickSignOut">
            {{ $t('common.signOut') }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
    <v-col cols="auto" class="pl-0">
      <v-avatar class="user-avatar" size="40">
        <img
          src="data:image/jpeg;base64,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"
          :alt="username.slice(0,1)"
        >
      </v-avatar>
    </v-col>
  </v-row>
  <v-list v-else>
    <v-list-item>
      <v-avatar class="user-avatar" size="40">
        <img
          src="data:image/jpeg;base64,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"
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

export default {
  name: 'UserMenu',
  computed: {
    ...mapGetters([
      'user'
    ]),
    username () {
      return this.user.eusername || ''
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
}
</style>
