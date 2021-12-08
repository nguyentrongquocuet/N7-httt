<template>
  <div style="padding: 20px">
    <el-card class="box-card">
      <div slot="header">
        <span>Bệnh án</span>
        <el-button
          type="success"
          size="small"
          icon="el-icon-circle-plus-outline"
          style="float: right"
          @click="dialogVisible = true"
        >
          Thêm bệnh nhân
        </el-button>
      </div>
      <el-form ref="medicalRecordFormSearch" :model="formSearch">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="Mã bệnh nhân" prop="id">
              <el-input v-model="formSearch.id" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Địa chỉ" prop="address">
              <el-input v-model="formSearch.address" size="small" />
            </el-form-item>
          </el-col>
          <div style="float: right; margin-right: 10px">
            <el-button size="small" type="primary" icon="el-icon-search" :loading="searchingMedicalRecord" @click="searchMedicalRecord">Tìm kiếm
            </el-button>
            <el-button size="small" type="none" icon="el-icon-refresh-left" @click="resetMedicalRecordFormSearch">Xóa
            </el-button>
          </div>
        </el-row>
      </el-form>
      <el-table v-if="hasMedicalRecord" :data="medicalRecord" style="margin-top: 20px" border>
        <el-table-column prop="id" label="Mã" width="50" fixed align="center" />
        <el-table-column prop="name" label="Họ tên" width="150" fixed />
        <el-table-column prop="gender" label="Giới tính" width="80" />
        <el-table-column prop="dob" label="Ngày sinh" width="100" align="center" />
        <el-table-column prop="address" label="Địa chỉ" min-width="250" />
        <el-table-column prop="status" label="Tình trạng" min-width="250" />
        <el-table-column prop="confirmedDate" label="Ngày mắc" width="100" align="center" />
        <el-table-column fixed="right" label="Thao tác" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="warning" size="small" circle icon="el-icon-edit" />
            <el-button type="danger" size="small" circle icon="el-icon-delete" />
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="Thêm bệnh nhân mới" :visible.sync="dialogVisible" width="70vw">
        <el-form ref="patientForm" :model="patientForm">
          <el-row :gutter="15">
            <el-col :span="12">
              <el-form-item label="Căn cước công dân">
                <el-input v-model="patientForm.personId" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Mã bệnh nhân">
                <el-input v-model="patientForm.id" size="small" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="12">
              <el-form-item label="Họ tên">
                <el-input v-model="patientForm.name" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Trạng thái">
                <el-input v-model="patientForm.status" size="small" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="6">
              <el-form-item label="Giới tính">
                <el-select v-model="patientForm.gender" placeholder="giới tính">
                  <el-option label="Nam" value="Nam" />
                  <el-option label="Nữ" value="Nữ" />
                  <el-option label="Khác" value="Khác" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Ngày sinh">
                <!--                <el-date-picker-->
                <!--                  v-model="patientForm.dob"-->
                <!--                  type="date"-->
                <!--                  placeholder="date of birth">-->
                <!--                </el-date-picker>-->
                <el-input v-model="patientForm.dob" size="small" placeholder="ngày / tháng / năm" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Ngày xác nhận" style="display: inline-block">
                <!--                <el-date-picker-->
                <!--                  v-model="patientForm.confirmedDate"-->
                <!--                  type="date"-->
                <!--                  placeholder="confirmed date">-->
                <!--                </el-date-picker>-->
                <el-input v-model="patientForm.confirmedDate" size="small" placeholder="ngày / tháng / năm" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="12">
              <el-form-item label="Địa chỉ">
                <el-input v-model="patientForm.address" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Kiểu mắc" style="display: inline-block">
                <el-select v-model="patientForm.type" placeholder="Chọn kiểu mắc">
                  <el-option value="Cộng đồng" label="Trong cộng đồng" />
                  <el-option value="Khu cách ly" label="Trong Khu cách ly" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="Lịch sử dịch tễ">
              <el-input
                v-model="patientForm.details"
                type="textarea"
                placeholder="Nhập lịch sử dịch tễ của bệnh nhân"
                :autosize="{ minRows: 4, maxRows: 10}"
              />
            </el-form-item>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button icon="el-icon-circle-close" @click="resetPatientRecordForm">Cancel</el-button>
          <el-button type="primary" icon="el-icon-s-promotion" :loading="creatingPatientRecord" @click="createPatientRecord">Confirm</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { fetchList, insert } from '@/api/medicalrecord'
import { getSimpleDate, convertToYYYYMMDDFormat } from '@/utils/dateUtils'

export default {
  name: 'Index',
  data() {
    return {
      total: 0,
      formSearch: {
        id: '',
        address: '',
        page: 0,
        pageSize: 10
      },
      medicalRecord: [],
      patientForm: {
        id: '',
        diseaseId: 'covid-19',
        personId: '',
        name: '',
        gender: '',
        dob: '',
        address: '',
        status: '',
        confirmedDate: '',
        details: '',
        type: ''
      },
      dialogVisible: false,
      searchingMedicalRecord: false,
      creatingPatientRecord: false
    }
  },
  computed: {
    hasMedicalRecord() {
      return this.medicalRecord.length > 0
    }
  },
  methods: {
    onCloseDialog() {
      this.$refs['patientForm'].resetFields()
    },
    resetMedicalRecordFormSearch() {
      this.$refs['medicalRecordFormSearch'].resetFields()
      this.medicalRecord = []
    },
    createPatientRecord() {
      const patientRecord = `{
        "confirmedDate": "${convertToYYYYMMDDFormat(this.patientForm.confirmedDate)}",
        "diseaseId": "covid-19",
        "id": "${this.patientForm.id}",
        "person":{
          "address": "${this.patientForm.address}",
          "id": "${this.patientForm.personId}",
          "dateOfBirth": "${convertToYYYYMMDDFormat(this.patientForm.dob)}",
          "gender": "${this.patientForm.gender}",
          "name": "${this.patientForm.name}"
        },
        "status": "${this.patientForm.status}",
        "type": "${this.patientForm.type}",
        "detail": "${this.patientForm.details}"
      }`
      console.log(patientRecord)
      this.creatingPatientRecord = true
      insert(patientRecord)
        .then(message => {
          console.log(message)
          this.$message.success('Thêm thành công !')
          this.$refs['patientForm'].resetFields()
          this.onSearch()
        })
        .catch(err => {
          console.log(err)
          this.$message.error('Lỗi khi thêm !')
        })
        .finally(() => {
          this.creatingPatientRecord = false
        })
    },
    resetPatientRecordForm() {
      this.dialogVisible = false
      setTimeout(() => {
        this.patientForm = {
          id: '',
          diseaseId: 'covid-19',
          personId: '',
          name: '',
          gender: '',
          dob: '',
          address: '',
          status: '',
          confirmedDate: '',
          type: '',
          details: ''
        }
        this.creatingPatientRecord = false
      }, 200)
    },
    searchMedicalRecord() {
      console.log('search medical record, search data: ')
      console.log(this.formSearch)
      this.onSearch()
    },
    onSearch() {
      this.searchingMedicalRecord = true
      fetchList()
        .then(response => {
          const data = response.data
          console.log(data)
          this.medicalRecord = data.map(record => {
            return {
              id: record.id,
              name: record.person.name,
              gender: record.person.gender,
              dob: getSimpleDate(record.person.dateOfBirth),
              address: record.person.address,
              status: record.status,
              confirmedDate: getSimpleDate(record.confirmedDate)
            }
          })
        })
        .catch(error => {
          console.log(error)
          this.$message.error('Lỗi tải dữ liệu bệnh nhân !')
        })
        .finally(() => {
          this.searchingMedicalRecord = false
        })
    }
  }
}
</script>
<style scoped>

</style>
<!--this.medicalRecord = [-->
<!--{-->
<!--id: 1,-->
<!--name: 'Nông văn cương',-->
<!--gender: 'Nam',-->
<!--dob: '31-10-2000',-->
<!--address: 'Kí túc xá ngoại ngữ - Đại học quốc gia Hà Nội',-->
<!--status: 'Bình thường, không có biểu hiện triệu chứng',-->
<!--confirmedDate: '21-11-2021'-->
<!--},-->
<!--{-->
<!--id: 1,-->
<!--name: 'Nông văn cương',-->
<!--gender: 'Nam',-->
<!--dob: '31-10-2000',-->
<!--address: 'Kí túc xá ngoại ngữ - Đại học quốc gia Hà Nội',-->
<!--status: 'Bình thường, không có biểu hiện triệu chứng',-->
<!--confirmedDate: '21-11-2021'-->
<!--},-->
<!--{-->
<!--id: 1,-->
<!--name: 'Nông văn cương',-->
<!--gender: 'Nam',-->
<!--dob: '31-10-2000',-->
<!--address: 'Kí túc xá ngoại ngữ - Đại học quốc gia Hà Nội',-->
<!--status: 'Bình thường, không có biểu hiện triệu chứng',-->
<!--confirmedDate: '21-11-2021'-->
<!--},-->
<!--{-->
<!--id: 1,-->
<!--name: 'Nông văn cương',-->
<!--gender: 'Nam',-->
<!--dob: '31-10-2000',-->
<!--address: 'Kí túc xá ngoại ngữ - Đại học quốc gia Hà Nội',-->
<!--status: 'Bình thường, không có biểu hiện triệu chứng',-->
<!--confirmedDate: '21-11-2021'-->
<!--},-->
<!--{-->
<!--id: 1,-->
<!--name: 'Nông văn cương',-->
<!--gender: 'Nam',-->
<!--dob: '31-10-2000',-->
<!--address: 'Kí túc xá ngoại ngữ - Đại học quốc gia Hà Nội',-->
<!--status: 'Bình thường, không có biểu hiện triệu chứng',-->
<!--confirmedDate: '21-11-2021'-->
<!--}-->
<!--]-->
