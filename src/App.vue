<template>
  <router-view />
</template>

<script>
import Cookies from 'js-cookie';
export default {
  // 设置cookie
  beforeMount() {
    let uid = Cookies.get('uid')
    if (token) {
      this.$store.state.uid = uid
    }
    let token = Cookies.get('token')
    if (token) {
      this.$store.state.token = token
      this.$store.state.axios.defaults.headers['Authorization'] = 'Bearer ' + token
    }
  }
}
</script>
