/**
 * Created by Administrator on 2017-11-25.
 */
$(function () {
  var key = getKey("key");
  $(".lt_search input").val(key);
  
  function render() {
    var data = {
      page:1,
      pageSize:100,
      proName:key
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
  
  $(".sort").on("click",function () {
    if($(this).hasClass("active")){
      $(this).find("span").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
    }else{
      $(this).addClass("active").siblings().removeClass("active");
      $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
    }
  })
})