/**
 * 聊天室的主要功能
 */

// 1. 连接socketIO服务
const socket = io('http://localhost:3000')

let curr_username = ''
let curr_avatar = ''

// 2. 登录功能
$('.avatars li').on('click', function () {
  $(this).addClass('active').siblings().removeClass('active')
})

$('.login-btn').on('click', function () {
  // 获取用户名
  const username = $('#username').val().trim()
  if (!username) {
    return alert('请输入用户名！')
  }

  // 获取已选择的头像
  const avatar = $('.avatars li.active img').attr('src')

  // 传递用户信息到socket.io服务器
  socket.emit('login', {
    username: username,
    avatar: avatar
  })

  curr_username = username
  curr_avatar = avatar
})

// 监听登录失败事件
socket.on('loginError', (data) => {
  alert(data.msg)
})

// 监听登陆成功事件
socket.on('loginSuccess', ({ data }) => {
  // alert(data.msg)
  $('#login-container').fadeOut()
  $('#chat-container').fadeIn()

  // 设置个人信息
  $('.self .username').text(data.username)
  $('.self .avatar-url').attr('src', data.avatar)
})

// 添加系统消息
// 监听添加用户的事件
socket.on('addUser', (data) => {
  $('.comments .main-chat').append(`
    <div class="system-info">
      ${data.username} 加入了群聊
    </div>
  `)
  scrollIntoView('.main-chat')
})

// 监听用户离开的事件
socket.on('delUser', (username) => {
  $('.comments .main-chat').append(`
    <div class="system-info">
      ${username} 离开了群聊
    </div>
  `)
  scrollIntoView('.main-chat')
})

// 监听用户列表的消息
socket.on('userList', (data) => {
  $('.other-users').html('')

  data.forEach((item) => {
    $('.other-users').append(`
      <div class="user-card">
        <img src="${item.avatar}" alt="">
        <span>${item.username}</span>
      </div>
    `)
  })

  $('.comments .title').text(`聊天室(${data.length})`)
})

// 发送消息
$('#sendMsg').on('click', () => {
  // 获取到聊天的内容
  const content = $('#content').text() || $('#content').html()
  if (!content) {
    return alert('请输入内容！')
  }

  socket.emit('sendMsg', {
    msg: content,
    username: curr_username,
    avatar: curr_avatar
  })

  $('#content').text('')
})

// 监听聊天的消息
socket.on('recieveMsg', (data) => {
  // 将接收到的消息显示到聊天窗口
  if (data.username === curr_username) {
    $('.main-chat').append(`
      <div class="self-comment">
        <span class="info">${data.msg}</span>
        <img src="${data.avatar}" alt="">
      </div>
    `)
  } else {
    $('.main-chat').append(`
      <div class="other-comment">
        <div class="box-info">
          <span class="username">${data.username}</span>
          <span class="info">${data.msg}</span>
        </div>
        <img src="${data.avatar}" alt="">
      </div>
    `)
  }

  scrollIntoView('.main-chat')
})

const scrollIntoView = (target) => {
  $(target).children(':last').get(0).scrollIntoView()
}

// 发送图片的功能
$('#file').on('change', function () {
  const file = this.files[0]

  // 获取文件名
  const fileName = file.name;

  // 分割文件名，获取后缀名
  const fileExtension = fileName.split('.').pop();

  // 检查后缀名
  if (fileExtension !== 'jpg' && fileExtension !== 'png') {
    alert('只能上传jpg或png格式的图片');
    return;
  }

  // 将这个文件发送到服务器，借助于H5的fileReader
  const fr = new FileReader()
  fr.readAsDataURL(file)
  fr.onload = function () {
    socket.emit('sendImg', {
      username: curr_username,
      avatar: curr_avatar,
      img: fr.result
    })
  }
})

// 监听图片聊天信息
socket.on('recieveImg', (data) => {
  if (data.username === curr_username) {
    $('.main-chat').append(`
      <div class="self-comment">
        <span class="info">
          <img src="${data.img}">
        </span>
        <img src="${data.avatar}" alt="">
      </div>
    `)
  } else {
    $('.main-chat').append(`
      <div class="other-comment">
        <div class="box-info">
          <span class="username">${data.username}</span>
          <span class="info">
            <img src="${data.img}">
          </span>
        </div>
        <img src="${data.avatar}" alt="">
      </div>
    `)
  }

  $('.main-chat img:last').on('load', function () {
    scrollIntoView('.main-chat')
  })
})

//监听剪切板
$(function () {
  $('#content').on('paste', function (e) {
    var items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        e.preventDefault();
        var blob = items[i].getAsFile();
        var URLObj = window.URL || window.webkitURL;
        var source = URLObj.createObjectURL(blob);
        var img = $('<img>').attr('src', source).css({ 'max-width': '100%', 'max-height': '100%', 'height': 'auto' });
        $('#content').append(img);
      }
    }
  });
});

$('.icon-emoji-happy').on('click', function () {
  $('#content').emoji({
    button: '.icon-emoji-happy',
    showTab: false,
    animation: 'slide',
    position: 'topRight',
    // icons: [
    //   {
    //     name: 'QQ表情',
    //     path: './jquery-emoji/dist/img/tieba/',
    //     maxNum: 50,
    //     excludeNums: [41, 45, 54],
    //     file: '.jpg'
    //   }
    // ]
    icons: [{
      name: "贴吧表情",
      path: "./jquery-emoji/dist/img/tieba/",
      maxNum: 50,
      file: ".jpg",
      placeholder: ":{alias}:",
      alias: {
        1: "hehe",
        2: "haha",
        3: "tushe",
        4: "a",
        5: "ku",
        6: "lu",
        7: "kaixin",
        8: "han",
        9: "lei",
        10: "heixian",
        11: "bishi",
        12: "bugaoxing",
        13: "zhenbang",
        14: "qian",
        15: "yiwen",
        16: "yinxian",
        17: "tu",
        18: "yi",
        19: "weiqu",
        20: "huaxin",
        21: "hu",
        22: "xiaonian",
        23: "neng",
        24: "taikaixin",
        25: "huaji",
        26: "mianqiang",
        27: "kuanghan",
        28: "guai",
        29: "shuijiao",
        30: "jinku",
        31: "shengqi",
        32: "jinya",
        33: "pen",
        34: "aixin",
        35: "xinsui",
        36: "meigui",
        37: "liwu",
        38: "caihong",
        39: "xxyl",
        40: "taiyang",
        41: "qianbi",
        42: "dnegpao",
        43: "chabei",
        44: "dangao",
        45: "yinyue",
        46: "haha2",
        47: "shenli",
        48: "damuzhi",
        49: "ruo",
        50: "OK"
      },
      title: {
        1: "呵呵",
        2: "哈哈",
        3: "吐舌",
        4: "啊",
        5: "酷",
        6: "怒",
        7: "开心",
        8: "汗",
        9: "泪",
        10: "黑线",
        11: "鄙视",
        12: "不高兴",
        13: "真棒",
        14: "钱",
        15: "疑问",
        16: "阴脸",
        17: "吐",
        18: "咦",
        19: "委屈",
        20: "花心",
        21: "呼~",
        22: "笑脸",
        23: "冷",
        24: "太开心",
        25: "滑稽",
        26: "勉强",
        27: "狂汗",
        28: "乖",
        29: "睡觉",
        30: "惊哭",
        31: "生气",
        32: "惊讶",
        33: "喷",
        34: "爱心",
        35: "心碎",
        36: "玫瑰",
        37: "礼物",
        38: "彩虹",
        39: "星星月亮",
        40: "太阳",
        41: "钱币",
        42: "灯泡",
        43: "茶杯",
        44: "蛋糕",
        45: "音乐",
        46: "haha",
        47: "胜利",
        48: "大拇指",
        49: "弱",
        50: "OK"
      }
    }, {
      name: "QQ高清",
      path: "./jquery-emoji/dist/img/qq/",
      maxNum: 91,
      excludeNums: [41, 45, 54],
      file: ".gif",
      placeholder: "#qq_{alias}#"
    }, {
      name: "emoji高清",
      path: "./jquery-emoji/dist/img/emoji/",
      maxNum: 84,
      file: ".png",
      placeholder: "#emoji_{alias}#"
    }]
  })
})
