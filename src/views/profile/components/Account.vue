<template>
  <el-form>
    <el-form-item label="Tên">
      <el-input v-model="user.name" />
    </el-form-item>
    <el-form-item label="Giới tính">
      <el-input v-model="user.gender" />
    </el-form-item>
    <el-form-item label="Ngày sinh">
      <el-input v-model="user.dob" />
    </el-form-item>
    <el-form-item label="Số điện thoại">
      <el-input v-model="user.phoneNumber" />
    </el-form-item>
    <el-form-item label="Tài khoản Telegram">
      <el-input v-model="user.telegramUserName" />
    </el-form-item>
    <el-form-item label="Địa chỉ hiện tại">
      <el-input v-model="user.address" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Lưu</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          gender: '',
          dob: '',
          phoneNumber: '',
          telegramUserName: '',
          address: ''
        }
      }
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'Cập nhật thông tin thành công !',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
