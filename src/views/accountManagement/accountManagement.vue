// 账号管理
<template>
  <div class="account">
    <div class="header">
      <breadcrumb :breadcrumbItems="breadList"/>
      <div class="add_acount" @click="addCount">
        <img class="add_img" src="@/assets/img/home/add_acount.png" alt="">添加账号
      </div>
    </div>
    <titleHeader titleName="账号管理" :showImg="false" :showBorder="false"></titleHeader>
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="ID">
        <el-input v-model="form.id" placeholder="请输入ID号"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="公司ID">
        <el-input v-model="form.companyId" placeholder="请输入公司ID"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="已启用" value="已启用"></el-option>
          <el-option label="未启用" value="未启用"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理员">
        <el-select v-model="form.role" placeholder="请选择状态">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker v-model="form.date" type="date" placeholder="日期"></el-date-picker>
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
      <el-table-column prop="id" label="ID" width="60px"></el-table-column>
      <el-table-column prop="name" label="登录名"></el-table-column>
      <el-table-column prop="realName" label="真实姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="120px"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="companyId" label="公司ID"></el-table-column>
      <el-table-column prop="status" label="状态" class="select_min">
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
      <el-table-column prop="admin" label="管理员" width="70px" class="select_min"></el-table-column>
      <el-table-column prop="time" label="创建时间"></el-table-column>
      <el-table-column prop="lastTime" label="最后登录时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="active_div">
            <div class="green">查看</div>
            <div class="green" @click="addCount(scope.row)">编辑</div>
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
    <addAccount v-if="accountShow" :accountData="accountData" @closePop="closePop"/>
  </div>
</template>

<script>
import titleHeader from '@/components/titleHeader.vue'
import breadcrumb from '@/components/breadcrumb.vue'
import addAccount from './accountBox/addAccount.vue'
export default {
  components: {
    titleHeader,breadcrumb,addAccount
  },
  data() {
    return {
      breadList: [
        {
          name: "首页",
          router: "/homePage"
        },
        {
          name: "账号管理",
          router: "accountManagement"
        },
        {
          name: "账号列表",
        },
      ],
      form: {
        id: "",
        name: "",
        companyId: "",
        status: "全部",
        role: "全部",
        date: "",
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
        },
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
        },
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
        },
      ],
      accountData: {},
      accountShow: false
    }
  },
  methods: {
    closePop() {
      this.accountShow = false;
    },
    handleSizeChange() {

    },
    handleCurrentChange(){

    },
    addCount(value) {
      console.log(value)
      this.accountData = value;
      this.accountShow = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/form_inline.scss';
@import '@/assets/css/table.scss';
.header{
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  .add_img{
    width: 18px;
    height: 16px;
    margin-right: 9px;
  }
  .add_acount{
    display: flex;
    align-items: center;
    font-weight: 600;
    color: #12C6C5;
    line-height: 22px;
    cursor: pointer;
  }
}
</style>