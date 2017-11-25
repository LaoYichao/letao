/**
 * Created by Administrator on 2017-11-24.
 */
$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false,
  });
})
function urlObj() {
  var search  =decodeURI(location.search);
  //去除？    name=zs&age=18&desc=呵呵呵
  search = search.slice(1);
  //把search切割成一个数组    ["name=zs", "age=18", "desc=呵呵呵"]
  var arr = search.split("&");
  var obj = {};
  arr.forEach(function (v,i) {
    var value = v.split("=")[1];
    var key = v.split("=")[0];
    obj[key] = value
  })
  return obj;
}
function getKey(key) {
  return urlObj()[key];
}