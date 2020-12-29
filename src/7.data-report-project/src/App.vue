<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body,
#app {
  height: 100%;
  font-size: 14px;
}
.el-date-editor .el-range-separator {
  width: 20px !important;
}
li {
  list-style: none;
}
</style>
