<template>
  <div id="usermessage">
    <h3 class="uesertitle">客户基本信息</h3>
    <table class="usertable">
      <tr>
        <td class="t1">客户名称</td>
        <td class="t2">{{custName}}</td>
        <td class="t1">客户地址</td>
        <td class="t3">{{custAddr}}</td>
        <td class="t1">客户类型</td>
        <td class="t4">{{custTypeName}}</td>
      </tr>
      <tr>
        <td class="t1">当前状态</td>
        <td class="t2">{{custStatusName}}</td>
        <td class="t1">联系人</td>
        <td class="t3">{{enterpContacts}}</td>
        <td class="t1">电话</td>
        <td class="t4">{{custMobile}}</td>
      </tr>
      <tr>
        <td class="t1">表具数量</td>
        <td class="t2">{{total}}</td>
        <td class="t1">在线表具数</td>
        <td class="t3">{{online}}</td>
        <td class="t1">异常表具数</td>
        <td class="t4">{{abnormal}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
    name: 'Usermessage',
    data () {
      return {
        custName:"",
        custAddr:"",
        custTypeName:"",
        custStatusName:"",
        enterpContacts:"",
        custMobile:"",
        total:"",
        online:"",
        abnormal:""
      }
    },
    props: {
        userId:String
    },
    methods: {
      getUsermessage () {
        let that=this;
         this.$axios.get(API.host+'/hnkl/custMeter/search/cust?custId='+this.userId).then(function (response) {
                  let data=response.data.data.list[0];
                  that.custName=data.custName
                  that.custAddr=data.custAddr
                  that.custTypeName=data.custTypeName
                  that.enterpContacts=data.enterpContacts
                  that.custStatusName=data.custStatusName
                  that.custMobile=data.custMobile
           
        }).catch(function (error) {
                console.log(error);
        });
    
      },
      getUsermeter () {
        this.$axios({
            url:API.host+"/hnkl/custMeter/cust/countMeter",
            method:"get",
            params: {
              custId:this.userId
            }
        }).then((res)=>{
            const usermeter=res.data.data
            this.total=usermeter.total
            this.online=usermeter.online
            this.abnormal=usermeter.abnormal
          })
      }
    },
    mounted () {
      if(this.userId){
        this.getUsermessage()
        this.getUsermeter()
      }
    },
    // 监听父组件userId变化
    watch: {
      userId: function(){
        this.getUsermessage()
        this.getUsermeter()
      }
    }
}
</script>

<style scoped>
#usermessage{
width: 100%;
height: 130px;
padding: 0px;
}
.uesertitle{
font-size: 16px;
color: #45d8e0;
text-align: left;
font-weight: normal;
}
.usertable{
width: 100%;
/* height: 70%; */
border: 1px solid #658eae;
/* margin-top: 10px; */
border-collapse: collapse
}
.usertable td{
border: 1px solid #658eae;
font-size: 14px;
color: #fff
}
.t1{
width: 120px;
text-align: left;
padding: 5px 0 5px 20px;
}
.t2{
width: 160px;
}
.t4{
width:140px
}
</style>
