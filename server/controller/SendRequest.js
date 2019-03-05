const F_send_request = require("../component/send_request");

//send request
var mod = function([id_arr, host, workspace_name]){
    F_send_request(id_arr, host, workspace_name);
}

//TODO.. 将返回的内容写入数据库


 module.exports = mod;