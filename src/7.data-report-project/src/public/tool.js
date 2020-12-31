// 转换为千分位
const a = 12345678910
console.log(a.toLocaleString()) // 12,345,678,910

const b = '1234567890'
const reg = /\d{1,3}(?=(\d{3})+$)/g
console.log(b.replace(reg, '$&,')) // $&表示当前匹配到的值 1,234,567,890
