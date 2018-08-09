<template>
  <div class="Cline" id="Cline"></div>
</template>
<script>
  export default {
    name: 'Cline',
    data () {
      return {
        charts: '',
        legendData: [],
        xData: [],
        data17: [],
        data18: [],
        dataRate: []
      }
    },
    methods: {
      Cline(id){
        this.charts = this.$echarts.init(document.getElementById(id));
        this.charts.setOption({
          title: {
            padding: [10, 55],
            text: '用气量同比分析（万元）',
            textStyle:{
              color:'#73deff',//设置主标题字体颜色
              fontStyle:'',//主标题文字风格
              fontSize:16,
              fontWeight:100
            }
          },
          color:["#FFCC00","#43BFFF","#FF1D2A"],
          legend: {
            data: this.legendData,
            textStyle:{color:"#fff"},
            x: "75%",
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
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle:{
                color: "#36485E",
              }
            },
            axisLabel: {
              textStyle: {
                color: "#fff"

              }
            },
            axisLine: {
              lineStyle: {
                color: "#36485E",
                width: 2
              }
            },
            data: this.xData
          },
          yAxis:[
            {
              // min: 0,
              // max:1000,
              type: 'value',
              splitLine: {
                show: true,
                lineStyle:{
                  color: "#36485E"

                }
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                color:"#fff",
                textStyle: {
                  color: "#fff"
                },
                lineStyle:{
                  color:"#fff"
                }
              },
              axisLine: {
                lineStyle: {
                  color: "#36485E",
                  width: 2
                }
              }
            },
            {
              // min: -3,
              // max: 2,
              type: 'value',
              splitLine: {
                show: true,
                lineStyle:{
                  color: "#36485E"

                }
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                color:"#fff",
                textStyle: {
                  color: "#fff"
                },
                lineStyle:{
                  color:"#fff"
                }
              },
              axisLine: {
                lineStyle: {
                  color: "#36485E",
                  width: 2
                }
              }
            },
          ],
          // yAxis: {
          //   // name:'2017',
          //   type: 'value',
          //   splitLine: {
          //     show: true,
          //     lineStyle:{
          //       color: "#36485E"
          //     }
          //   },
          //   axisTick: {
          //     show: false
          //   },
          //   axisLabel: {
          //     textStyle: {
          //       color: "#fff"
          //     }
          //   },
          //   axisLine: {
          //     lineStyle: {
          //       color: "#36485E",
          //       width: 2
          //     }
          //   }
          // },
          series: [
            {
              name:'2017',
              type:'line',
              symbol: "none",
              stack: '总数',
              smooth:true,
              yAxisIndex:0,
              data:this.data17
            },
            {
              name:'2018',
              type:'line',
              symbol: "none",
              stack: '总数',
              smooth:true,
              yAxisIndex:0,
              data:this.data18
            },
            {
              name:'增长率',
              type:'line',
              symbol: "none",
              stack: '总数',
              smooth:true,
              yAxisIndex:1,
              data:this.dataRate
            }

          ]
        });
      },
      dataCline: function () {
        this.$axios.get('http://rap2api.taobao.org/app/mock/22587/example/1531986638172').then((res)=>{
          console.log(res.data.legendData);
          this.legendData=res.data.legendData   //箭头函数中this指当前组件(上下文)
          this.xData=res.data.xData
          this.data17=res.data.data17   //箭头函数中this指当前组件(上下文)
          this.data18=res.data.data18
          this.dataRate=res.data.dataRate
          this.Cline('Cline')  //在异步请求数据以后渲染echarts图表
        })
      }
    },
    created(){
      this.dataCline();
    }
    // mounted() {
    //   this.$axios(function() { //$nextTick方法在数据更新之后重新渲染dom
    //     this.Cline('Cline')
    //   })
    // }
  }
</script>
<style scoped>

</style>
