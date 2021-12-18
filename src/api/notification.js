import axios from 'axios'

export function sendMessage(data) {
  const url = 'http://localhost:7800/covid-support'
  data = {
    ...data,
    'RequestTo': 'NotificationServer'
  }
  console.log(data)
  const config = { headers: { 'Content-Type': 'application/json' }}
  return axios.post(url, data, config)
}
