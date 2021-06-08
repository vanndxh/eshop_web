<template>
  <el-menu :default-active="activeIndex" mode="horizontal">

    <el-menu-item index="1" @click="this.$router.push({path:'/home'})">
      主页
    </el-menu-item>

    <el-menu-item style="float: right" index="2" @click="onClickUser">
      用户管理
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
    };
  },
  methods: {
    onClickUser(){
      // 未登录
      if (this.$store.state.uid == null)
        this.$router.push({path:'/login'})
      else
        this.$router.push({path:'/user'})
    }
  },
}
</script>
