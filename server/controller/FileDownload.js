const F_FileDownload = require("../component/get_download_file");

var mod = async function(id){
    console.log("start");
    var id = "5c540823294a3231e02ca4a3";
    return F_FileDownload(id);
}

module.exports = mod;