import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './utils/rem'

//引入element ui
import ElementUi from 'element-ui'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
//引入axios
import axios from 'axios'
Vue.prototype.$axios = axios;
import qs from 'qs'
Vue.prototype.$qs = qs

//引入滑动
import VueSimpleVerify from 'vue-simple-verify'
import '../node_modules/vue-simple-verify/dist/vue-simple-verify.css'
Vue.component('vue-simple-verify', VueSimpleVerify)

//国际化
import VueI18n from 'vue-i18n'
import enLocale from './common/en_US'
import zhLocale from './common/zh_CN'

Vue.use(ElementUi)
Vue.use(VueI18n)
const i18n = new VueI18n({
  // locale: 'en',
  locale: localStorage.getItem('locale')||'zh',
  messages:{
    'en': enLocale,
    'zh': zhLocale,
  },
});

let env = process.env.NODE_ENV
if(env == 'development'){
  window.baseurl = '/api'
}
else{
  window.baseurl = 'www.tujun168.com'
}
window.baseurl = 'www.tujun168.com'
Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

new Vue({
  render: h => h(App),
  router,
  i18n,
}).$mount('#app')
