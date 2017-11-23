/**
 * Created by Administrator on 2017-11-22.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 5;
    
    function read() {
      $.ajax({
        type:"get",
        url:"/category/querySecondCategoryPaging",
        data:{
          page:currentPage,
          pageSize:pageSize
        },
        success:function (data) {
          var html = template("tmp",data);
          $("tbody").html(html);
          
          $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion:3,//指定bootstrap的版本，如果是3，必须指定
            currentPage:currentPage,//指定当前页
            totalPages:Math.ceil(data.total/pageSize),//指定总页数
            onPageClicked:function (a,b,c, page) {
              currentPage = page;
              read();
            }
          })
        }
      })
    }
    
    read()
  //点击添加按钮，出现模态框，发送ajax请求
    $("#addsecond").on("click",function () {
      $("#secondModal").modal("show");
      $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
          page:1,
          pageSize:20
        },
        success:function (data) {
          console.log(data);
          var html = template("tmp2",data);
              $(".dropdown-menu").html(html);
        }
      })
    })
  
  //点击下拉按钮事件
  $(".dropdown-menu").on("click","a",function () {
    var id = $(this).data("id");
    $("[name='categoryId']").val(id);
    $(".dropdown-text").html($(this).text());
    $("form").data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })
  //图片上传事件
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      // console.log(data.result.picAddr);
      $("#file-img").attr("src",data.result.picAddr);
      $("[name='brandLogo']").val(data.result.picAddr);
      $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });
  //表单校验
  $("form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传二级Logo'
          }
        }
      },
      hot: {
        validators: {
          notEmpty: {
            message: '请选择'
          }
        }
      },
    }
  });
  
  //表单提交
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$("form").serialize(),
      success:function (data) {
        if(data.success){
          $("#secondModal").modal("hide");
          currentPage = 1;
          read()
          $("#form").data('bootstrapValidator').resetForm();
          $("#form")[0].reset();
          $("[name='categoryId']").val("");
          $(".dropdown-text").html("请选择一级分类");
          $("#file-img").attr("src","imgs/none.png");
          $("[name='brandLogo']").val("");
        }
      }
    })
  });
})