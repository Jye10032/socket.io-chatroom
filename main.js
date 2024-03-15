/*
    启动服务端程序
*/
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path');
const db = require('./db/db.js')
const chinaTime = require('china-time')
const svgCaptcha = require('svg-captcha');


// //支持截图功能
// const webshot = require('webshot');
//记录所有已经登陆过的用户
var users = []
var id_now = 1
var captcha = svgCaptcha.create();

//启动了服务器
server.listen(3000, () => {
    console.log('服务器启动成功了')
})

//express处理静态资源
//把public目录设置为静态资源
app.use(require('express').static(path.join(__dirname, 'public')))
app.get('/', function (req, res) {
    res.redirect('/index.html')
})

db.selectAll('select count(*) as sum from message', (e, r) => {
    //id 按照消息发送的先后顺序递增
    console.log('数据库共有' + r[0].sum + '条历史消息记录')
    id_now = r[0].sum + 1
})

//一进入聊天室就加载信息 传个socket对象
function initMessage(socket) {
    db.selectAll('select * from message order by id asc', (e, res) => {
        // console.log(r)
        // console.log(r[0])
        for (var i = 0; i < res.length; i++) {
            // console.log(res[i])
            if (res[i].type === 'image') {
                //广播给当前进入聊天室的用户
                socket.emit('receiveImage', res[i])
                console.log('历史消息：')
                console.log(res[i])
            } else {
                //广播给当前进入聊天室的用户
                socket.emit('receiveMessage', res[i])
                console.log('历史消息：')
                console.log(res[i])
            }

        }
    })
    console.log("当前用户：");
    console.log(users);
}



/*
    此处有个bug，如果用户没通过验证，就会显示一名undefined用户离开了聊天室，因为它connection了
    已修复 解决方案：disconnect的时候不当他是位用户 
    另一种不好的思路：在客户端连接数据库判断，这样暴露安全隐患
 */
io.on('connection', function (socket) {


    //验证码
    socket.on('getCaptcha', () => {
        captcha = svgCaptcha.create({
            size: 4,
            fontSize: 50,
            width: 100,
            height: 40,
            background: '#cc9966'
        })

        socket.emit('captcha', captcha.data)

    })

    //验证验证码
    socket.on('checkoutFirst', (data, callback) => {
        console.log(data);
        if (data.verify.toLowerCase() === captcha.text.toLowerCase()) {
            callback({
                status: "ok"
            });
        } else {
            callback({
                status: "error"
            });
        }
    });
    socket.on('checkoutLogin', data => {
        // 连接数据库验证
        let msg = '',
            resultData = '';
        db.selectAll("select * from usersInformation where username ='" + data.username + "' ", (e, r) => {
            let tt = r.length;
            if (tt == 0) {
                msg = "用户名不存在";
            } else if (data.password != r[0].password) {
                msg = "用户密码错误";
            } else {
                resultData = r[0];
                msg = "用户密码正确"
            }
            socket.emit('checkoutAnswer', {
                msg: msg,
                avatar: resultData.avatar,
                online: users.find(item => item.username === data.username) ? true : false
            })
            console.log(msg, resultData)
        })

    })
    socket.on('login', data => {
        //判断，如果在data在users中存在，说明该用户登陆过了，不允许登录
        //如果data在user中不存在，说明用户没有登陆，允许登录
        let user = users.find(item => item.username === data.username)
        if (user) {
            //表示用户在线
            socket.emit('loginError', {
                msg: '登陆失败'
            })
            // console.log('登陆失败')
        } else {
            // // //连接数据库获取用户头像
            // db.selectAll("select * from usersInformation where username ='" + data.username + "' ", (e, r) => {
            //   data.avatar = r[0].avatar
            //   console.log(r[0].avatar)
            // })
            //把登陆成功的用户信息存储起来
            //socket.username ? avatar 内置对象？ 不太像
            socket.username = data.username
            socket.avatar = data.avatar

            //表示用户不在线,把用户存入user数组
            users.push(data)
            //告诉用户，登陆成功
            socket.emit('loginSuccess', data)
            // console.log('登陆成功')

            //告诉所有人，有新用户加入到了聊天室，广播消息
            //socket.emit 给当前用户发消息 io.emit 给所有用户发消息
            io.emit('addUser', data)


            //告诉所有用户，当前聊天室用户列表以及数量
            io.emit('userList', users)

            //一进入聊天室就加载信息
            initMessage(socket)
        }
    })

    //用户断开连接功能
    //监听用户断开连接
    socket.on('disconnect', () => {
        if (socket.username === 'undefined') return;
        //把当前用户信息从user中删除
        let idx = users.findIndex(item => item.username === socket.username)
        //删除掉断开连接的人
        users.splice(idx, 1)
        // 1.告诉所有人，有人离开了聊天室
        io.emit('deleteUser', {
            username: socket.username,
            avatar: socket.avatar
        })
        // 2.告诉所有人，userList发生更新
        io.emit('userList', users)
    })

    //监听聊天的消息
    socket.on('sendMessage', data => {
        //存入数据库
        var time = chinaTime('YY/MM/DD HH:mm')
        let saveData = {
            id: id_now,
            username: data.username,
            content: data.content,
            time: time,
            avatar: data.avatar,
            type: data.type
        }
        db.insertData('message', saveData, (e, r) => {
            console.log('消息存入成功')
            id_now++
        })
        console.log('聊天消息')
        console.log(saveData)
        //广播给所有用户
        io.emit('receiveMessage', saveData)
    })

    //接受图片的信息 
    // 由于图片所占内存过大，为节省数据库空间，可以不做处理
    socket.on('sendImage', data => {
        var time = chinaTime('YY/MM/DD HH:mm')
        let saveData = {
            id: id_now,
            username: data.username,
            content: data.img,
            time: time,
            avatar: data.avatar,
            type: data.type
        }
        db.insertData('message', saveData, (e, r) => {
            console.log('消息存入成功')
            id_now++
        })
        console.log('聊天消息')
        console.log(saveData)
        //广播给所有用户
        io.emit('receiveImage', saveData)
    })

    // //实现截图功能
    // socket.on('webshot', url => {
    //     webshot(url, 'hello_world.png', {siteType:'html'}, function(err) {
    //         // screenshot now saved to hello_world.png
    //       })
    // })

    //注册用户
    socket.on('registerUser', data => {
        // console.log(data)
        //插入之前要查询一遍，确保用户名未被注册 
        db.selectAll("select * from usersInformation where username = '" + data.username + "' ", (e, r) => {
            let tt = r.length;
            if (tt == 1) {
                console.log("账号已经被注册")
                socket.emit('registerError')
            } else {
                let saveData = data
                //注册
                db.insertData('usersInformation', saveData, (e, r) => {
                    console.log('注册成功')
                    socket.emit('registerSuccess')

                })
            }
        })

    })

})