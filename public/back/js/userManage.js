/**
 * Created by Administrator on 2017-11-22.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;//请求一次给的数据条数
  //封装请求
  function read() {
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (data) {
        var html = template("tmp",data);
        $("tbody").html(html);

        //分页插件
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//指定bootstrap的版本，如果是3，必须指定
          currentPage:currentPage,//指定当前页
          totalPages:Math.ceil(data.total/pageSize),//指定总页数
          onPageClicked:function (a,b,c, page) {
            currentPage = page;
            read();
          }
        });
      }
    })
  }
  
  read(1);
  
  //模态框
  $("tbody").on("click","button",function () {
    var id = $(this).parent().data("id");
    var isdelete = $(this).hasClass("btn-danger")?0:1;
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{
        id:id,
        isDelete:isdelete
      },
      success:function (data) {
        if(data.success){
          read();
        }
      }
    })
  })
})