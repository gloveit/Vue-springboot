<template>
           <Layout style="background: none;height:100%;width: 98%;margin: 0 auto;">
              <Header style="height:40px;line-height: 20px;width: 100%;padding:0 24px;background: transparent;">
                    <Input v-model="model1"   placeholder="搜索用户..." style="width: auto">
                        <Button slot="append" icon="ios-search" @click='searchUser'></Button>
                    </Input>
              </Header>

              <div class="test1" style="height:calc(100% - 50px);width: 100%;overflow:hidden;overflow-y:scroll;">
                      <Menu :accordion=true  @on-open-change="selectUser"  @on-select="selectMerter" theme="dark" style="width:100%;background:#124C6E">
                          <Submenu :name="item.custId" v-for="item in showData" :key="item.index" :title="item.custName">
                              <template slot="title">
                                 <!-- <Icon type="person"></Icon> -->
                                 <i class="icon-gongshanghu"></i>
                                  <span class="menusName" >{{item.custName}}</span>
                              </template>
                              <MenuItem v-if="item2.custId===item.custId" :name="item2.meterId" v-for="item2 in meterMenus" :key="item2.index">{{item2.metreNo}}</MenuItem>
                          </Submenu>
                      </Menu>
              </div>

              <Footer style="height:50px;line-height: 50px;width: 100%;padding: 0;background: #124C6E;border-top:2px solid #03273D;color: white;user-select: none;">
                <Page :current="current" :total="dataCount" :page-size="pageSize" simple @on-change='changepage'></Page>
              </Footer>
          </Layout>
      
</template>
<script>
  export default {
    data () {
      return {
        model1:'',
        userMenus:[],
        meterMenus:[],
        pageSize:20,
        showData:[],
        dataCount: 0,
        current:0
      }
    },
    watch:{
        userMenus:{
            handler(oldVal, newVal) {
                this.handleShowData2();　　　 // 表格刷新了，当前页标识需要回到第一页的位置
                this.current = 1;
            },
            deep: true
        }
    },
    created(){
        this.initUser();
        this.handleShowData2();
    },
    methods: {
      initUser(){
        let that=this;
        this.$axios.get(API.host+'/hnkl/custMeter/search/cust').then(function (response) {
            let data=response.data.data.list;
            that.userMenus=data;
            let obj={};
            obj["checkType"] = 0;
            obj["userId"] = data[0].custId;
            that.$emit("checkType",obj)
        }).catch(function (error) {
            console.log(error);
         });
     },

    changepage (index) {
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.showData = this.userMenus.slice(_start, _end)
     },
     handleShowData2(){
      if (this.userMenus && this.userMenus.length) {
        this.dataCount = this.userMenus.length
        if (this.userMenus.length < this.pageSize) {
          this.showData = this.userMenus;
        } else {
          this.showData = this.userMenus.slice(0, this.pageSize)
        }
      } else {
        this.showData = []
        this.dataCount = 0
      }
      this.current = 1
    },
     
     selectMerter(name){//点击表
          let obj={};
          obj["checkType"] = 1;
          obj["meterId"] = name;
          this.$emit("checkType",obj)
     },
     selectUser(data){//点击用户
        if(data.length > 0){
           let obj={};
          let that=this;
          obj["checkType"] = 0;
          obj["userId"] = data;
          this.$emit("checkType",obj)
          this.$axios.get(API.host+'/hnkl/custMeter/search/meter?custId='+data[0])//获取用户下的表
            .then(function (response) {
                that.meterMenus=response.data.data.list
            })
            .catch(function (error) {
                console.log(error);
            });
        }
     },
     searchUser(){//搜索用户
        let that=this;
        this.$axios.get(API.host+'/hnkl/custMeter/search/cust?custName='+this.model1).then(function (response) {
              that.userMenus.splice(0)
              that.userMenus=response.data.data.list
        }).catch(function (error) {
                console.log(error);
        });
     }

    }
  }
</script>
<style>
.ivu-input {
   color:#fff !important;
   background-color:transparent !important;
}
.ivu-select-selection {
    color:#fff !important;
    background-color: #093149 !important;
}
.ivu-page-simple .ivu-page-simple-pager input {
    width:45px !important;
}
.ivu-select-dropdown {
    z-index:1000 !important;
}

/* 美化滚动条 */
::-webkit-scrollbar-track-piece { 
    background-color:transparent;
}
::-webkit-scrollbar {
    width:9px;
    height:9px;
}
::-webkit-scrollbar-thumb {
    background-color:#dddddd;
    background-clip:padding-box;
    min-height:28px;
}
::-webkit-scrollbar-thumb:hover {
   background-color:#fff;
}
.test1::-webkit-scrollbar {
   width: 0px;
}
 .test1::-webkit-scrollbar-track {
    background-color:transparent;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius:2em;
}
 .test1::-webkit-scrollbar-thumb {
    background-color:#03273D;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius:2em;
}
.menusName{
    display: inline-block;
    vertical-align: top;
    width:78px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

@font-face {
    font-family: 'fontello';
    src: url('../assets/icon_img/iconfont.eot');
    src: url('../assets/icon_img/iconfont.eot?12760324#iefix') format('embedded-opentype'),
    url('../assets/icon_img/iconfont.woff?12760324') format('woff'),
    url('../assets/icon_img/iconfont.ttf?12760324') format('truetype'),
    url('../assets/icon_img/iconfont.svg?12760324#fontello') format('svg');
    font-weight: normal;
    font-style: normal;
}

.icon-gongshanghu:before {
    font-family: 'fontello';
    font-size: 18px;
    font-style:normal;
    float:left;
    position: relative;
    top: -3px;
    left: 7px;
}

.icon-gongshanghu:before {
    content: "\e605";
}
</style>
