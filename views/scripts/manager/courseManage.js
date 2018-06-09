var courseManage = new Vue({
	el:'#courseManage',
	data:{
		courses:[
      
        ]

	}
});

//以上vue用于测试一下前端渲染
//下面是jquery添加事件
$("#welcomeInfo").text(localStorage.getItem("username") + '，欢迎您！') ;

//需要user_id传递给后面
var user_id = localStorage.getItem("user_id");
function addEvents() {
	//管理员选择某个课程进入到该课程的学生列表界面
    $(".courseID").click(function() { 
        window.location='/user/'+ user_id +'/course/' + $(this).children().text() + '/course_member'; 
        localStorage.setItem("course_id",$(this).children().text()); //存course_id
         
    });

    //退出登录
    $("#logout").click(function() {
        window.location = '/user/login';
        //alert('a');
    });
}

$(document).ready(addEvents);