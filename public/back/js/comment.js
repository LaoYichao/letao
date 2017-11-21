/**
 * Created by Administrator on 2017-11-21.
 */
$(function () {
  if(location.href.indexOf("login.html")==-1){
    $.ajax({
      type:"get",
      url : "/employee/checkRootLogin",
      success:function (data) {
        if(data.error==400){
          location.href = "login.html";
        }
      }
    })
  }
  
  
  
  $(document).ajaxStart(function () {
    NProgress.start();
  });

//所有的ajax只要结束，延迟500毫秒，结束进度条
  $(document).ajaxStop(function () {
    setTimeout(function () {
      NProgress.done();
    }, 500);
  });
  $("#classify").on("click",function () {
    $(this).next().toggle(400);
  })
  $("#hide").on("click",function () {
    $("aside").toggleClass("active");
    $("section").toggleClass("active");
  })
  $("#logout").on("click",function () {
    $('#logoutModal').modal("show");
  })
  $(".btn-primary").on("click",function () {
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      success:function (data) {
          if(data.success){
            location.href = "login.html";
          }
      }
    })
  })
})