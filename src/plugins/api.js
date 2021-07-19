import axios from 'axios'

export default axios.create({
  baseURL: 'http://kodizabbix:3333/v2'
})
