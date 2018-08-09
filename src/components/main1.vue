<template>
  <Layout style="height:100%;background: none;">
    <Sider hide-trigger style="width:290px;background: url(static/biaoju.png);background-size:100% 100%;padding-top:25px">
        <left-Menu  @checkType="getSelectType"></left-Menu>
    </Sider>

    <Content v-if="selectType===0" style="border: 2px solid #2BA2D4;margin-left: 30px;box-shadow: 0px 0px 24px #31BBF0;padding:30px">
        <usermessage  :userId="userId"></usermessage>
        <tenline :userId="userId"></tenline>
        <meterlist :userId="userId"></meterlist>
    </Content>
    <mains v-if="selectType===1" :meterId="meterid"></mains>
  </Layout>
</template>

<script>
import leftMenu from "./leftmenu"
import mains from './main2'
import usermessage from './Usermessage'
import tenline from './Tenline'
import meterlist from './Meterlist'

export default {
  components: {
    leftMenu,
		usermessage,
		tenline,
    meterlist,
    mains
  },
  data(){
    return{
      selectType:0,
      userId:"",
      meterid:''
    }
  },
  methods:{
    getSelectType(data){
        this.selectType = data.checkType;
        if(data.userId || data.userId !== undefined){
             this.userId = data.userId.toString();
        }else{
             this.meterid = data.meterId;
        }   
    }
  }
}
</script>

