var teacherManage = new Vue({
	el:'#teacherManage',
	data:{
		teachers: [
       
        ]

	}
});

//以上vue用于测试一下前端渲染
//下面是jquery添加事件

//需要user_id传递给后面

function addEvents() {
    // 欢迎信息显示
    $("#welcomeInfo").text(localStorage.getItem("username") + '，欢迎您！') ;
    
	//管理员选择某个教师进入到该教师的课程界面
    $(".userID").click(function() { 
        window.location='/user/' + $(this).text() + '/course'; 
        localStorage.setItem("user_id",$(this).text());
    });

    //退出登录
    $("#logout").click(function() {
        window.location = '/user/login';
    });

    //手动添加教师
    $("#addTeacher").click(function() {
        window.location = '/user/add_user';
    });

    // 添加全级学生
    $("#addAllStudentButton").click(function() {
        window.location = '/add_student';
    });

    // 删除某个教师数据 DELETE请求
    $(".delete_teacher").click(function() {
        var teacher_id = $(this).parent().prev().prev().children().text();
        axios.delete('/api/user/'+teacher_id)
        .then(function(response) {
            console.log(response.status);
            alert('删除教师数据成功');
        })
        .catch(function(error) {
            console.log(error.response);
            alert('删除教师数据失败');
        });
    });
}

$(document).ready(addEvents);