import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {path: '/login', component: ()=>import('../views/login.vue')},
    {path: '/', component: ()=>import('../views/home.vue'),redirect: to => '/login',
    children:[
        {path: '/homePage', component: ()=>import('../views/homePage/homePage'),name:'首页'},
        {path: '/wxManagement', component: ()=>import('../views/wxManagement/wxManagement'),name:'微信管理'},
        {path: '/setting', component: ()=>import('../views/setting/setting'),name:'系统设置'},
        {path: '/deviceManagement', component: ()=>import('../views/deviceManagement/deviceManagement'),name:'设备管理'},
        {path: '/accountManagement', component: ()=>import('../views/accountManagement/accountManagement'),name:'账号管理页'},
        {path: '/accountManagement/accountList', component: ()=>import('../views/accountManagement/accountPage/accountList'),name:'账号列表'},
        {path: '/accountManagement/addAcount', component: ()=>import('../views/accountManagement/accountPage/addAcount'),name:'添加账号'},
    ]},
    {path: '/login', component: ()=>import('../views/login.vue')},
]
export default new VueRouter({
    // mode: "history",
    routes
})