/**
 * Created by Administrator on 2017-11-27.
 */
$(function () {
  //点击按钮，获取验证码
  $(".btn_Vcode").on("click",function () {
    var count = 5;
    $this = $(this);
    $this.prop("disabled",true).text("发送中...");
    $.ajax({
      type:"get",
      url:"/user/vCode",
      success:function (data) {
        console.log(data);
        var timer = setInterval(function () {
          count--;
          $this.text(count+"秒后可再次发送");
          if(count<=0){
            clearTimeout(timer);
            $this.prop("disabled",false).text("再次发送");
          }
        },1000);
      }
    })
    
  })
  
  //点击注册按钮，表单验证
  $(".register").on("click",function () {
    var uname = $("[name='uname']").val().trim();
    var pwd = $("[name='password']").val().trim();
    var rpwd = $("[name='r_password']").val().trim();
    var tel = $("[name='tel']").val().trim();
    var vcode = $("[name='vCode']").val().trim();
    if(!uname){
      mui.toast("请输入用户名");
      return false;
    }
    if(!pwd){
      mui.toast("请输入密码");
      return false;
    }
    if(!rpwd){
      mui.toast("请输入确认密码");
      return false;
    }
    if(!tel){
      mui.toast("请输入手机号");
      return false;
    }
    if(!/^1[34578]\d{9}$/.test(tel)){
      mui.toast("手机号码格式不对");
      return false;
    }
    if(!vcode){
      mui.toast("请输入验证码");
      return false;
    }
    if(pwd!=rpwd){
      mui.toast("两次密码不符，请重新输入");
      return false;
    }
    $.ajax({
      type:"POST",
      url:"/user/register",
      data:{
        username:uname,
        password:pwd,
        mobile:tel, 
        vCode:vcode
      },
      success:function (data) {
        if(data.error){
          mui.toast(data.message);
        }
        if(data.success){
          mui.toast("恭喜你注册，1秒后跳转到会员中心");
          setTimeout(function () {
              location.href = "user.html";
          },1000)
        }
      }
    })
  })
})