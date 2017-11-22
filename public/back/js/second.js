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
})