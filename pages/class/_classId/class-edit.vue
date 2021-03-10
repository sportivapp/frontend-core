<template>
  <v-container class="class-form" fluid="">
    <div class="container-breadcrumbs mx-auto">
      <simple-breadcrumb
        :items="breadcrumbs"
      />
    </div>
    <class-form
      :is-edit="true"
    />
  </v-container>
</template>

<script>
import ClassForm from '@/components/Class/CreateClass/ClassForm'
import SimpleBreadcrumb from '@/components/Breadcrumb/SimpleBreadcrumb.vue'

export default {
  name: 'ClassEditFormPage',
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
          text: 'Edit Kelas',
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
