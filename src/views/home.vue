<template>
  <div class="home">
    <side-bar></side-bar>
    <!-- <el-aside>
      <side-bar></side-bar>
    </el-aside> -->
    <el-container>
      <el-header height="80px">
        <top-bar></top-bar>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import topBar from '../components/topBar.vue';
import sideBar from '../components/sideBar.vue';
export default {
  components: {
    topBar,sideBar
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  display: flex;
}
.el-aside{
  // width: 240px!important;
}
.el-container{
  // width: calc(100% - 240px);
  flex: 1;
}
.el-header{
  width: 100%;
  height: 80px!important;
  padding: 0;
}
.el-main{
  overflow-y: auto; 
  background: #f5f5f5;
  padding: 30px 40px 0 30px;
}
</style>