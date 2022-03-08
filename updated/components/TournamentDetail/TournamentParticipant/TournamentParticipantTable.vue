<template>
  <div class="participant-list">
    <v-data-table
      :items="participantToShow"
      :items-per-page="10"
      class="participant-list__table"
    >
      <template v-slot:header>
        <thead>
          <tr class="participant-list__table__header">
            <th v-for="header in headers" :key="header.text">
              <span class="participant-list__table__header--text">
                {{ header.text }}
              </span>
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:item="{ item, index }">
        <tr v-if="item">
          <td class="participant-list__table__index">
            {{ index + 1 }}
          </td>
          <td>
            <v-row align="center">
              <v-avatar size="35" class="mr-5 my-3" tile>
                <img
                  alt="logo"
                  class="participant-list__table__logo"
                  :src="profilePicture(item)"
                >
              </v-avatar>
              <div>
                {{ item && item.name }}
              </div>
            </v-row>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { staticUrl } from '@/config/api'
import { mapGetters } from 'vuex'

const headers = [
  {
    text: 'No.',
    align: 'start',
    sortable: false,
    value: 'name'
  },
  { text: 'Peserta', value: 'name' }
]

export default {
  name: 'TournamentAllParticipantTable',
  props: {
    searchText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      headers
    }
  },
  computed: {
    ...mapGetters('tournament', [
      'tournamentParticipantList'
    ]),
    participantToShow () {
      return this.tournamentParticipantList.filter(participant =>
        participant &&
        participant.name.toLowerCase().includes(this.searchText.toLocaleLowerCase()))
    }
  },
  methods: {
    profilePicture (participant) {
      const logoName = participant.logo && participant.logo.name
      return logoName
        ? staticUrl + logoName
        : require('../../../assets/images/logos/sportiv-logo-small.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.participant-list {

  th {
    &:first-child {
      text-align: center;
      width: 100px;
      padding-left: 40px;
      border-radius: 20px 0 0 0;
    }
    &:last-child {
      border-radius: 0 20px 0 0;
    }
  }

  &__table {
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    border-radius: 20px 20px 0 0;
    margin-bottom: 28px;

    &__header {
      background-color: $white-neutral;
      height: 52px;
      border-radius: 20px 20px 0 0;

      &--text {
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        color: $grey-3;
      }
    }

    &__index {
      font-weight: bold;
      text-align: center;
    }

    &__logo {
      object-fit: cover;
      border-radius: 100%;
    }

    &__select {
      font-size: 14px;
      padding: 8px 4px 8px 12px;
    }
  }

  &__text-header {
    font-size: 16px;
    padding: 10px 0;
  }
}
</style>
