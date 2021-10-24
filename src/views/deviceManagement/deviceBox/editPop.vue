<template>
	<div class="editPage">
		<div class="edit_center">
			<titleHeader titleName="编辑" @close="closePop"></titleHeader>
			<div class="edit_content">
				<el-form ref="form" :model="form" label-width="90px">
				  <el-form-item label="运单号">
				    <el-input v-model="form.danhao" placeholder="请输入运单号"></el-input>
				  </el-form-item>
					<el-form-item label="名称">
					  <el-input v-model="form.name" placeholder="请输入名称"></el-input>
					</el-form-item>
				  <el-form-item label="状态">
				    <el-select v-model="form.region" placeholder="请选择状态">
				      <el-option label="已启用" value="shanghai"></el-option>
				      <el-option label="未启用" value="beijing"></el-option>
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
		components: {
			titleHeader,
		},
		data() {
			return {
				form: {
					danhao: '',
					name: '',
					region: '',
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
	.editPage{
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
		.edit_center{
			width: 610px;
			height: 408px;
			padding: 30px;
			background: #FFFFFF;
			box-shadow: 0px 5px 12px 3px rgba(23, 68, 146, 0.15);
			border-radius: 4px;
			.edit_content{
				margin-top: 30px;
			}
		}
	}
</style>
