var loginform = new Vue({
    el: '#bodyBottom',
    data: {
        em1: '',
        em2: '',
        name: '',
        pw: ''
    },
    methods: {
        checkInput: function() {
            var p=0;
            if (loginform.name === '') {
                p++;
                loginform.em1 = '用户名不能为空';
            };
            if (loginform.pw === '') {
                p++;
                loginform.em2 = '密码不能为空';
            } else {
                loginform.em2 = '';
            };
            if (!!loginform.name && /^[\d]{8}$/.test(loginform.name) === false) {
                p++;
                loginform.em1 = '用户名格式错误,正确格式:8位数字';
            };
            if (p>0) {
                return false;
            };
            console.log('post');
            axios.post('/api/users/session', {
                'user_id': loginform.name,
                'password': loginform.pw
            })
            .then(function (response) {
                console.log(response.status);
                if (response.status == 201) {
                    window.location="/course";
                }
            })
            .catch(function (error) {
                //alert(error.status);
                console.log(error.response.status);
            });
        }
    }
});