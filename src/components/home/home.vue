<template>
  <el-container>

    <el-header>
      <tab-bar />
    </el-header>

    <el-main style="background-color: #F5F5F5">
      <el-row>
        <el-col :span="16" :push="4">
          <carousel />
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
        </el-col>


        <el-col :span="8">
          <user-card />
        </el-col>
      </el-row>

      <book-list />
    </el-main>

  </el-container>
</template>

<script>
import tabBar from "@/components/common/tabBar";
import carousel from "@/components/home/carousel";
import userCard from "@/components/home/userCard";
import bookList from "@/components/home/bookList";
export default {
  components: {
    tabBar, carousel, userCard, bookList
  },
  data() {
    return {
    }
  }
};
</script>

