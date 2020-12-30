<template>
  <ve-liquidfill
    height="100%"
    :data="chartData"
    :settings="chartSettings"
  ></ve-liquidfill>
</template>

<script>
export default {
  data() {
    return {
      chartData: {
        columns: ['title', 'percent'],
        rows: [
          {
            title: '用户月同比增长',
            percent: 0.6
          }
        ]
      },
      chartSettings: {
        seriesMap: {
          用户月同比增长: {
            radius: '80%',
            label: {
              formatter: v => {
                return `${(v.data.value * 100).toFixed(2)}%`
              },
              textStyle: {
                fontSize: 36,
                color: '#999',
                fontWeight: 'normal'
              },
              position: ['50%', '50%'],
              insideColor: '#fff'
            },
            outline: {
              itemStyle: {
                borderColor: '#aaa4a4',
                borderWidth: 1,
                color: 'none',
                shadowBlur: 0,
                shadowColor: '#fff'
              },
              borderDistance: 0
            },
            backgroundStyle: {
              color: '#fff'
            },
            itemStyle: {
              shadowBlur: 0,
              shadowColor: '#fff'
            },
            amplitude: 8,
            color: ['rgba(241,47,28,0.7)']
          }
        }
      }
    }
  }
}
</script>
