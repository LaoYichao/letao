/**
 * Created by Administrator on 2017-11-25.
 */
$(function () {
  var key = getKey("key");
  $(".lt_search input").val(key);
  
  function render() {
    //定义传输后台的数据对象
    var data = {
      page:1,
      pageSize:100,
      proName:$(".lt_search input").val()
    }
    //判断有没有带active类的a标签，有再通过span的类判断升降序，赋值给data数据对象
    var $active = $(".lt_sort a.active")
    if($active.length>0){
      var type = $active.data("type");
      var value = $active.find("span").hasClass("fa-angle-up")?1:2;
      data[type] = value;
    }
    
    $.ajax({
      type:"get",
      url:"/product/queryProduct",
      data:data,
      success:function (info) {
        $(".le_products").html(template("tmp",info))
      }
    })
  }
  render();
  
  //点击升降序，重新渲染页面
  $(".sort").on("click",function () {
    if($(this).hasClass("active")){
      $(this).find("span").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
    }else{
      $(this).addClass("active").siblings().removeClass("active");
      $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
    }
    render();
  })
  //点击搜索按钮，先要重置排序
  $("#search").on("click",function () {
    $(".sort").removeClass("active").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
    key = $(this).siblings().val();
    render();
  })
  
})