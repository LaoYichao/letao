/**
 * Created by Administrator on 2017-11-25.
 */
$(function () {
  // localStorage.setItem("lt_search_history","[123,456,789]");
  //封装获取本地历史记录
  function getHistory() {
    var str = localStorage.getItem("lt_search_history") || '[]';
    var arr = JSON.parse(str);
    return arr;
  };
  
  //封装渲染
  function render() {
    var arr = getHistory();
    var html = template("tmp", {arr: arr});
    $(".lt_his_message ul").html(html);
  };
  
  //初始化渲染页面
  render();
  
  //点击删除按钮，删除本地记录
  $(".lt_his_message ul").on("click", "span", function () {
    var index = ($(this).data("index"));
    var arr = getHistory();
    arr.splice(index, 1);
    localStorage.setItem("lt_search_history", JSON.stringify(arr))
    render();
  });
  
  //点击垃圾箱，删除全部
  $(".fa-trash").on("click", function () {
    localStorage.removeItem("lt_search_history");
    render();
  });
  
  //点击搜索按钮
  $("#search").on("click", function () {
    var arr = getHistory();
    var val = $("input").val().trim();
    if(val==""){
      mui.toast('请输入关键字');
      return false;
    }
    var index = arr.indexOf(val);
    if(index!=-1){//如果有重复
      arr.splice(index,1);
    }
    if(arr.length>=10){
      arr.pop();
    }
    arr.unshift(val);
    localStorage.setItem("lt_search_history", JSON.stringify(arr));
    render();
    location.href="searchList.html?key="+val;
  })
})