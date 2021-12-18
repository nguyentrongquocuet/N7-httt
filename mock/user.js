
const tokens = {
  admin: {
    token: 'admin-token'
  },
  user: {
    token: 'user-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Nông Văn Cương',
    gender: 'Nam',
    dob: '31/10/2000',
    phoneNumber: '0976338310',
    telegramUserName: 'Cuongnv7',
    address: 'Kí túc xá Đại học Ngoại Ngữ - ĐHQH Hà Nội',
    checkInHistory: [
      {
        timestamp: '2019/4/20',
        title: 'Circle K Phạm Văn Đồng',
        content: 'Ngồi tại tầng 2 trong 2h'
      },
      {
        timestamp: '2019/4/21',
        title: '319 Tower',
        content: 'Làm việc cả ngày tại tầng 9 của tòa'
      },
      {
        timestamp: '2019/4/22',
        title: 'Trường tiểu học Xuân Phương',
        content: 'Chơi cầu lông từ 20h - 22h'
      },
      {
        timestamp: '2019/4/23',
        title: 'Kí túc xá Ngoại Ngữ',
        content: 'Chơi cầu lông từ 17h - 19h'
      }
    ]
  },
  'user-token': {
    roles: ['user'],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Vũ Thị Hương',
    gender: 'Nữ',
    dob: '20/10/2000',
    phoneNumber: '0976338310',
    telegramUserName: 'vuthihuong',
    address: 'Minh Long - Hạ Lang - Cao Bằng',
    checkInHistory: [
      {
        timestamp: '2019/4/20',
        title: 'Circle K Phạm Văn Đồng',
        content: 'Ngồi tại tầng 2 trong 2h'
      },
      {
        timestamp: '2019/4/21',
        title: '319 Tower',
        content: 'Làm việc cả ngày tại tầng 9 của tòa'
      },
      {
        timestamp: '2019/4/22',
        title: 'Trường tiểu học Xuân Phương',
        content: 'Chơi cầu lông từ 20h - 22h'
      },
      {
        timestamp: '2019/4/23',
        title: 'Kí túc xá Ngoại Ngữ',
        content: 'Chơi cầu lông từ 17h - 19h'
      }
    ]
  }
}

module.exports = [
  // user login
  {
    url: '/vue-element-admin/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-element-admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
