<template>
  <div class="content">
    <div style="height:100px">
       <div style="float:left;;margin-left:8px">
         <span style="color:#7ED2EE;font-size:20px">昨日报警数量</span><br/>
         <span class="led">{{alarmCount.yestodayCnt}}</span>
       </div>
       <div style="float:right;margin-right:16px">
           <span style="color:#7ED2EE;font-size:20px">累计报警数量</span><br/>
            <span class="led">{{alarmCount.accumulateCnt}}</span>
       </div>
    </div>
    <div style="height:calc(100% - 100px)">
       <div style="float:left;width:500px;height:100%;">
            <div style="height:60px">
                <Row>
                     <i-col span="10">
                        <Date-picker @on-change="getValue"  type="daterange" placeholder="请选择日期.."></Date-picker>
                    </i-col>
                     <i-col span="2">
                        <Button type="primary" shape="circle" icon="ios-search" @click="serachBtn" style="color:white;border-radius: 4px;">搜索</Button>
                    </i-col>
                </Row>
                <div style="margin-top:10px;color:#2D8CF0;padding-left: 12px;text-align: left;">注：点击饼图查看具体表具信息</div>
                
            </div>
            <div id="initPie" style="height:350px"></div>
       </div>
       <div style="margin-left:500px">
          <tables :pageSize='5' :tableData="tableData" :columns="arr"></tables>
       </div>
    </div>
  </div>
</template>

<script>
let that2=this;
import { FormatDate,getLastMonthDay } from '@/utils/validate'
import tables from './tables'


export default {
  name: 'opMt',
  components:{
      tables
  },
  data () { 
    return {
      startDate:getLastMonthDay(FormatDate(new Date())),
      endDate:FormatDate(new Date()),
      alarmCount:{},
      tableData:[],
      bing1:null,
      arr: [
            {
                title: '表具表号',
                key: 'meterNo'
            },
            {
                title: '用户名称',
                key: 'custName'
            },
            {
                title: '报警类型',
                key: 'alarmType'
            },
            {
                title: '报警时间',
                key: 'alarmTime'
            }
            ,
            {
                title: '状态',
                key: 'alarmFlag'
            }
        ]
    }
  },
  methods:{
      init(){//查询报警数量
          let that=this;
          this.$axios.get(API.host+'/hnkl/alarmSummary/getSummaryData')
            .then(function (response) {
                that.alarmCount=response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });

            that.$axios.get(API.host+'/hnkl/alarmSummary/getAlarmPage?startTime='+that.startDate+'&endTime='+that.endDate)
                .then(function (response) {
                    that.tableData=response.data.data.list;
                })
                .catch(function (error) {
                    console.log(error);
           });

      },
    intbing1(){
      let that=this;
      this.bing1 = this.$echarts.init(document.getElementById("initPie"));
      let option = {
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c}台 ({d}%)"
            },
            series : [
                {
                    name:'报警类型',
                    type:'pie',
                    radius : '55%',
                    center: ['40%', '40%'],
                    roseType: 'radius',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgb(190, 190, 190)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    },
                    data:[]
                }
            ]
        };

      //按报警类型统计数量
      this.$axios.get(API.host+'/hnkl/alarmSummary/countAlarmByType?startTime='+that.startDate+'&endTime='+that.endDate)
        .then(function (response) {
            let data=JSON.parse(JSON.stringify(response.data.data).replace(/cnt/g,"value")).sort(function (a, b) { return a.value - b.value; });
            option.series[0].data=data;
            that.bing1.setOption(option);
        })
        .catch(function (error) {
            console.log(error);
        });

        //点击饼图查看具体表具信息
       this.bing1.on('click', function (params) {
            that.$axios.get(API.host+'/hnkl/alarmSummary/getAlarmPage?startTime='+that.startDate+'&endTime='+that.endDate+'&alarmType='+params.name)
                .then(function (response) {
                    that.tableData=response.data.data.list;
                })
                .catch(function (error) {
                    console.log(error);
                });
          }); 
    },
    getValue(data){
       this.startDate=data[0];
       this.endDate=data[1];
    },
    serachBtn(){
        this.intbing1();
    }
  },
  mounted(){
      this.init();
      this.intbing1();
      window.onresize = function(){
        location.reload();
      }
  }
}
</script>

<style>
.ivu-input { 
      color: #fff !important;
      border: 1px solid #0469A3 !important;
      background-color: #093149 !important;
}
  @font-face {
    font-family: 'LED';
    src:url("../assets/font/UnidreamLED.ttf");
  }
 .content{
    width:100%;
    height:calc(100% - 80px);
    padding:10px 40px 10px 40px;
  }
  .led{
    font-weight: normal;
    font-family: "LED";
    color:red;
    font-size: 36px;
  }
  .aa{
    width: 95%;
    margin:0 auto;
    border: 1px solid #658eae;
    margin-top: 10px;
    border-collapse: collapse
  }
  .aa td{
    border: 1px solid #7ceeff;
    font-size: 14px;
    color: #fff
  }
  .t1{
    text-align: center;
    padding: 5px;
  }
</style>
