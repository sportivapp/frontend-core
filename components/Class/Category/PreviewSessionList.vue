<template>
  <v-sheet>
    <v-row>
      <span class="spv-subtitle--1 grey--text">Berikut adalah daftar sesi kelas berdasarkan pengaturan sebelumnya.</span>
    </v-row>
    <v-row v-if="packetFee">
      <span class="spv-subtitle--2">Harga Paket : Rp{{ packetFee }} / bulan</span>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          height="450"
          :headers="headers"
          :disable-pagination="true"
          :items="generatedSessions"
        />
      </v-col>
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
    },
    packetFee: {
      type: Number,
      default: null
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
          time: msToHourMinute(session.startDate) + '-' + msToHourMinute(session.endDate),
          price: 'Rp.' + ((session.price) ? session.price : 0)
        }
      })
    }
  }
}
</script>
