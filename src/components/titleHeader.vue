<template>
	<div class="title">
		<div class="title_name">
			<div class="title_left"></div>
			<div class="title_text">{{titleName}}</div>
		</div>
		<img src="" alt="" class="close_img">
	</div>
</template>

<script>
	export default {
		props: ['titleName'],
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped="">
	.title{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 14px;
		border-bottom: 1px solid #979797;
		.title_name{
			font-size: 18px;
			font-weight: 600;
			color: #1A1E32;
			line-height: 25px;
			.title_left{
				width: 6px;
				height: 20px;
				margin-right: 10px;
				background: #12C6C5;
			}
			.close_img{
				width: 12px;
				height: 12px;
				border: 1px solid red;
			}
		}
	}
</style>
