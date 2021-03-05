<template>
  <v-dialog
    v-model="show"
    width="390"
    class="simple-prompt"
    @click:outside="handleCloseDialog"
  >
    <v-card class="simple-prompt__card">
      <v-container class="pb-0">
        <v-row justify="end" align="center">
          <v-col cols="auto" class="pa-0">
            <v-btn
              icon
              @click="handleCloseDialog"
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" align="center" class="simple-prompt__title">
          {{ title }}
        </v-row>
        <v-row justify="center" align="center" class="simple-prompt__msg">
          {{ message }}
        </v-row>
        <v-row
          justify="center"
          align="center"
          class="simple-prompt__btn-container"
        >
          <v-col>
            <v-btn
              outlined
              class="simple-prompt__btn simple-prompt__btn--left"
              @click="handleClickCancelIcon"
            >
              {{ cancelText }}
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              depressed
              :color="actionColor"
              class="simple-prompt__btn simple-prompt__btn--right"
              @click="handleClickActionIcon"
            >
              <v-progress-circular
                v-if="actionLoading"
                color="white"
                indeterminate
                size="25"
              />
              <span v-else>
                {{ actionText }}
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'SimplePrompt',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    actionColor: {
      type: String,
      default: '#0AB281'
    },
    actionText: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: ''
    },
    actionLoading: {
      type: Boolean,
      default: false
    },
    closeOnCancel: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleCloseDialog () {
      this.$emit('update:show', false)
    },
    handleClickCancelIcon () {
      this.$emit('click:cancel')
      if (this.closeOnCancel) {
        this.handleCloseDialog()
      }
    },
    handleClickActionIcon () {
      this.$emit('click:action')
    }
  }
}
</script>

<style lang="scss" scoped>
.simple-prompt {
  &__card {
    border-radius: 8px;
    padding: 0 24px;
  }

  &__title {
    text-align: center;
    color: $almost-black;
    font-weight: 700;
    font-size: 23px;
  }

  &__msg {
    margin-top: 6px;
    padding: 0 12px;
    color: $grey;
    font-weight: 400;
    font-size: 16px;
    text-align: center;
  }

  &__btn-container {
    margin-top: 34px;
    padding-bottom: 16px;
  }

  &__btn {
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    border-radius: 8px;

    &--left {
      color: $grey-3;
      border-color: $grey;
    }

    &--right {
      color: white;
    }
  }
}
</style>
