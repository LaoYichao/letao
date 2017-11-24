/**
 * Created by Administrator on 2017-11-23.
 */
$(function () {
  
  var currentPage = 1;
  var pageSize = 5;
  var imgs = [];
  
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
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      success:function (data) {
        $(".dropdown-menu").html(template("tmp2",data));
      }
    })
  });
  
  //点击下拉菜单
  $(".dropdown-menu").on("click","a",function () {
    $(".dropdown-text").text(this.innerText);
    $("[name='brandId']").val($(this).data("id"))
  })
  //图片上传
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      $(".img_box").append(template("tmp3",data.result));
      imgs.push(data.result);
      if(imgs.length==3){
        $("form").data("bootstrapValidator").updateStatus("product_pic", "VALID");
      }else{
        $("form").data("bootstrapValidator").updateStatus("product_pic", "INVALID","isthree");
      }
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
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
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
      product_pic: {
        validators: {
          isthree: {
            message: '请上传3张图片'
          }
        }
      },
    }
  });
  
  $("form").on("success.form.bv",function () {
      var info = $("form").serialize();
      info +="&picName1="+imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
      info +="&picName2="+imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
      info +="&picName3="+imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;
      $.ajax({
        type:"post",
        url:"/product/addProduct",
        data:info,
        success:function (data) {
          if(data.success){
            $("#produceModal").modal("hide");
            $("form")[0].reset();
            $("#form").data('bootstrapValidator').resetForm();
            $("[name='brandId']").val("");
            $(".img_box").html("")
            $(".dropdown-text").text("请选择二级分类");
            currentPage = 1;
            read()
          }
        }
      })
  })
})