<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  props: {
    timeline: {
      type: Array,
      default: () => {
        return [
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
  }
}
</script>
