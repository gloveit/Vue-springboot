import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'//用户表具监控
import home from '@/components/Home'//首页



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {  
        requireAuth: true   // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path:'*', //默认路由
      redirect:'/home'
    }
  ]
})
