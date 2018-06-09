var addstudentform = new Vue({
    el: '#addStudent',
    data: {
        em1: '',
        em2: '',
        username: '',
        user_id: ''
    },
    methods: {
        checkInput: function() {
            
            //p>0时为出错
            //前端需要检查做输入是否为空
            var p = 0;
            if (addstudentform.username === '') {
                p++;
                addstudentform.em1 = '姓名不能为空';
            } else {
                addstudentform.em1 = '';
            };
            if (addstudentform.user_id === '') {
                p++;
                addstudentform.em2 = '学号不能为空';
            } else {
                addstudentform.em2 = '';
            };
            if (!!addstudentform.user_id && /^[\d]{8}$/.test(addstudentform.user_id) === false) {
                p++;
                addstudentform.em2 = '学号格式错误,正确格式:8位数字';
            };
            if (p>0) {
                return false;
            };

            console.log('post');
            axios.post('/api/user', {
                'username': addstudentform.username,
                'user_id': addstudentform.user_id
            })
            .then(function (response) {
                console.log(response.status);
                if (response.status == 201) {
                    //window.location="/user/login";
                    alert('添加成功');
                }
            })
            .catch(function (error) {
                //alert(error.status);
                console.log(error.response.status);
            });
        },
        back:function () {
             window.location="/user";
        },
        to_addStudentPage:function(course_id){
            window.location =  '/user/add_student'; 
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