<template>
  <tabBar></tabBar>
  <el-row>
    <el-col :span="16" :push="4">
      <el-tabs tab-position="left" style="height: 100%;" align="center">
        <!--个人信息-->
        <el-tab-pane label="个人信息">
          <!--头像-->
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="80" :src="urlPortrait"></el-avatar>
            </div>
          </div>
          <h1 style="font-family: 华文行楷">{{ info.Name }}</h1>
          <!--主要内容-->
          <div>
            <el-row>
              <el-col :span="18" :push="3">
                <el-descriptions class="margin-top" title="" :column="1" :size="''" border>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-s-custom"></i>
                      用户名
                    </template>
                    {{ info.Username }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-user"></i>
                      昵称
                    </template>
                    <el-input v-model="info.Name" :disabled="disable" style="width: 80%" id="nameInput"></el-input>
                    <el-button size="medium" type="primary" @click="changeName" id="changeName" plain>
                      {{ changeNameButton }}
                    </el-button>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-tickets"></i>
                      密码
                    </template>
                    <el-input type="password" v-model="info.Password" :disabled="disable2" style="width: 80%"
                              id="passwordInput"></el-input>
                    <el-button size="medium" type="primary" @click="changePassword" plain>
                      {{ changePasswordButton }}
                    </el-button>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-message"></i>
                      邮箱
                    </template>
                    {{ info.Mail }}
                  </el-descriptions-item>
                </el-descriptions>
                <br>
                <el-button type="danger" @click="logout">退出登录</el-button>
              </el-col>
            </el-row>
          </div>
          <br>
        </el-tab-pane>

        <!--购物车-->
        <el-tab-pane label="购物车">
          <h4>购物车</h4>
          <el-card v-for="(item,index) in carts" :key="item">
            <el-row>
              <el-col :span="4">
                <img :src="bookPic" alt="bookPic" style="width: 180px; height: 180px;">
              </el-col>
              <el-col :span="18" :push="1">
                <el-descriptions class="margin-top" title="商品详情" :column="2" :size="''" border>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-s-management"></i>
                      书本名称
                    </template>
                    {{ item.name }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-s-custom"></i>
                      书本作者
                    </template>
                    {{ item.author }}
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template #label>
                      <i class="el-icon-shopping-cart-2"></i>
                      书本售价
                    </template>
                    ￥{{ item.price }}
                  </el-descriptions-item>
                </el-descriptions>
                <br>
                <!--其他按钮操作-->
                <el-row>
                  <el-col :span="4" :push="16">
                    <el-button type="primary" plain size="small"
                               @click="$router.push({path: '/items/' + item.id})">
                      查看详情</el-button>
                  </el-col>
                  <el-col :span="4" :push="16">
                    <el-button type="danger" plain @click="removeTrolley(index)" size="small">移除购物车</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-tab-pane>

        <!--评论-->
        <el-tab-pane label="历史评论">
          <h4>历史评论</h4>
          <!--评论区-->
          <el-card shadow="hover" class="item" v-for="(item,index) in comments" :key="item" align="left">
            <el-row>
              <el-col :span="1">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                           size="small"></el-avatar>
              </el-col>
              <el-col :span="4" style="margin-top: 6px">
                <h4 style="margin-top: 2px">{{ item.UserID }}</h4>
              </el-col>
              <el-col :span="8" style="margin-top: 6px">
                <el-rate
                    v-model="item.Star"
                    disabled
                    show-score
                    text-color="#ff9900">
                </el-rate>
              </el-col>
            </el-row>
            <p class="c">{{ item.Content }}</p>
            <div align="right">
              <el-button type="primary" plain size="small"
                         @click="$router.push({path: '/items/' + item.BookID})">
                查看详情</el-button>
              <el-button v-if="info.username === 'vanndxh'" size="small" type="danger" plain
                         @click="deleteComments(index)">删除
              </el-button>
            </div>
          </el-card>

        </el-tab-pane>

      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import tabBar from "@/components/common/tabBar";
import {ElMessage} from "element-plus";
import Cookies from 'js-cookie'

export default {
  name: "Mine",
  components: {
    tabBar
  },
  setup() {
    let id = 1
    return {
      id
    }
  },
  data() {
    return {
      urlPortrait: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2178438322,2539713157&fm=26&gp=0.jpg",
      bookPic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1017432341,1254182363&fm=224&gp=0.jpg',
      comments: [],
      carts: [],
      info: {
        Name: 'vanndxh',
        Password: '',
        Username: 'van能的小黑',
        Email: '1025196468@qq.com',

      },
      disable: true,
      disable2: true,
      changeNameButton: '修改名称',
      changePasswordButton: '修改密码',
    }
  },
  mounted() {
    this.getInfo()
    this.getCarts()
    this.getComments()
  },
  methods: {
    getInfo(){
      this.$store.state.axios({
        url: '/go/auth/',
        method: 'get',
      }).then(r => {
        this.info = r.data.data
        this.info.Password = this.$store.state.pass
        this.info.Email = r.data.data.Mail
      })
    },
    logout() {
      this.$confirm('确认要退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Cookies.set('uid', undefined)
        Cookies.set('token', undefined)
        this.$store.state.uid = null
        this.$store.state.axios.defaults.headers['Authorization'] = ''
        this.$router.push({path: '/home'})
      })
    },
    getCarts() {
      this.$store.state.axios({
        url: '/go/carts/',
        method: 'get',
      }).then(r => {
        this.carts = r.data.data
      })
    },
    getComments() {
      this.comments = []
      for (let page=1; page<10 ;page++) {
        this.$store.state.axios({
          url: '/go/comments/',
          method: 'get',
          params: {page: page}
        }).then(r => {
          if (r.data.data.length === 0) {
            return
          }
          r.data.data.forEach(i => {
            if (i.UserID == this.$store.state.uid) {
              i.Star = i.Star / 2
              this.comments.push(i)
            }
          })
        })
      }
    },
    deleteComments(index) {
      this.$store.state.axios({
        url: '/go/comments/' + this.comments[index].ID,
        method: 'delete',
        // eslint-disable-next-line no-unused-vars
      }).then(r => {
        ElMessage.success({
          message: '恭喜你，评论已删除!',
          type: 'success'
        })
        this.getComments()
      })
    },
    changePassword() {
      if (this.disable2 === true) {
        this.disable2 = false;
        this.changePasswordButton = "保存";
      } else {
        this.disable2 = true;
        this.changePasswordButton = "修改密码";
        this.$store.state.axios({
          url: '/go/auth/' + this.$store.state.uid,
          method: 'put',
          data: this.info
        }).then(r => {
          console.log(r.data)
          this.$notify({
            title: '提示',
            message: '修改成功！',
            type: 'success',
            duration: 1500,
          });
        })
      }
    },
    changeName() {
      if (this.disable === true) {
        this.disable = false;
        this.changeNameButton = "保存";
      } else {
        this.disable = true;
        this.changeNameButton = "修改名称";

        this.$store.state.axios({
          url: '/go/auth/' + this.$store.state.uid,
          method: 'put',
          data: this.info
        }).then(r => {
          console.log(r.data)
          this.$notify({
            title: '提示',
            message: '修改成功！',
            type: 'success',
            duration: 1500,
          });
        })
      }
    },
    removeTrolley(index) {
      this.$store.state.axios({
        url: '/go/carts/' + this.carts[index].id,
        method: 'delete',
      }).then(r => {
        if (r.data.status === 200) {
          ElMessage.success({
            message: '恭喜你，已经成功从购物车删除!',
            type: 'success'
          })
          this.getCarts()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
