const F_send_request = require("../component/send_request");

var mod = function([id_arr, host, workspace_name]){
    F_send_request(id_arr, host, workspace_name);
}

 module.exports = mod;