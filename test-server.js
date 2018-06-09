const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');

// Vue官网教程:https://ssr.vuejs.org/zh/guide/  渲染一个 Vue 实例
// 第 1 步：创建一个 Vue 实例
const Vue = require('vue')

// 第 2 步：创建一个 renderer
const render = require('vue-server-renderer');
const renderer = render.createRenderer()

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

const app = new Koa();

console.log(path.join(__dirname, 'views'));
const main = serve(path.join(__dirname, '/views'));
const bodyParser = require('koa-bodyparser');

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// 静态文件处理
app.use(main);

// 解析request的body
app.use(bodyParser());

// add url-route:
router.get('/user/login', async (ctx, next) => {
    console.log('login router');
    //console.log(__dirname);
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/login.html');
});

router.get('/user/change_password', async (ctx, next) => {
    //console.log(__dirname);
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/teacher/changePasswordPage.html');
});

router.patch('/api/user/password', async (ctx, next) => {
    console.log('change password check...');
    //console.log(__dirname);
    ctx.cookies.set('key', '3w4e5r6tyuifcgvhbjnkmlvg');
    ctx.response.status = 201;
    console.log('ctx.request:',ctx.request);
    console.log('ctx.request.body:',ctx.request.body);
});

router.get('/course/:course_id', async (ctx, next) => {
    console.log('getting a course...');
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/teacher/courseDetail.html');
});

//学生名单界面
router.get('/course/:course_id/course_member', async (ctx, next) => {
    console.log('getting students names...');
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/teacher/studentNameLlistPage.html');
});

//课程签到历史界面
router.get('/course/:course_id/checkin_student', async (ctx, next) => {
    console.log('getting attendance history...');
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/teacher/checkAttendancePage.html');
});

router.post('/api/users/session',  async (ctx, next) => {
    console.log('login check');
    ctx.cookies.set('key', '3w4e5r6tyuifcgvhbjnkmlvg', {
            maxAge: 3600*1000 ,
            httpOnly: false
        }
    );
    console.log('ctx.request:',ctx.request);
    console.log('ctx.request.body:',ctx.request.body);
    console.log('user id:',ctx.request.body.user_id,' password:',ctx.request.body.password);
    /*ctx.response.type = 'json';
    ctx.response.body = {message: 'empty username or password'};*/
    ctx.response.status = 201;
});

router.delete('/api/users/session', async (ctx, next) => {
    console.log('/api/users/session');
    ctx.response.status = 204;
});

// vue ssr 服务端渲染 测试
router.get('/vue_ssr_test', async (ctx, next) => {
    const tem = new Vue({
        data: {
            url : ctx.request.url,
            title: 'vue ssr template test'
        },
        template: fs.readFileSync('./views/html/teacher/changePasswordPage.html', 'utf-8')
    })

    renderer.renderToString(tem, (err, html) => {
        if (err) {
            console.log(err);
            ctx.response.status = 500;
            ctx.response.body = 'Internal Server Error';
            return;
        }
        ctx.response.body = html;
    })
});

/*
前端渲染，之后删除
router.get('/course_front', async (ctx, next) => {
    console.log('front render course list page');
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/teacher/courseList.html');
});

router.get('/course_front/data', async (ctx, next) => {
    console.log('return course list page data as json');
    ctx.response.type = 'json';
    ctx.response.body = JSON.stringify({
        username:'衣杨',
        courses:[
            {
                course_id:'1', 
                course_name:'数据挖掘',
                semester:'2017-2018学年度第二学期'
            },
            {
                course_id:'2', 
                course_name:'数值计算',
                semester:'2016-2017学年度第一学期'
            }
        ]
    });
});
*/

//创建 renderer 时提供一个页面模板
const courseList_renderer = render.createRenderer({
    template: require('fs').readFileSync('./views/html/teacher/courseList_template.html', 'utf-8')
})

//定位到教师登陆后的主界面'/course'
router.get('/course', async (ctx, next) => {
    console.log('course router');
    //console.log(__dirname);

    /*ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/teacher/courseList.html');*/
    const tem = new Vue({
        //el:'#Courses',
        data:{
            courses:[
                {
                    course_id:'1', 
                    course_name:'数据挖掘',
                    semester:'2017-2018学年度第二学期'
                },
                {
                    course_id:'2', 
                    course_name:'系统分析与设计',
                    semester:'2017-2018学年度第一学期'
                }
            ]
        },
        template: fs.readFileSync('./views/html/teacher/courseList_markup.html', 'utf-8')
    })

    courseList_renderer.renderToString(tem, (err, html) => {
        if (err) {
            console.log(err);
            ctx.response.status = 500;
            ctx.response.body = 'Internal Server Error';
            return;
        }
        ctx.response.body = html;
        console.log('courseList html');
        console.log(html);

    })
    
});

router.get('/', async (ctx, next) => {
   // ctx.response.body = '<h1>Index</h1>';
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/initial.html');
});


//管理员：添加全级学生页面
router.get('/user/add_student', async (ctx, next) => {
    console.log('login manager addStudent router');
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/manager/addAllStudentPage.html');
});

router.post('/api/student',  async (ctx, next) => {
    console.log('add student check');
    ctx.cookies.set('key', '3w4e5r6tyuifcgvhbjnkmlvg');
    ctx.response.status = 201;
});

//管理员：添加课程
router.get('/user/:user_id/add_course', async (ctx, next) => {
    console.log('login manager addCourse router');
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/manager/addCoursePage.html');
});

router.post('/api/course',  async (ctx, next) => {
    console.log('add course check');
    ctx.cookies.set('key', '3w4e5r6tyuifcgvhbjnkmlvg');
    ctx.response.status = 201;
});



//管理员：添加学生页面
router.get('/user/:user_id/course/:course_id/add_course_member', async (ctx, next) => {
    console.log('login manager add Student in the course router');
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/manager/addStudentPage.html');
});

router.post('/api/course/:course_id/course_member',  async (ctx, next) => {
    console.log('add student check');
    ctx.cookies.set('key', '3w4e5r6tyuifcgvhbjnkmlvg');
    ctx.response.status = 201;
});

//管理员：添加老师页面
router.get('/user/add_user', async (ctx, next) => {
    console.log('login manager add Teacher router');
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/manager/addTeacherPage.html');
});

router.post('/api/user',  async (ctx, next) => {
    console.log('add teacher check');
    ctx.cookies.set('key', '3w4e5r6tyuifcgvhbjnkmlvg');
    ctx.response.status = 201;
});



// add router middleware:
app.use(router.routes());

app.listen(8000);
console.log('app started at port 8000...');