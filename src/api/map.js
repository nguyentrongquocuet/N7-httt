import axios from 'axios'

export function fetchData() {
  const url = 'http://localhost:7800/covid-support'
  const data = { 'RequestTo': 'PatientServer' }
  const config = { headers: { 'Content-Type': 'application/json' }}
  return axios.post(url, data, config)
}
