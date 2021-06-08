<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
  // Styles
  import '@/styles/overrides.sass'
  import { sync } from 'vuex-pathify'

  export default {
    name: 'App',
    metaInfo: {
      title: 'Home',
      titleTemplate: '%s | ePoster Administration',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    data: () => ({
      interval: undefined,
      statusList: [
        {
          text: 'API erreichbar',
          icon: 'mdi-cloud-check',
          color: 'green',
          darken: '3',
        },
        {
          text: 'API nicht erreichbar',
          icon: 'mdi-cloud-alert',
          color: 'red',
          darken: '3',
        },
        {
          text: 'API im Wartungsmodus',
          icon: 'mdi-cloud-lock',
          color: 'orange',
          darken: '4',
        },
        {
          text: 'Verbindung wird aufgebaut',
          icon: 'mdi-cloud-search',
          color: 'blue',
          darken: '1',
        },
      ],
      getVideoError: false,
      getDeviceError: false,
      getLinkError: false,
      getLogError: false,
      client: null,
    }),
    computed: {
      ...sync('app', [
        'videos',
        'devices',
        'logs',
        'links',
        'networkStatus',
      ]),
    },
    created: function () {
      this.networkStatus = this.statusList[3]
      this.createWebsocket()
      setInterval(() => {
        if (this.client.readyState === 1) {
          this.client.send('device')
          this.client.send('video')
          this.client.send('link')
        }
      }, 2000)
    },
    methods: {
      createWebsocket: function () {
        this.client = new WebSocket('ws://kodizabbix:3331')
        this.client.addEventListener('error', () => {
          this.networkStatus = this.statusList[1]
          setTimeout(() => { this.createWebsocket() }, 2000)
        })
        this.client.addEventListener('message', (e) => {
          const response = JSON.parse(e.data)
          if (response.type === 'device') {
            if (response.rows.length !== this.devices.length) { this.devices = response.rows }
          }
          if (response.type === 'video') {
            if (response.rows.length !== this.videos.length) { this.videos = response.rows }
          }
          if (response.type === 'link') {
            // this.links = response.rows
          }
        })
        this.client.addEventListener('close', () => {
          this.networkStatus = this.statusList[1]
          setTimeout(() => { this.createWebsocket() }, 2000)
        })
        this.client.addEventListener('open', () => {
          this.networkStatus = this.statusList[0]
        })
      },
    },
  }
</script>
