<template>
  <v-container class="pb-0">
    <v-dialog
      v-model="showModal"
      persistent=""
      max-width="456"
    >
      <add-coach-modal
        hint="Anda dapat menambahkan banyak pelatih sekaligus"
        label="Pilih Pelatih"
        title="Tambah Pelatih"
        :selected-items="selectedCoachsId"
        :arr-data="classUsers"
        @closeModal="showModal=false"
        @getSelectedItems="handleSelectedCoach"
      />
    </v-dialog>
    <v-row class="pl-4 pb-2 spv-subtitle--2 grey--text border-bottom">
      Pelatih
    </v-row>
    <v-row class="list-container border-bottom">
      <v-col class="py-0">
        <div
          v-for="obj in selectedCoach"
          :key="obj.id"
        >
          <coach-tile
            :coach-data="obj"
            @deleteRow="handleDeleteRow"
          />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
        text
        width="100%"
        tile
        class="pa-0 ma-0 add-btn add-btn__orange-text spv-special--1"
        @click="showModal=true"
      >
        <v-icon class="mr-3">
          mdi-plus-circle
        </v-icon>
        Tambah Pelatih
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import CoachTile from '@/components/Class/CreateClass/CoachTile'
import AddCoachModal from '@/components/Class/CreateClass/AddCoachModal'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CoachTable',
  components: {
    CoachTile,
    AddCoachModal
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    arrData: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    isRowHover: false,
    showModal: false,
    selectedCoach: [],
    selectedCoachsId: []
  }),
  computed: {
    ...mapGetters('class', ['classUsers', 'userCurrentCompany'])
  },
  watch: {
    selectedCoachsId: {
      handler (data) {
        this.$emit('input', data)
      }
    },
    value: {
      handler (data) {
        // eslint-disable-next-line no-console
        this.initSelectedCoach(data)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapActions('class', ['getUsers', 'getUserCurrentCompany', 'updateSelectedCoaches']),
    handleSelectedCoach (data) {
      this.initSelectedCoach(data)
      this.showModal = false
      // eslint-disable-next-line no-console
      this.updateSelectedCoaches(this.selectedCoach)
      this.$emit('input', this.selectedCoach)
    },
    initSelectedCoach (data) {
      this.selectedCoachsId = data
      this.selectedCoach = this.classUsers.filter(user => data.includes(user.euserid))
    },
    handleDeleteRow (coachId) {
      const deleteId = this.selectedCoach.findIndex(coach => coach.euserid === coachId)
      const removeId = this.selectedCoachsId.findIndex(coach => coach === coachId)
      this.selectedCoach.splice(deleteId, 1)
      this.selectedCoachsId.splice(removeId, 1)
      this.updateSelectedCoaches(this.selectedCoach)
      this.$emit('input', this.selectedCoach)
    }
  }
}
</script>

<style lang="scss" scoped>
.border-bottom{
  border-bottom: 1px solid #D5D5D5;
}
.list-container{
  min-height: 50px;
}
.add-btn{
    &__orange-text{
      color: $orange-text;
    }
}
</style>
