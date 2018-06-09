var checkin = new Vue({
	el:'#checkin';
	data:{
		checkinURL:''; //这个应该是后端渲染回来的
		checkedin:0;//实时签到人数，这个是api请求得到的

	}
})





var course_id = localStorage.getItem("course_id");
$("#welcomeInfo").text(localStorage.getItem("username") + '，欢迎您！') ;