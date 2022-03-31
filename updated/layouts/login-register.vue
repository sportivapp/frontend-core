<template>
  <v-app>
    <login-register-bg />
    <transition name="fade">
      <v-main>
        <nuxt class="content" />
      </v-main>
    </transition>
  </v-app>
</template>

<script>
import LoginRegisterBg from '@/components/Backgrounds/LoginRegisterBg'

export default {
  name: 'LoginRegister',
  components: { LoginRegisterBg },
  loading: true,
  data () {
    return {
      show: false,
      play: false
    }
  }
}
</script>

<style lang="scss" scoped>
#main-wrap{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content{
  height: 100%;
}
</style>
