import API from '@/plugins/api'

export default {
  fetch () {
    return API.get('/device/all/')
  },
  fetchPart (offset, limit) {
    return API.get(`/device/${offset ?? 0}/${limit ?? 100}`)
  },
  fetchByUUID (uuid) {
    return API.get('/device/' + uuid)
  },
  update (body) {
    return API.put('/device/', body)
  },
  delete (uuid) {
    return API.delete('/device/' + uuid)
  },
  send (data, config) {
    return API.post('/device/', data, config ?? {})
  }
}
