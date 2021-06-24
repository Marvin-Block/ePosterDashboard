import Vue from 'vue'
import { sync } from 'vuex-pathify'

const socket = new WebSocket('ws://kodizabbix:3331')

const emitter = new Vue({
  methods: {
    send (message) {
      if (socket.readyState === 1) {
        socket.send(message)
      } else {
       // a
      }
    },
  },
})

socket.onmessage = function (msg) {
  emitter.$emit('message', msg)
}

socket.onerror = function (err) {
  emitter.$emit('error', err)
}

export default emitter
