<template>
  <div class="content">
    <div class="box1">
      <div class="yqQushiBox">
        <div class="title">
          本月工商用气量(万方)
        </div>
        <div class="led">{{monthGasQty}}</div>
        <div id="yqQushi"></div>
      </div>
      <div id="twoBing">
        <div class="title">
          本月截止工商总表数(块)
        </div>
        <div class="led">{{meterNum}}</div>
        <div class="bing" id="bing1"></div>
        <div class="bing" id="bing2"></div>
      </div>
    </div>
    <div class="box2">
      <div id="totalQushi"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gasMonitor-com',
  data () {
    return {
      monthGasQty:0,
      meterNum:0,
      chart1:null,
      bing1:null,
      bing2:null,
      chart2:null
    }
  },
  methods:{
    intchart1(data){
      this.chart1 = this.$echarts.init(document.getElementById('yqQushi'));
      let option = {
        title:{
          text:"用气量趋势图(万方)",
          textStyle:{
            color:"#8cd6fd",
            fontWeight:"normal"
          },
          left:'40'
        },
        tooltip:{
          show:true,
          trigger: 'axis',
          axisPointer: {
              type: 'line'
          },
          formatter: function(params) {  
              var res ='';  
              var xA=option.xAxis.data;
              var myseries = params[1].data;  
              var i=xA.indexOf(params.name);
              res = params[1].axisValue+'<br>用气量:'+myseries+'</br>';  
              return res;  
          } 
        },
        grid:{
          top:'15%',
          left:40,
          right:40
        },
        xAxis: {
          data: data.value1,
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
          // z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
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
              color: '#fff'
            }
          }
        },
        series: [
          {
            type: 'bar',
            itemStyle: {
              normal: {color: '#48474c'},
            },
            barWidth:14,
            barGap:'-100%',
            barCategoryGap:'40%',
            data: data.value3,
            animation: false,
            // z:1
          },
          {
            type: 'bar',
            barWidth:14,
            itemStyle: {
              normal: {
                color: "#6ee0ff"
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
            // tooltip:{
            //   formatter:function(params){
            //     return data.value2[params.dataIndex] + ":" + params.value;
            //   }
            // },
            // z:2,
            data: data.monthAmt
          }
        ]
      };
      this.chart1.setOption(option);
    },
    intbing1(data){
      this.bing1 = this.$echarts.init(document.getElementById("bing1"));
      let option = {
        graphic:{
          elements:[{
            type:"text",
            left:"center",
            top:"center",
            style:{
              text:"用气量按用\n户类型分类",
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
          data:data.x
        },
        series: [
          {
            name:'',
            type:'pie',
            radius: ['55%', '70%'],
            hoverAnimation:false,
            avoidLabelOverlap: true,
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
            data:data.y
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
              text:"用户数按\n用户分类",
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
          data:data.x
        },
        series: [
          {
            name:'',
            type:'pie',
            radius: ['55%', '70%'],
            hoverAnimation:false,
            avoidLabelOverlap: true,
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
            data:data.y
          }
        ]
      };
      this.bing2.setOption(option);
    },
    intchart2(data){
      this.chart2 = this.$echarts.init(document.getElementById("totalQushi"));
      let option = {
        title:{
          text:"累计用气量趋势图(万方)",
          textStyle:{
            color:"#8cd6fd",
            fontWeight:"normal"
          },
          left:'40'
        },
        grid:{
          top:'15%',
          left:40,
          right:40,
          bottom:'10%'
        },
        tooltip:{
          show:true,
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
          data: data.value1
        },
        yAxis: {
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
              color: '#fff'
            }
          }
        },
        series: [{
          data: data.value,
          type: 'line',
          smooth:true,
          lineStyle:{
            normal:{
              color:"#50b0d8"
            }
          },
          areaStyle: {
            normal:{
              color:"#3588a8"
            }
          },
          tooltip:{
            formatter:function(params){
              return data.value2[params.dataIndex] + ":" + params.value;
            }
          },
        }]
      };
      this.chart2.setOption(option);
    }
  },
  mounted(){
    let that = this;
    this.$nextTick(function () {
      this.axios.get(API.host + "/hnkl/gasMonitor/getData").then(function(res){
        that.monthGasQty = res.data.data.monthGasQty;
        let value1 = [];
        let value2 = [];
        let monthAmt = [];
        let totalAmt = [];
        res.data.data.dataArrByMonth.forEach(function(item,index){
          let a = item.name.substring(4).replace(/\b(0+)/gi,"");
          value1.push(a+"月")
          value2.push(item.name.substring(0,4) + "年"+ a + "月");
          monthAmt.push(item.amt);
          totalAmt.push(item.accumulateAmt);
        })
        let a = (parseInt(Math.max(...monthAmt))).toString();
        // let b = a.replace(/(?<!^)\w/gi,"0");
        // b = b.replace(/^./gi,parseInt(a.charAt(0))+1);
        let value3 = [];
        for(let i = 0;i < monthAmt.length; i++){
          value3.push(parseInt(a));
        }
        //本月工商用气量
        that.intchart1({value1:value1,value2:value2,value3:value3,monthAmt:monthAmt});
        //累计用气量趋势图
        that.intchart2({value1:value1,value2:value2,value:totalAmt});
        let bvalue1=[];let bcnt=[];let bamt=[];
        res.data.data.dataArrByCustType.forEach(function(item,index){
          bvalue1.push(item.name);
          bcnt.push({name:item.name,value:item.cnt});
          bamt.push({name:item.name,value:item.amt});
        })
        //饼图1
        that.intbing1({x:bvalue1,y:bamt});
        that.intbing2({x:bvalue1,y:bcnt});
      }).catch(function (error) {
                console.log(error);
            });
      this.axios.get(API.host + "/hnkl/gasAnalysis/getData").then(function(res){
        that.meterNum = res.data.data.meterNum;
      }).catch(function (error) {
                console.log(error);
            });
      window.onresize = function(){
        location.reload();
      }
    })
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
    left:0;
    top:70px;
    background: transparent
  }
  .box1{
    width:100%;
    height:58%;
    display: flex;
  }
  .yqQushiBox{
    width:50%;
    height:100%;
  }
  .title{
    font-size: 20px;
    color: #7ed2ee;
    /* font-weight: bold; */
    height:30px;
    line-height: 30px;
  }
  .led{
    font-family: "LED";
    font-size: 36px;
    height:30px;
    line-height: 30px;
    color: #EE8629;
  }
  #yqQushi{
    width:100%;
    height:calc(100% - 60px);
  }
  #twoBing{
    width:50%;
    height:100%;
    overflow: hidden;
  }
  #twoBing .bing{
    width:50%;
    height:calc(100% - 60px);
    float: left;
  }

  .box2{
    width:100%;
    height:42%;
  }
  #totalQushi{
    width:100%;
    height:100%;
  }
  .title{
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
