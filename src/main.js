import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入element ui
import ElementUi from 'element-ui'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
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

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  i18n,
}).$mount('#app')
