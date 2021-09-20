<template>
    <div class="login">
        <div class="header">
            <img class="logo" src="../assets/login/logo@2x.png" alt="">
            <div class="search">
                <div class="search_left">
                    <input class="seach_input" :placeholder="$t('login.searchPla')"/>
                    <img class="search_img" src="../assets/login/home_souso.png" alt="">
                </div>
                <div class="lag_chenge" @click="changeLanguage">EN/中</div>
            </div>
        </div>
        <div class="main">
            <div class="main-left">
                <el-carousel height="480px" arrow="never">
                    <el-carousel-item v-for="(item,index) in carouselData" :key="index">
                        <div class="rotation" v-for="(item1,index1) in item" :key="index1">
                            <div class="rotation_title">{{item1.title}}</div>
                            <div class="rotation_value">{{item1.value}}</div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="main-right">
                <div class="right-title">
                    <div class="line"></div>
                    <span>途骏云</span>  
                    <div class="line"></div>
                </div>
                <div class="input_box first-input">
                    <img class="account_img" src="../assets/login/home_denglu_zhanghao.png" alt="">
                    <input class="box_input" :placeholder="$t('login.accountPlc')"/>
                </div>
                <div class="input_box">
                    <img class="password_img box_img" src="../assets/login/home_denglu_mima.png" alt="">
                    <input class="box_input" type="password" :placeholder="$t('login.pwd')"/>
                </div>
                <div class="oprator">
                    <div class="remember">
                        <el-checkbox v-model="remPaw"/>{{$t('login.pwd')}}
                    </div>
                    <div class="forget">{{$t('login.forgetPassword')}}?</div>
                </div>
                <div class="login_btn">{{$t('login.loginText')}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            remPaw: false,
            carouselData: []
        }
    },
    created() {
        console.log(this.$t)
        this.carouselData = this.$t('login.carouselData')
    },
    methods: {
        //切换语言
        changeLanguage(){
            if(this.$i18n.locale == 'zh'){
                localStorage.setItem('locale', 'en');
                this.$i18n.locale = localStorage.getItem('locale');
            } else{
                localStorage.setItem('locale', 'zh');
                this.$i18n.locale = localStorage.getItem('locale');
            }
            this.carouselData = this.$t('login.carouselData')
        },
    }
}
</script>

<style lang="scss" scoped>
    input{
        outline: none;
        background: transparent;
        border: none;
        font-size: 16px;
        &::-webkit-input-placeholder{
            font-size: 16px;
            color: #999;
        } /* 使用webkit内核的浏览器 */
        &:-moz-placeholder{
            font-size: 16px;
            color: #999;
        } /* Firefox版本4-18 */
        &::-moz-placeholder{
            font-size: 16px;
            color: #999;
        } /* Firefox版本19+ */
        &:-ms-input-placeholder{
            font-size: 16px;
            color: #999;
        } /* IE浏览器 */
    }
    .login{
        width: 100%;
        min-height: 100%;
        padding: 3% 10% 5%;
        background: url('../assets/login/login_bg.jpg') no-repeat;
        background-size: cover;
        //上半部分
        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6%;
        }
        .logo{
            width: 247px;
            height: 80px;
        }
        .search{
            display: flex;
            align-items: center;
        }
        .search_left{
            width: 390px;
            height: 43px;
            position: relative;
            margin-right: 61px;
            background: rgba(255,255,255,.8);
            border-radius: 6px;
            .seach_input{
                width: 300px;
                height: 43px;
            }
            .search_img{
                width: 29px;
                height: 29px;
                position: absolute;
                right: 21px;
                bottom: 6px;
                cursor: pointer;
            }
        }
        .lag_chenge{
            font-size: 22px;
            color: #DFE2E2;
            cursor: pointer;
        }
        //主要内容
        .main{
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        .main-left{
            width: 400px;
        }
        .rotation{
            margin-bottom: 66px;
            color: #FFFFFF;
            text-align: left;
            .rotation_title{
                margin-bottom: 6px;
                font-size: 36px;
                font-weight: bold;
            }
            .rotation_value{
                font-size: 18px;
            }
        }
        //轮播点
        /deep/ .el-carousel{
            .el-carousel__indicators.el-carousel__indicators--horizontal{
                left: 0;
                transform: none;
            }
            .el-carousel__button{
                display: inline-block;
                width: 45px;
                height: 4px;
                border: 1px solid rgba(255,255,255,.4);
                border-radius: 2px;
                background: transparent;
            }
            .is-active .el-carousel__button{
                background: #1AA6BB;
                border: 1px solid #1AA6BB;

            }
        }
        .main-right{
            width: 385px;
            height: 480px;
            padding: 59px 30px 0;
            border: 1px solid rgba(255,255,255,.1);
            background: rgba(0,0,0,.1);
            .right-title{
                display: flex;
                align-items: center;
                margin-bottom: 51px;
                span{
                    margin: 0 17px;
                    font-size: 30px;
                    font-weight: bold;
                    color: #FFFFFF;
                }
            }
            .line{
                width: 90px;
                height: 1px;
                border-top: 1px solid rgba(255,255,255,.5);
            }
            .input_box{
                width: 296px;
                height: 42px;
                display: flex;
                align-items: center;
                padding-left: 17px;
                background: #FFFFFF;
                border: 1px solid #FFFFFF;
                border-radius: 6px;
                .account_img{
                    width: 16px;
                    height: 21px;
                }
                .password_img{
                    width: 16px;
                    height: 23px;
                }
                .box_input{
                    width: 250px;
                    height: 42px;
                    text-indent: 20px;
                }
            }
            .first-input{
                margin-bottom: 26px;
            }
            .oprator{
                width: 296px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 10px 0 52px;
                font-size: 16px;
                color: #666666;
                .forget{
                    text-decoration: underline;
                    cursor: pointer;
                }
                .remember{
                    // cursor: pointer;
                }
                /deep/ .el-checkbox__inner{
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                    border: 1px solid #666666;
                    border-radius: 2px;
                    background: transparent;
                }
            }
            .login_btn{
                width: 296px;
                height: 42px;
                background: #1AA6BB;
                border-radius: 6px;
                font-size: 20px;
                color: #FFFFFF;
                text-align: center;
                line-height: 42px;
                cursor: pointer;
            }
        }
    }
</style>