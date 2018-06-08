var coursedetail = new Vue({
    el:'#CourseDetail',
    data:{
        course_name: '',
        course_id: '1',
        credit: 2,
        semester: '2017-2018学年度第一学期',
        class_time: '周二1-4节课', 
        position: '公教楼b栋', 
        student_num: 100,
        username:'pml'
    },
    methods:{
        to_mainPage:function() {
            //还是返回到当前页面
        },
        to_studentList:function(course_id){
            window.location =  '/course/'+this.course_id+'/course_member'; 
        },
        to_attendencePage:function(course_id){
            window.location =  '/course/'+this.course_id+'/checkin_student';

        },
        to_checkAttendencn:function(){
            //要获取gps信息，要实现根据后端的url找到图片匹配到视图

        },
        to_courselist:function(){
              window.location = "/course";

        },
        setting:function(){
            window.location =  '/user/change_password';
        },
        logout:function(){

        }
        

    },
    created(){
    } 
});

//上面的Vue实例，目前没有作用
//改用下面的JQuery对象


var course_id = $("#courseId").text();//想方设法获得课程id,这个参数要一直传到后面的页面
/*
$.ajax({
   url: "data.json",//json文件位置
   type: "GET",//请求方式为get
   dataType: "json", //数据格式为json
   success: function(data) {//请求成功完成后要执行
       var str = '<p>course_id:' + data.course_id + 'teacher_name：' + data.name + '</p>';
       document.write(str);
   }
});
*/


function addEvents() {
    $("#mainPage").click(function() {
        //   window.location='/course/'+$(this).children().text(); 
        //还是返回本界面
        //alert(a);
    });
    $("#studentName").click(function() {
       window.location =  '/course/'+course_id+'/course_member'; 
    });
    $("#signHistory").click(function() {
      window.location =  '/course/'+course_id+'/checkin_student';
    });
    $("#Sign").click(function() {
        //签到界面
        //todo
    });
    $("#courseList").click(function() {
        window.location = "/course";
    });
    $("#changePass").click(function() {
        window.location =  '/user/change_password';
    });
    $("#logout").click(function() {
        window.location =  '/user/login';
    });
}

$(document).ready(addEvents);