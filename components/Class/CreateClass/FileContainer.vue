<template>
  <div class="file-container">
    <v-menu
      offset-y
      class="menu"
    >
      <template v-slot:activator="{on, attrs}">
        <v-card
          class="grey lighten-3 "
          outlined
          height="100%"
          v-bind="attrs"
          v-on="file.file?on:''"
        >
          <video
            :id="'galleryVid'+file.key"
            :hidden="!isVideo"
            class="ma-0 pa-0"
            :src="bannerPreview"
            type=""
            width="100%"
            height="100%"
          />

          <img
            :id="'galleryFile'+file.key"
            :hidden="isVideo"
            class="ma-0 pa-0"
            :src="bannerPreview"
            width="100%"
            height="100%"
            alt
          >

          <v-card-subtitle
            v-if="file.id === 1"
            class="text-center white--text blue ma-0 px-0 py-1 mt-n2 on-top"
          >
            Gambar Utama
          </v-card-subtitle>
        </v-card>
      </template>
      <v-card class="menu-container" tile="">
        <v-row class="option" align="center" @click="$emit('switchToPrimary',file.id)">
          <label
            class="black--text option-font"
          >Jadikan Gambar Utama</label>
        </v-row>
        <v-row class="option" align="center">
          <input
            :id="'replaceFileInput'+file.key"
            class="hidden"
            accept=".jpg, .jpeg, .png, .mp3, .mp4, .mov, .mkv"
            type="file"
            width="100%"
            @change="handleFileFromBrowse"
          >
          <label
            class="black--text option-font input-file__label"
            :for="'replaceFileInput'+file.key"
          >Upload Baru</label>
        </v-row>
        <v-row class="option" align="center" @click="$emit('deleteFile',file.id)">
          <label
            class="black--text option-font"
          >Hapus</label>
        </v-row>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { staticUrl } from '@/config/api'
export default {
  name: 'FileContainer',
  props: {
    file: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    showMenu: false,
    options: [
      { id: '1', option: 'Jadikan Gambar Utama' },
      { id: '2', option: 'Upload Baru' },
      { id: '3', option: 'Hapus' }
    ],
    selectedItem: null,
    selectedFile: {}
  }),
  computed: {
    bannerPreview () {
      return this.file.file ? this.getFilePreview(this.file.file) : require('@/assets/images/empty/empty-banner.png')
    },
    isVideo () {
      if (this.file.file && this.file.file.type.includes('video')) {
        return true
      }
      return false
    }
  },
  methods: {
    handleFileFromBrowse (e) {
      this.selectedFiles = []
      const filesFromBrowse = e.target.files[0]
      if (filesFromBrowse.type.includes('image')) {
        if (filesFromBrowse.size >= 1048576 * 10) {
          alert('Ukuran File Gambar lebih dari 10MB')
        } else {
          this.selectedFile = filesFromBrowse
        }
      } else if (filesFromBrowse.type.includes('video')) {
        if (filesFromBrowse.size >= 1048576 * 100) {
          alert('Ukuran File video lebih dari 100MB')
        } else {
          this.selectedFile = filesFromBrowse
        }
      }
      if (this.selectedFile) {
        this.$emit('replaceFile', { id: this.file.id, newFile: this.selectedFile })
      }
    },
    getFilePreview (fileMedia) {
      if (fileMedia.fileId) {
        return staticUrl + fileMedia.name
      } else if (!fileMedia.fileId) {
        this.readURL(fileMedia)
      }
    },
    async readURL (fileMedia) {
      const reader = new FileReader()
      const img = document.getElementById('galleryFile' + this.file.key)
      const vid = document.getElementById('galleryVid' + this.file.key)
      if (fileMedia.type.includes('image')) {
        reader.onload = () => {
          img.src = reader.result
        }
        await reader.readAsDataURL(fileMedia)
      } else if (fileMedia.type.includes('video')) {
        vid.src = await URL.createObjectURL(fileMedia)
        vid.type = fileMedia.type
      }
    }

  }
}
</script>

<style lang="scss" scoped>
::v-deep .menu{
  border-radius: 8px;
}
.on-top{
  position: absolute;
  width: 100%;
}
.file-container{
  width: 100%;
  height: 100%;
}
.hidden{
  display: none;
}
.menu-container{
  width: 216px;
}
.option{
  padding-left: 10px;
  margin: 0;
  cursor: pointer;
  min-height: 40px;
}
label{
  display: block;
  cursor: pointer;
  margin: 0;
}
.option:hover{
  background: #F4F4F4;
}
.option-font{
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 26px;
}
.input-file{
  &__label{
    padding: 0;
    margin: 0;
  }
}
</style>
