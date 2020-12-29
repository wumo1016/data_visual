<template>
  <div class="sales_vue">
    <el-card shadow="hover">
      <template #header>
        <div class="header_wrapper">
          <el-menu
            mode="horizontal"
            :default-active="activeMenu"
            @select="menuChange"
          >
            <el-menu-item index="1">销售额</el-menu-item>
            <el-menu-item index="2">访问量</el-menu-item>
          </el-menu>
          <div class="header_wrapper_right">
            <el-radio-group
              v-model="activeRadio"
              style="margin-right: 10px"
              @change="radioChange"
            >
              <el-radio-button size="small" label="今日"></el-radio-button>
              <el-radio-button label="本周"></el-radio-button>
              <el-radio-button label="本月"></el-radio-button>
              <el-radio-button label="本年"></el-radio-button>
            </el-radio-group>
            <el-date-picker
              v-model="activeDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              size="small"
            >
            </el-date-picker>
          </div>
        </div>
      </template>
      <div class="card_body_box">
        <div>
          <v-chart :options="chartOption"></v-chart>
        </div>
        <div class="rank_wrapper">
          <h5>排行榜</h5>
          <ul>
            <li v-for="item in rankList" :key="item.rank">
              <div>
                <div :class="item.rank < 4 ? 'first_three' : ''">
                  {{ item.rank }}
                </div>
                <div>{{ item.name }}</div>
              </div>
              <div>{{ item.money }}</div>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeMenu: '1',
      activeRadio: '今日',
      activeDate: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end]) // 第三个参数,visible,设置点击选择后是否关闭日期选择器
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      chartOption: {
        title: {
          text: '年度销售额',
          textStyle: {
            fontSize: 14
          }
        },
        grid: {
          top: 35,
          bottom: 0,
          left: 10,
          right: 50,
          containLabel: true
        },
        color: ['#3398DB'],
        xAxis: {
          type: 'category',
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8',
            '9月',
            '10月',
            '11月',
            '12月'
          ],
          axisTick: {
            alignWithLabel: true, // 将短标线中心对准柱子
            lineStyle: {
              color: '#999'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#333'
          }
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dotted',
              color: '#eee'
            }
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: 30,
            data: [200, 210, 230, 42, 122, 457, 234, 234, 45, 235, 298, 129]
          }
        ]
      },
      rankList: [
        {
          rank: 1,
          name: '麦当劳',
          money: '323,12'
        },
        {
          rank: 2,
          name: '麦当劳',
          money: '323,12'
        },
        {
          rank: 3,
          name: '麦当劳',
          money: '323,12'
        },
        {
          rank: 4,
          name: '麦当劳',
          money: '323,12'
        },
        {
          rank: 5,
          name: '麦当劳',
          money: '323,12'
        },
        {
          rank: 6,
          name: '麦当劳',
          money: '323,12'
        },
        {
          rank: 7,
          name: '麦当劳',
          money: '323,12'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    menuChange() {},
    radioChange() {}
  }
}
</script>

<style lang="scss">
.sales_vue {
  margin-top: 20px;
  .el-card__header {
    padding: 0;
  }
  .header_wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    .header_wrapper_right {
      display: flex;
      align-items: center;
    }
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
    .el-menu-item {
      height: 50px;
      line-height: 50px;
    }
  }
  .el-radio-button__inner {
    padding: 8px 20px;
  }
  .card_body_box {
    display: flex;
    height: 260px;
    .echarts {
      width: 100%;
      height: 100%;
    }
    > div {
      &:first-child {
        width: 70%;
      }
      &:last-child {
        width: 30%;
      }
    }
    .rank_wrapper {
      height: 100%;
      h5 {
        margin-bottom: 15px;
      }
      ul {
        height: calc(100% - 30px);
        overflow-y: auto;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 30px;
          > div {
            &:first-child {
              display: flex;
              align-items: center;
              > div {
                &:first-child {
                  text-align: center;
                  line-height: 21px;
                  width: 21px;
                  height: 21px;
                  margin-right: 10px;
                }
              }
              .first_three {
                background: #000;
                color: #fff;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
