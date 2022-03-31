<template>
  <div>
    <p class="class-participants-table__title">
      {{ classCategory && classCategory.title }}
    </p>
    <v-data-table
      :headers="headers"
      :items="classCategory.participants"
      :search="search"
      disable-sort
      disable-pagination
      hide-default-footer
      class="class-participants-table__table"
    >
      <!-- eslint-disable vue/valid-v-slot -->
      <template v-slot:header.user.eusername="{ header }">
        <div class="pl-16">
          {{ header.text }}
        </div>
      </template>
      <template v-slot:item.user.eusername="{ item }">
        <div class="ma-0 pa-0 pl-16 py-3">
          <v-row no-gutters align="center" class="ma-0 pa-0">
            <v-col cols="auto">
              <v-avatar size="45" class="mr-3">
                <v-img :src="getParticipantImageUrl(item)" />
              </v-avatar>
            </v-col>
            <v-col>
              <div class="class-participants-table__participant-name">
                {{ item.user.eusername }}
              </div>
            </v-col>
          </v-row>
        </div>
      </template>
      <template v-slot:item.classCategoryUuid>
        <div>
          {{ classCategory.title }}
        </div>
      </template>
      <!-- eslint-enable -->
    </v-data-table>
  </div>
</template>

<script>
import { staticUrl } from '@/config/api'

export default {
  name: 'ClassParticipantsTable',
  props: {
    classCategory: {
      type: Object,
      default: () => {},
      required: true
    },
    search: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      headers: [
        {
          text: 'Nama',
          align: 'start',
          sortable: false,
          value: 'user.eusername',
          width: '40%'
        },
        { text: 'Email', value: 'user.euseremail', width: '30%' },
        { text: 'Kategori Kelas', value: 'classCategoryUuid', width: '30%' }
      ]
    }
  },
  methods: {
    getParticipantImageUrl (participant) {
      return participant && participant.user &&
        participant.user.file
        ? staticUrl + participant.user.file.efilename
        : require('../../../assets/images/logos/sportiv-logo-small.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.class-participants-table {
  &__title {
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    color: #303030;
    padding-left: 80px;
  }

  &__table {
    border-top: 1px solid #D5D5D5;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  &__participant-name {
    display: -webkit-box;
    word-break: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
