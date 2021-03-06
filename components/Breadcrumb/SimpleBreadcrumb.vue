<template>
  <v-breadcrumbs :items="items">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        :disabled="item.disabled"
        :to="item.to"
        active-class="breadcrumb--active"
        class="breadcrumb"
        exact
        exact-active-class="breadcrumb--exact-active"
        link
        ripple
      >
        <span class="breadcrumb__text">
          {{ item.text }}
        </span>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'SimpleBreadcrumb',
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .breadcrumb {
  &__text {
    font-size: 12px;
    color: $grey-3;
  }

  &--exact-active {
    span {
      font-weight: 600;
      color: $orange-4;
    }
  }
}
</style>

<style lang="scss">
.v-breadcrumbs {
  padding: 13px 0 !important;
}
</style>
