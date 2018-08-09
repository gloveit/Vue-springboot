<template>
    <div id="meterlist">
      <p class="title">表具列表</p>
      <Table border :disabled-hover='true' :columns="columns1" :data="data1" :style="{width:'100%',background:'transparent'}" class="allcell" size="small"></Table>
    </div>
</template>

<script>
export default {
	name: 'Metelist',
	data () {
    return {
        columns1: [
            {
                title: '表具型号',
                key: 'meterModel'
            },
            {
                title: '表具编号',
                key: 'metreNo'
            },
            {
                title: '信号',
                key: 'signalGrade',
            },
            {
                title: '最近读表时间',
                key: 'meterReadingTime'
            },
            {
                title: '最近读表数',
                key: 'meterReading'
            },
            {
                title: '电量',
                key: 'currentCellVoltage'
            },
             {
                title: '阀门状态',
                key: 'valveState'
            },
            {
                title: '表状态',
                key: 'onlineState'
            }
        ],
        data1: [],
    }
  },
  props: {
    userId:String
  },
  methods: {
   getMeterlistdata () {
      let that=this;
      if(this.userId){
                this.$axios.get(API.host+'/hnkl/custMeter/search/meter?custId='+this.userId)//获取用户下的表
            .then(function (response) {
                let datas=response.data.data.list
                that.data1=datas;   
            })
            .catch(function (error) {
                console.log(error);
            });
      }
   }
  },
  mounted () {
    this.getMeterlistdata()
  },
  watch: {
      userId: function(){
          this.getMeterlistdata()
      }
  }
}
</script>

<style>
#meterlist{
    width: 100%;
    height: 25%;
    background: transparent;
}
.title{
    font-size: 16px;
    color: #45d8e0;
    text-align: left;
}
.allcell div{
    background: transparent;
    color: #fff
}
.ivu-table-header th{
   background: transparent !important;	
}
.allcell td{
   background: transparent !important;
}
.ivu-table-row-hover{
    background: transparent !important;
}
</style>
