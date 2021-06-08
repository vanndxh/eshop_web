<template>
  <el-carousel type="card" :interval="4000">
    <el-carousel-item v-for="item in 4" :key="item">
      <img width="500" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0811%2F1f1f2c57fca83066fd7f4ad5751888f4.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624424206&t=cf329e43faeb3dc8d7beffbf41154cd6">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "carousel"
}
</script>
