<template>
  <div id="line">
    <p class="line-font">最近十日用量(方)</p>
    <div id="tenline"></div>
  </div>
</template>

<script>
import { FormatDate,getLastDay,getLatelyDayArr } from '@/utils/validate'
export default {
    name: 'Tenline',
    data () {
      return {
        charts: '',
        xdatas: [],
        ydatas: [],
        startDate:getLastDay(FormatDate(new Date()),10),//当前日期前10天
        endDate:FormatDate(new Date()),
        tenDayAgo:getLatelyDayArr(new Date(),10)
      }
    },
    props: {
      userId:String
    },
    methods: {
        drawline() {
          console.log(this.tenDayAgo)
          this.charts = this.$echarts.init(document.getElementById("tenline"))
          this.charts.setOption({
          color: ['#658eae'],
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          grid: {
              top:'3%',
              left: '3%',
              right: '1%',
              bottom: '3%',
              containLabel: true
          },
          xAxis : [
              {
                  type : 'category',
                  axisLine:{
                    lineStyle:{
                      color: "#658eae"
                    }
                  },
                   axisLabel: { //坐标轴标签颜色
                    color: '#fff',
                  },
                  data : this.xdatas,
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  axisLabel: { //坐标轴标签颜色
                    color: '#fff',
                  },
                  axisLine:{ //轴线颜色
                    lineStyle:{
                      color: "#658eae"
                    }
                  },
                  axisTick: { //标签刻度线
                      show: false,
                      // alignWithLabel: true,
                      lineStyle: {
                        color: "#658eae",
                      }
                  },
                  splitLine:{ //坐标轴间隔线设置
                   lineStyle:{
                      color: "#658eae"
                    }
                  }
              }
          ],
          series : [
              {
                  name:'最近十日用量',
                  type:'bar',
                  temStyle: {
                    color: '#72dfff'
                  },
                  barWidth: '20px',
                  data: this.ydatas
              }]
          })
        },
        getTenlinedata () {
          let that=this;
          this.$axios({
            url: API.host+"/hnkl/custMeter/cust/dayGasQty",
            method: 'get',
            params: {
              custId:this.userId,
              startDate:this.startDate.replace(/-/g,""),
              endDate:this.endDate.replace(/-/g,"")
            }
          }).then((res)=>{
            let allData=res.data.data;
            if(allData.length>0) {
               let datas=allData.slice(-10).reverse();
              for(let i=0;i<datas.length;i++){
                that.xdatas.push(datas[i].name)
                that.ydatas.push(datas[i].amt)
              }
            }
            that.drawline()
          })
        }
    },
    mounted () {
          const that=this; //更改vue实例对象
          this.$nextTick(function () {
              if(this.userId){
                this.getTenlinedata()
              }
            window.onresize=function(){
              that.charts.resize()
            }
          })
    },
    watch: {
      userId: function () {
        // 清空原有数据
        this.xdatas=[]
        this.ydatas=[] 
        this.getTenlinedata()
      }
    }
}
</script>

<style scoped>
#line{
width: 100%;
height: 45%
}
#tenline{
width: 100%;
height: 90%
}
.line-font{
font-size: 16px;
color: #45d8e0;
text-align: left;
font-weight: normal;
}
</style>
