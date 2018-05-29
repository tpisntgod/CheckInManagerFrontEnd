
var courselist = new Vue({
    el:'#Courses',
    data:{
        courses:[
            {
                course_id:'1', 
                course_name:'数据挖掘',
                semester:'2017-2018学年度第二学期'
            },
            {
                course_id:'2', 
                course_name:'系统分析与设计',
                semester:'2017-2018学年度第一学期'
            }
        ]
    },
    methods:{
    	quitLogin: function() {
            console.log('cookie',document.cookie);
            axios.delete('/api/users/session')
            .then(function (response) {
                console.log(response.status);
                window.location="/";
            })
            .catch(function (error) {
                alert(response.data);
            });
        },
        changPassword:function() {
            window.location="/user/change_password";
        },
        jump:function (course_id){
            window.location='/course/'+course_id; 
            //return course_id;
            //alert('hello,newpage!'); 
        }
    },
    created(){

       
    }
    
});