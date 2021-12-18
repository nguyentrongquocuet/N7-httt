<template>
  <div class="components-container">
    <el-drag-select v-model="value" style="width:100%;" multiple placeholder="Chọn thành phố" @input="validateInput">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-drag-select>

    <div style="margin-top:30px;">
      <el-tag v-for="item of value" :key="item" style="margin-right:15px;">
        {{ item }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import ElDragSelect from '@/components/DragSelect' // base on element-ui

export default {
  name: 'DragSelectDemo',
  components: { ElDragSelect },
  data() {
    return {
      value: [],
      options: enrichCityName()
    }
  },
  methods: {
    validateInput(cities) {
      if (this.isOptionAllCity(cities[cities.length - 1])) {
        this.value.splice(0, cities.length - 1)
      } else if (this.isOptionAllCity(cities[0])) {
        this.value.splice(0, 1)
      }
      this.$emit('change', this.value)
    },
    isOptionAllCity(city) {
      return city != null && city.toLowerCase() === 'Tất cả'.toLowerCase()
    }
  }
}

function enrichCityName() {
  const options = []
  options.push({
    value: 'Tất cả',
    label: 'Tất cả'
  })
  options.push(...CITIES.map(cityName => {
    return {
      value: cityName,
      label: cityName
    }
  }))
  console.log(options)
  return options
}

const CITIES = [
  'An Giang',
  'Kon Tum',
  'Bà Rịa – Vũng Tàu',
  'Lai Châu',
  'Bắc Giang',
  'Lâm Đồng',
  'Bắc Kạn',
  'Lạng Sơn',
  'Bạc Liêu',
  'Lào Cai',
  'Bắc Ninh',
  'Long An',
  'Bến Tre',
  'Nam Định',
  'Bình Định',
  'Nghệ An',
  'Bình Dương',
  'Ninh Bình',
  'Bình Phước',
  'Ninh Thuận',
  'Bình Thuận',
  'Phú Thọ',
  'Cà Mau',
  'Phú Yên',
  'Cần Thơ',
  'Quảng Bình',
  'Cao Bằng',
  'Quảng Nam',
  'Đà Nẵng',
  'Quảng Ngãi',
  'Đắk Lắk',
  'Quảng Ninh',
  'Đắk Nông',
  'Quảng Trị',
  'Điện Biên',
  'Sóc Trăng',
  'Đồng Nai',
  'Sơn La',
  'Đồng Tháp',
  'Tây Ninh',
  'Gia Lai',
  'Thái Bình',
  'Hà Giang',
  'Thái Nguyên',
  'Hà Nam',
  'Thanh Hóa',
  'Hà Nội',
  'Thừa Thiên Huế',
  'Hà Tĩnh',
  'Tiền Giang',
  'Hải Dương',
  'TP Hồ Chí Minh',
  'Hải Phòng',
  'Trà Vinh',
  'Hậu Giang',
  'Tuyên Quang',
  'Hòa Bình',
  'Vĩnh Long',
  'Hưng Yên',
  'Vĩnh Phúc',
  'Khánh Hòa',
  'Yên Bái',
  'Kiên Giang'
]
</script>
