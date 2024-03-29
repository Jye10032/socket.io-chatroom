# 基于socket.io实现的简易聊天室

## 运行项目

1. 首先运行 `npm install` 或 `yarn` 下载依赖
2. 使用 `mysql` 运行 `websocket.sql` ，建立数据表
3. 运行项目 `npm i`
   - 默认访问端口号为3000
   - `http://localhost:3000`

## 功能

* 实时信息传输
* 支持发送表情和上传图片
* 支持注册、登录
* 可以存储历史信息
* 验证码功能

## 更新列表

v1.0

简易版在线聊天室

* 因为jQuery-emoji的代码有些bug，其中的一个文件使用了 `.load`、`.error`这类的方法，但是jQuery在1.8之后就已经不支持了。
* 更改了部分jQuery-emoji的文件，替换了上述方法，改为 `.on('load', function() {})`的格式。

v2.0

增加了注册登录和信息存储功能

* 用户可以在登录之后查看历史消息。
* 在服务端记录了当前在线的用户信息，防止重复登录。

v3.0
