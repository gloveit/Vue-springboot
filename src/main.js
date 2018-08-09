// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import echarts from 'echarts'
import './assets/api/API'
import '@/assets/css/common.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index.js'
import {initMenu} from './utils/utils.js'
import {getRequest} from './utils/Api'
import {postRequest} from './utils/Api'


Vue.use(iView);
Vue.use(ElementUI);
Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.config.productionTip = false


router.beforeEach((to, from, next)=> {   //添加路由守卫
  if (to.name == 'login') {
    next();
    return;
  }
  let name = store.state.user.name;
  console.log(name)
  if (name == '未登录') {
    if (to.meta.requireAuth || to.name == null) {
      console.log(to.path)
      next({path: '/', query: {redirect: to.path}})
    } else {
      next();
    }
  } else {
    initMenu(router, store);  //调用initMenu方法初始化菜单,将router路由实例和store库作为参数传递
    next();
  }
 }
)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
