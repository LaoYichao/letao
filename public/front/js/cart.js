/**
 * Created by Administrator on 2017-11-27.
 */
$(function () {
  //封装渲染ajax
  function render() {
    $.ajax({
      type:"get",
      url:"/cart/queryCart",
      success:function (data) {
        if(data.error==400){
          location.href = "login.html";
        }
        var html = template("tmp",{data:data});
        $(".mui-table-view").html(html);
      }
    });
  };
  //初始化页面
  render();
  
  //点击删除按钮，删除记录，重新渲染
  $(".mui-table-view").on("click",".btn_delete",function () {
      var id = $(this).data("id");
    $.ajax({
      type:"get",
      url:"/cart/deleteCart",
      data:{
        id:id
      },
      success:function (data) {
        if(data.success){
          render();
        }
      }
    })
  })
  
  //点击编辑按钮，编辑商品
  $(".mui-table-view").on("click",".btn_edit",function () {
    var message = this.dataset;
    var html = template("tmp2",message);
    html = html.replace(/\n/g, "");
    mui.confirm(html,"编辑商品",["确定","取消"],function (e) {
      if(e.index==0){
        var id = message.id;
        var num = $(".edit_num input").val();
        var size = $(".edit_size span.active").text();
        $.ajax({
          type:"post",
          url:"/cart/updateCart",
          data:{
            id:id,
            size:size,
            num:num
          },
          success:function (data) {
            render()
          }
        })
        
      }
    })
    $(".edit_size span").on("click",function () {
        $(this).addClass("active").siblings().removeClass("active");
    })
    mui(".mui-numbox").numbox();
  })
  
  //点击复选框，计算价格
  $(".mui-table-view").on("click",".ck",function () {
    var totalPrice = 0;
    $(":checked").each(function () {
        var price = $(this).data("price");
        var num = $(this).data("num");
        totalPrice+=price*num;
    });
    $(".totalPrice").html(totalPrice.toFixed(2));
  })
})