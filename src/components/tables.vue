<template>
    <div style="height:300px">
      <Table :columns='columns' :data='showData' :ref="refLabel" :loading="loading" border :no-data-text="'<span class=\'no-data-text \' ><i class=\'icon-no-data\'></i>暂无数据</span>'"></Table>
      <Page :total='dataCount' :page-size='pageSize' :show-total='isShowTotal' :current.sync="current" class='paging' @on-change='changepage'></Page>
    </div>
</template>
<style>
  .paging{
      float:right;
      margin-top:20px;
  }
  .ivu-table {
    background-color: transparent !important;
  }
  .ivu-table td {
       color:#B7B9D5;
        background-color: transparent !important;
  }
  .ivu-table th {
     color:#B7B9D5;
     background-color: #093149 !important;
  }
  .ivu-page-total{
    color:#cccccc
  }
</style>
<script>
export default {
  data () {
    return {
      ajaxHistoryData: [],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      showData: [],
      current: 1
    }
  },
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    columns: {
      type: Array
    },
    isShowTotal: {
      type: Boolean,
      default: true
    },
    tableData: {
      type: Array
    },
    refLabel: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 获取历史记录信息
    handleShowData () {
      if (this.tableData && this.tableData.length) {
        // 保存取到的所有数据
        this.dataCount = this.tableData.length
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if (this.tableData.length < this.pageSize) {
          this.showData = this.tableData
        } else {
          this.showData = this.tableData.slice(0, this.pageSize)
        }
      } else {
        this.showData = []
        this.dataCount = 0
      }
      this.current = 1
    },
    currentChange (value) {
    },
    changepage (index) {
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.showData = this.tableData.slice(_start, _end)
    }
  },
  created () {
    this.handleShowData()
  },
  watch: {
    tableData (oldVal, newVal) {
      this.handleShowData();　　　 // 表格刷新了，当前页标识需要回到第一页的位置
      this.current = 1;
    }
  }
}
</script>