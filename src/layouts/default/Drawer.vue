<template>
  <v-navigation-drawer
    id="default-drawer"
    v-model="drawer"
    :dark="dark"
    :right="isMobile"
    :src="drawerImage ? image : ''"
    mini-variant-width="80"
    app
    width="260"
  >
    <template
      v-if="drawerImage"
      #img="props"
    >
      <v-img
        :key="image"
        :gradient="gradient"
        v-bind="props"
      />
    </template>

    <div class="px-2">
      <default-drawer-header />

      <!-- <v-divider class="mx-3" />

      <default-account-settings /> -->

      <v-divider class="mx-3 mb-2" />

      <default-list :items="items" />
    </div>

    <template
      #append
      v-bind="networkStatus"
    >
      <v-list-item
        :class="`py-3 ${networkStatus.color} darken-${networkStatus.darken} white--text`"
        style="position: fixed; bottom:0; width: 100%; margin: 0"
      >
        <v-list-item-icon
          class="my-2 mx-3 align-self-center"
        >
          <v-icon>
            {{ networkStatus.icon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ networkStatus.text }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import { get, sync } from 'vuex-pathify'

  export default {
    name: 'DefaultDrawer',

    components: {
      // DefaultAccountSettings: () => import(
      //   /* webpackChunkName: "default-account-settings" */
      //   './widgets/AccountSettings'
      // ),
      DefaultDrawerHeader: () => import(
        /* webpackChunkName: "default-drawer-header" */
        './widgets/DrawerHeader'
      ),
      DefaultList: () => import(
        /* webpackChunkName: "default-list" */
        './List'
      )
    },
    computed: {
      ...get('user', [
        'dark',
        'gradient',
        'image'
      ]),
      ...get('app', [
        'items',
        'version'
      ]),
      ...sync('app', [
        'drawer',
        'drawerImage',
        'mini'
      ]),
      networkStatus: sync('networkStatus/current'),
      isMobile: function () {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      }
    }
  }
</script>

<style lang="sass">
#default-drawer
  .v-list-item
    margin-bottom: 8px

  .v-list-item::before,
  .v-list-item::after
    display: none

  .v-list-group__header__prepend-icon,
  .v-list-item__icon
    margin-top: 12px
    margin-bottom: 12px
    margin-left: 4px

  &.v-navigation-drawer--mini-variant
    .v-list-item
      justify-content: flex-start !important
</style>
