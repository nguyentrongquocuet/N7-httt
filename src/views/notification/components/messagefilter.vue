<template>
  <el-card>
    <span slot="header">Lọc thông báo</span>
    <el-form ref="messageFilterForm" v-model="messageFilter" class="form-container">
      <el-form-item prop="city" label="Khu vực">
        <el-input v-model="messageFilter.city" placeholder="Chọn khu vực quan tâm" />
      </el-form-item>
      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item prop="fromDate" label="Từ ngày">
            <el-date-picker v-model="messageFilter.fromDate" placeholder="Chọn ngày bắt đầu" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="toDate" label="Đến ngày">
            <el-date-picker v-model="messageFilter.toDate" placeholder="Chọn ngày kết thúc" />
          </el-form-item>
        </el-col>
      </el-row>
      <div style="display: inline-block; float: right">
        <el-button type="primary">Lọc</el-button>
        <el-button>Xóa trắng</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'Messagefilter',
  data: () => {
    return {
      messageFilter: {
        city: '',
        fromDate: '',
        toDate: ''
      }
    }
  }
}
</script>

<style scoped>
*{
  font-family: "Times New Roman", sans-serif;
}
.form-container{
  padding-bottom: 40px;
}
</style>
