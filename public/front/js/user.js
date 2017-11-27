/**
 * Created by Administrator on 2017-11-27.
 */
$(function () {
    $.ajax({
      type:"get",
      url:"/user/queryUserMessage",
      success:function (data) {
        if(data.error){
          location.href = "login.html"
        }else{
          $(".userinfo").html(template("tmp",data));
        }
      }
    })
  $(".logout").on("click",function () {
    mui.confirm("确定要退出吗？","温馨提示",["确定","取消"],function (e) {
      if(e.index==0){
        $.ajax({
          type:"get",
          url:"/user/logout",
          success:function () {
              location.href = "login.html";
          }
        });
      }
    })
    
  })
})