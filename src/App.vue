<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
  /* eslint-disable no-prototype-builtins */
  import '@/styles/overrides.sass'
  import { call, sync } from 'vuex-pathify'
  let videoClient, deviceClient
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
    mounted () {
      videoClient = this.$sse.create({
        url: 'http://localhost:3333/sse/video',
        format: 'json',
        polyfill: true
      })
      videoClient.on('message', (message) => {
        console.warn('Message without event', message)
      })
      videoClient.on('data', (data) => {
        this.addVideos(data)
      })
      videoClient.on('update', (data) => {
        this.replaceVideo(data)
      })
      videoClient.on('delete', (data) => {
        this.deleteVideo(data)
      })
      videoClient.on('add', (data) => {
        this.insertVideo(data)
      })
      videoClient.connect()
        .then(sse => {
          console.log('[i] Connected to /sse/video')
        })
        .catch((err) => {
          console.error(err)
        })
      deviceClient = this.$sse.create({
        url: 'http://localhost:3333/sse/device',
        format: 'json',
        polyfill: true
      })
      deviceClient.on('message', (message) => {
        console.warn('Message without event', message)
      })
      deviceClient.on('data', (data) => {
        this.addDevices(data)
      })
      deviceClient.on('update', (data) => {
        this.replaceDevice(data)
      })
      deviceClient.on('delete', (data) => {
        this.deleteDevice(data)
      })
      deviceClient.on('add', (data) => {
        this.insertDevice(data)
      })
      deviceClient.connect()
        .then(sse => {
          console.log('[i] Connected to /sse/device')
        })
        .catch((err) => {
          console.error(err)
        })
    },
    beforeDestroy () {
      videoClient.disconnect()
      deviceClient.disconnect()
    },
    beforeMount () {
      this.loadNetworkStatus()
      this.loadDevices()
      // this.loadVideos()
      // this.loadLinks()
    },
    methods: {
      addVideos: call('videos/add'),
      replaceVideo: call('videos/replace'),
      deleteVideo: call('videos/delete'),
      insertVideo: call('videos/insert'),
      addDevices: call('devices/add'),
      replaceDevice: call('devices/replace'),
      deleteDevice: call('devices/delete'),
      insertDevice: call('devices/insert'),
      loadLinks: call('links/load'),
      loadPlaylist: call('playlist/load'),
      loadNetworkStatus: call('networkStatus/load')
    }
  }
</script>
