# AD_Platform

使用node.js+Vue开发的awd日志审计平台, 数据采用webworker进行处理保证数据量较大时前端的流畅, 后端支持对日志上传的文件提取, 对获取到的日志进行单独或者批量的重放.

不管是查看前端还是后端均需要node.js环境, 前往官网安装下载或者使用docker快速搭建环境.

pages中为编译前的Vue代码, Server的assert中为编译过后的Vue代码, Server中其余的为后端代码, Vue-cli支持通过server模式热启动, cd进pages后用

```
npm run serve
```

有一些功能, 还没有放到右侧的导航栏之中, 可以通过查看代码中的路由表自行访问, 后端需要mongodb数据库支持, 不然查看日志, 上传日志, 等功能均无法使用(只有主页能看), 在server/build目录中有dockerfile和docker-compose可以通过docker快速搭建环境

安装好docker和 docker-compose后
```
cd server/build
docker-compose up
```
页面整体风格仿照ant design pro for react, 但是ant design pro系列没有Vue版就只能自己写一个了, 项目还未完成页面大部分也比较粗糙各位同学见谅.
