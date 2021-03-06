<template>
  <v-container class="ma-0 pa-0 class-list" fluid>
    <v-row align="center" justify="end" no-gutters>
      <v-spacer />
      <v-col align-self="center" cols="4">
        <search-bar
          label="Search"
          @search="handleSearch"
        />
      </v-col>
      <v-col align-self="center" class="pl-8" cols="2">
        <v-btn
          depressed
          dark
          color="#FF7D43"
          class="px-7"
          @click="handleClickCreateClass"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Tambah Kelas
        </v-btn>
      </v-col>
      <v-col align-self="center" cols="3">
        <v-row align="center" justify="end" no-gutters>
          {{ getStartNum }}-{{ getEndNum }} dari {{ getTotalSize }}
          <v-btn
            icon
            :disabled="disablePrevPageButton"
            @click="handlePagination('prev')"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            icon
            :disabled="disableNextPageButton"
            @click="handlePagination('next')"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-card flat class="mt-5 pt-3 pb-16 class-list__card">
      <v-card-title class="class-list__card__title">
        Kelas
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="classList"
        :loading="isTableLoading"
        disable-filtering
        disable-sort
        disable-pagination
        hide-default-footer
        class="class-list__table"
        @click:row="handleClickRow"
      >
        <!-- eslint-disable vue/valid-v-slot -->
        <template v-slot:header.title="{ header }">
          <div class="pl-12">
            {{ header.text }}
          </div>
        </template>
        <template v-slot:item.title="{ item }">
          <v-container class="ma-0 pa-0 pl-12 py-3 d-flex justify-start align-content-center">
            <v-img
              max-height="60"
              max-width="107"
              :src="getClassBanner(item.classMedia)"
              :lazy-src="require('@/assets/images/bg/orange_background.png')"
              class="rounded"
            />
            <div class="class-list__table__title">
              {{ item.title }}
            </div>
          </v-container>
        </template>
        <template v-slot:item.priceRange.minPrice="{ item }">
          <div
            :class="(item.priceRange.minPrice===item.priceRange.maxPrice) && (item.priceRange.minPrice===0)
              ?'class-list__table__price--free'
              :'class-list__table__price'"
          >
            {{ calculatePrice(item.priceRange) }}
          </div>
        </template>
      </v-data-table>
      <!-- eslint-enable -->
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { staticUrl } from '@/config/api'
import { convertToPrice } from '@/utils/price'
import SearchBar from '../inputs/SearchBar.vue'

const LIST_TO = 10

export default {
  name: 'ClassListComponent',
  components: { SearchBar },
  data () {
    return {
      searchTable: '',
      headers: [
        {
          text: 'Nama',
          align: 'start',
          sortable: false,
          value: 'title'
        },
        { text: 'Tipe', value: 'industry.eindustryname' },
        { text: 'Kota', value: 'city.ecityname' },
        { text: 'Harga', value: 'priceRange.minPrice' },
        { text: 'Peserta', value: 'totalParticipants' }
      ],
      isTableLoading: true,
      LIST_TO,
      currentPage: 0
    }
  },
  computed: {
    ...mapGetters('class', [
      'classList',
      'classListPaging'
    ]),
    getStartNum () {
      if (!this.classListPaging.totalSize || this.classListPaging.totalSize <= 0) {
        return 0
      }
      return (this.LIST_TO * this.currentPage) + 1
    },
    getEndNum () {
      if (!this.classListPaging.totalSize) { return 0 }
      const endNum = this.LIST_TO * (this.currentPage + 1)
      if (endNum >= this.classListPaging.totalSize) {
        return this.classListPaging.totalSize
      }
      return endNum
    },
    getTotalSize () {
      return this.classListPaging.totalSize ? this.classListPaging.totalSize : 0
    },
    disablePrevPageButton () {
      return this.currentPage <= 0
    },
    disableNextPageButton () {
      if (!this.classListPaging.totalPage) { return true }
      return (this.currentPage + 1) >= this.classListPaging.totalPage
    }
  },
  created () {
    this.initData()
  },
  methods: {
    ...mapActions('class', [
      'getClassList'
    ]),
    initData () {
      this.searchClass()
    },
    constructParams () {
      return {
        page: this.currentPage,
        size: this.LIST_TO,
        keyword: this.searchTable
      }
    },
    searchClass () {
      this.isTableLoading = true
      this.getClassList({
        params: this.constructParams(),
        successCallback: this.successGetClassList
      })
    },
    successGetClassList () {
      this.currentPage = this.classListPaging.page
      this.isTableLoading = false
    },
    handleSearch (searchString) {
      this.searchTable = searchString
      this.currentPage = 0
      this.searchClass()
    },
    handlePagination (value) {
      this.currentPage += value === 'next' ? 1 : -1
      this.searchClass()
    },
    calculatePrice (priceRange) {
      // priceRange is an obj with keys minPrice and maxPrice

      if ((priceRange.minPrice === priceRange.maxPrice) && (priceRange.minPrice === 0)) {
        return this.$t('tournament.priceFree')
      }

      const minPrice = convertToPrice(priceRange.minPrice)
      const maxPrice = convertToPrice(priceRange.maxPrice)
      return minPrice === maxPrice
        ? minPrice + '/bulan'
        : minPrice + ' - ' + maxPrice + '/bulan'
    },
    getClassBanner (classMedia) {
      // classMedia is array of obj
      let bannerSrc = null
      if (classMedia.length < 1) { return bannerSrc }
      for (let i = 0; i < classMedia.length; i++) {
        if (classMedia[i].file.efiletype.startsWith('image')) {
          bannerSrc = staticUrl + classMedia[i].file.efilename
          break
        } else {
          continue
        }
      }
      return bannerSrc
    },
    handleClickCreateClass () {
      this.$router.push('/class/class-form')
    },
    handleClickRow (item) {
      this.$router.push(`/class/${item.uuid}`)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .class-list__table tbody tr :hover {
  cursor: pointer;
}

.class-list {
  width: 80%;
  max-width: 1120px;

  &__card {
    border-radius: 24px;

    &__title {
      padding-left: 64px;
      font-size: 28px;
      font-weight: 600;
      line-height: 42px;
      color: #FF7D43;
    }
  }

  &__table {
    border-radius: 0px 0px 0px 0px !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &__title {
      padding-left: 10px;
      vertical-align: middle;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      align-self: center;
    }

    &__price {
      color: #FF7041;
      font-weight: 600;

      &--free {
        font-weight: 600;
        color: #0AB281;
      }
    }
  }
}
</style>
