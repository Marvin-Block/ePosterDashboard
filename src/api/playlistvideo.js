import API from '@/plugins/api'
// todo: review endpoints
export default {
  fetch () {
    return API.get('/playlistvideo/')
  },
  fetchPart (offset, limit) {
    return API.get('/playlistvideo' + `/${offset ?? 0}/${limit ?? 100}`)
  },
  fetchByUUID (uuid) {
    return API.get('/playlistvideo/' + uuid)
  },
  update (body) {
    return API.put('/playlistvideo/', body)
  },
  delete (uuid) {
    return API.delete('/playlistvideo/' + uuid)
  },
  send (data, config) {
    return API.post('/playlistvideo/', data, config ?? {})
  }
}
