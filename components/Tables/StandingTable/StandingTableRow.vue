<template>
  <tr class="standing-table-row">
    <td class="standing-table-row__center">
      <span class="standing-table-row__number--rank spv-body--2">
        {{ rank || 0 }}
      </span>
    </td>
    <td class="pa-0">
      <v-row justify="start" align="center">
        <v-col cols="auto">
          <v-avatar size="32">
            <v-img alt="logo" :src="imageUrl" />
          </v-avatar>
        </v-col>
        <v-col align="start" class="pa-0">
          <span class="standing-table-row__name spv-body--2 pa-0" :title="participant.name || ''">
            {{ participant.name || '' }}
          </span>
        </v-col>
      </v-row>
    </td>
    <td class="standing-table-row__center">
      <span
        class="standing-table-row__number standing-table-row__number--nowrap"
      >
        {{ participant.wins || 0 }}
        -
        {{ participant.loses || 0 }}
        -
        {{ participant.ties || 0 }}
      </span>
    </td>
    <td class="standing-table-row__center">
      <span class="standing-table-row__number spv-body--2">
        {{ participant.pointScored || 0 }}
      </span>
    </td>
    <td class="standing-table-row__center">
      <span class="standing-table-row__number spv-body--2">
        {{ participant.pointAgainst || 0 }}
      </span>
    </td>
    <td class="standing-table-row__center">
      <span class="standing-table-row__number spv-body--2">
        {{ pointDifference || 0 }}
      </span>
    </td>
    <td class="standing-table-row__center">
      <span class="standing-table-row__number spv-body--2">
        {{ participant.matchCount || 0 }}
      </span>
    </td>
    <td class="standing-table-row__center">
      <span class="standing-table-row__number spv-body--2">
        {{ participant.points || 0 }}
      </span>
    </td>
  </tr>
</template>

<script>
import { staticUrl } from '@/config/api'

export default {
  name: 'StandingTableRow',
  props: {
    participant: {
      type: Object,
      required: true
    },
    rank: {
      type: Number,
      default: 0
    }
  },
  computed: {
    imageUrl () {
      const logoName = this.participant.logo && this.participant.logo.name
      return logoName
        ? staticUrl + logoName
        : require('../../../assets/images/logos/sportiv-logo-small.png')
    },
    pointDifference () {
      return this.participant.pointScored - this.participant.pointAgainst
    }
  }
}
</script>

<style lang="scss" scoped>
.standing-table-row {
  &__center {
    text-align: center;
  }

  &__number {
    color: $grey-neutral;

    &--rank {
      color: black;
    }

    &--nowrap {
      white-space: nowrap;
      word-break: keep-all;
    }
  }
  &__name {
    color: $black-neutral;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
