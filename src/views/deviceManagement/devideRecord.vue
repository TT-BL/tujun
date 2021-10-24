//设备上报记录
<template>
  <div class="device_list">
    <div class="header">
      <breadcrumb :breadcrumbItems="breadList"/>
    </div>
    <titleHeader titleName="设备上报记录" :showImg="false" :showBorder="false"></titleHeader>
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="设备ID">
        <el-input v-model="form.id" placeholder="请输入ID号"></el-input>
      </el-form-item>
      <el-form-item label="运单号">
        <el-input v-model="form.danhao" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="上报时间">
        <el-input v-model="form.name" placeholder="请输入公司ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <el-table stripe :data="tableData" style="width: 100%">
      <template slot="empty">
        <div class="empty_div">
          <img class="empty_img" src="@/assets/img/home/empty_img.png" alt="">
          <div class="empty_text">暂无数据</div>
        </div>
      </template>
      <el-table-column prop="id" label="序号" width="60px"></el-table-column>
      <el-table-column prop="name" label="设备ID"></el-table-column>
      <el-table-column prop="realName" label="运单号"></el-table-column>
      <el-table-column prop="email" label="地址"></el-table-column>
      <el-table-column prop="phone" label="纬度"></el-table-column>
      <el-table-column prop="companyId" label="经度"></el-table-column>
      <el-table-column prop="status" label="上报时间"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pages.pageNum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pages.pageSize"
      :total="pages.totalSize"
      layout="prev, pager, next,sizes, jumper">
    </el-pagination>
  </div>
</template>

<script>
import titleHeader from '@/components/titleHeader.vue'
import breadcrumb from '@/components/breadcrumb.vue'
export default {
  components: {
    titleHeader,breadcrumb
  },
  data() {
    return {
      breadList: [
        {
          name: "首页",
          router: "/homePage"
        },
        {
          name: "设备管理",
          router: "deviceList"
        },
        {
          name: "设备上报记录",
        },
      ],
      form: {
        id: "",
        danhao: "",
        name: "",
        status: "全部",
      },
      pages: {
        pageNum: 1,
        pageSize: 5,
        totalSize: 100
      },
      tableData: [],
    }
  },
  methods: {
    handleSizeChange() {

    },
    handleCurrentChange(){

    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/form_inline.scss';
@import '@/assets/css/table.scss';
.device_list{
  .header{
    margin-bottom: 30px;
  }
}
</style>