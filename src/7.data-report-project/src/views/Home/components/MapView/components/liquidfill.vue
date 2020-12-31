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
                color: '#999', // 在波纹外面的颜色
                fontWeight: 'normal'
              },
              position: ['50%', '50%'],
              insideColor: '#fff' // 在波纹里面的颜色
            },
            outline: {
              itemStyle: {
                borderColor: '#aaa4a4',
                borderWidth: 1,
                shadowBlur: 10,
                shadowColor: 'black'
              },
              borderDistance: 0 // 内边距
            },
            backgroundStyle: {
              color: '#fff' // 球内背景
            },
            shape: 'circle', // 设置形状 diamond<菱形> triangle<三角形>
            itemStyle: {
              shadowBlur: 0,
              shadowColor: '#fff'
            },
            amplitude: 8, // 波纹起伏高度
            color: ['rgba(241,47,28,0.7)'] // 波纹颜色
          }
        }
      }
    }
  }
}
</script>
