
var courselist = new Vue({
    el:'#Courses',
    data:{
        username: ' ',
        courses:[
            {
               
            }
        ]
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
        }
    },
    created(){
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
        });
    }
    
});