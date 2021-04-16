<template>
  <v-sheet>
    <v-row>
      <span class="spv-subtitle--1 grey--text">Berikut adalah daftar sesi kelas berdasarkan pengaturan sebelumnya.</span>
    </v-row>
    <v-row>
      <span class="spv-subtitle--2">Harga Paket : Rp350.000 / bulan</span>
    </v-row>
    <v-row>
      <v-data-table
        :headers="headers"
        :disable-pagination="true"
        :items="generatedSessions"
      />
    </v-row>
  </v-sheet>
</template>

<script>
import { milisecondToLongFullDate, msToHourMinute } from '@/utils/date'
export default {
  name: 'PreviewSessionList',
  props: {
    sessions: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    headers: [
      {
        text: 'Tanggal',
        align: 'start',
        sortable: false,
        value: 'date'
      }, {
        text: 'Jam',
        sortable: false,
        value: 'time'
      }, {
        text: 'Harga',
        sortable: false,
        value: 'price'
      }]
  }),
  computed: {
    generatedSessions () {
      return this.generateSessions(this.sessions)
    }
  },
  methods: {
    generateSessions (sessions) {
      return sessions.map((session) => {
        return {
          date: milisecondToLongFullDate(session.startDate),
          time: msToHourMinute(session.startDate) + '-' + msToHourMinute(session.endDate)
        }
      })
    }
  }
}
</script>
