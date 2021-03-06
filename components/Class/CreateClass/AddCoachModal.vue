<template>
  <v-card class="ma-0">
    <v-col class="pa-6">
      <v-row justify="end">
        <v-btn class="pa-0" height="100%" icon @click="$emit('closeModal')">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-row>
      <v-row justify="center" class="spv-heading--2">
        {{ title }}
      </v-row>
      <v-autocomplete
        v-model="selectedList"
        class="px-0 py-2 ma-1 autocomplete"
        :items="arrData"
        item-value="euserid"
        item-text="eusername"
        outlined=""
        :hint="hint"
        persistent-hint=""
        chips=""
        deletable-chips=""
        :label="label"
        height="100%"
        dense
        multiple=""
        :search-input.sync="searchText"
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            @click="data.select"
            @click:close="remove(data.item)"
          >
            <v-avatar left>
              <v-img :src="getUserAvatar(data.item.file)" />
            </v-avatar>
            {{ data.item.eusername }}
          </v-chip>
        </template>
        <template v-slot:item="data">
          <v-list-item-avatar>
            <img :src="getUserAvatar(data.item.file)">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ data.item.eusername }}</v-list-item-title>
            <v-list-item-subtitle>{{ data.item.euseremail }}</v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-col>
    <v-card class="pa-2">
      <v-row>
        <v-col class="py-0" align-self="center">
          <v-btn class="float-right" width="192" @click="$emit('closeModal')">
            Batal
          </v-btn>
        </v-col>
        <v-col class="py-2">
          <v-btn width="192" class="save-btn" @click="$emit('getSelectedItems', selectedList)">
            Tambah
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: 'AddCoachModal',
  props: {
    title: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: 'Anda dapat menambahkan 5 pelatih sekaligus'
    },
    label: {
      type: String,
      default: 'Pilih'
    },
    selectedItems: {
      type: Array,
      default: () => []
    },
    arrData: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    searchText: '',
    selectedList: []
  }),
  watch: {
    searchText: {
      handler (value) {
        // for search in v-autocomplete
        // this.$emit('updateOptions', value)
      }
    },
    selectedItems: {
      handler (value) {
        this.selectedList = value
      }
    }
  },
  methods: {
    getUserAvatar (file) {
      return file ? '/src/' + file.efilename : require('@/assets/images/logos/sportiv-logo-small.png')
    },
    remove (item) {
      const index = this.selectedList.indexOf(item.euserid)
      if (index >= 0) { this.selectedList.splice(index, 1) }
    }
  }
}
</script>

<style lang="scss" scoped>
.save-btn{
  color: white;
  background-color: $green-100 !important
}

v-autocomplete{
  &__content{
      max-width:100px !important;

  }
}
</style>
