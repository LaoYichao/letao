/**
 * Created by Administrator on 2017-11-24.
 */
$(function () {
  //加载左边一级分类名称
    $.ajax({
      type:"get",
      url:"/category/queryTopCategory",
      success:function (data) {
        $(".le_cateleft ul").html(template("left",data));
        var id = data.rows[0].id;
        second(id);
      }
    });
    
    //点击一级分类，加载右边
    $(".le_cateleft").on("click","a",function () {
      $(".le_cateleft a").removeClass("active");
      $(this).addClass("active");
      var id = $(this).data("id");
      second(id);
      mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,100);
    })
    
    //封装二级分类的ajax
  function second(n) {
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{
        id:n
      },
      success:function (data) {
        $(".le_cateright ul").html(template("right",data));
      }
    })
  };
  
})