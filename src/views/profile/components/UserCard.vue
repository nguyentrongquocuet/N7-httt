<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>Thông tin cá nhân</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello</div>
          {{ user.role }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-bio-section">
        <div class="user-bio-section-header"><span>Giới tính</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.gender }}
          </div>
        </div>
      </div>
      <div class="user-bio-section">
        <div class="user-bio-section-header"><span>Ngày sinh</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.dob }}
          </div>
        </div>
      </div>
      <div class="user-bio-section">
        <div class="user-bio-section-header"><span>Số điện thoại</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.phoneNumber }}
          </div>
        </div>
      </div>
      <div class="user-bio-section">
        <div class="user-bio-section-header"><span>Tài khoản Telegram</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.telegramUserName }}
          </div>
        </div>
      </div>
      <div class="user-bio-section">
        <div class="user-bio-section-header"><span>Địa chỉ hiện tại</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.address }}
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          role: '',
          avatar: '',
          name: '',
          gender: '',
          dob: '',
          phoneNumber: '',
          telegramUserName: '',
          address: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 0px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
