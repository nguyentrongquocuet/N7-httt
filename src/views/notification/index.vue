<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><strong>THÔNG BÁO</strong></span>
        <div style="float: right">
          <el-button v-if="!checkPermission(['admin'])" size="small" type="success" icon="el-icon-message">Đăng ký nhận
            thông báo
          </el-button>
          <el-button
            v-if="checkPermission(['admin'])"
            size="small"
            type="success"
            icon="el-icon-edit"
            @click="dialogVisible= true"
          >
            Gửi thông báo
          </el-button>
        </div>
      </div>
      <div class="content">
        <div class="left-container">
          <message v-for="(message, index) in this.messages" :key="index" :message="message" />
        </div>
        <div class="right-container">
          <message-filter @messageFilter="this.filterMessage" />
        </div>
      </div>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" title="Thông báo mới">
      <el-form v-model="messageForm">
        <el-form-item prop="cities" label="Tới Thành phố">
          <drag-select style="width: 100%; margin:0" @change="setCities" />
        </el-form-item>
        <el-form-item prop="receiver" label="Tới mã Telegram người dùng">
          <el-input v-model="messageForm.receiver" />
        </el-form-item>
        <el-form-item prop="content" label="Nội dung">
          <el-input v-model="messageForm.content" type="textarea" :autosize="{minRows: 4, maxRows:10}" />
        </el-form-item>
      </el-form>
      <slot slot="footer">
        <el-button icon="el-icon-circle-close" @click="resetMessageForm">Cancel</el-button>
        <el-button type="primary" icon="el-icon-s-promotion" :loading="sendMessageProcessing" @click="sendMessage">
          Send
        </el-button>
      </slot>
    </el-dialog>
  </div>
</template>

<script>
import message from '@/views/notification/components/message'
import MessageFilter from '@/views/notification/components/messagefilter'
import DragSelect from '@/views/notification/components/DragSelect'
import checkPermission from '@/utils/permission'
import { sendMessage } from '@/api/notification'

export default {
  name: 'Index',
  components: {
    MessageFilter,
    message,
    DragSelect
  },
  data: () => {
    return {
      messages: [],
      dialogVisible: false,
      messageForm: {
        receiver: '',
        cities: [],
        content: ''
      },
      sendMessageProcessing: false
    }
  },
  created() {
    this.messages = [
      {
        city: 'Hà Nội',
        content: 'Tìm người tới các địa điểm',
        date: '05-12-2021'
      },
      {
        city: 'Bắc Giang',
        content: 'Triển khai tiêm mũi thứ 3 cho toàn bộ người dân',
        date: '05-12-2021'
      },
      {
        city: 'Hà Quảng',
        content: 'Cấp thuốc điều trị tại nhà cho những người đủ điều kiện',
        date: '05-12-2021'
      },
      {
        city: 'Cao Bằng',
        content: 'Thông báo tạm dừng các chuyến xe liên tỉnh, tạm dừng các hoạt động không thiết yếu',
        date: '05-12-2021'
      },
      {
        city: 'Hà Nội',
        content: 'Tìm người tới các địa điểm',
        date: '05-12-2021'
      },
      {
        city: 'Bắc Giang',
        content: 'Triển khai tiêm mũi thứ 3 cho toàn bộ người dân',
        date: '05-12-2021'
      },
      {
        city: 'Hà Quảng',
        content: 'Cấp thuốc điều trị tại nhà cho những người đủ điều kiện',
        date: '05-12-2021'
      },
      {
        city: 'Cao Bằng',
        content: 'Thông báo tạm dừng các chuyến xe liên tỉnh, tạm dừng các hoạt động không thiết yếu',
        date: '05-12-2021'
      }
    ]
  },
  methods: {
    checkPermission,
    filterMessage(filterConditions) {
      console.log('start filter message')
      console.log(filterConditions)
    },
    sendMessage() {
      this.sendMessageProcessing = true
      sendMessage({
        uid: this.messageForm.receiver * 1,
        content: this.messageForm.content
      }).then(response => {
        console.log(response)
        this.resetMessageForm()
        this.$message({
          message: 'Gửi thành công !',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          message: 'Lỗi khi gửi thông báo !',
          type: 'error'
        })
      })
        .finally(() => {
          this.sendMessageProcessing = false
        })
    },
    resetMessageForm() {
      this.dialogVisible = false
      setTimeout(() => {
        this.messageForm = {
          receiver: '',
          content: ''
        }
        this.sendMessageProcessing = false
      }, 200)
    },
    setCities(cities) {
      console.log('change cities')
      console.log(cities)
      this.messageForm.cities = cities
    }
  }
}
</script>

<style scoped>
.box-card {
  margin: 10px;
}

.content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.left-container {
  width: 45vw;
  height: 80vh;
  display: inline-block;
  padding-bottom: 50px;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.left-container::-webkit-scrollbar { /* WebKit */
  width: 0px;
}

.right-container {
  width: 40vw;
  height: 80vh;
  display: inline-block;
}
</style>
