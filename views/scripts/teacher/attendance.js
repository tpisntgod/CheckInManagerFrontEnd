var checkin = new Vue({
	el:'#checkin',
	data:{
		checkinURL:'',//这个应该是后端渲染回来的
		checkedin:0  //实时签到人数，这个是api请求得到的

	},
	methods:{ //还没改
        to_mainPage:function(course_id) {
          // window.location='/course/'+course_id; 
        },
        to_studentList:function(course_id){
          //  window.location =  '/course/'+course_id+'/course_member';
        },
        to_attendencePage:function(course_id){
           // window.location =  '/course/'+course_id+'/checkin_student';

        },
        to_checkAttendencn:function(){
            
        },
        to_courselist:function(){
            // window.location = '/course';

        },
        setting:function(){
          //  window.location =  '/user/change_password';
        },
        logout:function(){
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


})

$(document).ready(function() {
    var course_id = localStorage.getItem("course_id");
    $("#welcomeInfo").text(localStorage.getItem("username") + '，欢迎您！');

    $("#QRCodePic").attr("src",
    'http://qr.liantu.com/api.php?text=' + 'http://172.19.93.167:8000/checkinByQRCode/123');
    localStorage.setItem("checkin_id",123);
});