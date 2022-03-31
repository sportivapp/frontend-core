<template>
  <div>
    <v-row no-gutters>
      <v-col cols="6" class="class-participants__search-col">
        <v-text-field
          v-model="search"
          solo
          hide-details
          :label="$t('cmsClass.searchParticipants')"
          prepend-inner-icon="mdi-magnify"
          clearable
          class="rounded-lg ma-0"
        />
      </v-col>
    </v-row>
    <class-participants-table
      v-for="(classCategory, index) in classParticipants"
      :key="index"
      :class-category="classCategory"
      :search="search"
      class="mb-10"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ClassParticipantsTable from './ClassParticipantsTable'

export default {
  name: 'ClassParticipants',
  components: { ClassParticipantsTable },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters('class', [
      'classParticipants'
    ])
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions('class', [
      'getClassParticipants'
    ]),
    initPage () {
      this.getClassParticipants({
        id: this.$route.params.classId
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-input__slot {
  box-shadow: none !important;
  border: 1px solid $light-grey-1;
  border-radius: 8px;
  height: 40px;
}

.class-participants {
  &__search-col {
    padding-left: 80px;
    padding-top: 0px;
    padding-bottom: 28px;
  }
}
</style>
