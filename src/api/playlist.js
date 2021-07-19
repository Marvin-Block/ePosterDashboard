import API from '@/plugins/api'
// todo: review endpoints
export default {
  fetch () {
    return API.get('/playlist/')
  },
  fetchPart (offset, limit) {
    return API.get('/playlist' + `/${offset ?? 0}/${limit ?? 100}`)
  },
  fetchByUUID (uuid) {
    return API.get('/playlist/' + uuid)
  },
  update (body) {
    return API.put('/playlist/', body)
  },
  delete (uuid) {
    return API.delete('/playlist/' + uuid)
  },
  send (data, config) {
    return API.post('/playlist/', data, config ?? {})
  }
}
