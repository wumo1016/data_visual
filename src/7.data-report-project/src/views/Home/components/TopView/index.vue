<template>
  <div class="top_view">
    <el-row :gutter="12">
      <el-col v-for="(item, index) in cardList" :span="6" :key="index">
        <el-card shadow="hover">
          <CommonCard :title="item.title" :value="item.value">
            <template v-if="item.id === 'chart1'" class="chart1">
              <div class="compare">
                <span>日同比</span>
                <span class="emphasis">7.33%</span>
                <div class="increase"></div>
              </div>
              <div class="compare">
                <span>月同比</span>
                <span class="emphasis">7.33%</span>
                <div class="decrease"></div>
              </div>
            </template>
            <div v-else :id="item.id" class="chart_box"></div>
            <template #total>
              <span>{{ item.totalTitle }} </span>
              <span class="money">{{ item.totalValue }}</span>
            </template>
          </CommonCard>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CommonCard from '@c/CommonCard'
export default {
  components: { CommonCard },
  data() {
    return {
      cardList: [
        {
          title: '累计销售额',
          value: '¥123',
          id: 'chart1',
          totalTitle: '昨日销售额',
          totalValue: '¥123'
        },
        {
          title: '累计订单量',
          value: '123',
          id: 'chart2',
          totalTitle: '昨日订单量',
          totalValue: '123'
        },
        {
          title: '今日交易用户数',
          value: '123',
          id: 'chart3',
          totalTitle: '退货率',
          totalValue: '123'
        },
        {
          title: '案发F',
          value: '123',
          id: 'chart4',
          totalTitle: '123',
          totalValue: '123'
        }
      ]
    }
  },
  mounted() {
    this.getOrderNum()
    this.getTodayTrade()
  },
  methods: {
    getOrderNum() {
      const option = {
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false // 默认图表距坐标轴的距离
        },
        yAxis: {
          show: false
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: [620, 250, 350, 256, 457, 452],
            areaStyle: {
              color: '#409eff'
            },
            lineStyle: {
              width: 0
            },
            itemStyle: {
              opacity: 0
            }
          }
        ]
      }
      this.getChart('#chart2', option)
    },

    getTodayTrade() {
      const option = {
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          show: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            type: 'bar',
            smooth: true,
            barWidth: 20,
            data: [620, 250, 350, 256, 457, 452]
          }
        ]
      }
      this.getChart('#chart3', option)
    },

    getChart(selector, option) {
      const myChart = this.$echarts.init(
        document.querySelector(selector),
        'light',
        {
          renderer: 'svg'
        }
      )
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss">
.top_view {
  .money {
    margin-left: 10px;
    color: #000;
    font-weight: 700;
  }
  .chart_box {
    width: 100%;
    height: 100%;
  }
  .compare {
    height: 50%;
    display: flex;
    align-items: center;
    color: #666;
    > div {
      margin-left: 5px;
    }
    .increase {
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 10px solid #666;
    }
    .decrease {
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 10px solid#666;
    }
  }
  .emphasis {
    margin-left: 10px;
    font-weight: 700;
  }
}
</style>
