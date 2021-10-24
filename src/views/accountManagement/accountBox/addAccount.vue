<template>
	<div class="addPage">
		<div class="add_center">
			<titleHeader :titleName="title" @close="closePop"></titleHeader>
			<div class="add_content">
				<el-form ref="form" :model="form" label-width="140px">
				  <el-form-item label="登录名">
				    <el-input v-model="form.name" placeholder="请输入登录名"></el-input>
				  </el-form-item>
					<el-form-item label="真实姓名">
					  <el-input v-model="form.realName" placeholder="请输入真实姓名"></el-input>
					</el-form-item>
          <el-form-item label="邮箱">
				    <el-input v-model="form.email" placeholder="请输入运单号"></el-input>
				  </el-form-item>
					<el-form-item label="手机号">
					  <el-input v-model="form.phone" placeholder="请输入名称"></el-input>
					</el-form-item>
          <el-form-item label="密码">
				    <el-input v-model="form.password" placeholder="请输入运单号"></el-input>
				  </el-form-item>
					<el-form-item label="公司ID">
					  <el-input v-model="form.companyId" placeholder="请输入名称"></el-input>
					</el-form-item>
				  <el-form-item label="状态">
				    <el-select v-model="form.status" placeholder="请选择状态">
				      <el-option label="已启用" value="已启用"></el-option>
				      <el-option label="未启用" value="未启用"></el-option>
				    </el-select>
				  </el-form-item>
          <el-form-item label="是否为管理员">
				    <el-select v-model="form.admin" placeholder="请选择状态">
				      <el-option label="是" value="是"></el-option>
				      <el-option label="否" value="否"></el-option>
				    </el-select>
				  </el-form-item>
					<el-form-item class="button_item">
						<el-button>取消</el-button>
						<el-button type="primary">确定</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import titleHeader from '@/components/titleHeader.vue'
	export default {
		props: ["accountData"],
		components: {
			titleHeader,
		},
		data() {
			return {
				title: '添加账号',
				form: {
					realName: '',
					name: '',
					email: '',
					phone: '',
					password: '',
          companyId: '',
          status: '已启用',
          admin: '是'
				}
			}
		},
		created() {
			if(this.accountData.id){
				this.form = this.accountData;
				this.title = "编辑账号"
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
	.addPage{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0,0,0,.4);
		z-index: 999;
		.add_center{
			width: 740px;
			height: 700px;
			padding: 30px;
			background: #FFFFFF;
			box-shadow: 0px 5px 12px 3px rgba(23, 68, 146, 0.15);
			border-radius: 4px;
			.edit_content{
				margin-top: 30px;
			}
			.el-form{
				margin-top: 30px;
				.button_item{
					padding-left: 216px;
				}
			}
		}
	}
</style>
