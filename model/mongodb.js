var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var mongo = {}
mongo.connect = function(){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("数据库连接已创建!");
        db.close();
    });
}

module.exports = mongo;

  