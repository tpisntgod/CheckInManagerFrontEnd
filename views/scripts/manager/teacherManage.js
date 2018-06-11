var teacherManage = new Vue({
	el:'#teacherManage',
	data:{
		teachers: [
       
        ]

	}
});

//以上vue用于测试一下前端渲染
//下面是jquery添加事件
$("#welcomeInfo").text(localStorage.getItem("username") + '，欢迎您！') ;

//需要user_id传递给后面

function addEvents() {
	//管理员选择某个教师进入到该教师的课程界面
    $(".userID").click(function() { 
        window.location='/user/' + $(this).text() + '/course'; 
        localStorage.setItem("user_id",$(this).text());
    });

    //退出登录
    $("#logout").click(function() {
        window.location = '/user/login';
        //alert('a');
    });

    //手动添加教师
    $("#addTeacher").click(function() {
        window.location = '/user/add_user';
    });

    // 添加全级学生
    $("#addAllStudentButton").click(function() {
        window.location = '/add_student';
    });
}

$(document).ready(addEvents);