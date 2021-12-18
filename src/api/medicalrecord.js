import axios from 'axios'
import { getToken } from '@/utils/auth'

const BASE_URL = 'http://localhost:8080/covid'

export function fetchList() {
  console.log(getToken())
  return axios.get(BASE_URL + '/patients', {
    headers: {
      'Authorization': getToken()
    }
  })
}

export function insert(patientData) {
  return axios.post(BASE_URL + '/patient', patientData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

