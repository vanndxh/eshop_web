<template>
  <el-carousel type="card" :interval="5000">
    <el-carousel-item>
      <img :height="height" :width="width" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0811%2F1f1f2c57fca83066fd7f4ad5751888f4.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624424206&t=cf329e43faeb3dc8d7beffbf41154cd6">
    </el-carousel-item>
      <el-carousel-item>
      <img :height="height" :width="width" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F38%2F49%2F5926cdbf536b8_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625828020&t=074dfd4a848f9bed6b3398b78bce7f87">
    </el-carousel-item>
    <el-carousel-item>
      <img :height="height" :width="width" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F10%2F20%2F1058082c16f04e1.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625828216&t=aabe0466fcaeb038e40f3857a5825d20">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "carousel",
  data(){
    return{
      width: 350,
      height: 260,
    }
  }
}
</script>
