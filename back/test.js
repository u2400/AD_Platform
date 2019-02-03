const { exec } =  require("child_process");

// var log = require("./controller/log");
// var Requests = require("./controller/send_request");
// log();
// Requests();
exec("python test.py -s 123",function() {
    console.log(arguments);
});