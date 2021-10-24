<template>
  <div class="change_password">
    <titleHeader titleName="修改密码" :showImg="false" @close="closePop"></titleHeader>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="旧密码">
        <el-input v-model="form.oldPwd" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPwd" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input v-model="form.pwdAgain" placeholder="请再次确认新密码"></el-input>
      </el-form-item>
      <el-form-item class="button_item">
        <el-button type="primary" class="confirm_btn">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import titleHeader from '@/components/titleHeader.vue'
export default {
  components: {
    titleHeader,
  },
  data() {
    return {
      form: {
        oldPwd: '',
        newPwd: '',
        pwdAgain: '',
      }
    }
  },
  methods: {
    closePop() {
      this.$emit('closePop')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/form.scss';
.change_password{
  width: 700px;
  height: 669px;
  margin: 82px auto;
  margin-bottom: 0;
  padding: 30px 40px;
  background: #FFFFFF;
  border-radius: 10px;
  .el-form{
    margin-top: 100px;
  }
  .confirm_btn{
    margin-top: 100px;
  }
}
</style>