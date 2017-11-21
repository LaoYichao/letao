/**
 * Created by Administrator on 2017-11-21.
 */
$(function () {
  var $form = $("form");
  
  $form.bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    // excluded: [':disabled', ':hidden', ':not(:visible)'],
    
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //正则校验
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '用户名由数字字母下划线和.组成'
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password:{
        validators:{
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength:{
            min:6,
            max:12,
            message:'密码长度是6-12位'
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    },
  });
  
  $form.on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type:'post',
      url:"/employee/employeeLogin",
      data: $form.serialize(),
      success:function (data) {
        if(data.error==1000){
          $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
        }
        if(data.error==1001){
          $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
        }
        if(data.success){
          location.href = "index.html"
        }
      }
    })
  });
  
  $("[type='reset']").on("click", function(){
    //重置表单样式
    $("form").data("bootstrapValidator").resetForm();
  });
  
})