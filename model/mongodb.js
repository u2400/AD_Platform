var MongoClient = require('mongoose');
var url = "mongodb://localhost:27017/";
var mongo = function(){
    let act = arguments[0];
    let json = arguments[1];
    var funarr = {};
    funarr["insert"] = function(dbo,json){
        if(json.constructor !== Array){
            json = [json];
        }
        dbo.collection("site").insertMany( json , function(err, res) {
            if (err) throw err;
        });
    }

    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("runoob");
        if (err) throw err;
        funarr[act](dbo,json); 
        db.close();
    })
}

module.exports = mongo;

  