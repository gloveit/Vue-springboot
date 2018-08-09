<template>
    <div class="body">
      <div class="body-l">
        <span class="block">本月工商总数（户）</span>
        <span class="color">{{custNum}}</span>
      </div>
      <div class="body-l">
        <span class="block">本月截至工商总表数（块）</span>
        <span class="color">{{meterNum}}</span>
      </div>
      <div class="body-l">
        <span class="block">本月工商气量总数（方）</span>
        <span class="color">{{yestodayGasQty}}</span>
      </div>
      <div class="body-l">
        <span class="block">本年累计用气量（方）</span>
        <span class="color">{{totalGasQty}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        custNum:0,
        meterNum:0,
        yestodayGasQty:0,
        totalGasQty:0
      }
    },
    methods:{
      dataAjax: function(){
        this.$axios.get(API.host+'/hnkl/gasAnalysis/getData').then((res)=>{
          this.custNum=res.data.data.custNum;
          this.meterNum=res.data.data.meterNum;
          this.yestodayGasQty=res.data.data.yestodayGasQty;
          this.totalGasQty=res.data.data.totalGasQty;
        })
      }
    },
    beforeMount () {
      this.dataAjax()
    }
  }
</script>
