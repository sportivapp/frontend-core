<template>
  <div class="upload-file__container">
    <div>
      <v-row class="px-2" justify="center">
        <v-col v-for="file in updatedFiles" :key="file.key">
          <div class="upload-file__file-box-size">
            <file-container
              :file="file"
              @switchToPrimary="handleSwitchToPrimary"
              @deleteFile="handleDeleteFile"
              @replaceFile="handleReplaceFile"
            />
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="upload-file__action-container py-2 spv-caption--1">
      <input
        id="fileElem"
        accept=".jpg, .jpeg, .png, .mp3, .mp4, .mov, .mkv"
        type="file"
        :multiple="isMultiple"
        @change="handleFileFromBrowse"
      >
      <label class="upload-file__action-container__label" for="fileElem">Upload Baru</label>

      <br>
      Maksimal ukuran file gambar <span class="font-weight-bold">10 MB</span>
      dan file video <span class="font-weight-bold">100MB</span>
      &bull; Format gambar <span class="font-weight-bold">JPG, JPEG, PNG</span>
    </div>
  </div>
</template>

<script>
import FileContainer from '@/components/Class/CreateClass/FileContainer'
export default {
  name: 'UploadFile',
  components: {
    FileContainer
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    initFiles: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    existFiles: [
      {
        id: 1,
        key: 1,
        file: null
      }, {
        id: 2,
        key: 2,
        file: null
      }, {
        id: 3,
        key: 3,
        file: null
      }, {
        id: 4,
        key: 4,
        file: null
      }, {
        id: 5,
        key: 5,
        file: null
      }
    ],
    selectedFiles: [],
    isMultiple: true
  }),
  computed: {
    updatedFiles () {
      this.updateExistFiles(this.selectedFiles)
      const notNullFiles = this.existFiles.filter(file => file.file !== null)
      console.log(this.existFiles)
      this.$emit('input', notNullFiles)
      return this.existFiles
    }
  },
  watch: {
    initFiles: {
      handler (arr) {
        this.initFile(arr)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    initFile (arr) {
      this.selectedFiles = [...arr]
    },
    handleFileFromBrowse (e) {
      this.selectedFiles = []
      const filesFromBrowse = [...e.target.files]
      for (let i = 0; i < filesFromBrowse.length; i++) {
        if (filesFromBrowse[i].type.includes('image')
        ) {
          if (filesFromBrowse[i].size >= 1048576 * 10) {
            alert('Ukuran File Gambar lebih dari 10MB')
          } else {
            this.selectedFiles.push(filesFromBrowse[i])
          }
        } else if (filesFromBrowse[i].type.includes('video')) {
          if (filesFromBrowse[i].size >= 1048576 * 100) {
            alert('Ukuran File video lebih dari 100MB')
          } else {
            this.selectedFiles.push(filesFromBrowse[i])
          }
        }
      }
    },
    getCountNotNullArray (array) {
      let count = 0
      for (const a in array) {
        if (array[a].file != null) {
          count++
        }
      }
      return count
    },
    updateExistFiles (files) {
      const currCount = this.getCountNotNullArray(this.existFiles)
      if (files && files.length + currCount <= 5) {
        for (let i = 0; i < files.length; i++) {
          if (currCount <= 5) {
            this.existFiles[currCount + i] = {
              ...this.existFiles[currCount + i],
              file: files[i]
            }
          }
        }
      }
    },
    handleSwitchToPrimary (fileId) {
      if (this.existFiles[fileId - 1].file) {
        const fileTemp = this.existFiles[0]
        this.existFiles[0] = {
          ...this.existFiles[0],
          key: this.existFiles[fileId - 1].key,
          file: this.existFiles[fileId - 1].file
        }
        this.existFiles[fileId - 1] = {
          ...this.existFiles[fileId - 1],
          key: fileTemp.key,
          file: fileTemp.file
        }
      }
      this.selectedFiles = []
    },
    handleDeleteFile (fileId) {
      this.existFiles[fileId - 1] = {
        ...this.existFiles[fileId - 1],
        file: null
      }
      for (let y = fileId; y < this.existFiles.length; y++) {
        if (this.existFiles[y - 1].file === null) {
          this.existFiles[y - 1] = {
            ...this.existFiles[y - 1],
            file: this.existFiles[y].file
          }
          this.existFiles[y] = {
            ...this.existFiles[y],
            file: null
          }
        }
      }
      this.selectedFiles = []
    },
    handleReplaceFile (file) {
      this.existFiles[file.id - 1] = {
        ...this.existFiles[file.id - 1],
        file: file.newFile
      }
      this.selectedFiles = []
    }
  }

}
</script>

<style lang="scss" scoped>
.upload-file{
  &__container{
    width: 100%;
    border: 2px dashed #D5D5D5;
    box-sizing: border-box;
    border-radius: 8px;
    text-align: center;
  }
  &__action-container{
    border-top: 1px solid #D5D5D5;
    &__label{
      cursor: pointer;
      color: $orange-100;
    }
  }
  &__file-box-size{
    max-width: 156px;
    height: 66px;
  }
}

#fileElem{
  display: none;
}
</style>
