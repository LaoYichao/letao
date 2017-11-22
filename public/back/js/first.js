/**
 * Created by Administrator on 2017-11-22.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  
  function read() {
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
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
  };
  
  read();
  
  $("#addfirst").on("click",function () {
      $("#firstModal").modal("show");
  });
  
  $("form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty: {
            message: '分类名不能为空'
          },
        }
      }
    }
  })
  $("form").on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$("form").serialize(),
      success:function (info) {
        console.log(info);
        if(info.success){
          $("#firstModal").modal("hide");
          currentPage = 1;
          read();
          $("form").data('bootstrapValidator').resetForm();
          $("form")[0].reset();
        }
      }
    })
  });
})