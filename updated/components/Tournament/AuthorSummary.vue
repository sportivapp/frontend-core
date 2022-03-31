<template>
  <v-row align="center" class="author-summary" justify="start">
    <v-col cols="auto">
      <v-avatar
        v-if="avatarUrl"
        :size="avatarSize"
      >
        <img
          class="author-summary__image"
          alt="author"
          :src="avatarUrl"
        >
      </v-avatar>
      <v-avatar
        v-else
        class="author-summary__image--empty"
        :size="avatarSize"
      >
        <v-icon
          color="white"
          :large="isSizeBig"
          :small="isSizeSmall"
        >
          mdi-account
        </v-icon>
      </v-avatar>
    </v-col>
    <v-col align="start">
      <v-row
        :class="[
          'author-summary__identity',
          {'author-summary__identity--big':isSizeBig},
          {'author-summary__identity--medium':isSizeMedium},
          {'author-summary__identity--small':isSizeSmall}
        ]"
      >
        <span class="author-summary__identity--bold" :title="author.name">
          {{ author.name }}
        </span>
      </v-row>
      <v-row>
        <span
          :class="[
            'author-summary__timestamp',
            {'author-summary__timestamp--big':isSizeBig},
            {'author-summary__timestamp--medium':isSizeMedium},
            {'author-summary__timestamp--small':isSizeSmall}
          ]"
        >
          {{ tournamentDate }}
        </span>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
import { staticUrl } from '@/config/api'

const sizes = {
  big: 'big',
  medium: 'medium',
  small: 'small'
}

export default {
  name: 'AuthorSummary',
  props: {
    size: {
      type: String,
      default: sizes.big
    },
    author: {
      type: Object,
      required: true
    },
    company: {
      type: Object,
      default: () => ({})
    },
    start: {
      type: Number,
      required: true
    },
    end: {
      type: Number,
      required: true
    }
  },
  computed: {
    isSizeBig () {
      return this.size === sizes.big
    },
    isSizeMedium () {
      return this.size === sizes.medium
    },
    isSizeSmall () {
      return this.size === sizes.small
    },
    avatarSize () {
      let size = '50px'
      switch (this.size) {
        case sizes.big:
          size = '50px'
          break
        case sizes.medium:
          size = '35px'
          break
        case sizes.small:
          size = '28px'
          break
      }
      return size
    },
    avatarUrl () {
      const authorFile = this.author.file || {}
      return authorFile.efilename
        ? staticUrl + authorFile.efilename
        : null
    },
    tournamentDate () {
      return moment(new Date(this.start)).format('DD MMM YYYY') + ' - ' + moment(new Date(this.end)).format('DD MMM YYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
.author-summary {
  width: 100%;
  &__image{
    object-fit: cover;

    &--empty {
      background-color: $orange-5;
      object-fit: contain;
    }
  }

  &__identity, &__timestamp {
    color: $grey-neutral;
  }

  &__timestamp {
    &--big {
      font-size: 14px;
    }

    &--medium {
      font-size: 12px;
    }

    &--small {
      font-size: 10px;
    }
  }

  &__identity {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;

    &--big {
      font-size: 15px;
      -webkit-line-clamp: 2;
    }

    &--medium {
      font-size: 12px;
      -webkit-line-clamp: 1;
    }

    &--small {
      font-size: 10px;
      -webkit-line-clamp: 1;
    }

    &--bold {
      font-weight: 600;
      color: $black-neutral;
    }
  }
}
</style>
