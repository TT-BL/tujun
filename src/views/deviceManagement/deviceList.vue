//设备列表
<template>
  <div class="device_list">
     <div class="header">
        <breadcrumb :breadcrumbItems="breadList"/>
    </div>
    <titleHeader titleName="账号管理" :showImg="false" :showBorder="false"></titleHeader>
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="设备号">
        <el-input v-model="form.id" placeholder="请输入ID号"></el-input>
      </el-form-item>
      <el-form-item label="运单号/箱号">
        <el-input v-model="form.danhao" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name" placeholder="请输入公司ID"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已启用" value="已启用"></el-option>
          <el-option label="未启用" value="未启用"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <div class="active_btn">
      <div class="btn">导出</div>
      <div class="btn delete_btn">删除</div>
    </div>
    <el-table stripe :data="tableData" style="width: 100%">
      <template slot="empty">
        <div class="empty_div">
          <img class="empty_img" src="@/assets/img/home/empty_img.png" alt="">
          <div class="empty_text">暂无数据</div>
        </div>
      </template>
      <el-table-column type="selection" width="55px"></el-table-column>
      <el-table-column prop="id" label="序号" width="60px"></el-table-column>
      <el-table-column prop="name" label="设备号"></el-table-column>
      <el-table-column prop="realName" label="运单号"></el-table-column>
      <el-table-column prop="email" label="箱号"></el-table-column>
      <el-table-column prop="phone" label="剩余电量"></el-table-column>
      <el-table-column prop="companyId" label="最新地理位置"></el-table-column>
      <el-table-column prop="status" label="最新上报时间"></el-table-column>
      <el-table-column prop="admin" label="状态">
        <template slot-scope="scope">
          <div class="status_div" v-if="scope.row.status == '已启用'">
            <div class="circle"></div>
            <div class="status_text">已启用</div>
          </div>
          <div class="status_div stop_div" v-if="scope.row.status == '已停用'">
            <div class="circle red_circle"></div>
            <div class="status_text">已启用</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="active_div">
            <div class="green" @click="goDetail(scope.row)">查看</div>
            <div class="red">停用</div>
          </div>
        </template>
      </el-table-column>
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
          name: "设备列表",
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
      tableData: [
        {
          id: '1399',
          name: '测试',
          realName: '赖露荣',
          email: '188009767@qq.com',
          phone: '19784199768',
          companyId: '途骏',
          status: '已启用',
          admin: '是',
					password: '111111111111111111',
          time: '2021-07-23 12:39',
          lastTime: '2021-07-23 12:39',
        }
      ],
    }
  },
  methods: {
    //点击详情
    goDetail() {
      this.$router.push({path: '/deviceManagement/deviceInfo'})
    },
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
  .active_btn{
    display: flex;
    margin: 18px 0 20px;
    .btn{
      width: 60px;
      height: 30px;
      border-radius: 4px;
      border: 1px solid #12C6C5;
      font-size: 16px;
      color: #12C6C5;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
    }
    .delete_btn{
      margin-left: 16px;
      border: 1px solid #E55050;
      color: #E55050;
    }
  }
}
</style>