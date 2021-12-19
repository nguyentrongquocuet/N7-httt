<template>
  <el-card shadow="hover" class="box-card">
    <div class="content">
      {{ this.message.content }}
    </div>
    <el-tag class="tag">{{ this.message.city }}</el-tag>
  </el-card>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      default: () => {
        return {
          city: '',
          content: '',
          date: ''
        }
      }
    }
  }
}
</script>

<style scoped>
*{
  font-family: "Times New Roman", sans-serif;
}
.box-card {
  margin-bottom: 6px;
  height: 50px;
  position: relative;
  background: linear-gradient(90deg, white 0%, #daffff 100%, white 50%);
}

.tag {
  margin: 0;
  position: absolute;
  right: 1%;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.content {
  color: black;
  font-size: smaller;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
