//需要user_id传递给后面
var user_id = localStorage.getItem("user_id");

var addcourseform = new Vue({
    el: '#addCourse',
    data: {
        em1: '',
        em2: '',
        em3: '',
        em4: '',
        em5: '',
        course_name: '',
        course_credit: '',
        course_semester: '',
        course_time: '',
        course_location: ''
    },
    methods: {
        checkInput: function() {
            
            //p>0时为出错
            //前端需要检查做输入是否为空
            var p = 0;
            if (addcourseform.course_name === '') {
                p++;
                addcourseform.em1 = '课程名称不能为空';
            } else {
                addcourseform.em1 = '';
            };
            if (addcourseform.course_credit === '') {
                p++;
                addcourseform.em2 = '总学分不能为空';
            } else {
                addcourseform.em2 = '';
            };
            if (addcourseform.course_semester === '') {
                p++;
                addcourseform.em3 = '学期不能为空';
            } else {
                addcourseform.em3 = '';
            };
            if (addcourseform.course_time === '') {
                p++;
                addcourseform.em4 = '上课时间不能为空';
            } else {
                addcourseform.em4 = '';
            };
            if (addcourseform.course_location === '') {
                p++;
                addcourseform.em5 = '上课地点不能为空';
            } else {
                addcourseform.em5 = '';
            };
            if (p>0) {
                return false;
            };

            console.log('post');
            //alert('addcourseform.username',addcourseform.username);
            //alert('addcourseform.userid',addcourseform.user_id);
            console.log(addcourseform.user_id);
            alert(addcourseform.username);
            alert(addcourseform.user_id);
            alert(user_id);
            axios.post('/api/course', {
                'username': addcourseform.username,
                'user_id': user_id
            })
            .then(function (response) {
                console.log(response.status);
                if (response.status == 201) {
                    window.location = '/user/' + user_id + '/course';
                }
            })
            .catch(function (error) {
                alert(error.status);
                //console.log(error.response.status);
            });
        },
        back:function (user_id) {
             window.location='/user/' + user_id + '/course';
        },
        to_addStudentPage:function(course_id){
            window.location ='/user/add_student'; 
        },

        quitLogin: function() {
            console.log('cookie',document.cookie);
            axios.delete('/api/users/session')
            .then(function (response) {
                console.log(response.status);
                window.location="/";
            })
            .catch(function (error) {
                alert(response.data);
                console.log(error);
                alert(error);
            });
        }
    }
});