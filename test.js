// var Mongo = require("./model/mongodb");
// var log = require("./controller/log");
// var send_req = require("./controller/send_request");

// send_req();

// const O_GetLogFromFile = require("../tools/GetFileLog");

var a = `POST /index.php HTTP/1.1
Host: 47.106.182.92
Content-Length: 1578
Cache-Control: max-age=0
Origin: http://127.0.0.1
Upgrade-Insecure-Requests: 1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryCRTk4plP13QW7GDH
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Referer: http://127.0.0.1/test.html
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: PHPSESSID=s9t3ac1vjg06o2orihp836dgm1
Connection: close

------WebKitFormBoundaryCRTk4plP13QW7GDH
Content-Disposition: form-data; name="username"

xxx
------WebKitFormBoundaryCRTk4plP13QW7GDH
Content-Disposition: form-data; name="file1"; filename="function.php"
Content-Type: application/octet-stream

<?php 

?> 
------WebKitFormBoundaryCRTk4plP13QW7GDH--`;

var Arr = a.match(/Content-Type\:.*?boundary=-*(.*;?)+/);
var reg = new RegExp(`\n-*${Arr[1]}[\\s\\S]*?filename="(.*)"[\\s\\S]*?(?:Content-Type:.*)([\\s\\S]*?)-*${Arr[1]}--`);
console.log(reg);
console.log(a.match(reg));