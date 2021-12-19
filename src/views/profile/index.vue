<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user"/>
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Nơi đã đến" name="timeline">
                <timeline :timeline="user.timeline"/>
              </el-tab-pane>
              <el-tab-pane label="Tài khoản" name="account">
                <account :user="userInfoCanChange" @updateUserInfo="updateUserInfo"/>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Timeline from './components/Timeline'
import Account from './components/Account'
import { convertToYYYYMMDDFormat, getSimpleDate } from '@/utils/dateUtils'
import { deepClone } from '@/utils'

export default {
  name: 'Profile',
  components: { UserCard, Timeline, Account },
  data() {
    return {
      user: {},
      activeTab: 'timeline'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'gender',
      'dob',
      'phoneNumber',
      'telegramUsername',
      'telegramUid',
      'address',
      'checkInHistory'
    ]),
    userInfoCanChange() {
      return {
        name: this.user.name,
        gender: this.user.gender,
        dob: this.user.dob,
        phoneNumber: this.user.phoneNumber,
        telegramUsername: this.user.telegramUsername,
        telegramUid: this.user.telegramUid,
        address: this.user.address
      }
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        role: this.roles.join(' | '),
        avatar: this.avatar,
        name: this.name,
        gender: this.gender,
        dob: this.dob,
        phoneNumber: this.phoneNumber,
        telegramUsername: this.telegramUsername,
        telegramUid: this.telegramUid,
        address: this.address,
        timeline: this.checkInHistory
      }
      if (this.user.dob != null && this.user.dob !== '') {
        this.user.dob = getSimpleDate(this.user.dob)
      }
    },
    updateUserInfo(infoCanUpdate) {
      infoCanUpdate.dob = infoCanUpdate.dob != null && infoCanUpdate.dob.length > 0 ? convertToYYYYMMDDFormat(infoCanUpdate.dob) : ''
      this.$store.dispatch('user/updateUserInfo', infoCanUpdate).then(data => {
        console.log('response')
        console.log(data)
        this.$message({
          message: 'Cập nhật thông tin thành công !',
          type: 'success',
          duration: 5 * 1000
        })
        for (const prop of Object.keys(data)) {
          this.user[prop] = data[prop]
        }
        if (this.user.dob != null && this.user.dob !== '') {
          this.user.dob = getSimpleDate(this.user.dob)
        }
      })
    }
  }
}
</script>
