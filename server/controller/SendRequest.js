const F_send_request = require("../component/send_request");

//send request
var mod = function([workspace_name, id_array, option]){
    option.hash = crypto.pbkdf2Sync((new Date()).toString(), crypto.randomBytes(4096), 1, 64, 'sha512').toString("hex");
    F_send_request(workspace_name, id_array, option);
}

//TODO.. 将返回的内容写入数据库

 module.exports = mod;