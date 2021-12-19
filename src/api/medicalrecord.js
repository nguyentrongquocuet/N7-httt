import axios from 'axios'
import { getToken } from '@/utils/auth'

const BASE_URL = 'http://localhost:8080/covid'

export function fetchList() {
  return axios.get(BASE_URL + '/patients', {
    headers: {
      'Authorization': getToken()
    }
  })
}

export function insert(patientData) {
  return axios.post(BASE_URL + '/patient', patientData, {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'application/json'
    }
  })
}
export function getPatientById(patientId) {
  return axios.get(BASE_URL + '/patient', {
    headers: {
      'Authorization': getToken()
    },
    params: {
      'id': patientId
    }
  })
}
export function updatePatient(patient) {
  return axios.put(BASE_URL + '/patient', patient, {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'application/json'
    }
  })
}

export function deletePatient(patientId) {
  return axios.delete(BASE_URL + '/patient', {
    headers: {
      'Authorization': getToken()
    },
    params: {
      'id': patientId
    }
  })
}
