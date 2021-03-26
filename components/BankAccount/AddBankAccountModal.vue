<template>
  <v-dialog v-model="value" max-width="800px" persistent="">
    <v-card>
      <v-container class="px-5 pt-6">
        <v-row>
          <v-col>
            <p class="spv-heading--2">
              Tambah Rekening
            </p>
          </v-col>
          <v-col align-self="start" class="pt-1">
            <v-btn icon="" class="float-right" @click="$emit('input',false)">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mx-1">
          <p class="spv-body--1 grey--text mb-1">
            Nama Bank<span class="red--text">*</span>
          </p>
        </v-row>
        <v-row class="mx-1">
          <v-select
            outlined=""
            placeholder="Pilih nama bank"
            dense=""
          />
        </v-row>
        <v-row>
          <v-col class="px-7 py-0">
            <v-row class="pa-0">
              <p class="spv-body--1 grey--text mb-1">
                Nomor Rekening<span class="red--text">*</span>
              </p>
            </v-row>
            <v-row>
              <v-text-field outlined="" dense />
            </v-row>
          </v-col>
          <v-col class="px-7 py-0">
            <v-row>
              <p class="spv-body--1 grey--text mb-1">
                Nama Pemilik Rekening<span class="red--text">*</span>
              </p>
            </v-row>
            <v-row>
              <v-text-field outlined="" dense />
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="px-7 py-0">
            <v-row class="pa-0">
              <p class="spv-body--1 grey--text mb-1">
                Nama Cabang (Opsional)
              </p>
            </v-row>
            <v-row>
              <v-text-field outlined="" dense placeholder="Contoh: Cabang Mangga Dua" />
            </v-row>
          </v-col>
          <v-col class="px-7 py-0">
            <v-row>
              <p class="spv-body--1 grey--text mb-1">
                Wilayah Cabang (Opsional)
              </p>
            </v-row>
            <v-row>
              <v-text-field outlined="" dense placeholder="Contoh: Penjaringan" />
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-card height="72px" class="mt-10">
        <v-row justify="end" class="mx-6">
          <v-btn width="140px" class="mt-4 white--text" color="#0AB281">
            Simpan
          </v-btn>
        </v-row>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AddBankAccountModal',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>
