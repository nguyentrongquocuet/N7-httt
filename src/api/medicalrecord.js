import axios from 'axios'

const BASE_URL = 'http://localhost:8080/covid'

export function fetchList() {
  return axios.get(BASE_URL + '/patients')
}

export function fetchData() {
  // return axios.get('http://localhost:7800/covid/patients')
  const url = 'http://localhost:7800/covid-support'
  const data = { 'RequestTo': 'PatientServer' }
  const config = { headers: { 'Content-Type': 'application/json' }}
  return axios.post(url, data, config)
}

export function insert(patientData) {
  return axios.post(BASE_URL + '/patient', patientData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

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

