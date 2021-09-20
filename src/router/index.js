import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {path: '/', redirect: '/login',component: ()=>import('../views/login.vue')},
    {path: '/login', component: ()=>import('../views/login.vue')}
]
export default new VueRouter({
    mode: "history",
    routes
})