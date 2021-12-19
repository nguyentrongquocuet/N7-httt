import axios from 'axios'
import { getToken } from '@/utils/auth'
export function getCities() {
  return axios.get('http://localhost:8080/city/all', {
    headers: {
      'Authorization': getToken()
    }
  })
}
// export function sendMessage(data) {
//   const url = 'http://localhost:7800/covid-support'
//   data = {
//     ...data,
//     'RequestTo': 'NotificationServer'
//   }
//   console.log(data)
//   const config = { headers: { 'Content-Type': 'application/json' }}
//   return axios.post(url, data, config)
// }
export function sendMessage(data) {
  return axios.post('http://localhost:8080/message', data, {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'application/json'
    }
  })
}

export function sendTelegramMessage(data) {
  return axios.post('http://localhost:1872/api/send_text', data)
}

export function getMessages() {
  return axios.get('http://localhost:8080/message/all', {
    headers: {
      'Authorization': getToken()
    }
  })
}
export function getSubscribeCities() {
  return axios.get('http://localhost:8080/message/subscribe', {
    headers: {
      'Authorization': getToken()
    }
  })
}
export function updateSubscribeCities(data) {
  return axios.post('http://localhost:8080/message/subscribe', data, {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'application/json'
    }
  })
}
