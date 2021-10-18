<template>
<div class="content">
    <div class="login">
        <div class="header">
            <img class="logo" src="../assets/img/login/logo@2x.png" alt="">
            <div class="search">
                <!-- <div class="search_left">
                    <input class="seach_input" :placeholder="$t('login.searchPla')"/>
                    <img class="search_img" src="../assets/login/login_search.svg" alt="">
                </div> -->
                <div class="lag_chenge" @click="changeLanguage('en')">EN</div>
                <div class="lag_chenge" @click="changeLanguage('zh')">/中</div>
            </div>
        </div>
        <div class="main">
            <div class="main-left">
                <el-carousel class="carousel_box" arrow="never">
                    <el-carousel-item class="carousel_son" v-for="(item,index) in carouselData" :key="index">
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
                    <img class="account_img" src="../assets/img/login/home_denglu_zhanghao.png" alt="">
                    <input v-model="username" class="box_input" :placeholder="$t('login.accountPlc')"/>
                </div>
                <div class="input_box">
                    <img class="password_img box_img" src="../assets/img/login/home_denglu_mima.png" alt="">
                    <input v-model="password" class="box_input" type="password" :placeholder="$t('login.pwd')"/>
                </div>
                <div class="oprator">
                    <div class="remember">
                        <el-checkbox v-model="remPaw"/>{{$t('login.pwd')}}
                    </div>
                    <div class="forget">{{$t('login.forgetPassword')}}?</div>
                </div>
                <!-- <vue-simple-verify ref="verify" @success="success" /> -->
                <div class="login_btn" @click="login" v-if="!isLogin">{{$t('login.loginText')}}</div>
                <div class="login_btn" @click="login" v-else>{{$t('login.logging')}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import cookie from '../utils/cookie';
export default {
    data() {
        return {
            remPaw: false,
            carouselData: [],
            username: '',
            password: '',
            isLogin: false,
        }
    },
    created() {
        console.log(this.$t)
        this.carouselData = this.$t('login.carouselData');
        this.loadAccountInfo();
    },
    methods: {
        //判断是否已登陆
        loadAccountInfo(){
            //zhaopeng&A15hOsu8YeGnCsjb
            let accountInfo = cookie.getCookie('accountInfo');
            //如果cookie里没有账号信息
            if(Boolean(accountInfo) == false){
                console.log('cookie中没有检测到账号信息！');
                return false;
            }
            else{
            //如果cookie里有账号信息
                console.log('cookie中检测到账号信息！现在开始预填写！');
                let userName = "";
                let passWord = "";
                let index = accountInfo.indexOf("&");
 
                userName = accountInfo.substring(0,index);
                passWord = accountInfo.substring(index+1);
 
                this.username = userName;
                this.password = passWord;
                this.remPaw = true;
            }
        },
        //切换语言
        changeLanguage(language){
            console.log(language);
            if(language == 'en'){
                localStorage.setItem('locale', 'en');
                this.$i18n.locale = localStorage.getItem('locale');
            } else{
                localStorage.setItem('locale', 'zh');
                this.$i18n.locale = localStorage.getItem('locale');
            }
            this.carouselData = this.$t('login.carouselData')
        },
        //点击登录
        login() {
            this.isLogin = true;
            this.$router.push({path: '/homePage'})
            // let accountInfo = this.username + "&" + this.password;
            // let params = {
            //     user_name: this.username,
            //     password: this.password,
            // }
            // params = this.$qs.stringify(params,{indices: false})
            // this.$axios({
            //     method: 'post',
            //     url: '/v1/index/login',
            //     data: params
            // }).then(res => {
            //     this.isLogin = false;
            //     if(res.data.status == 200){
            //         if(this.remPaw){
            //             console.log("勾选了记住密码，现在开始写入cookie");
            //             cookie.setCookie('accountInfo',accountInfo,1440*3);
            //         }
            //         else{
            //             console.log("没有勾选记住密码，现在开始删除账号cookie");
            //             cookie.delCookie('accountInfo');
            //         }
            //         localStorage.setItem('token',res.data.data.token);
            //         this.$router.push({path: 'homePage'})
            //         // window.location.href = res.data.data.redirectUrl;
            //     }
            //     else{
            //         this.$message({
            //             message: res.data.msg,
            //             type: 'warning'
            //         })
            //     }
            // }).catch((err) => {
            //     console.log(err)
            //     this.$message({
            //         message: err,
            //         type: 'warning'
            //     })
            //     this.isLogin = false;
            // })
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
    .content {
        width: 100%;
        height: 100%;
        padding: 48px 0 326px;
        background: url('../assets/img/login/login_bg.jpg') no-repeat;
        background-size: cover;
        // background-color: blue;
    }
    .login{
        width: 1440px;
        height: 705px;
        margin: 0 auto;
        //上半部分
        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 146px;
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
            line-height: 22px;
        }
        //主要内容
        .main{
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        .main-left{
            width: 440px;
            height: 480px;
            padding-top: 40px;
            overflow: hidden;
            /deep/ .carousel_box{
                width: 100%;
                height: 100%;
                padding-left: 8px;
                .el-carousel__container{
                    height: 413px;
                }
                
            }
            
            
        }
        .rotation{
            // margin-bottom: 66px;
            color: #FFFFFF;
            text-align: left;
            .rotation_title{
                margin-bottom: 17px;
                font-size: 36px;
                font-weight: bold;
                line-height: 36px;
            }
            .rotation_value{
                height: 84px;
                font-size: 18px;
                line-height: 18px;
                // border: 1px solid red;
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
                    margin: 0 25px;
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
                width: 100%;
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
                width: 100%;
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
                    display: flex;
                    align-items: center;
                    vertical-align: middle;
                }
                /deep/ .el-checkbox__inner{
                    width: 14px;
                    height: 14px;
                    margin-right: 4px;
                    border: 1px solid #666666;
                    border-radius: 2px;
                    background: transparent;
                }
            }
            .simple-verify{
                width: 100% !important;
            }
            .login_btn{
                width: 100%;
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