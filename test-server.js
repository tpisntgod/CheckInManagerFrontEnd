const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

const app = new Koa();

console.log(path.join(__dirname, 'views'));
const main = serve(path.join(__dirname, '/views'));
const bodyParser = require('koa-bodyparser');
// 静态文件处理
app.use(main);

// 解析request的body
app.use(bodyParser());

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

//定位到教师登陆后的主界面'/course'
router.get('/course', async (ctx, next) => {
    console.log('login router');
    //console.log(__dirname);
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/teacher/courseList.html');
    
});

// add url-route:
router.get('/user/login', async (ctx, next) => {
    console.log('login router');
    //console.log(__dirname);
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/login.html');
});


router.get('/user/change_password', async (ctx, next) => {
    console.log('login router');
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
    console.log('login router');
    console.log('getting a course...');
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/teacher/courseDetail.html');
});

//学生名单界面
router.get('/course/:course_id/course_member', async (ctx, next) => {
    console.log('login router');
    console.log('getting students names...');
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/teacher/studentNameLlistPage.html');
});

//课程签到历史界面
router.get('/course/:course_id/checkin_student', async (ctx, next) => {
    console.log('login router');
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
})


router.get('/', async (ctx, next) => {
   // ctx.response.body = '<h1>Index</h1>';
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/initial.html');
});


// add router middleware:
app.use(router.routes());

app.listen(8000);
console.log('app started at port 8000...');