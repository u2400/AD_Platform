var unfilted_data = [];
for (let i = 0; i < 50000; i++) {
  unfilted_data.push({
    key: `ObjectId("5c540823294a3231e02ca4${i}")`,
    "_id" : `ObjectId("5c540823294a3231e02ca4a2")`,
    "time" : "2018-12-21 10:53:52",
    "unixdate" : 1545360832000,
    "src_ip" : `222.18.127.${49+i}`,
    "body" : "GET /index.php HTTP/1.1\nHost: 47.106.182.92:30001\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\nAccept-Language: zh-CN\nAccept-Encoding: gzip, deflate\nConnection: close\nCookie: PHPSESSID=unfs48427tro0rts8b02r81kv7\nUpgrade-Insecure-Requests: 1\n\n",
    "method" : "GET",
    "header" : {
      "Host" : "47.106.182.92:30001",
      "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0",
      "Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language" : "zh-CN",
      "Accept-Encoding" : "gzip, deflate",
      "Connection" : "close",
      "Cookie" : "PHPSESSID=unfs48427tro0rts8b02r81kv7",
      "Upgrade-Insecure-Requests" : "1"
    },
    "file" : {

    },
    "PostObj" : null,
    "Post" : null,
  });
}

onmessage = (rule)=>{
    rule = rule.data;
    var local_data;
    if(rule == ""){
        local_data = unfilted_data;
    }
    else{
        unfilted_data.forEach(function(data){
            let a;
            console.log(rule);
            eval(`if(${rule}){
                a = true;
            }
            else{
                a = false;
            }`);
            if(a){
                local_data.push(data);
            }
        });
    }
    postMessage(local_data);
}