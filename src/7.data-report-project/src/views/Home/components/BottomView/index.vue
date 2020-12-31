<template>
  <div class="bottom_view">
    <el-card shadow="hover" class="keyword_search">
      <div slot="header">
        <span>关键词搜索</span>
      </div>
      <div class="chart_box">
        <v-chart :options="chartOption1"></v-chart>
        <v-chart :options="chartOption2"></v-chart>
      </div>
      <div class="table_box">
        <el-table :data="tableData" height="100%">
          <el-table-column prop="rank" label="排名" />
          <el-table-column prop="keyword" label="关键词" />
          <el-table-column prop="count" label="总搜索量" />
          <el-table-column prop="users" label="搜索用户数" />
          <el-table-column prop="range" label="搜索占比" />
        </el-table>
      </div>
      <div class="page_box">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          background
          @current-change="onPageChange"
        />
      </div>
    </el-card>
    <el-card shadow="hover" class="class_sales_rank">
      <div slot="header">
        <span>分类销售排行</span>
        <el-radio-group
          v-model="activeRadio"
          style="float: right; position: relative; bottom: 5px"
          @change="radioChange"
        >
          <el-radio-button label="品类"></el-radio-button>
          <el-radio-button label="商品"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="chart_box">
        <v-chart :options="chartOption3"></v-chart>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeRadio: '品类',
      chartOption1: {},
      chartOption2: {},
      totalData: [],
      tableData: [],
      total: 0,
      pageSize: 4,
      chartOption3: {}
    }
  },
  mounted() {
    this.getOption1()
    this.getOption2()
    this.getOption3('品类')
    this.getTotalData()
    console.log(this.$screenData.category)
  },
  methods: {
    getTotalData() {
      this.totalData = this.$screenData.wordCloud.map((item, index) => {
        return {
          id: index + 1,
          rank: index + 1,
          keyword: item.word,
          count: item.count,
          users: item.user,
          range: `${((item.user / item.count) * 100).toFixed(2)}%`
        }
      })
      this.total = this.totalData.length
      this.getTableData(1)
    },
    getTableData(currentPage) {
      this.tableData = this.totalData.slice(
        this.pageSize * (currentPage - 1),
        this.pageSize * (currentPage - 1) + this.pageSize
      )
    },
    getOption1() {
      this.chartOption1 = {
        title: {
          text: '搜索用户数',
          textStyle: {
            color: '#999',
            fontSize: 14
          },
          subtext: '87,265',
          subtextStyle: {
            fontSize: 22,
            color: '#333',
            fontWeight: 500,
            letterSspacing: 2
          },
          left: 0,
          top: 0
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: 50,
          bottom: 0,
          left: 7,
          right: 10
        },
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false, // 默认图表距坐标轴的距离
          data: this.$screenData.wordCloud.map(v => v.word)
        },
        yAxis: {
          show: false
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: this.$screenData.wordCloud.map(v => v.user),
            areaStyle: {
              color: 'rgba(95,187,255,.5)'
            },
            lineStyle: {
              color: 'rgb(95,187,255)'
            },
            itemStyle: {
              opacity: 0
            }
          }
        ]
      }
    },
    getOption2() {
      this.chartOption2 = {
        title: {
          text: '搜索量',
          textStyle: {
            color: '#999',
            fontSize: 14
          },
          subtext: '204,395',
          subtextStyle: {
            fontSize: 22,
            color: '#333',
            fontWeight: 500,
            letterSspacing: 2
          },
          left: 7,
          top: 0
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: 50,
          bottom: 0,
          left: 15,
          right: 0
        },
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false, // 默认图表距坐标轴的距离
          data: this.$screenData.wordCloud.map(v => v.word)
        },
        yAxis: {
          show: false
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: this.$screenData.wordCloud.map(v => v.count),
            areaStyle: {
              color: 'rgba(95,187,255,.5)'
            },
            lineStyle: {
              color: 'rgb(95,187,255)'
            },
            itemStyle: {
              opacity: 0
            }
          }
        ]
      }
    },
    getOption3(type) {
      const source =
        type === '品类'
          ? this.$screenData.category.data1
          : this.$screenData.category.data2
      const total = source.data1.reduce((prev, total) => prev + total, 0)
      const data = source.axisX.map((item, index) => {
        const percent = `${((source.data1[index] / total) * 100).toFixed(2)}%`
        return {
          legendname: source.axisX[index],
          name: `${source.axisX[index]} | ${percent}`,
          value: source.data1[index],
          percent
        }
      })
      this.chartOption3 = {
        title: [
          {
            text: `${this.activeRadio}分布`,
            textStyle: {
              fontSize: 14,
              color: '#666'
            },
            left: 20,
            top: 20
          },
          {
            text: '累计订单量',
            subtext: '421',
            x: '34.5%',
            y: '42.5%',
            textStyle: {
              fontSize: 14,
              color: '#999'
            },
            subtextStyle: {
              fontSize: 28,
              color: '#333'
            },
            textAlign: 'center'
          }
        ],
        series: [
          {
            name: `${type}分布`,
            type: 'pie',
            data,
            label: {
              normal: {
                show: true,
                position: 'outter',
                formatter: function(params) {
                  return params.data.legendname
                }
              }
            },
            center: ['35%', '50%'],
            radius: ['45%', '60%'],
            labelLine: {
              normal: {
                length: 5,
                length2: 3,
                smooth: true
              }
            },
            clockwise: false,
            itemStyle: {
              borderWidth: 4,
              borderColor: '#fff'
            }
          }
        ],
        legend: {
          type: 'scroll',
          orient: 'vertical',
          height: 250,
          left: '70%',
          top: 'middle',
          textStyle: {
            color: '#8c8c8c'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            const str =
              params.seriesName +
              '<br />' +
              params.marker +
              params.data.legendname +
              '<br />' +
              '数量：' +
              params.data.value +
              '<br />' +
              '占比：' +
              params.data.percent +
              '%'
            return str
          }
        }
      }
    },
    radioChange(type) {
      this.getOption3(type)
    },
    onPageChange(currentPage) {
      this.getTableData(currentPage)
    }
  }
}
</script>

<style lang="scss">
.bottom_view {
  display: flex;
  > div {
    width: calc(50% - 10px);
    &:first-child {
      margin-right: 10px;
    }
    &:last-child {
      margin-left: 10px;
    }
  }
  .el-radio-button__inner {
    padding: 8px 20px;
  }
  .keyword_search {
    .chart_box {
      height: 120px;
      display: flex;
    }
    .echarts {
      width: 50%;
      height: 100%;
    }
    .table_box {
      height: 250px;
    }
    .page_box {
      display: flex;
      height: 30px;
      align-items: center;
      justify-content: flex-end;
      margin-top: 15px;
    }
  }
  .class_sales_rank {
    .chart_box {
      height: 415px;
    }
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
