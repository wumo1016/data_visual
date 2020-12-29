<template>
  <div class="common_card">
    <div class="title">{{ title }}</div>
    <div class="value">{{ value }}</div>
    <div class="chart">
      <slot />
    </div>
    <div class="line"></div>
    <div class="total">
      <slot name="total" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: String
  }
}
</script>

<style lang="scss" scoped>
.title {
  color: #999;
}
.value {
  font-size: 28px;
  margin-top: 5px;
  color: #000;
}
.chart {
  height: 80px;
}
.line {
  margin: 10px 0;
  border-top: 1px solid #eee;
}
.total {
  color: #666;
}
</style>
