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
      // this.interval = setInterval(this.getData, 10000)
    },
    methods: {
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
