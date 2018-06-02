var courselist = new Vue({
    el:'#Courses',
    data: {
        courses: ''
    },
        /*{
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
    },*/
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
            console.log('changPassword');
            window.location="/user/change_password";
        },
        jump:function (course_id){
            console.log('jump');
            window.location='/course/'+course_id; 
            //return course_id;
            //alert('hello,newpage!'); 
        }
    },
    created(){
        //alert('vue created');
        let that = this;
        axios.get('course_front/data')
        .then(function (response) {
            console.log(response);
            console.log('response.data',response.data);
            console.log('response.status',response.status);
            that.courses = response.data.courses;
            that.username = response.data.username;
            //this.data.courses = response.data;
        })
        .catch(function (error) {
            console.log('course_front/data',error);
        });
/*
        let that = this;
        axios.defaults.withCredentials = true;
        axios.get('/api/course')
        .then(function (response) {
            console.log(response);
            that.courses = response.data.courses;
            that.username = response.data.username;
        })
        .catch(function (error) {
            console.log(error);
        });*/
    }
});