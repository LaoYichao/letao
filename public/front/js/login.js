/**
 * Created by Administrator on 2017-11-26.
 */
$(function () {
    $(".lt_login").on("click",function (e) {
      var uname = $("[name='username']").val().trim();
      var psw = $("[name='password']").val().trim();
      if(!uname){
        mui.toast("请输入用户名")
        return false;
      }
      if(!psw){
        mui.toast("请输入密码")
        return false;
      }
      $.ajax({
        type:"post",
        url:"/user/login",
        data:{
          username:uname,
          password:psw
        },
        success:function (data) {
          if(data.error){
              mui.toast(data.message);
          }
          if(data.success){
            
            var search = decodeURI(location.search)
            if(search.indexOf("retURL")==-1){
                location.href = "user.html"
            }else{
              search = search.replace("?retURL=","");
              location.href = search
            }
            
          }
        }
      })
    })
})