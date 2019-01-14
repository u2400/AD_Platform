var MongoClient = require('mongodb');
const events = require('events').EventEmitter;
const EventEmitter = new events();
const url = `mongodb://127.0.0.1:27017`; //Defining databases address
const table = "site"; //database table name

var mongo = function(){
    let act = arguments[0];
    let json = arguments[1];
    var funarr = {};

    //Defining database opreations
    funarr["insert"] = function(dbo,json){   //Defining insert opreation
        if(json.constructor !== Array){
            json = [json];
        }

        dbo.collection(table).insertMany( json , function(err, res) {
            if (err) throw err;
        });
    }
 
    funarr["find"] = function(dbo,json){ //Defining find opreation
        
        dbo.collection(table).find(...json).toArray(function(err, res) {
            if (err) throw err;
            EventEmitter.emit("message",res);
        });
    }

    MongoClient.connect(url,{useNewUrlParser: true},function(err, client) {
        if (err) {
            console.log(err);
        }
        var dbo = client.db('log');
        funarr[act](dbo,json); 
        client.close();
    })
}

module.exports = mongo;