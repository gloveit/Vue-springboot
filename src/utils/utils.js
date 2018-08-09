import {getRequest} from './Api'

// 初始化用户菜单
export const initMenu = (router, store)=> {  //接收参数一个router实例参数和一个store实例参数
    if (store.state.routes.length > 0) {
      return;
    }
    getRequest("/config/sysmenu").then(resp=> { //初始化菜单之前向后端请求菜单信息
      if (resp && resp.status == 200) {
        let fmtRoutes = formatRoutes(resp.data);  //路由规则
        router.addRoutes(fmtRoutes);  //添加路由规则
        store.commit('initMenu', fmtRoutes); //将初始化菜单路由规则存储在store中
        // store.dispatch('connect');
      }
    })
  }

  if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (prefix){
     return this.slice(0, prefix.length) === prefix;
    };
   }

export const formatRoutes = (routes)=> {
    let fmRoutes = [];
    routes.forEach(router=> {
      let {
        path,
        component,
        name,
        meta,
        iconCls,
        children
      } = router;
      // console.log(component)
      if (children && children instanceof Array) {
        children = formatRoutes(children);
      }
      let fmRouter = {
        path: path,
        component:(resolve)=>{
          if (component.startsWith("Screen")) {
             require(['../components/ScreenHainan.vue'], resolve)
          }
        // else if (component.startsWith("Emp")) {
        //     require(['../components/emp/' + component + '.vue'], resolve)
        //   } else if (component.startsWith("Per")) {
        //     require(['../components/personnel/' + component + '.vue'], resolve)
        //   } else if (component.startsWith("Sal")) {
        //     require(['../components/salary/' + component + '.vue'], resolve)
        //   } else if (component.startsWith("Sta")) {
        //     require(['../components/statistics/' + component + '.vue'], resolve)
        //   } else if (component.startsWith("Sys")) {
        //     require(['../components/system/' + component + '.vue'], resolve)
        //   }
        },
        name: name,
        iconCls: iconCls,
        meta: meta,
        children: children
      };
      fmRoutes.push(fmRouter);
    })
    return fmRoutes;
  }
  