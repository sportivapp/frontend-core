<template>
  <v-container class="ma-0 pa-0 class-category-info" fluid>
    <update-schedule-modal
      v-model="showModal"
      :category-sessions="info.categorySessions"
    />
    <v-row>
      <v-col class="py-0" cols="auto" md="7">
        <v-row>
          <v-card
            v-if="showReminder"
            class="mx-4 px-4 mb-4"
            style="border:1px solid #F4B718"
            outlined=""
            rounded=""
            color="#FFF3D3"
          >
            <v-row align="center">
              <v-col align-self="center" cols="1">
                <v-icon size="20" color="#F4B718">
                  mdi-alert
                </v-icon>
              </v-col>
              <v-col align-self="center">
                <p class="ma-0 spv-subtitle--3">
                  Kategori kelas Anda akan berakhir pada tanggal {{ lastSession }}. Perpanjang
                  sekarang <span class="green--text action-text" @click="showModal=true">disini</span>.
                </p>
              </v-col>
              <v-col cols="1">
                <v-btn icon @click="showReminder = false">
                  <v-icon size="14">
                    mdi-close
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
        <v-row>
          <v-col class="py-0" cols="auto" md="12">
            <h3 class="class-category-info__title pb-3">
              Deskripsi
            </h3>
            <p class="class-category-info__description">
              {{ info.description }}
            </p>
          </v-col>
          <v-col cols="auto" md="12">
            <h3 class="class-category-info__title pb-3">
              Persyaratan Peserta
            </h3>
            <!-- <span
              v-for="r in info.requirements"
              :key="r"
            >
              <p
                class="class-category-info__description ma-0"
              >
                {{ r }}
              </p>
            </span> -->
            <span>
              <p class="class-category-info_description ma-0">
                {{ info.requirements }}
              </p>
            </span>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="py-0" cols="auto" md="4">
        <v-row class="pl-5">
          <!-- price -->
          <v-col cols="auto" md="4">
            <label class="class-category-info__subtitle">
              Harga
            </label>
          </v-col>
          <v-col cols="auto" md="8">
            <h5 class="class-category-info__price">
              {{ handlePrice }}
            </h5>
          </v-col>
          <!-- participant -->
          <v-col cols="auto" md="4">
            <label class="class-category-info__subtitle">
              Peserta
            </label>
          </v-col>
          <v-col cols="auto" md="8">
            <label class="class-category-info__black spv-body--2">
              {{ info.totalParticipants ? info.totalParticipants : 0 }} Orang
            </label>
          </v-col>
          <!-- schedule -->
          <!-- <v-col cols="auto" md="4">
            <label class="class-category-info__subtitle">
              Jadwal
            </label>
          </v-col> -->
          <!-- <v-col class="class-category-info__schedule" cols="auto" md="8">
            <label>Senin (10:00 - 12:00)</label>
            <br><label>Selasa (10:00 - 12:00)</label>
            <br><label>Rabu (10:00 - 12:00)</label>
            <br><label>Kamis (10:00 - 12:00)</label>
            <br><label>Jumat (10:00 - 12:00)</label>
          </v-col> -->
          <!-- trainer -->
          <v-col cols="auto" md="4">
            <label class="class-category-info__subtitle">
              Pelatih
            </label>
          </v-col>
          <v-col class="class-category-info__black spv-body--2" cols="auto" md="8">
            <td class="text-capitalize">
              {{ classCoaches }}
              <p
                v-if="!showMoreCoach && haveManyCoach"
                class="class-category-info__show-more"
                @click="showMoreCoach = true"
              >
                {{ $t('cmsClass.showMore') }}
                <v-icon size="15" color="#FF7041">
                  mdi-chevron-down
                </v-icon>
              </p>
            </td>
          </v-col>
        </v-row>
        <v-divider class="pa-0" />
        <v-col cols="auto" md="12" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { convertToPrice } from '@/utils/price.js'
import UpdateScheduleModal from '@/components/Class/ClassCategory/Modal/UpdateScheduleModal'
import { toFullDateHourMinute } from '@/utils/date.js'
export default {
  name: 'ClassCategoryInfo',
  components: {
    UpdateScheduleModal
  },
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showMoreCoach: false,
      showReminder: true,
      showModal: false
    }
  },
  computed: {
    lastSession () {
      return this.info ? toFullDateHourMinute(this.info.categorySessions[this.info.categorySessions.length - 1].endDate) : '...'
    },
    handlePrice () {
      if (!this.info.price || this.info.price === '0') { return 'Gratis' }
      return convertToPrice(this.info.price) + '/bulan'
    },
    classCoaches () {
      let coaches = ''
      if (this.info.coaches) {
        for (let i = 0; i < this.info.coaches.length; i++) {
          if (coaches) { coaches += ', ' }
          coaches = coaches + this.info.coaches[i].user.eusername
          if (!this.showMoreCoach && i === 2) {
            break
          }
        }
      }
      return coaches
    },
    haveManyCoach () {
      return this.info && this.info.coaches && this.info.coaches.length > 3
    }
  }
}
</script>
<style lang="scss" scoped>
.class-category-info {
  color: $neutral-black;

  &__description {
    font-size: 14px;
    line-height: 24px;
  }

  &__subtitle {
    font-size: 14px;
    color: $neutral-grey;
  }

  &__price {
    color: $orange-100;
  }

  &__black {
    color: #000000;
  }

  &__schedule {
    font-size: 14px;
  }

  &__show-more {
      color: $orange-4;
      font-size: 12px;
      line-height: 18px;
      cursor: pointer;
    }
}
.action-text{
  cursor: pointer;
}
</style>
