var MongoClient = require('mongodb');

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

    funarr["find"] = function(dbo,json){
        
        dbo.collection("site").find({},{'projection':{time: 1}}).toArray(function(err, res) {
            if (err) throw err;
            console.log(res);
        });
    }

    MongoClient.connect("mongodb://127.0.0.1:27017",{useNewUrlParser: true},function(err, client) {
        if (err) {
            console.log(err)
        }
        var dbo = client.db('log');
        funarr[act](dbo,json); 
        client.close();
    })
}

module.exports = mongo;

  

