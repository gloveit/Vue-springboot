<template>
  <div id="app">
    <Layout style="height:100%;background: transparent;">
      <Header class="headerCss">
          <Menu mode="horizontal" theme="dark" :active-name="isSelectName" class="menus" @on-select="selectMenus">
                  <router-link to="/home" title="返回首页"><div class="layout-logo"></div></router-link>
                  <div class="layout-nav">
                        <!-- <router-link to="/main1"> -->
                          <MenuItem name="1" :class="defaultCom?'border-bottom':''">
                            <Icon type="ios-speedometer-outline"></Icon>
                              用户表具监控
                          </MenuItem>
                        <!-- </router-link> -->
                        <!-- <router-link to="/main3"> -->
                          <MenuItem name="2" :class="isSelectName == 2?'border-bottom':''">
                            <Icon type="monitor"></Icon>
                              气量监控
                          </MenuItem>
                      <!-- </router-link> -->
                      <!-- <router-link to="/main5"> -->
                          <MenuItem name="3" :class="isSelectName == 3?'border-bottom':''">
                                <Icon type="ios-keypad"></Icon>
                              运营监控
                          </MenuItem>
                      <!-- </router-link>
                        <router-link to="/main4"> -->
                          <MenuItem name="4" :class="isSelectName == 4?'border-bottom':''">
                            <Icon type="connection-bars"></Icon>
                              气量分析
                          </MenuItem>
                        <!-- </router-link>

                        <router-link to="/main6"> -->
                          <MenuItem name="5" :class="isSelectName == 5?'border-bottom':''">
                              <Icon type="ios-bell"></Icon>
                              报警统计
                          </MenuItem>
                      <!-- </router-link> -->
                  </div>
          </Menu>
      </Header>
      <div style="width:100%;height:calc(99% - 70px)">
        <main1 v-if="defaultCom"></main1>
        <main3 v-if="isSelectName == 2?true:false"></main3>
        <main5 v-if="isSelectName == 3?true:false"></main5>
        <main4 v-if="isSelectName == 4?true:false"></main4> 
        <main6 v-if="isSelectName == 5?true:false"></main6> 
      </div>
      
    </Layout>
  </div>
</template>

<script>
import main1 from './main1.vue'
import main2 from './main2.vue'
import main3 from './main3.vue'
import main4 from './main4.vue'
import main5 from './main5.vue'
import main6 from './main6.vue'
export default {
  name: 'ScreenHainan',
  data(){
      return{
          isSelectName:1,
          defaultCom: true  //加载初始组件
      }
  },
  components: {
    main1,
    main2,
    main3,
    main4,
    main5,
    main6
  },
  watch:{//刷新页面后，右上角菜单默认选中相对应页面
   '$route'(to,from){
        let path=parseInt(this.$route.name.substr(-1,1));
        let arr=[1,3,5,4,6],arr2=[1,2,3,4,5]
        let bb=arr.indexOf(path);
        this.isSelectName=arr2[bb]
     }
    },
    mounted(){
        let path=parseInt(this.$route.name.substr(-1,1));
        let arr=[1,3,5,4,6],arr2=[1,2,3,4,5]
        let bb=arr.indexOf(path);
        this.isSelectName=arr2[bb]
    },
  methods:{
      selectMenus(data){
          //严格模式判断
          if('1' !== data){
            console.log(data)
            this.defaultCom = false
          }
          if('1' === data){
            this.defaultCom = true
          }
          this.isSelectName=data;
      }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 200px;
    height: 50px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    background:url(../assets/cloud2.png);
    background-size: contain;
    background-repeat: no-repeat;
}
.layout-nav{
    width: 660px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
.menus{
  height: 70px;
  line-height: 68px;
  background:transparent;
}
.border-bottom{
    border-bottom:3px solid #ee8629;
    /* transform:scale(0.5); */
    color:#ee8629 !important;
}
.headerCss{
    height: 70px;
    /* margin-bottom: 5px; */
    padding:0px;
    border-bottom:1px solid #2fbaff;
    background: -webkit-linear-gradient(top,rgba(8,26,57,.8), rgba(24,63,104,.6)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(top,rgba(8,26,57,.8), rgba(24,63,104,.6)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(top,rgba(8,26,57,.8), rgba(24,63,104,.6)); /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom,rgba(8,26,57,.8), rgba(24,63,104,.6)); /* 标准的语法（必须放在最后） */
}
</style>
