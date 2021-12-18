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
  const config = { headers: { 'Content-Type': 'application/json' }}
  return axios.post(url, data, config)
}

export function getInfo(token) {
  if (token.indexOf('token') < 0) {
    token = 'user-token'
  }
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}
/*
*   TODO: QUỐC ơi sau khi đăng nhập (có token rồi).
*   thì sẽ có tiếp request lấy thông tin người dùng
*   token được gửi lên theo header Authorization
*   m sửa lại cái url trỏ tới API lấy thông tin của m,
*   test bằng cách comment hàm getInfo trên đi và uncomment hàm dưới
*/
// export function getInfo(token) {
//   const url = ''
//   const config = { headers: { 'Authorization': token }}
//   return axios.get(url, config)
// }

export function getCheckInHistory(username) {
  const url = 'http://localhost:8080/check-in-history'
  const config = {}
  return axios.post(url, { username }, config)
}

export function logout() {
  return Promise.resolve()
}
