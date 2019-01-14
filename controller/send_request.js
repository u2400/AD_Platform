const request = require("request");
var Mongo = require("./model/mongodb");

var r = Mongo("find", [{}, {
    'projection': {
        time: 1,
        unixdate: 1
    },
    "sort": [
        ['unixdate', 1]
    ]
}]);

