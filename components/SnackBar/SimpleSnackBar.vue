<template>
  <v-snackbar
    :value="value"
    :color="snackBarColor"
    :timeout="timeout"
    bottom
    left
    @input="updateValue"
  >
    <v-row justify="center" align="center">
      <v-col class="py-0" cols="auto">
        <v-icon>
          {{ icon }}
        </v-icon>
      </v-col>
      <v-col class="pa-0">
        {{ message }}
      </v-col>
      <v-col class="pa-0" cols="auto">
        <v-btn icon @click="closeSnackBar">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-snackbar>
</template>

<script>
const simpleSnackBarColors = {
  green: '#0AB281',
  orange: '#FF7041',
  red: '#FF3333'
}

export default {
  name: 'SimpleSnackBar',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'mdi-check-circle'
    },
    message: {
      type: String,
      default: ''
    },
    timeout: {
      type: Number,
      default: 3000
    },
    color: {
      type: String,
      default: 'green'
    }
  },
  computed: {
    snackBarColor () {
      return simpleSnackBarColors[this.color]
    }
  },
  methods: {
    closeSnackBar () {
      this.updateValue(false)
    },
    updateValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>

</style>
