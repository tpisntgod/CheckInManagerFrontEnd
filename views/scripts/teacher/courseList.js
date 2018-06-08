// 这个Vue实例，没有作用
var courselist = new Vue({
    el:'#Courses',
    data: {
        courses: ''
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

    }
});
//上面的Vue实例，目前没有作用

function addEvents() {
    $(".name").click(function() {
        window.location='/course/'+$(this).children().text(); 
    });
}

$(document).ready(addEvents);