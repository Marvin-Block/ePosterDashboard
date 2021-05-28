<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
  // Styles
  import '@/styles/overrides.sass'
  import { sync } from 'vuex-pathify'
  import axios from 'axios'

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
      this.getData()
      this.createWebsocket()
      setInterval(() => {
        if (this.client.readyState === 1) {
          this.client.send('device')
          this.client.send('video')
          this.client.send('link')
        }
      }, 1000)
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
            this.devices = response.rows
          }
          if (response.type === 'video') {
            this.videos = response.rows
          }
          if (response.type === 'link') {
            this.links = response.rows
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
      // we do not talk about this code :)
      // i might make this fancy at some point
      getData: function () {
        axios({
          method: 'get',
          url: 'http://kodizabbix:3330/v2/video/all',
        }).then((response) => {
          this.videos = response.data.data.rows
        }).catch(error => {
          console.error(error)
          this.getVideoError = true
        }).finally(() => {
          axios({
            method: 'get',
            url: 'http://kodizabbix:3330/v2/device/all',
          }).then((response) => {
            this.devices = response.data.data.rows
          }).catch(error => {
            console.error(error)
            this.getDeviceError = true
          }).finally(() => {
            axios({
              method: 'get',
              url: 'http://kodizabbix:3330/v2/link/all',
            }).then((response) => {
              this.links = response.data.data.rows
            }).catch(error => {
              console.error(error)
              this.getLinkError = true
            }).finally(() => {
              axios({
                method: 'get',
                url: 'http://kodizabbix:3330/v2/log/all',
              }).then((response) => {
                this.logs = response.data.data.rows
              }).catch(error => {
                console.error(error)
                this.getLogError = true
              }).finally(() => {
                if (this.getDeviceError && this.getVideoError && this.getLinkError && this.getLogError) {
                  this.networkStatus = this.statusList[1]
                } else {
                  this.networkStatus = this.statusList[0]
                }
              })
            })
          })
        })
      },
    },
  }
</script>
