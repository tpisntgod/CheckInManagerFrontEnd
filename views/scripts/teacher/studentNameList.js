var studentName = new Vue({
    el:'#studentName',
    data:{
         course_member:[
            {
                student_id:'15331117',
                student_name:'王小明'
            },
            {
                student_id:'11171533',
                student_name:'高恩星'
            }
        ],
        course_member_num:2
    },
    methods:{
        to_mainPage:function(course_id) {
           window.location='/course/'+course_id; 
        },
        to_studentList:function(course_id){
            window.location =  '/course/'+course_id+'/course_member';
        },
        to_attendencePage:function(course_id){
            window.location =  '/course/'+course_id+'/checkin_student';

        },
        to_checkAttendencn:function(){
            //要获取gps信息，要实现根据后端的url找到图片匹配到视图

        },
        to_courselist:function(){
             window.location = '/course';

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

//下面是jquery方法的实现

//注意：这个界面是需要上一个课程详情界面的course_id，无论是回传还是后面界面都要继续用，还没解决
var course_id  ;

function addEvents() {
    $("#mainPage").click(function() {
        window.location='/course/'+course_id;  //要回到课程详情界面就要course_id
    });
    $("#studentName").click(function() {
      //不用操作 
    });
    $("#signHistory").click(function() {
        window.location =  '/course/'+course_id+'/checkin_student'; //也要course_id
    });
    $("#Sign").click(function() {
        //签到界面
        //todo
        //alert('hello');
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