import request from '@/utils/request'
import axios from 'axios'

// export function login(data) {
//   return request({
//     url: '/vue-element-admin/user/login',
//     method: 'post',
//     data
//   })
// }

/*
*   TODO: QUỐC ơi khi đăng nhập sẽ gọi tới hàm này.
*   m sửa lại cái url='http://localhost:8080/login'
*   trỏ tới API đăng nhập của m nhé
*   response trả về chỉ cần token: 'mã token'
*/
export function login(data) {
  const url = 'http://localhost:8080/login'
  const config = { headers: { 'Content-Type': 'application/json' } }
  return axios.post(url, data, config)
}

// export function getInfo(token) {
//   if (token.indexOf('token') < 0) {
//     token = 'admin-token'
//   }
//   return request({
//     url: '/vue-element-admin/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function getInfo(token) {
  const url = 'http://localhost:8080/user'
  const config = { headers: { 'Authorization': token } }
  return axios.get(url, config)
}

/*
* //TODO: Quốc ơi updateUserInfo cập nhật thông tin cá nhân của user
*    thông tin có thể cập nhật được
*user {
* name:
* gender:
* dob:
* phoneNumber:
* telegramUserName:
* address:
* }
* trả về thông tin user sau khi cập nhật giống như getUserInfo,
* khi test thì comment hàm updateUserInfo bên dưới lại và uncomment hàm trên
* */
export function updateUserInfo(token, infoCanUpdate) {
  console.log('sending update user info: ')
  console.log(infoCanUpdate)
  const url = 'http://localhost:8080/user'
  const config = { headers: { 'Authorization': token } }
  return axios.put(url, infoCanUpdate, config)
}

//
// export function updateUserInfo(token, infoCanUpdate) {
//   console.log('sending update user info: ')
//   console.log(infoCanUpdate)
//   return Promise.resolve({ data: infoCanUpdate })
// }

export function getCheckInHistory(username) {
  const url = 'http://localhost:8080/check-in-history'
  const config = {}
  return axios.post(url, { username }, config)
}

export function signup(data) {
  const url = 'http://localhost:8080/registration'
  const config = {}
  return axios.post(url, data, config)
}

export function logout() {
  return Promise.resolve()
}
