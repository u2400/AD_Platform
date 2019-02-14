const F_FileDownload = require("../component/FileDown-getfile");

mod = function(id){
    F_FileDownload(id)
    .then(function(a){
        return a;
    })
}
module.exports = mod;