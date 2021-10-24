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
        {path: '/deviceManagement/deviceList', component: ()=>import('../views/deviceManagement/deviceList.vue'),name:'设备列表'},
        {path: '/deviceManagement/devideRecord', component: ()=>import('../views/deviceManagement/devideRecord.vue'),name:'设备上报记录'},
        {path: '/deviceManagement/deviceInfo', component: ()=>import('../views/deviceManagement/devicePages/deviceInfo.vue'),name:'设备详情'},
        {path: '/accountManagement', component: ()=>import('../views/accountManagement/accountManagement'),name:'账号管理页'},
        {path: '/changePassword', component: ()=>import('../views/changePassword/changePassword'),name:'修改密码'},
    ]},
    {path: '/login', component: ()=>import('../views/login.vue')},
]
export default new VueRouter({
    // mode: "history",
    routes
})