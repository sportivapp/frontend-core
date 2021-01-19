<template>
  <div class="login-register-bg">
    <img
      class="login-register-bg__top-left"
      src="../../assets/images/bg/top-left.png"
      alt="top-left"
    >
    <img
      class="login-register-bg__bottom-right"
      src="../../assets/images/bg/bottom-right.png"
      alt="bottom-right"
    >

    <img
      class="login-register-bg__circle"
      src="../../assets/images/bg/circle.png"
      alt="circle"
    >
    <img
      class="login-register-bg__triangle"
      src="../../assets/images/bg/triangle.png"
      alt="circle"
    >
    <img
      class="login-register-bg__dots"
      src="../../assets/images/bg/dots.png"
      alt="dots"
    >
    <img
      class="login-register-bg__sportiv-activ"
      src="../../assets/images/bg/sportiv_activ.png"
      alt="sportiv-activ"
    >
  </div>
</template>

<script>
export default {
  name: 'LoginRegisterBg'
}
</script>

<style lang="scss" scoped>
.login-register-bg {
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: white;

  img {
    position: absolute;
    object-fit: contain;
  }

  &__sportiv-activ {
    left: -17px;
    bottom: 0;
    width: 450px;
    height: auto;
  }

  &__dots {
    left: 120px;
    top: -50px;
    width: 270px;
    height: auto;
  }

  &__top-left {
    left: -127px;
    top: 126px;
    width: 525px;
    height: auto;

  }

  &__bottom-right {
    bottom: -25px;
    right: -50px;
    width: 500px;
    height: auto;
  }

  &__circle {
    right: 220px;
    top: 53px;
    width: 200px;
    height: auto;
  }

  &__triangle {
    right: 93px;
    top: 352px;
    width: 75px;
    height: auto;
  }
}
</style>
