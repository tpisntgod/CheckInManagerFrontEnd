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