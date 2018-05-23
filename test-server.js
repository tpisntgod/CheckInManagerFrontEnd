const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

const app = new Koa();

console.log(path.join(__dirname, 'views'));
const main = serve(path.join(__dirname, '/views'));
// 静态文件处理
app.use(main);

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


router.get('/api/course', async (ctx, next) => {
    console.log('login router');
    console.log('getting courses...');
    //console.log(__dirname);
    ctx.response.status = 200;
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


router.post('/api/users/session',  async (ctx, next) => {
    console.log('login check');
    ctx.cookies.set('key', '3w4e5r6tyuifcgvhbjnkmlvg');
    /*ctx.response.type = 'json';
    ctx.response.body = {message: 'empty username or password'};*/
    ctx.response.status = 200;
});



router.get('/', async (ctx, next) => {
   // ctx.response.body = '<h1>Index</h1>';
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/initial.html');
});

// add router middleware:
app.use(router.routes());

app.listen(8000);
console.log('app started at port 8000...');