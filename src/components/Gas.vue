<template>
  <div class="chart">
    <div class="gas">
      <div class="gas-left" id="gas-consumption"></div>
      <div class="gas-right" id="user-number"></div>
    </div>
    <div class="Cline" id="Cline"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        charts: '',
        myChart:'',
        myChart1:'',
        money:[],
        price:[],
        client:[],
        ranking:[],
        legendData: [],
        xData: [],
        data17: [],
        data18: [],
        dataRate: []
      }
    },
    methods: {
      drawLine(){
        this.myChart = this.$echarts.init(document.getElementById('gas-consumption'));
        this.myChart.setOption({
          title: {
            padding: [10, 55],
            text: '用气量按价格分类',
            textStyle:{
              color:'#73deff',//设置主标题字体颜色
              fontStyle:'',//主标题文字风格
              fontSize:16,
              fontWeight:100
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            top:'16%',
            left: '4%',
            right: '4%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            axisTick: {
              show: false
            },
            splitLine:{
              color: '#000'
            },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#ababd2',//左边线的颜色
                width:'1'//坐标线的宽度
              }
            },
            axisLabel: {
              textStyle: {
                color: '#ccc',//坐标值得具体的颜色
              }
            },
            data: this.money
          },
          yAxis: {
            type: 'value',
            axisTick: {
              //y轴刻度线
              show: false
            },
            splitLine: {
              show: true,
              lineStyle:{
                color: "#36485E",
                width:1
              }
            },
            axisLine: {
              show:false,
              lineStyle: {
                type: 'solid',
                color: '#ababd2',//左边线的颜色
                width:1//坐标线的宽度
              }
            },
            axisLabel: {
              textStyle: {
                color: '#ababd2',//坐标值得具体的颜色
              }
            }
          },
          series: [{
            barWidth : 20,
            data: this.price,
            type: 'bar',
            itemStyle:{
              normal:{
                color:'#73deff',
                barBorderRadius:[5, 5, 5, 5]
              }
            }
          }]
        });
      },
      dataPrice: function () {
        let that=this;
        this.$axios.get(API.host+'/hnkl/gasAnalysis/getData').then((res)=>{
          const dataArrByPrice=res.data.data.dataArrByPrice;
          const newName=[];
          const newAmt=[];
          for(let i =0;i<dataArrByPrice.length;i++){
            let name=dataArrByPrice[i].name;
            newName.push(name);
          }
          for(let j =0;j<dataArrByPrice.length;j++){
            let amt=dataArrByPrice[j].amt;
            newAmt.push(amt);
          }
          that.money=newName;
          that.price=newAmt;
          that.drawLine();
        }).catch(function (error) {
                console.log(error);
            });
      },
      drawLine1(){
        this.myChart1 = this.$echarts.init(document.getElementById('user-number'));
        this.myChart1.setOption({
          title: {
            padding: [10, 55],
            text: '用户用气量TOP10排名',
            textStyle:{
              color:'#73deff',//设置主标题字体颜色
              fontStyle:'',//主标题文字风格
              fontSize:16,
              fontWeight:100
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            top:'14%',
            left: '5%',
            right: '2%',
            bottom: '0%',
            containLabel: true
          },
          xAxis: {
            show:false,
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
              axisTick: {
              //y轴刻度线
              show: false
            },
            axisLine: {
              show:false,
              lineStyle: {
                type: 'solid',
                color: '#ccc',//左边线的颜色
                width:'1'//坐标线的宽度
              }
            },
            axisLabel: {
              textStyle: {
                color: '#ababd2',//坐标值得具体的颜色
                fontSize:14
              }
            },
            data: this.client
          },
          series: [
            {
              barWidth : 10,
              type: 'bar',
              data: this.ranking,
              itemStyle:{
                normal:{
                  color:'#f07c31',
                  barBorderRadius:[200, 200, 200, 200]
                }
              }
            }

          ]
        });
      },
      dataGas: function () {
        let that=this;
        this.$axios.get(API.host+'/hnkl/gasAnalysis/getData').then((res)=>{
          const top10=res.data.data.top10;
          const newName=[];
          const newAmt=[];
          for(let i =0;i<top10.length;i++){
            let name=top10[i].name;
            newName.push(name);
          }
          for(let j =0;j<top10.length;j++){
            let amt=top10[j].amt;
            newAmt.push(amt);
          }
          that.client=newName;   //箭头函数中this指当前组件(上下文)
          that.ranking=newAmt;
          that.drawLine1()  //在异步请求数据以后渲染echarts图表
        }).catch(function (error) {
                console.log(error);
            });
      },
      Cline(){
        this.charts = this.$echarts.init(document.getElementById('Cline'));
        this.charts.setOption({
          title:{
            padding: [10, 55],
                  text: '用气量同比分析（万元）',
                  textStyle:{
                    color:'#73deff',//设置主标题字体颜色
                    fontStyle:'',//主标题文字风格
                    fontSize:16,
                    fontWeight:100
                  }
          },
          tooltip: {
                  trigger: 'axis',
            //     formatter:function(params){
            //       var a = (params[2].value*100).toFixed(2) + "%";
            //       return params[0].name+"<br/>"+
            //         params[0].marker+params[0].seriesName+":"+params[0].value+"<br/>"+
            //         params[1].marker+params[1].seriesName+":"+params[1].value+"<br/>"+
            //         params[2].marker+params[2].seriesName+":"+a;
            // }
          },
          grid:{
            top:'20%',
            left: '2%',
            right: '3%',
            bottom: '3%',
            containLabel: true
          },
          color:["#ffc800","#40beff","#f82512"],
          legend:{
             data: this.legendData,
             x: "75%",
             y: "3%",
             textStyle:{
               color:"#fff"
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
            axisLine: {
              lineStyle: {
                color: "#36485E",
                width: 2
              }
            },
            splitLine: {
               show: true,
               lineStyle:{
                    color: "#36485E",
                }
            },
            data: this.xData
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
                  fontSize:16
                }
              }
            },
            {
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
                  return value + "%"
                }
              }
            }
          ],
          series: [
            {
              name:'2017',
              type:'line',
              smooth: true,
              data:this.data17
            },
            {
              name:'2018',
              type:'line',
              smooth: true,
              data:this.data18
            },
            {
              name:'增长率',
              type:'line',
              smooth: true,
              yAxisIndex:1,
              data:this.dataRate
            }
          ]
        });
      },
      dataCline: function () {
        let that=this;
        this.$axios.get(API.host+'/hnkl/gasAnalysis/getData').then((res)=>{
          const yearData=res.data.data.yearData;
          const month=[];
          const DaMonth=[];
          const data17=[];
          const data18=[];
          const data2017=[];
          const data2018=[];
          const dataRate=[];
          const DaRate =[];
          for(let i =0;i<yearData.length;i++){
            let months=yearData[i].name;
            month.push(months);
          }
          for(let i =0;i<month.length;i++){
            let DaMonths=month[i]+"月";
            DaMonth.push(DaMonths);
          }
          for(let i =0;i<yearData.length;i++){
            let d2017 =yearData[i][2017];
            if(d2017){
              data17.push(d2017);
            }
          }
          for(let j=0;j<data17.length;j++){
            let D2017 = Math.round(data17[j]/10000*100)/100;
            data2017.push(D2017)
          }
          for(let i =0;i<yearData.length;i++){
            let d2018 =yearData[i][2018];
            if(d2018){
              data18.push(d2018);
            }
          }
          for(let j=0;j<data18.length;j++){
            let D2018 = Math.round(data18[j]/10000*100)/100;
            data2018.push(D2018)
          }
          for(let i =0;i<yearData.length;i++){
            let rate =yearData[i].rate;
            if(rate){
              dataRate.push(rate);
            }
          }
          for(let j=0;j<dataRate.length;j++){
            let rRate = Math.round(dataRate[j]*100*100)/100;
            DaRate.push(rRate)
          }
          that.legendData=res.data.legendData;   //箭头函数中this指当前组件(上下文)
          that.xData=DaMonth;
          that.data17=data2017 ;  //箭头函数中this指当前组件(上下文)
          that.data18=data2018;
          that.dataRate=DaRate;
          that.Cline();  //在异步请求数据以后渲染echarts图表
        }).catch(function (error) {
                console.log(error);
        });
      }
    },
    mounted(){
      let that=this; //更改vue实例对象
        this.$nextTick(function () {
        this.dataPrice();
        this.dataGas();
        this.dataCline();
         window.onresize=function(){
          that.myChart.resize();
          that.myChart1.resize();
          that.charts.resize();
        }
      })
     
    }
  }
</script>

