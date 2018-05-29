var coursedetail = new Vue({
    el:'#CourseDetail',
    data:{
        course_name: '数据挖掘',
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