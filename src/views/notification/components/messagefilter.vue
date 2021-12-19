<template>
  <el-card>
    <span slot="header">Lọc thông báo</span>
    <el-form ref="messageFilterForm" v-model="messageFilter" class="form-container">
      <el-form-item prop="cities" label="Khu vực">
        <drag-select style="width: 100%; margin:0" @change="setCities"/>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import DragSelect from '@/views/notification/components/DragSelect'

export default {
  name: 'Messagefilter',
  components: {
    DragSelect
  },
  data: () => {
    return {
      messageFilter: {
        cities: ''
      }
    }
  },
  methods: {
    setCities(cities) {
      this.messageFilter.cities = cities
      this.$emit('searchMessageByCities', this.messageFilter.cities)
    },
    searchMessageByCities() {
      this.$emit('searchMessageByCities', this.messageFilter.cities)
    }
  }
}
</script>

<style scoped>
* {
  font-family: "Times New Roman", sans-serif;
}

.form-container {
  padding-bottom: 40px;
}
</style>
