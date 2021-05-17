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
    }),
    created: function () {
      this.getData()
      // this.interval = setInterval(this.getData, 10000)
    },
    computed: {
      ...sync('app', [
        'videos',
        'devices',
        'logs',
        'links',
      ]),
    },
    methods: {
      getData: function () {
        axios({
          method: 'get',
          url: 'http://kodizabbix:3330/v2/video/all',
        }).then((response) => {
          this.videos = response.data.data.rows
        })
        axios({
          method: 'get',
          url: 'http://kodizabbix:3330/v2/device/all',
        }).then((response) => {
          this.devices = response.data.data.rows
        })
        axios({
          method: 'get',
          url: 'http://kodizabbix:3330/v2/link/all',
        }).then((response) => {
          this.links = response.data.data.rows
        })
        axios({
          method: 'get',
          url: 'http://kodizabbix:3330/v2/log/all',
        }).then((response) => {
          this.logs = response.data.data.rows
        })
      },
    },
  }
</script>
