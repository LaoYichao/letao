/**
 * Created by Administrator on 2017-11-23.
 */
$(function () {
  
  var currentPage = 1;
  var pageSize = 5;
  
  function read() {
      $.ajax({
        type:"get",
        url:"/product/queryProductDetailList",
        data:{
          page:currentPage,
          pageSize:pageSize
        },
        success:function (data) {
          console.log(data);
          var html = template("tmp",data);
          $("tbody").html(html)
          
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
  };
  
  read();
  
  //点击添加商品按钮，显示模态框
  $("#addprocuce").on("click",function () {
    $("#produceModal").modal("show");
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
      proName: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '库存不能为空'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '价格不能为空'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '原价不能为空'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '尺寸不能为空'
          }
        }
      },
    }
  });
})