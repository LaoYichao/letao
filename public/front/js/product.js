/**
 * Created by Administrator on 2017-11-26.
 */
$(function () {
  var productId = getKey("productId");
  
  $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{id:productId},
    success:function (data) {
      console.log(data);
      $(".mui-scroll").html(template("tmp",data));
      //手动初始化轮播图
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      //手动初始化数量按钮
      mui(".mui-numbox").numbox();
      
      //点击尺码，改变样式
      $(".size span").on("click",function () {
          $(this).addClass("active").siblings().removeClass("active");
      });
      
      
    }
  });
  
  $(".add_car").on("click",function () {
    var size = $(".size span.active").text();
    if(!size){
      mui.toast('请选择尺码');
      return false;
    }
    var num =$(".mui-numbox-input").val();
    
    $.ajax({
      type:"post",
      url:"/cart/addCart",
      data:{
        productId:productId,
        num:num,
        size:size
      },
      success:function (data) {
        if(data.error==400){
          location.href = "login.html?retURL=product.html?productId="+productId
        }
        if(data.success){
          mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function (e) {
              if(e.index==0){
                location.href = "cart.html";
              }
          })
        }
      }
    });
    
  })
})