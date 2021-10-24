<template>
  <div class="topBar">
    <div class="top_left">
      <img class="menu_shouqi" v-if="isCollapse==false" src="../assets/img/home/shouhui@2x.png" alt="" @click="shouqi">
      <img class="menu_shouqi" v-else src="../assets/img/home/zhankai@2x.png" alt="" @click="zhankai">
      <div class="left_title">{{$t('home.title')}}</div>
    </div>
    <div class="top_right">
      <img class="touxiang" src="../assets/img/home/touxiang.png" alt="">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          途骏云<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" hide-timeout="5000" trigger="click">
          <el-dropdown-item command="password">
            <img class="password_img" src="@/assets/img/home/password@2x.png" alt="">{{$t('home.modifyPass')}}
          </el-dropdown-item>
          <el-dropdown-item>
            <img class="loginout_img" src="@/assets/img/home/loginout@2x.png" alt="">{{$t('home.loginOut')}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {eventBus} from '../common/eventBus';
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  created() {
    if(sessionStorage.getItem('isCollapse')){
      if(sessionStorage.getItem('isCollapse') == "false") {
        this.isCollapse = false;
      } else{
        this.isCollapse = true;
      }
    }
  },
  methods: {
    //点击修改密码
    handleCommand(command) {
      console.log(command)
      if(command == "password"){
        this.$router.push({path: 'changePassword'})
      }
    },
    shouqi() {
      this.isCollapse = true;
      sessionStorage.setItem('isCollapse',this.isCollapse);
      eventBus.$emit('navStatictics',this.isCollapse);
    },
    zhankai(){
      this.isCollapse = false;
      sessionStorage.setItem('isCollapse',this.isCollapse);
      eventBus.$emit('navStatictics',this.isCollapse);
    }
  }
}
</script>

<style lang="scss" scoped>
.topBar{
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px 0 30px;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.09);
  
}
.top_left,.top_right{
  display: flex;
  align-items: center;
}
.menu_shouqi{
  width: 22px;
  height: 17px;
  margin-right: 30px;
  cursor: pointer;
}
.touxiang{
  width: 44px;
  height: 44px;
  margin-right: 10px;
}
.left_title{
  font-size: 20px;
  font-weight: 600;
  color: #1A1E32;
  line-height: 28px;
}
.el-dropdown-link{
  font-size: 18px;
  font-weight: 400;
  color: #1A1E32;
  line-height: 22px;
  cursor: pointer;
}
.el-dropdown-menu__item{
  // width: 184px;
  height: 62px;
  font-weight: 600;
  color: #1A1E32;
  line-height: 62px;
  font-size: 16px;
  &:hover{
    color: #1A1E32;
    background: #B7EDED;
    line-height: 62px;
  }
}
.password_img{
  width: 13px;
  height: 15px;
  margin-right: 20px;
  vertical-align: middle;
}
.loginout_img{
  width: 14px;
  height: 15px;
  margin-right: 19px;
  vertical-align: middle;
}
</style>