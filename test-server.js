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

/*router.get('/course/:course_id', async (ctx, next) => {
    console.log('getting a course...');
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/teacher/courseDetail.html');
});*/


/*router.get('/user/:user_id/course/:course_id/course_member', async (ctx, next) => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/manager/studentManage.html');
});*/

//课程签到历史界面
/*router.get('/course/:course_id/checkin_student', async (ctx, next) => {
    console.log('getting attendance history...');
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/teacher/checkAttendancePage.html');
});*/

//签到详情界面
/*router.get('/course/:course_id/checkin_student/:checkin_id', async (ctx, next) => {
    console.log('getting attendance history...');
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/teacher/singleAttendancePage.html');
});*/


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
    ctx.response.type = 'json';
    ctx.response.body = JSON.stringify({
        username:'张老师'
    });
    


});

router.delete('/api/users/session', async (ctx, next) => {
    console.log('/api/users/session');
    ctx.response.status = 204;
});

// vue ssr 服务端渲染 测试
//更改密码界面还是用回原来的前端渲染
/*router.get('/vue_ssr_test', async (ctx, next) => {
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
});*/

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
                },
                {
                    course_id:'3', 
                    course_name:'软件测试',
                    semester:'2017-2018学年度第一学期'
                },
                {
                    course_id:'2', 
                    course_name:'系统分析与设计',
                    semester:'2017-2018学年度第一学期'
                },
                {
                    course_id:'3', 
                    course_name:'软件测试',
                    semester:'2017-2018学年度第一学期'
                },
                {
                    course_id:'2', 
                    course_name:'系统分析与设计',
                    semester:'2017-2018学年度第一学期'
                },
                {
                    course_id:'3', 
                    course_name:'软件测试',
                    semester:'2017-2018学年度第一学期'
                },
                {
                    course_id:'2', 
                    course_name:'系统分析与设计',
                    semester:'2017-2018学年度第一学期'
                },
                {
                    course_id:'3', 
                    course_name:'软件测试',
                    semester:'2017-2018学年度第一学期'
                },
                {
                    course_id:'2', 
                    course_name:'系统分析与设计',
                    semester:'2017-2018学年度第一学期'
                },
                {
                    course_id:'3', 
                    course_name:'软件测试',
                    semester:'2017-2018学年度第一学期'
                },
                {
                    course_id:'2', 
                    course_name:'系统分析与设计',
                    semester:'2017-2018学年度第一学期'
                },
                {
                    course_id:'3', 
                    course_name:'软件测试',
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


//课程详情页面后端渲染
//创建 renderer 时提供一个页面模板
const courseDetail_renderer = render.createRenderer({
    template: require('fs').readFileSync('./views/html/teacher/courseDetail_template.html', 'utf-8')
})

router.get('/course/:course_id', async (ctx, next) => {
    console.log('course detail router');

    const tem = new Vue({
        data:{
            course_name: '数据挖掘',
            course_id: '1',
            credit: 2,
            semester: '2017-2018学年度第一学期',
            class_time: '周二1-4节课', 
            position: '公教楼b栋', 
            student_num: 100,
            username:'张老师'
        },
        template: fs.readFileSync('./views/html/teacher/courseDetail_markup.html', 'utf-8')
    })

    courseDetail_renderer.renderToString(tem, (err, html) => {
        if (err) {
            console.log(err);
            ctx.response.status = 500;
            ctx.response.body = 'Internal Server Error';
            return;
        }
        ctx.response.body = html;
        console.log('courseDetail html');
        console.log(html);

    })
    
});

//后端渲染：学生名单界面
//创建 renderer 时提供一个页面模板
const studentNameList_renderer = render.createRenderer({
    template: require('fs').readFileSync('./views/html/teacher/studentNameListPage_template.html', 'utf-8')
})

router.get('/course/:course_id/course_member', async (ctx, next) => {
    console.log('course detail router');

    const tem = new Vue({
        data:{
            course_member:[
            {
                student_id:'15331117',
                student_name:'王小明'
            },
            {
                student_id:'11171533',
                student_name:'高恩星'
            },
            {
                student_id:'11171533',
                student_name:'我是谁'
            },
            {
                student_id:'11171533',
                student_name:'我是谁'
            },
            {
                student_id:'11171533',
                student_name:'我是谁'
            },
            {
                student_id:'11171533',
                student_name:'我是谁'
            },
            {
                student_id:'11171533',
                student_name:'我是谁'
            },
            {
                student_id:'11171533',
                student_name:'我是谁'
            },
            {
                student_id:'11171533',
                student_name:'我是谁'
            },
            {
                student_id:'11171533',
                student_name:'我是谁'
            },
            {
                student_id:'11171533',
                student_name:'我是谁十'
            },
            {
                student_id:'11171533',
                student_name:'我是谁十一'
            },
            {
                student_id:'11171533',
                student_name:'十二'
            },
            {
                student_id:'11171533',
                student_name:'十三'
            },
            {
                student_id:'11171533',
                student_name:'我是十四'
            }
        ],
        course_member_num:3
        },
        template: fs.readFileSync('./views/html/teacher/studentNameListPage_markup.html', 'utf-8')
    })

    studentNameList_renderer.renderToString(tem, (err, html) => {
        if (err) {
            console.log(err);
            ctx.response.status = 500;
            ctx.response.body = 'Internal Server Error';
            return;
        }
        ctx.response.body = html;
        console.log('students name  html');
        console.log(html);

    })
    
});



//后端渲染：签到历史记录界面
//创建 renderer 时提供一个页面模板
const checkAttendance_renderer = render.createRenderer({
    template: require('fs').readFileSync('./views/html/teacher/checkAttendancePage_template.html', 'utf-8')
})

router.get('/course/:course_id/checkin_student', async (ctx, next) => {

    const tem = new Vue({
        data:{
             checkin_history:[
                {
                    checkin_id:1231,
                    datetime:"2018-01-03 11:12:21",
                    checkedin_num:80,
                    uncheckedin_num:4
                },
                {
                    checkin_id:431,
                    datetime:"2018-01-23 14:12:23",
                    checkedin_num:75,
                    uncheckedin_num:9
                },
                {
                    checkin_id:433,
                    datetime:"2018-01-23 14:15:24",
                    checkedin_num:75,
                    uncheckedin_num:10
                },
                {
                    checkin_id:431,
                    datetime:"2018-01-23 14:12:23",
                    checkedin_num:75,
                    uncheckedin_num:9
                },
                {
                    checkin_id:433,
                    datetime:"2018-01-23 14:15:24",
                    checkedin_num:75,
                    uncheckedin_num:10
                },
                {
                    checkin_id:431,
                    datetime:"2018-01-23 14:12:23",
                    checkedin_num:75,
                    uncheckedin_num:9
                },
                {
                    checkin_id:433,
                    datetime:"2018-01-23 14:15:24",
                    checkedin_num:75,
                    uncheckedin_num:10
                },
                {
                    checkin_id:431,
                    datetime:"2018-01-23 14:12:23",
                    checkedin_num:75,
                    uncheckedin_num:9
                },
                {
                    checkin_id:433,
                    datetime:"2018-01-23 14:15:24",
                    checkedin_num:75,
                    uncheckedin_num:10
                },
                {
                    checkin_id:431,
                    datetime:"2018-01-23 14:12:23",
                    checkedin_num:75,
                    uncheckedin_num:9
                },
                {
                    checkin_id:433,
                    datetime:"2018-01-23 14:15:24",
                    checkedin_num:75,
                    uncheckedin_num:10
                },
                {
                    checkin_id:431,
                    datetime:"2018-01-23 14:12:23",
                    checkedin_num:75,
                    uncheckedin_num:9
                },
                {
                    checkin_id:433,
                    datetime:"2018-01-23 14:15:24",
                    checkedin_num:75,
                    uncheckedin_num:10
                } 
            ]
        },
        template: fs.readFileSync('./views/html/teacher/checkAttendancePage_markup.html', 'utf-8')
    })

    checkAttendance_renderer.renderToString(tem, (err, html) => {
        if (err) {
            console.log(err);
            ctx.response.status = 500;
            ctx.response.body = 'Internal Server Error';
            return;
        }
        ctx.response.body = html;
        console.log('sign history html');
        console.log(html);

    })
    
});


//后端渲染：某个签到记录的详情
//创建 renderer 时提供一个页面模板
const singleAttendance_renderer = render.createRenderer({
    template: require('fs').readFileSync('./views/html/teacher/singleAttendancePage_template.html', 'utf-8')
})

router.get('/course/:course_id/checkin_student/:checkin_id', async (ctx, next) => {
    //console.log('course detail router');

    const tem = new Vue({
        data:{
            checkedin:[
            {
                student_id:"15331689",
                student_name:"王同学"
            },
            {
                student_id:"15457682",
                student_name:"李同学"
            }
            ,
            {
                student_id:"15457682",
                student_name:"李同学"
            }
            ,
            {
                student_id:"15457682",
                student_name:"李同学"
            }
            ,
            {
                student_id:"15457682",
                student_name:"李同学"
            }
            ,
            {
                student_id:"15457682",
                student_name:"李同学"
            }
            ,
            {
                student_id:"15457682",
                student_name:"李同学"
            }
            ,
            {
                student_id:"15457682",
                student_name:"李同学"
            }
            ,
            {
                student_id:"15457682",
                student_name:"李同学"
            }
            ,
            {
                student_id:"15457682",
                student_name:"李同学"
            }
            ,
            {
                student_id:"15457682",
                student_name:"李同学"
            }
            ,
            {
                student_id:"15457682",
                student_name:"李同学"
            }
            ],
            checkedin_num:75,
            uncheckedin:[
            {
                student_id:"15331117",
                student_name:"黄同学"
            },
            {
                student_id:"15453682",
                student_name:"贾同学"
            }
            ],
            uncheckedin_num:8,
        },
        template: fs.readFileSync('./views/html/teacher/singleAttendancePage_markup.html', 'utf-8')
    })

    singleAttendance_renderer.renderToString(tem, (err, html) => {
        if (err) {
            console.log(err);
            ctx.response.status = 500;
            ctx.response.body = 'Internal Server Error';
            return;
        }
        ctx.response.body = html;
        console.log('single attendance html');
        console.log(html);

    })
    
});

//后端渲染：管理员：教师管理界面
//创建 renderer 时提供一个页面模板
const teacherManage_renderer = render.createRenderer({
    template: require('fs').readFileSync('./views/html/manager/teacherManage_template.html', 'utf-8')
})
 
router.get('/user', async (ctx, next) => {
   //console.log('course detail router');

    const tem = new Vue({
        data:{
            teachers:[
            {
                user_id: "12",
                username: "潘老师"
            },
            {
                user_id: "22",
                username: "蔡老师"
            },
            {
                user_id: "53",
                username: "万老师"
            },
            {
                user_id: "45",
                username: "王老师"
            },
            {
                user_id: "89",
                username: "tony老师"
            },
            {
                user_id: "53",
                username: "万老师"
            },
            {
                user_id: "45",
                username: "王老师"
            },
            {
                user_id: "89",
                username: "tony老师"
            },
            {
                user_id: "53",
                username: "万老师"
            },
            {
                user_id: "45",
                username: "王老师"
            },
            {
                user_id: "89",
                username: "tony老师"
            },
            {
                user_id: "53",
                username: "万老师"
            },
            {
                user_id: "45",
                username: "王老师"
            },
            {
                user_id: "89",
                username: "tony老师"
            }
            ]

        },
        template: fs.readFileSync('./views/html/manager/teacherManage_markup.html', 'utf-8')
    })

    teacherManage_renderer.renderToString(tem, (err, html) => {
        if (err) {
            console.log(err);
            ctx.response.status = 500;
            ctx.response.body = 'Internal Server Error';
            return;
        }
        ctx.response.body = html;
        console.log('teacher manage html');
        console.log(html);

    })
    
});

//后端渲染：管理员：课程管理界面
//创建 renderer 时提供一个页面模板
const courseManage_renderer = render.createRenderer({
    template: require('fs').readFileSync('./views/html/manager/courseManage_template.html', 'utf-8')
})
 
router.get('/user/:user_id/course', async (ctx, next) => {

    const tem = new Vue({
        data:{
            courses:[
            {
                course_id:2345,
                course_name:"软件测试"
            },
            {
                course_id:5898,
                course_name:"操作系统"
            },
            {
                course_id:5836,
                course_name:"数据挖掘"
            },
            {
                course_id:5898,
                course_name:"操作系统"
            },
            {
                course_id:5836,
                course_name:"数据挖掘"
            } ,
            {
                course_id:5898,
                course_name:"操作系统"
            },
            {
                course_id:5836,
                course_name:"数据挖掘"
            } ,
            {
                course_id:5898,
                course_name:"操作系统"
            },
            {
                course_id:5836,
                course_name:"数据挖掘"
            } ,
            {
                course_id:5898,
                course_name:"操作系统"
            },
            {
                course_id:5836,
                course_name:"数据挖掘"
            } ,
            {
                course_id:5898,
                course_name:"操作系统"
            },
            {
                course_id:5836,
                course_name:"数据挖掘"
            } 
            ]

        },
        template: fs.readFileSync('./views/html/manager/courseManage_markup.html', 'utf-8')
    })

    courseManage_renderer.renderToString(tem, (err, html) => {
        if (err) {
            console.log(err);
            ctx.response.status = 500;
            ctx.response.body = 'Internal Server Error';
            return;
        }
        ctx.response.body = html;
        console.log('course manage html');
        console.log(html);

    })
    
});


//后端渲染：管理员：学生管理界面
//创建 renderer 时提供一个页面模板
const studentManage_renderer = render.createRenderer({
    template: require('fs').readFileSync('./views/html/manager/studentManage_template.html', 'utf-8')
})
 
router.get('/user/:user_id/course/:course_id/course_member', async (ctx, next) => {

    const tem = new Vue({
        data:{
            course_member:[
            {
                student_id:"15331117",
                student_name:"王小明"
            },
            {
                student_id:"11171583",
                student_name:"刘晓"
            },
            {
                student_id:"11851533",
                student_name:"张三"
            },
            {
                student_id:"15217153",
                student_name:"李小强"
            },
            {
                student_id:"15218883",
                student_name:"王大海"
            },
            {
                student_id:"15217153",
                student_name:"李四"
            },
            {
                student_id:"15217153",
                student_name:"吴迪"
            },
            {
                student_id:"15218883",
                student_name:"王大海"
            },
            {
                student_id:"15217153",
                student_name:"李四"
            },
            {
                student_id:"15217153",
                student_name:"吴迪"
            }
            ],
            course_member_num:7
        },
        template: fs.readFileSync('./views/html/manager/studentManage_markup.html', 'utf-8')
    })

    studentManage_renderer.renderToString(tem, (err, html) => {
        if (err) {
            console.log(err);
            ctx.response.status = 500;
            ctx.response.body = 'Internal Server Error';
            return;
        }
        ctx.response.body = html;
        console.log('student manage html');
        console.log(html);

    })
    
});


router.get('/', async (ctx, next) => {
   // ctx.response.body = '<h1>Index</h1>';
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/initial.html');
});


router.get('/user/add_user', async (ctx, next) => {
    console.log('login manager addStudent router');
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./views/html/manager/addStudentPage.html');
});



router.post('/api/user',  async (ctx, next) => {
    console.log('add student check');
    ctx.cookies.set('key', '3w4e5r6tyuifcgvhbjnkmlvg');
    ctx.response.status = 201;
});


// add router middleware:
app.use(router.routes());

app.listen(8000);
console.log('app started at port 8000...');