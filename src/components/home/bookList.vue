<template>
  <div style="width: 70%; margin-left: 15%; margin-top: 5%">
    <el-row>
      <el-tag>选择书本类别</el-tag>
      <el-select v-model="value" placeholder="选择分类" size="small">
        <el-option @click="cateID=i.id" v-for="i in options" :key="i.id" :label="i.name" :value="i.id" />
      </el-select>
      &emsp;
      <el-check-tag :checked="hot===1" @click="hot=1">评分降序</el-check-tag>
      <el-check-tag :checked="hot===-1" @click="hot=-1">评分升序</el-check-tag>
    </el-row>

    <el-table :data="data" stripe>
      <el-table-column label="书本信息">
        <el-table-column prop="bookName" label="书名" width="350" />
        <el-table-column prop="author" label="作者" width="200" />
        <el-table-column prop="cate" label="分类" width="160" />
      </el-table-column>

      <el-table-column label="热度">
        <el-table-column prop="star" label="评分" width="100">
          <template #default="scope">
            {{ scope.row.star }}
          </template>
        </el-table-column>
        <el-table-column prop="sell" label="已售" width="100" />
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="goto(scope.row.id)" size="small" type="primary" plain>查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        layout="prev, pager, next"
        @current-change="pageChange"
        :total="counts" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{name: '不选择', id:''}],
      value: '',
      hot: 1,
      counts: 0,
      page: 1,
      data: [],
      cateID: '',
    }
  },
  mounted() {
    this.getCategory()
    this.getBooks()
  },
  watch:{
    hot(){
      this.getBooks()
    },
    cateID(){
      this.getBooks()
    }
  },
  methods:{
    getStar(s){
      return s/2
    },
    getCategory(){
      this.$store.state.axios({
        url: '/go/categories/',
        method: 'get'
      }).then(r => {
        r.data.data.forEach(i => {
          this.options.push({name: i.name, id: i.id})
        })
      })
    },
    getBooks(i){
      this.$store.state.axios({
        url: '/go/book/',
        method: 'get',
        params: {
          category: this.cateID,
          hot: this.hot,
          page: i ? (i.page ? i.page : 1) : 1
        },
      }).then(r => {
        this.counts = r.data['all books count']
        this.data = []
        r.data.data.forEach(i => {
          this.data.push({
            id:i.ID, bookName: i.Name, author: i.Author, cate: i.Category, sell: i.PayNumber, star: i.Star,
          })
        })
      })
    },
    pageChange(i){
      this.getBooks({page: i})
    },
    goto(id){
      this.$router.push({path:'/items/' + id})
    }
  }
}
</script>
