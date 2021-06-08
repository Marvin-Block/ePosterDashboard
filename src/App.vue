<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
  /* eslint-disable no-prototype-builtins */
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
      }, 1000)
    },
    methods: {
      createWebsocket: function () {
        this.client = new WebSocket('ws://kodizabbix:3331')
        this.client.addEventListener('error', () => {
          this.networkStatus = this.statusList[1]
          setTimeout(() => { this.createWebsocket() }, 1000)
        })
        this.client.addEventListener('message', (e) => {
          const response = JSON.parse(e.data)
          if (response.type === 'device') {
            if (!this.object_equals(this.devices, response.rows)) { this.devices = response.rows }
          }
          if (response.type === 'video') {
            if (!this.object_equals(this.videos, response.rows)) { this.videos = response.rows }
          }
          if (response.type === 'link') {
            if (!this.object_equals(this.links, response.rows)) { this.links = response.rows }
          }
        })
        this.client.addEventListener('close', () => {
          this.networkStatus = this.statusList[1]
          setTimeout(() => { this.createWebsocket() }, 1000)
        })
        this.client.addEventListener('open', () => {
          this.networkStatus = this.statusList[0]
        })
      },
      object_equals: function (x, y) {
        let p
        if (x === y) return true
        // if both x and y are null or undefined and exactly the same

        if (!(x instanceof Object) || !(y instanceof Object)) return false
        // if they are not strictly equal, they both need to be Objects

        if (x.constructor !== y.constructor) return false
        // they must have the exact same prototype chain, the closest we can do is
        // test there constructor.

        for (p in x) {
          if (!x.hasOwnProperty(p)) continue
          // other properties were tested using x.constructor === y.constructor

          if (!y.hasOwnProperty(p)) return false
          // allows to compare x[ p ] and y[ p ] when set to undefined

          if (x[p] === y[p]) continue
          // if they have the same strict value or identity then they are equal

          if (typeof (x[p]) !== 'object') return false
          // Numbers, Strings, Functions, Booleans must be strictly equal

          if (!this.object_equals(x[p], y[p])) return false
          // Objects and Arrays must be tested recursively
        }

        for (p in y) {
          if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) { return false }
        }
        // allows x[ p ] to be set to undefined
        return true
      },
    },
  }
</script>
