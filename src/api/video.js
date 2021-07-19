import API from '@/plugins/api'

export default {
  fetch () {
    return API.get('/video/all/')
  },
  fetchPart (offset, limit) {
    return API.get(`/video/${offset ?? 0}/${limit ?? 100}`)
  },
  fetchByUUID (uuid) {
    return API.get('/video/' + uuid)
  },
  fetchFile (uuid, config) {
    return API.get('/video/file/' + uuid, config ?? {})
  },
  update (body) {
    return API.put('/video/', body)
  },
  delete (uuid) {
    return API.delete('/video/' + uuid)
  },
  send (data, config) {
    return API.post('/video/', data, config ?? {})
  }
}
