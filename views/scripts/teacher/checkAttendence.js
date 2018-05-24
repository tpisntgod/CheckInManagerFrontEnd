var checkinHistory = new Vue({
    el:'#checkinHistory',
    data:{
         checkin_history:[
            {
                checkin_id:1231,
                datetime:"2018-01-03 11:12:23",
                checkedin_num:80,
                uncheckedin_num:4
            },
            {
                checkin_id:431,
                datetime:"2018-01-23 14:12:23",
                checkedin_num:75,
                uncheckedin_num:9
            }
        ]
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
        to_singleAttendancePage:function(course_id,checkin_id){
            window.location = '/course/'+ course_id + '/checkin_student/' + checkin_id;
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