<template>
  <div class="map_view">
    <div class="map_view_left">
      <Bmap />
    </div>
    <div class="map_view_right">
      <el-card class="top">
        <template #header>用户月同比增长</template>
        <div class="chart_box">
          <Liquidfill />
        </div>
      </el-card>
      <el-card class="bto">
        <template #header>热门搜索</template>
        <div class="chart_box">
          <Wordcloud />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Bmap from './components/bmap'
import Liquidfill from './components/liquidfill'
import Wordcloud from './components/wordcloud'
export default {
  components: { Bmap, Liquidfill, Wordcloud }
}
</script>

<style lang="scss">
.map_view {
  margin-top: 20px;
  height: 600px;
  display: flex;
  .map_view_left {
    width: 80%;
  }
  .map_view_right {
    width: calc(20% - 20px);
    margin-left: 20px;
    .top {
      height: calc(50% - 10px);
      margin-bottom: 20px;
    }
    .bto {
      height: calc(50% - 10px);
      margin-top: 20px;
    }
    .el-card__body {
      height: calc(100% - 56px);
    }
    .chart_box {
      height: 100%;
    }
  }
}
</style>
