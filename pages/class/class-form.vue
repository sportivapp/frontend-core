<template>
  <v-container class="class-form" fluid="">
    <div class="container-breadcrumbs mx-auto">
      <simple-breadcrumb :items="breadcrumbs" />
    </div>
    <class-form />
  </v-container>
</template>

<script>
import ClassForm from '@/components/Class/CreateClass/ClassForm'
import SimpleBreadcrumb from '@/components/Breadcrumb/SimpleBreadcrumb.vue'

export default {
  name: 'ClassFormPage',
  layout: 'class',
  components: {
    ClassForm,
    SimpleBreadcrumb
  },
  computed: {
    breadcrumbs () {
      return [
        {
          text: 'Daftar Kelas',
          disabled: false,
          to: '/class'
        },
        {
          text: 'Tambah Kelas',
          disabled: false,
          to: this.$route.path
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.class-form{
  height: 100%;
  background-color: $background-color;
}
.container-breadcrumbs{
  max-width: 1028px;
}

</style>
