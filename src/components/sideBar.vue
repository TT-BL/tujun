<template>
  <div class="sideBar" :class="{'sideBar_short':isCollapse==true}" >
    <img class="logo" v-show="!isCollapse" src="@/assets/img/home/logo@2x.png" alt="">
    <img class="logo1" v-show="isCollapse" src="@/assets/img/home/logo1@2x.png" alt="">
    <el-menu :default-active="NavActive" class="el-menu-vertical-demo" :router="true" :collapse="isCollapse" :collapse-transition="true" :StaticEnableDefaultPopOutImage="false">
      <div v-for="(item,index) in menuData" :key="index">
        <el-submenu :index="item.router" v-if="item.children && item.children.length" :class="{'submenu_box':NavActive.indexOf(item.router)!=-1}">
          <template slot="title" >
            <img class="memu_img" :class="{'memu_img1':isCollapse==true}" v-if="NavActive.indexOf(item.router)==-1" :src="require('@/assets/img/menu/' + item.icon )" alt="">
            <img class="memu_img" :class="{'memu_img1':isCollapse==true}" v-else :src="require('@/assets/img/menu/' + item.icon_active )" alt="">
            <span slot="title" :style="{display:isCollapse==true?'none':'inline-block'}">{{item.name}}</span>
            <img class="right_arrow" :class="{'arrow_img':isCollapse==true}" v-if="NavActive.indexOf(item.router)==-1" src="@/assets/img/home/right_arrow@2x.png" alt="">
            <img class="down_arrow" :class="{'arrow_img':isCollapse==true}" v-else src="@/assets/img/home/arrow_active@2x.png" alt="">
          </template>
          <!-- 二级菜单 -->
          <template v-for="itemChild in item.children">
            <el-menu-item :index="itemChild.router" :key="itemChild.router">
              <span slot="title" class='submenu'>{{itemChild.name}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item :index="item.router" v-else>
          <img class="memu_img" v-if="item.router!=NavActive" :src="require('@/assets/img/menu/' + item.icon )" alt="">
          <img class="memu_img" v-else :src="require('@/assets/img/menu/' + item.icon_active )" alt="">
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </div>
    </el-menu>
    <img class="nav_bottom" src="@/assets/img/home/nav_bottom.png" alt="" v-show="!isCollapse">
  </div>
</template>

<script>
import {menuData} from '../common/menuData.js';
import {eventBus} from '../common/eventBus'
export default {
  data() {
    return {
      menuData: menuData.list,
      NavActive: '',
      isCollapse: false,
    }
  },
  watch: {
    $route(index) {
      let path = index.path.substr(1);
      console.log(path)
      this.handleSelect(path);
    }
  },
  beforeMount() {
    this.getActiveNav();
  },
  created() {
    this.acceptStatistics();
    if(sessionStorage.getItem('isCollapse')){
      if(sessionStorage.getItem('isCollapse') == "false") {
        this.isCollapse = false;
      } else{
        this.isCollapse = true;
      }
    }
  },
  methods: {
    acceptStatistics() {
      eventBus.$on('navStatictics',(message)=>{
        // if()
        this.isCollapse = message;
      })
    },
    getActiveNav() {
      let currentUrl = window.location.href;
      this.NavActive = currentUrl.split("#").pop();
      console.log(this.NavActive)
    },
    //监听路由的变化，对应菜单高亮显示
    handleSelect(index) {
      this.NavActive = '/' + index;
      console.log(this.NavActive);
    },
  },
}
</script>

<style lang="scss" scoped>
.sideBar{
  // width: 240px;
  // height: 100%;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.09);
  filter: blur(0px);
  overflow-x: hidden;
  overflow-y: hidden;
}
.logo{
  width: 134px;
  height: 46px;
  display: block;
  margin: 23px 52px 70px 52px;
}
.logo1{
  width: 48px;
  height: 48px;
  display: block;
  margin: 23px auto 70px;
}
.memu_img{
  width: 22px;
  height: 22px;
}
.memu_img1{
  margin-left: -12px;
}
.right_arrow{
  width: 6px;
  height: 12px;
  margin-left: 17px;
}
.down_arrow{
  width: 12px;
  height: 6px;
  margin-left: 17px;
}
.arrow_img{
  display: none;
}
/deep/ .el-menu{
  width: 100%;
  border-right: none;
  .el-submenu__icon-arrow{
    display: none;
  }
  .el-tooltip{
    text-align: center;
  }
  .el-menu-item,.el-submenu__title{
    padding-left: 52px!important;
    text-align: left;
    border-radius: 6px;
    &:hover{
      background: rgba(18, 198, 197,.3);
    }
    span{
      width: 72px;
      // height: 25px;
      display: inline-block;
      margin-left: 18px;
      font-size: 18px;
      color: #1A1E32;
      line-height: 25px;
      text-align: left;
      font-weight: bold;
    }
  }
  .el-menu-item.is-active{
    width: 100%;
    height: 56px;
    background: #12C6C5;
    span{
      color: #fff;
    }
  }
  .el-menu--inline{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .el-menu-item{
      width: 158px;
      height: 44px;
      // padding: 0!important;
      // border: 1px solid red;
      span{
        font-size: 16px;
        color: #1A1E32;
        line-height: 20px;
        font-weight: normal;
      }
      
    }
    .el-menu-item.is-active{
      width: 158px;
      background: rgba(18,198,197,.2);
      border-radius: 6px 0px 0px 6px;
      span{
        font-weight: bold;
      }
    }
    .el-menu-item:hover{
      background: rgba(18,198,197,.2);
    }
  }
  .submenu_box{
    background: #12C6C5;
    .el-submenu__title > span{
      color: #fff;
    }
  }
} 
.el-menu--vertical{
  .el-menu--popup{
    line-height: 20px;
    .el-menu-item{
      color: #666;
      &:hover{
        background: rgba(18, 198, 197,.3);
        color: #1A1E32;
      }
    }
    .el-menu-item.is-active{
      background: rgba(184,184,184,.2);
      color: #1A1E32;
    }
  }
}
.nav_bottom{
  width: 185px;
  height: 173px;
  display: block;
  margin: 0 auto;
  margin-top: 85px;
}
.sideBar_short{
  width: 100px;
}
</style>