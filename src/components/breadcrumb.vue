//面包屑
<template>
  <div class="breakCrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: item.router }" v-for="(item,index) in breadcrumbItems" :key="index">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: ["breadcrumbItems"]
}
</script>

<style lang="scss" scoped>
.breakCrumb{
  /deep/ .el-breadcrumb{
    .el-breadcrumb__inner{
      font-size: 16px;
      color: #1A1E32;
      font-weight: normal;
    }
    .el-breadcrumb__item{
      &:last-child{
        .el-breadcrumb__inner{
          color: #666;
        }
      }
    }
  }
}

</style>