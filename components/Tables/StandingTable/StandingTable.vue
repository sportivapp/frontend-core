<template>
  <v-data-table
    class="standing-table"
    hide-default-footer
    :items="items"
  >
    <template v-slot:header>
      <thead class="standing-table__header-container">
        <tr class="standing-table__header--background">
          <th class="standing-table__header--number">
            <span class="standing-table__header spv-subtitle--3">
              Rank
            </span>
          </th>
          <th class="ma-0 pa-0">
            <span class="standing-table__header spv-subtitle--3">
              Peserta
            </span>
          </th>
          <th
            v-for="header in headersWithToolTip"
            :key="header.label"
            class="standing-table__header--number spv-subtitle--3"
          >
            <v-tooltip
              top
            >
              <template v-slot:activator="{ on, attrs }">
                <span
                  v-bind="attrs"
                  class="standing-table__header"
                  v-on="on"
                >
                  {{ header.label }}
                </span>
              </template>
              <span>
                {{ header.tooltip }}
              </span>
            </v-tooltip>
          </th>
        </tr>
      </thead>
    </template>
    <template v-slot:item="{ item, index }">
      <standing-table-row
        :participant="item"
        :rank="index+1"
      />
    </template>
  </v-data-table>
</template>

<script>
import StandingTableRow
  from '@/components/Tables/StandingTable/StandingTableRow'
// import { mapGetters } from 'vuex'

const headersWithToolTip = [
  {
    label: 'W-L-T',
    tooltip: 'Win - Lose - Tie'
  },
  {
    label: 'PF',
    tooltip: 'Points For'
  },
  {
    label: 'PA',
    tooltip: 'Points Against'
  },
  {
    label: '+/-',
    tooltip: 'Points Difference'
  },
  {
    label: 'PL',
    tooltip: 'Played'
  },
  {
    label: 'Pts',
    tooltip: 'Points'
  }
]

export default {
  name: 'StandingTable',
  components: { StandingTableRow },
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      headersWithToolTip
    }
  }
  // persiapan kalo untuk cek tipe basket atau bola
  // computed: {
  //   ...mapGetters('tournament', [
  //     'tournamentDetail'
  //   ]),
  //   tournamentIndustryName () {
  //     return this.tournamentDetail.industry
  //       ? this.tournamentDetail.industry.name
  //       : ''
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.standing-table {
  border: 1px solid $light-grey-1;
  border-radius: 20px 20px 0px 0px;
  width: 100%;

  th {
    &:first-child {
      border-radius: 20px 0px 0px 0px;
    }
    &:last-child {
      border-radius: 0px 20px 0px 0px;
    }
  }

  &__header {
    text-align: center;
    color: $grey-3;
    margin: 0;
    padding: 0;

    &--number {
      text-align: center !important;
      width: 90px;
      white-space: nowrap;

      span {
        text-align: center;
      }
    }

    &--background {
      background-color: $white-neutral;
      height: 52px;
    }
  }
}

::v-deep .v-tooltip__content {
  border-radius: 8px !important;
}
</style>
