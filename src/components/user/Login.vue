<template>
  <tab-bar></tab-bar>
  <div style="margin-top: 150px">
    <el-row>
      <el-col :span="8" :push="8" align="center">

        <el-tabs v-model="activeName" type="border-card">
          <!--登录框验证-->
          <el-tab-pane label="登录" name="first">
            <br>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form>
          </el-tab-pane>

          <!--注册表单验证-->
          <el-tab-pane label="注册" name="second">
            <br>
            <el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="用户名" prop="username2">
                <el-input v-model="ruleForm2.username2" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass2">
                <el-input type="password" v-model="ruleForm2.pass2" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass2">
                <el-input type="password" v-model="ruleForm2.checkPass2" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="name2">
                <el-input v-model="ruleForm2.name2"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email2">
                <el-input v-model="ruleForm2.email2"></el-input>
              </el-form-item>
                <el-button type="primary" @click="submitForm2('ruleForm2')">注册</el-button>
            </el-form>


          </el-tab-pane>

        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import tabBar from "@/components/common/tabBar";
import Cookies from 'js-cookie';
export default {
  components:{
    tabBar
  },
  name: "Login",
  data() {
    let username = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    let password = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    let password2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass2 !== '') {
          this.$refs.ruleForm2.validateField('checkPass2');
        }
        callback();
      }
    };
    let checkPassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass2) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let name2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入昵称'));
      } else {
        callback();
      }
    };
    let email2 = (rule, value, callback) => {
      let isMatch = this.checkEmail(value);
      if (value === '') {
        callback(new Error('请输入邮箱~'));
      } else if (!isMatch) {
        callback(new Error('邮箱格式不正确~'));
      } else {
        callback();
      }
    };
    return {
      activeName: 'first',
      ruleForm: {
        username: '',
        pass: '',
      },
      ruleForm2: {
        username2: '',
        pass2: '',
        checkPass2: '',
        name2: '',
        email2: ''
      },
      rules: {
        username: [
          {validator: username, trigger: 'blur'}
        ],
        pass: [
          {validator: password, trigger: 'blur'}
        ],
        username2: [
          {validator: username, trigger: 'blur'}
        ],
        pass2: [
          {validator: password2, trigger: 'blur'}
        ],
        checkPass2: [
          {validator: checkPassword2, trigger: 'blur'}
        ],
        name2: [
          {validator: name2, trigger: 'blur'}
        ],
        email2: [
          {validator: email2, trigger: 'blur'}
        ],
      },
    }
  },
  methods: {
    //登录
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$store.state.axios({
            url: '/go/auth/',
            method: 'post',
            data:{
              Username: this.ruleForm.username,
              Password: this.ruleForm.pass,
            }
          }).then(r => {
            if (r.data.status === 200) {
              this.$store.state.pass = this.ruleForm.pass
              // 设置token和uid
              Cookies.set('uid', r.data['userID'])
              Cookies.set('token', r.data.token)
              Cookies.set('pass', this.ruleForm.pass)

              this.$store.state.uid = r.data['userID']
              this.$store.state.axios.defaults.headers['Authorization'] = 'Bearer ' + r.data.token
              // 设置cookie

              this.$alert('登录成功,即将自动跳转！', '提示', {
                type: 'success',
                confirmButtonText: '确定',
                center: false
              })
              setTimeout(()=>{
                this.$router.push({path:'/home'})
              }, 1500)
            }
          }).catch(()=>{
            this.$alert('用户名或密码错误！', '提示', {
              type: 'error',
              confirmButtonText: '确定',
              center: false
            })
          })
        } else {
          return false
        }
      })
    },
    //注册
    submitForm2() {
      this.$refs['ruleForm2'].validate((valid) => {
        if (valid) {
          this.$store.state.axios({
            url: '/go/newAuth',
            method: 'post',
            data:{
              Username: this.ruleForm2.username2,
              Password: this.ruleForm2.pass2,
              Name: this.ruleForm2.name2,
              Email: this.ruleForm2.email2
            }
          }).then(r => {
            if (r.data.status === 200) {
              //填充信息
              this.ruleForm.username = this.ruleForm2.username2
              this.ruleForm.pass = this.ruleForm2.pass2
              this.$alert('注册成功！', '提示', {
                type: 'success',
                confirmButtonText: '确定',
                center: false
              })
            }
          }).catch(() => {
            this.$alert('用户名或邮箱已存在！', '提示', {
              type: 'error',
              confirmButtonText: '确定',
              center: false
            })
          })
        } else {
          return false
        }
      })
    },
    checkEmail(value){
      let myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
      return myReg.test(value);
    },
  }
}
</script>

<style scoped>

</style>
