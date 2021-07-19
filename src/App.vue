<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
  /* eslint-disable no-prototype-builtins */
  import '@/styles/overrides.sass'
  import { call, sync } from 'vuex-pathify'
  import Socket from '@/plugins/socket'

  export default {
    name: 'App',
    metaInfo: {
      title: 'Home',
      titleTemplate: '%s | ePoster Administration',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    },
    data: () => ({
      interval: undefined,
      getVideoError: false,
      getDeviceError: false,
      getLinkError: false,
      getLogError: false,
      client: null
    }),
    computed: {
      ...sync('app', [
        'logs',
        'playlists',
        'playlistvideos'
      ]),
      networkStatus: sync('networkStatus/current')
    },
    beforeDestroy () {
      Socket.$off('message', this.handleMessage)
    },
    created: function () {
      Socket.$on('message', this.handleMessage)
    },
    beforeMount () {
      this.loadNetworkStatus()
      this.loadVideos()
      this.loadDevices()
      // this.loadLinks()
    },
    methods: {
      loadVideos: call('videos/load'),
      loadDevices: call('devices/load'),
      loadLinks: call('links/load'),
      loadPlaylist: call('playlist/load'),
      loadNetworkStatus: call('networkStatus/load'),
      handleMessage (msg) {
        const content = JSON.parse(msg.data)
        this[content.type + 's'] = content.rows
        // this[content.type + 's'] = Object.freeze(this[content.type + 's'].map(entry => { return { ...entry } }))
        // todo: move socket handle to components
      }
    }
  }
</script>
