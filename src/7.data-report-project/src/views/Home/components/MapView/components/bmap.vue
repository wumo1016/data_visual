<template>
  <ve-bmap
    :settings="chartSettings"
    :title="title"
    :tooltip="{}"
    :series="chartSeries"
    height="100%"
  ></ve-bmap>
</template>

<script>
import mapData from './mapData'
const convertData = function(data, geo) {
  const res = []
  data.forEach(item => {
    const { name, value } = item
    const coord = geo[name]
    res.push({
      name,
      value: [...coord, value]
    })
  })
  return res
}

export default {
  data() {
    return {
      title: {
        text: '慕课外卖销售数据大盘',
        subtext: '销售趋势统计',
        sublink: 'https://www.imooc.com',
        left: 'center'
      },
      chartSettings: {
        key: 'G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb',
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: false
        }
      },
      chartSeries: []
    }
  },
  mounted() {
    const { data, geo } = mapData
    this.chartSeries = [
      {
        name: '销售额',
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: convertData(data, geo),
        itemStyle: {
          color: 'purple'
        },
        encode: {
          value: 2 // 设置tooltip显示的value
        },
        symbolSize: function(val) {
          return val[2] / 10
        },
        label: {
          show: false
        }
      },
      {
        name: 'Top 10',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        encode: {
          value: 2
        },
        data: convertData(
          data.sort(function(a, b) {
            return b.value - a.value
          }),
          geo
        ).slice(0, 10),
        symbolSize: function(val) {
          return val[2] / 10
        },
        label: {
          formatter: function(v) {
            return `${v.data.name} - ${v.data.value[2]}`
          },
          position: 'right',
          show: true
        },
        hoverAnimation: true,
        rippleEffect: {
          brushType: 'stroke'
        },
        itemStyle: {
          color: 'purple',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      }
    ]
  }
}
</script>
