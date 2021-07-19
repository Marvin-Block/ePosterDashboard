import API from '@/plugins/api'
const path = '/devicehistory'

export default {
  fetch () {
    return API.get(path)
  },
  fetchPart (offset, limit) {
    return API.get('/devicehistory' + `/${offset ?? 0}/${limit ?? 100}`)
  },
  fetchByUUID (uuid) {
    return API.get('/devicehistory/' + uuid)
  },
  update (body) {
    return API.put('/devicehistory/', body)
  },
  delete (uuid) {
    return API.delete('/devicehistory/' + uuid)
  },
  send (data, config) {
    return API.post('/devicehistory/', data, config ?? {})
  }
}
