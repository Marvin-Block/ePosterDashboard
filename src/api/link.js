import API from '@/plugins/api'

export default {
  fetchPart (offset, limit) {
    return API.get(`/link/${offset ?? 0}/${limit ?? 100}`)
  },
  fetchByUUID (uuid) {
    return API.get('/link/' + uuid)
  },
  update (body) {
    return API.put('/link/', body)
  },
  delete (uuid) {
    return API.delete('/link/' + uuid)
  },
  deleteBulk (data) {
    return API.delete('/link/bulk/', { data: { uuidList: data } })
  },
  send (data, config) {
    return API.post('/link/', data, config ?? {})
  }
}
