<template>
  <div class="content">
    <div class="box">
      <div class="wenzi">
        <table>
          <tr>
            <td>本月交易笔数</td>
            <td>本月交易金额</td>
            <td>累计交易金额</td>
             <td>累计交易笔数</td>
          </tr>
          <tr>
            <td class="led">{{monthAmt}}</td>
            <td class="led">{{monthM}}</td>
            <td class="led">{{allM}}</td>
            <td class="led">{{allAmt}}</td>
          </tr>
          <tr>
            <td>昨日交易笔数</td>
            <td>昨日交易金额</td>
            <td>年月</td>
          </tr>
          <tr>
            <td class="led">{{yesAmt}}</td>
            <td class="led">{{yesM}}</td>
            <td class="led">{{yearMonth}}</td>
          </tr>
        </table>
      </div>
      <div class="bingBox">
        <div id="bing1"></div>
        <div id="bing2"></div>
      </div>
    </div>
    <div class="box" id="xian1"></div>
    <div class="box" id="biao1">

    </div>
  </div>
</template>

<script>
export default {
  name: 'opMt',
  data () {
    return {
      monthAmt:0,
      monthM:0,
      allM:0,
      yesAmt:0,
      yesM:0,
      allAmt:0,
      yearMonth:"0",
      bing1:null,
      bing2:null,
      xian1:null,
      sellChart:null,
    }
  },
  methods:{
    intbing1(data){
      this.bing1 = this.$echarts.init(document.getElementById("bing1"));
      let option = {
        graphic:{
          elements:[{
            type:"text",
            left:"center",
            top:"center",
            style:{
              text:" 按客户\n类型分类",
              fill:"#7ed5e9",
              font:"1.3em 'STHeiti', sans-serif"
            }
          }]
        },
        tooltip:{
          show:true,
        },
        color:["#636363","#80d1ef","#e4c7e5","#418c9f"],
        legend:{
          show:false,
          data:data.xvalue
        },
        series: [
          {
            type:'pie',
            radius: ['55%', '70%'],
            hoverAnimation:false,
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'outside',
                color:"#8cd6fd",
                fontSize:16
              },
            },
            labelLine: {
              normal: {
                show: true,
                smooth: 0.2,
                length: 8,
                length2: 10
              }
            },
            data:data.value
          }
        ]
      };
      this.bing1.setOption(option);
    },
    intbing2(data){
      this.bing2 = this.$echarts.init(document.getElementById("bing2"));
      let option = {
        graphic:{
          elements:[{
            type:"text",
            left:"center",
            top:"center",
            style:{
              text:"按渠道\n  分类",
              fill:"#7ed5e9",
              font:"1.5em 'STHeiti', sans-serif"
            }
          }]
        },
        tooltip:{
          show:true,
        },
        color:["#636363","#80d1ef","#e4c7e5","#418c9f"],
        legend:{
          show:false,
          data:data.xvalue
        },
        series: [
          {
            type:'pie',
            radius: ['55%', '70%'],
            hoverAnimation:false,
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'outside',
                color:"#8cd6fd",
                fontSize:16
              },
            },
            labelLine: {
              normal: {
                show: true,
                smooth: 0.2,
                length: 8,
                length2: 10
              }
            },
            data:data.value
          }
        ]
      };
      this.bing2.setOption(option);
    },
    intxian1(data){
      this.xian1 = this.$echarts.init(document.getElementById("xian1"));
      let option = {
        title:{
          text:"年销售同比增长",
          textStyle:{
            color:"#8cd6fd",
            fontSize:16
          },
          left:'0'
        },
        tooltip:{
          // trigger:"axis",
          show:true,
        },
        grid:{
          left:60,
          right:60,
          bottom:25,
          top:30
        },
        color:["#ffc800","#40beff","#f82512"],
        legend:{
            x: "right",
             y: "top",
          data:["2017","2018","增长率"],
          textStyle:{
            color:"#fff",
           
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          data: data.xvalue
        },
        yAxis: [
          {
            axisTick: {
              show: false
            },
            splitLine:{
              lineStyle:{
                color:"#6f7d98"
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff',
                fontSize:12
              },
              formatter:function(value){
                return value/10000+"万"
              }
            }
          },
          {
            // min:-1,
            // max:1,
            axisTick: {
              show: false
            },
            splitLine:{
              show:false,
              lineStyle:{
                color:"#6f7d98"
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              },
              formatter:function(value){
                return value*100 + "%"
              }
            }
          }
        ],
        series: [
          {
            name:'2017',
            type:'line',
            smooth: true,
            data: data.value1
          },
          {
            name:'2018',
            type:'line',
            smooth: true,
            data: data.value2
          },
          {
            name:'增长率',
            type:'line',
            smooth: true,
            yAxisIndex:1,
            data: data.value3,
            tooltip:{
              formatter:function(params, ticket, callback){
                var a = (params.value*100).toFixed(2) + "%";
                return params.seriesName + "<br/>" + params.marker + params.name + ":" + a;
              }
            }
          }
        ]
      };
      this.xian1.setOption(option)
    },
    yearSell(data){
      this.sellChart = this.$echarts.init(document.getElementById('biao1'));
      let option = {
        title:{
          text:"年销售数据(万元)",
          textStyle:{
            color:"#8cd6fd",
            fontSize:16
          },
          left:'0'
        },
        tooltip:{
          show:true,
        },
        grid:{
          left:60,
          right:60,
          bottom:25,
          top:30
        },
        legend:{
          show:true,
            x: "right",
            y: "top",
          data:[
            {name:new Date().getFullYear()-1,icon:"pin"},
            {name:new Date().getFullYear(),icon:"pin"}
          ],
          textStyle:{
            color:"#fff"
          },
        },
        xAxis: {
          data: data.xvalue,
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 1
        },
        yAxis: {
          axisLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          splitLine:{
            lineStyle:{
              color:"#455A6F"
            }
          },
          axisLabel: {
            textStyle: {
              color: '#fff'
            },
            formatter:function(value){
                return value/10000+"万"
              }
          }
        },
        series: [
          {
            type: 'bar',
            name:new Date().getFullYear()-1,
            itemStyle: {
              normal: {color: '#7ed2ee',barBorderRadius:8},
            },
            barMaxWidth:18,
            barCategoryGap:'40%',
            data: data.value1,
            animation: false,
            z:1
          },
          {
            type: 'bar',
            name:new Date().getFullYear(),
            barMaxWidth:18,
            itemStyle: {
              normal: {
                color: "#e2c8e5",
                barBorderRadius:8
              },
              emphasis: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#2378f7'},
                    {offset: 0.7, color: '#2378f7'},
                    {offset: 1, color: '#83bff6'}
                  ]
                )
              }
            },
            z:2,
            data: data.value2
          }
        ]
      };
      this.sellChart.setOption(option);
    }
  },
  created(){

  },
  mounted(){
    let that = this;
    this.axios.get(API.host + "/hnkl/operMonit/getData").then(function(res){
      let data=res.data.data;
    //  console.log(data)
      that.monthAmt = data.monthData? data.monthData.cnt:0;
      that.monthM = data.monthData? data.monthData.amt:0;
      that.allM = data.accumulateData? data.accumulateData.amt:0;
      that.yesAmt = data.yestodayData?data.yestodayData.cnt:0;
      that.yesM = data.yestodayData?data.yestodayData.cnt:0;
      that.allAmt = data.accumulateData? data.accumulateData.cnt:0;
      that.yearMonth = data.monthData? data.monthData.name:0;
     
      let tbData = {
        xvalue:[],value1:[],value2:[],value3:[]
      }
      let xvalue = [];let value1=[];let value2=[];let value3=[];
       
      data.yearData.forEach(function(item,index){  //年销售月同比增长
        tbData.xvalue.push(item.name+"月");
          tbData.value1.push(item['lastYear']);
          tbData.value2.push(item['thisYear']);
          tbData.value3.push(Math.round(item.rate * 10000)/10000);
      })
    

      that.intxian1(tbData);
      let bing1Data = {
        xvalue:[],value:[]
      }
   
        if(data.dataArrByCustType.length > 0){
            data.dataArrByCustType.forEach(function(item,index){//按客户类型统计  有问题
              bing1Data.xvalue.push(item.name);
              bing1Data.value.push({name:item.name,value:item.amt})
            })
        }else{
            bing1Data.xvalue=['公服','工业','商业','供热'];
            bing1Data.value=[{name:'公服',value:0},{name:'工业',value:0},{name:'商业',value:0},{name:'供热',value:0}]
        }
    
     
      that.intbing1(bing1Data);
      let bing2Data = {
        xvalue:[],value:[]
      }
       if(data.dataArrByCustType.length > 0){
          res.data.data.dataArrByPayMethod.forEach(function(item,index){//按渠道分类
            bing2Data.xvalue.push(item.name);
            bing2Data.value.push({name:item.name,value:item.amt});
          })
       }else{
            bing2Data.xvalue=['其他','营业厅','自助','银行'];
            bing2Data.value=[{name:'其他',value:0},{name:'营业厅',value:0},{name:'自助',value:0},{name:'银行',value:0}]
        }

      that.intbing2(bing2Data);
      that.yearSell(tbData)
    }).catch(function (error) {
                console.log(error);
            });
    window.onresize = function(){
      location.reload();
    }
  }
}
</script>

<style scoped>
  *{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  @font-face {
    font-family: 'LED';
    src:url("../assets/font/UnidreamLED.ttf");
  }
  .content{
    width:100%;
    height:100%;
    padding:10px 40px 10px 40px;
    color:#fff;
    top: 70px;
    left: 0px;
    background: transparent
  }
  .box{
    width:100%;
    height:33.3%;
    /*overflow: hidden;*/
  }
  .box:first-child>div{
    width:50%;
    height:100%;
    float: left;
  }
  .bingBox>div{
    width:50%;
    height:100%;
    float: left;
  }
  .wenzi table{
    width:100%;
    height:100%;
    table-layout: fixed;
    color: #7bcbe2;
    font-weight: bold;
  }
  .wenzi table tr{
    border:1px solid white;
   height: 16px;
  }
  .wenzi td{
    font-size: 16px;
  }
  .wenzi td.led{
    font-weight: normal;
    font-family: "LED";
    color:#EE8629;
    font-size: 22px;
  }
  #biao1 .title{
    color:#7bcbe2;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
  }
  #biao1 table{
    width:100%;
    height:100%;
    table-layout: fixed;
    font-size: 1.5em;
  }
  #biao1 table tr td{
    border-top:1px solid #fff;
  }
  #biao1 table tr:last-child td{
    border-bottom:1px solid #fff;
  }
  #biao1 table tr:nth-child(2){
    background: #2c98bc;
  }
</style>
