<template>
	<div class="title" :class="{'title_noBorder': showBorder==false}">
		<div class="title_name">
			<div class="title_left"></div>
			<div class="title_text">{{titleName}}</div>
		</div>
		<img src="@/assets/img/home/close_img.png" alt="" class="close_img" @click="close" v-show="showImg">
	</div>
</template>

<script>
	export default {
		props: {
			'titleName': {
				default: '',
			},
			'showImg': {
				default: true,
			},
			'showBorder': {
				default: true,
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			close() {
				this.$emit('close')
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
		border-bottom: 1px solid rgba(151,151,151,.2);
		.title_name{
			display: flex;
			align-items: center;
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
		}
		.close_img{
			width: 12px;
			height: 12px;
			cursor: pointer;
		}
	}
	.title_noBorder{
		border-bottom: none;
	}
</style>
