<template>
      <Content style="margin-left: 30px;height:100%;">
           <div style="display: flex;height:100%;flex-direction:column;justify-content:center;align-items:center;">
                 <div style="width: 100%;flex-grow:1;order:1;position:relative;">
                       <Row style="position:absolute;height:90%;width: 100%;padding:20px;background:url(static/biaoju2.png);background-size:100% 100%;">
                          <Col span="6" style="height:100%;color:#33BEF2;text-align:left;">
                              <p class="fontInfo">
                                <span>表具编号:</span>
                                <span>{{meterInfo.metreNo}}</span>
                              </p>
                              <p class="fontInfo">
                                <span>表具型号:</span>
                                <span>{{meterInfo.meterModel}}</span>
                              </p>
                               <p class="fontInfo">
                                <span>读表时间:</span>
                                <span>{{meterInfo.meterReadingTime}}</span>
                              </p>
                              <p class="fontInfo">
                                <span>阀门状态:</span>
                                <span>{{meterInfo.valveState}}</span>
                              </p>
                              <p class="fontInfo">
                                <span>表具状态:</span>
                                <span>{{meterInfo.meterStatus}}</span>
                              </p>
                               <p class="fontInfo">
                                <span>账户余额:</span>
                                <span>{{meterInfo.meterBalanceAmt}}</span>
                              </p>
                               <p class="fontInfo">
                                <span>当前状态:</span>
                                <span>{{meterInfo.onlineState}}</span>
                              </p>
                          </Col>
                          <Col span="6" style="height:100%;">
                              <div id="Dashboard1" style="height:100%;width:100%"></div>
                          </Col>
                          <Col span="6" style="height:100%;">
                             <div id="Dashboard2" style="height:100%;position:relative;width:100%">col-6</div>
                          </Col>
                          <Col span="6" style="height:100%;">
                            <div id="Dashboard3" style="height:100%;width:100%"></div>
                          </Col>
                      </Row>
                 </div>
                 <div style="width: 99%;flex-grow:2;order:2;position:relative;border: 2px solid #2BA2D4;box-shadow: 0px 0px 24px #31BBF0;">
                     <div style="position:absolute;height:100%;width:100%;">
                        <div style="display: flex;height:100%;flex-direction:column;justify-content:center;align-items:center;">
                            <div style="width: 100%;flex-grow:1;order:1;position:relative;">
                            <div style="position:absolute;height:100%;width:100%;">
                                <div style="height:45px;line-height:45px;">
                                    <Row style="padding-left:45px">
                                        <Col span="3" style="margin-right:15px">
                                            <DatePicker type="date" @on-change="getValue" :value="startDate" placeholder="开始日期" style="width:115px"></DatePicker>
                                        </Col>
                                        <Col span="3">
                                            <DatePicker type="date" @on-change="getValue1" :value="endDate"  placeholder="结束日期" style="width:115px"></DatePicker>
                                        </Col>
                                        <Col span="2">
                                            <Button type="primary" shape="circle" @click="serachFlowOralarm" icon="ios-search" style="color:white;border-radius: 4px;">搜索</Button>
                                        </Col>
                                        <Col span="6" offset="9">
                                            <ButtonGroup style="height:32px;line-height:32px;border:1px solid #2C4B5F;border-radius: 4px;">
                                                <button @click="toggleBtn(true)" type="button" :class="selectCheck? 'selectBtn':'dselectBtn'">瞬时流量</button>
                                                <button @click="toggleBtn(false)" type="button" :class="!selectCheck? 'selectBtn':'dselectBtn'">异常报警</button>
                                            </ButtonGroup>
                                        </Col>
                                    </Row>
                                    </div> 
                                <div id="Dashboard4" v-show="selectCheck" style="height:calc(100% - 50px);width:100%"></div> 
                                <div ref="Dashboard66" v-show="!selectCheck" style="height:calc(100% - 50px);width:100%">
                                     <table class="aa">
                                         <thead>
                                               <tr>
                                                    <td class="t1">报警类型</td>
                                                    <td class="t1">报警时间</td>
                                                    <td class="t1">状态</td>
                                                    <td class="t1">页面通知</td>
                                                    <td class="t1">短信通知</td>
                                                    <td class="t1">微信通知</td>
                                                    <td class="t1">电话通知</td>
                                                </tr>
                                         </thead>
                                         <tbody>
                                             <tr v-if="tableData.length > 0" v-for="item in tableData2" :key="item.index">
                                                    <td class="t1">{{item.alarmType}}</td>
                                                    <td class="t1">{{item.alarmTime}}</td>
                                                    <td class="t1">{{item.alarmFlag}}</td>
                                                    <td class="t1">{{item.webNoticeResult}}</td>
                                                    <td class="t1">{{item.smsNoticeResult}}</td>
                                                    <td class="t1">{{item.wechatNoticeResult}}</td>
                                                    <td class="t1">{{item.telNoticeResult}}</td>
                                                </tr>
                                                <tr v-if="tableData.length===0" >
                                                    <td class="t1" colspan="7">暂无数据</td>
                                                </tr>
                                         </tbody>
                                     </table>
                                    <Page :page-size="pWhight" :total="totalS" size="small" @on-change='changepage2' show-total style="float:right;margin-right:30px;margin-top:8px;"></Page>
                                </div> 

                                </div> 
                            </div>
                            <div style="width: 100%;flex-grow:1;order:2;position:relative;">
                            <div style="position:absolute;height:100%;width:100%;">
                                <div style="height:50px;line-height:45px;">
                                    <Row style="padding-left:45px">
                                       <Col span="3">
                                           <Select v-model="model1" @on-change="useLevel" style="width:115px;">
                                                <Option value='1'>日用量</Option>
                                                <Option value='2'>月用量</Option>
                                            </Select>
                                        </Col>
                                        <Col span="3">
                                            <DatePicker :type="model1 == 1? 'month':'year'" :value="dates" @on-change="getValue2"  style="width:115px"></DatePicker>
                                        </Col>
                                    </Row>
                                    </div> 
                                    <div id="Dashboard6" style="height:calc(100% - 50px);width:100%"></div>
                            </div>
                        </div>
                    </div>
                     </div>
                 </div>
           </div>
      </Content>
</template>

<script>
import { FormatDate,getLastMonthDay } from '@/utils/validate'
export default {
    props: {
      meterId: String
    },
    watch:{
        meterId(curVal,oldVal){
          this.startDate=getLastMonthDay(FormatDate(new Date()));//当前上一个月后日期
          this.endDate=FormatDate(new Date());//当前日期
          this.dates=FormatDate(new Date());
　　　　　 this.initInfo();
          this.initDashboard4();
          this.initDashboard5();
          this.initalarmSummary();
        },
         tableData:{
            handler(oldVal, newVal) {
                this.handleShowData2();　　　 // 表格刷新了，当前页标识需要回到第一页的位置
                this.current = 1;
            },
            deep: true
        }
　　},
   data () {
    return {
      MonthOpenAccount1:'',
      MonthOpenAccount2:'',
      MonthOpenAccount3:'',
      MonthOpenAccount4:'',
      MonthOpenAccount5:'',
      startDate:getLastMonthDay(FormatDate(new Date())),//当前上一个月后日期
      endDate:FormatDate(new Date()),//当前日期
      dates:FormatDate(new Date()),
      model1: '1',
      selectCheck:true,
      tableData:[],
      tableData2:[],
      current:0,
      pWhight:0,
      totalS:0,
      meterInfo:{},
      saveDayOrMonth:'1',
      Dashboard6Option:{},
      option : {
                  tooltip : {
                      formatter: "{a} <br/>{b} : {c}%"
                  },
                  series: [
                         {
                          type: 'gauge',
                          center : ['50%', '52%'],
                          radius:'110%',
                        //    min: 0,
                        //    max: 103,
                          axisLine: { 
                            show: false,
                            lineStyle: { 
                                width: 3
                            }
                          },
                          splitLine: { 
                              show: false
                          },
                          axisTick: {
                              show: false
                          },
                          axisLabel: {
                              show: false
                          },
                          pointer : { //指针样式
                              length: '45%'
                          },
                          detail: {
                              show: false
                          }
                      },
                      {
                          name: '业务指标',
                          type: 'gauge',
                          center : ['50%', '52%'],
                          radius:'90%',
                          title:{
                            color:"#0A9ACC",
                            offsetCenter:['0%',"95%"],
                          },
                          detail: {
                          color:"white",
                          fontSize:12,
                          offsetCenter:['-5%',"68%"],
                          formatter:'{value}'},
                          axisLine: {   // 坐标轴线
                              lineStyle: {    
                                width: 10,//宽度
                                color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                              },
                          },
                          axisLabel: {            // 坐标轴小标记
                              textStyle: {       // 属性lineStyle控制线条样式
                                  fontWeight: 'bolder',
                                  color: '#fff',
                                  shadowColor : '#fff', //默认透明
                                  shadowBlur: 10
                              }
                          },
                          axisTick: {            // 坐标轴小标记
                              length :15,        // 属性length控制线长
                              lineStyle: {       // 属性lineStyle控制线条样式
                                  color: 'auto',
                                  shadowColor : '#fff', //默认透明
                                  shadowBlur: 10
                              }
                          },
                          splitLine: {           // 分隔线
                              length :10,         // 属性length控制线长
                              lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                  width:3,
                                  color: '#fff',
                                  shadowColor : '#fff', //默认透明
                                  shadowBlur: 10
                              }
                          },
                          pointer: {           // 分隔线
                              shadowColor : '#fff', //默认透明
                              shadowBlur: 5
                          },
                          data:[]
                      }
                  ]
              }
        }
    },
  
  mounted(){
    let that=this;
    this.$nextTick(function () {
      this.initInfo();
      this.initDashboard4();
      this.initDashboard5();
      window.onresize=function(){
        that.initalarmSummary();
        that.MonthOpenAccount1.resize();
        that.MonthOpenAccount2.resize();
        that.MonthOpenAccount3.resize();
        that.MonthOpenAccount4.resize();
        that.MonthOpenAccount5.resize();
      }
    })
  },
   methods:{
     initInfo(){
           let that=this;
           this.$axios.get(API.host+'/hnkl/custMeter/meter/detail?meterId='+this.meterId).then(function (response) {
               that.meterInfo=response.data.data;
               that.initDashboard1();
               that.initDashboard2();
               that.initDashboard3();
            })
            .catch(function (error) {
                console.log(error);
            });
    },
      initDashboard1() {
          this.MonthOpenAccount1 = this.$echarts.init(document.getElementById('Dashboard1'));
          let ownOption=this.option;
          let val=this.meterInfo.pressure? this.meterInfo.pressure:0;
          ownOption.series[1].data= [{value: val, name: '压力(k/pa)'}]
          this.MonthOpenAccount1.setOption(this.option)
      },
      initDashboard2() {
            this.MonthOpenAccount2 = this.$echarts.init(document.getElementById('Dashboard2'));
             let ownOption=this.option;
               let val=this.meterInfo.workingFlow? this.meterInfo.workingFlow:0;
              ownOption.series[1].data= [{value: val, name: '流量(m/h)'}]
              this.MonthOpenAccount2.setOption(this.option)
      },
      initDashboard3() {
            this.MonthOpenAccount3 = this.$echarts.init(document.getElementById('Dashboard3'));
              let ownOption=this.option;
               let val=this.meterInfo.temperature? this.meterInfo.temperature:0;
              ownOption.series[1].data= [{value:val, name: '温度(℃)'}]
              this.MonthOpenAccount3.setOption(this.option)
      },
      initDashboard4() {
            let that=this;
            this.MonthOpenAccount4 = this.$echarts.init(document.getElementById('Dashboard4'));
            let option = {
              color:["#FFCC00","#43BFFF","#FF1D2A"],
                    legend: {
                        data: [
                            {name:"瞬时流量",textStyle:{color:"#fff"}},
                            {name:"压力",textStyle:{color:"#fff"}},
                            {name:"温度",textStyle:{color:"#fff"}}
                        ],
                        x: "center",
                        y: "top"
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        top:'20%',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                         axisTick: {//y轴刻度线
                            show: false
                        },
                       splitLine: { //网格线
                            show: true,
                            lineStyle:{
                                 color: "#36485E" //网格线颜色
                            }
                        },
                        axisLabel: {
                          textStyle: {
                              color: "#fff" //坐标值得具体的颜色
                          }
                      },
                      axisLine: {
                            lineStyle: {
                                color: "#36485E",
                                width: 1 //这里是为了突出显示加上的
                            }
                        },
                        data: []
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                              //网格线
                              show: true,
                              lineStyle:{
                                  color: "#36485E" //网格线颜色
                              }
                          },
                          axisTick: {
                              //y轴刻度线
                              show: false
                          },
                        axisLabel: {
                            textStyle: {
                                color: "#fff" //坐标值得具体的颜色
                            }
                        },
                        axisLine: {
                              lineStyle: {
                                  color: "#36485E",
                                  width: 1 //这里是为了突出显示加上的
                              }
                        }
                    },
                    series: [
                        {
                            name:'瞬时流量',
                            type:'line',
                            symbol: "none",
                            stack: '总量',
                            data:[]
                        },
                        {
                            name:'压力',
                            type:'line',
                            symbol: "none",
                            stack: '总量',
                            data:[]
                        },
                        {
                            name:'温度',
                            type:'line',
                            symbol: "none",
                            stack: '总量',
                            data:[]
                        }
                        
                    ]
                };

              this.MonthOpenAccount4.setOption(option);
             //查询表具瞬时流量
             this.$axios.get(API.host+'/hnkl/custMeter/meter/instFlow?meterId='+this.meterId+'&startDate='+JSON.stringify(JSON.parse(this.startDate.replace(/-/g,'')))+'&endDate='+JSON.stringify(JSON.parse(this.endDate.replace(/-/g,''))))
                .then(function (response) {
                     let data=response.data.data;
                     let xData=[];
                     let temperatureData=[];//温度
                     let pressureData=[];//压力
                     let standardFlowData=[];//标况流量

                     for(let i=0;i<data.length;i++){
                         xData.push(data[i].readingTime);
                         temperatureData.push(data[i].temperature)
                         pressureData.push(data[i].pressure)
                         standardFlowData.push(data[i].standardFlow)
                     };
                      
                      option.xAxis.data=xData;
                      option.series[0].data=standardFlowData;
                      option.series[1].data=pressureData;
                      option.series[2].data=temperatureData;
                      that.MonthOpenAccount4.setOption(option)
                })
                .catch(function (error) {
                    console.log(error);
                });
      },
      initDashboard5() {//表具日用量、月用量
            let that= this;
            this.MonthOpenAccount5 = this.$echarts.init(document.getElementById('Dashboard6'));
            this.Dashboard6Option = {
                tooltip: {
                        trigger: 'axis'
                    },
                 grid: {
                        top:'15%',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                  xAxis: {
                      type: 'category',
                       splitLine: {//网格线
                            show: false,
                            lineStyle:{
                                 color: "#36485E" //网格线颜色
                            }
                        },
                        axisLabel: {
                          textStyle: {
                              color: "#fff" //坐标值得具体的颜色
                          }
                      },
                      axisLine: {
                            lineStyle: {
                                color: "#36485E",
                                width: 1 
                            }
                        },
                      data: []
                  },
                  yAxis: {
                       type: 'value',
                       splitLine: {//网格线
                            show: true,
                            lineStyle:{
                                 color: "#36485E" //网格线颜色
                            }
                        },
                        axisTick: {
                            //y轴刻度线
                            show: false
                        },
                      axisLabel: {
                          textStyle: {
                              color: "#fff" //坐标值得具体的颜色
                          }
                      },
                      axisLine: {
                            lineStyle: {
                                color: "#36485E",
                                width: 1 //这里是为了突出显示加上的
                            }
                      }
                  },
                  series: [
                     {
                        type: 'line',
                        symbol: "none",
                        smooth:true,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: "#1AA8F9"
                                }
                            }
                        },
                        data: []
                    }
                  ]
              };  

          this.$axios.get(API.host+'/hnkl/custMeter/meter/qtyList/day?meterId='+this.meterId+'&date='+JSON.stringify(JSON.parse(this.dates.substring(0,7).replace(/-/g,'')))).then(function (response) {
                
                     let data=response.data.data;
                     let xData=[];
                     let amtData=[];

                     for(let i=0;i<data.length;i++){
                         xData.push(data[i].name);
                         amtData.push(data[i].amt)
                     };
                      
                      that.Dashboard6Option.xAxis.data=xData;
                      that.Dashboard6Option.series[0].data=amtData;
                      that.MonthOpenAccount5.setOption(that.Dashboard6Option)
          })

      },
      initalarmSummary(){//异常报警
          let that=this;
          this.$axios.get(API.host+'/hnkl/alarmSummary/getAlarmPage?startTime='+this.startDate+'&meterNo='+this.meterInfo.metreNo+'&endTime='+this.endDate)
                    .then(function (response) {
                        let datas=response.data.data.list;
                        let bW=Math.floor((that.$refs.Dashboard66.offsetHeight-64)/32);
                        that.pWhight=bW > 0?bW:1
                        that.tableData=datas;
                        that.totalS=datas.length;
                        that.handleShowData2()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
      },
      changepage2(index) {
      var _start = (index - 1) * this.pWhight
      var _end = index * this.pWhight
      this.tableData2 = this.tableData.slice(_start, _end)
     },
     handleShowData2(){
      if (this.tableData && this.tableData.length) {
        this.tableData2 = this.tableData.length
        if (this.tableData.length < this.pWhight) {
          this.tableData2 = this.tableData
        } else {
          this.tableData2 = this.tableData.slice(0, this.pWhight)
        }
      } else {
        this.tableData2 = []
        this.totalS = 0
      }
      this.current = 1
     },
      toggleBtn(bo){
          if(bo){
             this.selectCheck=true;
          }else{
              this.selectCheck=false;
              this.initalarmSummary();
          }
      },
      serachFlowOralarm(){//瞬间流量搜索按钮事件
            this.initDashboard4();
            this.initalarmSummary();
      },
       getValue(data){
         this.startDate=data;
       },
       getValue1(data){
        this.endDate=data;
      },
       getValue2(data){
         this.dates=data;
         switch(this.saveDayOrMonth){
                case "1"://查询表具日用量
                    this.initDayEchart();
                    break;
                case "2"://查询表具月用量
                    this.initmonthEchart();
                    break; 
            }
       },
       initDayEchart(){
            let that=this;
            this.$axios.get(API.host+'/hnkl/custMeter/meter/qtyList/day?meterId='+this.meterId+'&date='+JSON.stringify(JSON.parse(this.dates.substring(0,7).replace(/-/g,'')))).then(function (response) {
                let data=response.data.data;
                let xData=[];
                let amtData=[];

                for(let i=0;i<data.length;i++){
                    xData.push(data[i].name);
                    amtData.push(data[i].amt)
                };
                
                that.Dashboard6Option.xAxis.data=xData;
                that.Dashboard6Option.series[0].data=amtData;
                that.MonthOpenAccount5.setOption(that.Dashboard6Option)
            }).catch(function (error) {
                console.log(error);
            });
       },
       initmonthEchart(){
            let that=this;
            this.$axios.get(API.host+'/hnkl/custMeter/meter/qtyList/month?meterId='+this.meterId+'&date='+this.dates.substring(0,4)).then(function (response) {
                let data=response.data.data;
                let xData=[];
                let amtData=[];

                for(let i=0;i<data.length;i++){
                    xData.push(data[i].name);
                    amtData.push(data[i].amt)
                };
                
                that.Dashboard6Option.xAxis.data=xData;
                that.Dashboard6Option.series[0].data=amtData;
                that.MonthOpenAccount5.setOption(that.Dashboard6Option)
            }).catch(function (error) {
                console.log(error);
            });
       },
        useLevel(data){//切换日、月用量
            let that=this;
            this.saveDayOrMonth=data;
            switch(data){
                case "1"://查询表具日用量
                    this.initDayEchart();
                    break;
                case "2"://查询表具月用量
                    this.initmonthEchart();
                    break; 
            }
        }
    }
}
</script>

<style>
.selectBtn{
     width:73px;
     height:32px;
     line-height:32px;
     margin-left: -3px;
     background: #146798;
     color: white;
     border:none;
}
.dselectBtn{
    width:73px;
    height:32px;
    line-height:32px;
    margin-left: -3px;
    background: #093149;
    color: white;
    border:none;
}
.ivu-tabs-nav {
     float: right !important;
}
.ivu-tabs-bar {
    border-bottom: none;
    margin-bottom: 0;
}
.ivu-tabs .ivu-tabs-content-animated{
    height: calc(100% - 35px);
}
.ivu-input { 
    color: #fff;
    border: 1px solid #0469A3;
    background-color: #093149;
}
.ivu-page.mini .ivu-page-total {
    color:white;
}
.fontInfo{
    padding-left:16px;
    height:calc(100% / 7);
    font-size: 15px;
}
.aa{
    width: 95%;
    margin:0 auto;
    border: 1px solid #658eae;
    border-collapse: collapse
}
.aa td{
    border: 1px solid #658eae;
    font-size: 14px;
    color: #fff
}
.t1{
    text-align: center;
    padding: 5px;
}

</style>
